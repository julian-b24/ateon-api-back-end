import { ConfigProps } from '../interfaces/config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api: {
    apiURL: process.env.API_URL,
    httpTimeout: 1000,
  },
  mongodb: {
    database: {
      connectionString: process.env.MONGO_DB_CONNECTION_STRING,
      databaseName: process.env.MONGO_DB_DBNAME,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
});
