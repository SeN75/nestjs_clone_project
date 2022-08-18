import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../env/env';
export const datasource: DataSource = new DataSource({
  type: 'postgres',
  port: env.pgConnectionOptions.port,
  username: env.pgConnectionOptions.username,
  password: env.pgConnectionOptions.password,
  host: env.pgConnectionOptions.host,
  database: env.pgConnectionOptions.database,
  entities: env.pgConnectionOptions.entities,
  migrations: env.pgConnectionOptions.migrations,
  synchronize: env.pgConnectionOptions.synchronize,
});

datasource
  .initialize()
  .then(() => {
    console.log('start conniction');
  })
  .catch((err) => {
    console.error('error ---> ', err);
  });
