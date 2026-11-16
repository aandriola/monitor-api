function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  return value;
}

function buildDbConfig() {
  // Nuvem (ex.: Render): uma única URL de conexão
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };
  }
  // Local, Compose e CI: variáveis separadas
  return {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    database: required('DB_NAME'),
  };
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  heartbeatThresholdSeconds: Number(process.env.HEARTBEAT_THRESHOLD_SECONDS ?? 60),
  db: buildDbConfig(),
};
