import {
  HandleError,
  ResponseOptions,
  serviceResponse,
} from "@amrogamal/shared-code";
import { elasticClient } from "../configs/elastic.config";
import {
  ElasticCreateType,
  ElasticSearchType,
  ElasticMappingCar,
  ElasticUpdateType,
  ElasticDeleteType,
} from "../types/elastic.type";
const { warpError } = HandleError.getInstance();

export class CarService {
  private static instance: CarService;

  public static getInstance(): CarService {
    if (!CarService.instance) {
      this.instance = new CarService();
    }
    return this.instance;
  }

  createMapping = async () => {
    const exists = await elasticClient.indices.exists({ index: "cars" });
    if (exists)
      return serviceResponse({
        statusText: "Conflict",
        message: "Index already exists",
      });

    await elasticClient.indices.create({
      index: "cars",
      settings: ElasticMappingCar.settings as any,
      mappings: ElasticMappingCar.mappings as any,
    });

    return serviceResponse({
      statusText: "Created",
      message: "Index created successfully",
    });
  };

  createCar = warpError(async ({ data, index, id }: ElasticCreateType) => {
    await elasticClient.index({
      index,
      id,
      document: data,
      refresh: "wait_for",
    });
  });

  getCar = warpError(async (id: string): Promise<ResponseOptions> => {
    const { _index, _source } = await elasticClient.get({
      index: "cars",
      id,
    });
    return serviceResponse({ data: _source });
  });

  searchCar = warpError(
    async (
      query: ElasticSearchType,
      page: number = 1,
      limit: number = 10
    ): Promise<ResponseOptions> => {
      const { esQuery, from } = await this.helperSearch(query, page, limit);
      const { hits } = await elasticClient.search({
        index: "cars",
        query: esQuery,
        size: limit,
        from,
        // sort,
      });
      const results = hits.hits.map((hit: any) => ({
        id: hit._id,
        ...hit._source,
      }));

      return serviceResponse({
        statusText: "OK",
        message: "Search successfully",
        data: results,
      });
    }
  );

  private helperSearch = async (
    query: ElasticSearchType,
    page: number = 1,
    limit: number = 10
  ) => {
    const from = (page - 1) * limit;
    const skipKeys = ["city", "minPrice", "maxPrice"];
    const mustQueries: any[] = [];
    const rangeQuery: any = {};

    if (query.city) {
      mustQueries.push({ match: { "location.city": query.city } });
    }

    if (query.minPrice && query.maxPrice) {
      rangeQuery.pricePerDay = {
        gte: query.minPrice,
        lte: query.maxPrice,
      };
    }

    for (const [key, value] of Object.entries(query)) {
      if (skipKeys.includes(key)) continue;

      if (["brand", "carModel", "name"].includes(key)) {
        mustQueries.push({
          match: {
            [key]: {
              query: value,
              fuzziness: "AUTO",
            },
          },
        });
      } else if (key === "color") {
        mustQueries.push({
          term: {
            color: value,
          },
        });
      } else {
        mustQueries.push({
          match: { [key]: value },
        });
      }
    }

    const esQuery =
      mustQueries.length || Object.keys(rangeQuery).length
        ? {
            bool: {
              must: mustQueries,
              ...(Object.keys(rangeQuery).length && {
                filter: [
                  {
                    range: rangeQuery,
                  },
                ],
              }),
            },
          }
        : { match_all: {} };

    return { esQuery, from };
  };

  updateCar = async ({ data, index, id }: ElasticUpdateType) => {
    await elasticClient.update({
      index,
      id,
      doc: data,
    });
  };

  deleteCar = async ({ index, id }: ElasticDeleteType) => {
    await elasticClient.delete({
      index,
      id,
    });
  };
}
