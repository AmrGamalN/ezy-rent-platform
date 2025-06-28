import { HandleError, ResponseOptions, serviceResponse } from "common";
import { elasticClient } from "../configs/elastic.config";
import {
  ElasticCreateType,
  ElasticGetType,
  ElasticSearchType,
  ElasticUpdateType,
  ElasticDeleteType,
  ElasticMappingType,
} from "../types/elastic.type";
const { warpError } = HandleError.getInstance();

export class ElasticService {
  private static instance: ElasticService;

  public static getInstance(): ElasticService {
    if (!ElasticService.instance) {
      this.instance = new ElasticService();
    }
    return this.instance;
  }

  elasticMapping = async ({ index, body }: ElasticMappingType) => {
    const exists = await elasticClient.indices.exists({ index });
    if (exists) return;
    await elasticClient.indices.create({ index, body });
  };

  createCar = async ({ data, index, id, userId }: ElasticCreateType) => {
    await elasticClient.index({
      index,
      id,
      document: { ...data, userId },
    });
  };

  getCar = warpError(
    async ({ id, index }: ElasticGetType): Promise<ResponseOptions> => {
      const { _index, _source } = await elasticClient.get({
        index,
        id,
      });
      return serviceResponse({ data: _source });
    }
  );

  SearchCar = warpError(
    async ({
      index,
      query,
      sort,
      _source,
      page,
      limit,
    }: ElasticSearchType): Promise<ResponseOptions> => {
      const skipKeys = ["city", "minPrice", "maxPrice"];
      const mustQueries: any[] = [];
      const rangeQuery: any = {};
      let results: any[] = [];

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
        } else if (["color"].includes(key)) {
          mustQueries.push({
            wildcard: {
              [`${key}.keyword`]: `*${value.toLowerCase()}*`,
            },
          });
        } else {
          mustQueries.push({
            match: { [key]: value },
          });
        }

        const esQuery = Object.keys(query).length
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

        const from = (page - 1) * limit;
        const { hits } = await elasticClient.search({
          index,
          query: esQuery,
          size: limit,
          from,
          // sort,
          _source,
        });
        results = hits.hits.map((hit: any) => ({
          id: hit._id,
          ...hit._source,
        }));
      }
      return serviceResponse({ data: results });
    }
  );

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
