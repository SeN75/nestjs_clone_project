import { env } from 'src/env/env';
import { ConnectionOptions } from 'typeorm';

export const TypeOrmConfigOption: ConnectionOptions = {
  type: 'postgres',
  port: env.pgConnectionOptions.port,
  username: env.pgConnectionOptions.username,
  password: env.pgConnectionOptions.password,
  host: env.pgConnectionOptions.host,
  database: env.pgConnectionOptions.database,
  entities: env.pgConnectionOptions.entities,
  migrations: env.pgConnectionOptions.migrations,
  synchronize: env.pgConnectionOptions.synchronize,
};
