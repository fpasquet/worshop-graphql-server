import * as Joi from '@hapi/joi';
import { ConnectionOptions } from 'typeorm';
import { SnakeCaseNamingStrategy } from '../services/snake-case.naming-strategy';

const schema = Joi.object({
  type: Joi.string().valid('sqlite', 'postgres', 'mysql', 'mariadb', 'mongodb').default('postgres'),
  host: Joi.string().default('localhost'),
  port: Joi.number().default(5432),
  username: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string(),
});

const { value: connectionConfig, error } = schema.validate({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT && parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || process.env.DATABASE_USERNAME,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: ConnectionOptions = {
  ...connectionConfig,
  namingStrategy: new SnakeCaseNamingStrategy(),
  entities: ['src/models/*.ts'],
  synchronize: false,
  migrationsRun: true,
  logging: ['query', 'error'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
