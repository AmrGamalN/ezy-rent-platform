export type ElasticCreateType = {
  data: any;
  index: string;
  id: string;
  userId?: string;
};

export type ElasticGetType = {
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

export const ElasticMappingCar = {
  settings: {
    analysis: {
      analyzer: {
        default: {
          type: "standard",
          stopwords: "_none_",
        },
      },
    },
  },
  mappings: {
    properties: {
      userId: { type: "keyword" },
      phone: { type: "keyword" },
      name: { type: "text" },
      description: { type: "text" },
      carModel: { type: "keyword" },
      brand: { type: "keyword" },
      year: { type: "integer" },
      color: { type: "keyword" },
      images: {
        type: "nested",
        properties: {
          url: { type: "keyword" },
          key: { type: "keyword" },
        },
      },
      pricePerDay: { type: "float" },
      availableFrom: { type: "date" },
      availableTo: { type: "date" },
      location: {
        properties: {
          city: { type: "keyword" },
          address: { type: "text" },
          coordinates: {
            properties: {
              lat: { type: "float" },
              lng: { type: "float" },
            },
          },
        },
      },
      isAvailable: { type: "boolean" },
      guarantees: {
        properties: {
          hasInsurance: { type: "boolean" },
          insuranceDetails: { type: "text" },
          licenseValid: { type: "boolean" },
          requiresDeposit: { type: "boolean" },
          depositAmount: { type: "float" },
          additionalNotes: { type: "text" },
        },
      },
      createdAt: { type: "date" },
      updatedAt: { type: "date" },
    },
  },
};
