import { JwtModuleOptions } from '@nestjs/jwt';

export const env = {
  pgConnectionOptions: {
    type: 'postgres',
    port: 5433,
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    database: 'wp_store',
    entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
    migrations: [`${__dirname}/../**/*.entity{.js,.ts}`],
    synchronize: false,
  },
  jwtSettings: {
    secret: '',
    signOptions: {
      expiresIn: '180s',
    },
  } as JwtModuleOptions,
};
