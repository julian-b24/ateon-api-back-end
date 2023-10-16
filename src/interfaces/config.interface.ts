interface APIConfigProps {
  apiURL: string;
  httpTimeout: number;
}

interface MongoDBConfigProps {
  connectionString: string;
  databaseName: string;
}

interface JWTConfigProps {
  secret: string;
}

export interface ConfigProps {
  port: number;
  api: APIConfigProps;
  mongodb: {
    database: MongoDBConfigProps;
  };
  jwt: JWTConfigProps;
}
