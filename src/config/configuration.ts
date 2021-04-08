export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
    connection: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    schema: process.env.TYPEORM_DATABASE,
    migration: process.env.TYPEORM_MIGRATIONS,
    migrtionDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
  apm: {
    name: process.env.APM_SERVICE_NAME,
    url: process.env.APM_SERVICE_URL,
  },
  jsonplaceholder: {
    url: process.env.JSONPLACEHOLDER_URL,
    timeout: process.env.JSONPLACEHOLDER_TIMEOUT,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
});
