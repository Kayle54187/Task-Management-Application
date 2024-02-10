import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'host',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'dbname',
  entities: [],
};
