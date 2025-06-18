export type ElasticCreateType = {
  data: any;
  index: string;
  id: string;
  userId?: string;
};

export type ElasticGetType = {
  index: string;
  id: string;
};

export type ElasticSearchType = {
  query: Record<string, any>;
  index: string;
  sort?: Array<Record<string, "asc" | "desc">>;
  _source?: string[];
  page: number | 1;
  limit: number | 10;
};

export type ElasticUpdateType = {
  data: any;
  index: string;
  id: string;
};

export type ElasticDeleteType = {
  index: string;
  id: string;
};

export type ElasticMappingType = {
  index: string;
  body: any;
};

export const elasticMappingCar = {
  settings: {
    analysis: {
      analyzer: {
        default: { type: "standard" },
      },
    },
  },
  mappings: {
    properties: {
      name: {
        type: "text",
        analyzer: "english",
      },
      description: {
        type: "text",
        analyzer: "english",
      },
      availableTo: {
        type: "date",
      },
      availableFrom: {
        type: "date",
      },
    },
  },
};