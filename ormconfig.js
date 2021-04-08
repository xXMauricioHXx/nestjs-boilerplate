return {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrtionDir: process.env.TYPEORM_MIGRATIONS_DIR,
  migration: process.env.TYPEORM_MIGRATIONS,
  synchronize: true,
};
