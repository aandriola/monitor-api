import { config } from './config.js';
import { createDb } from './db.js';
import { buildApp } from './app.js';

const db = createDb(config.db);
const app = buildApp({ db, config });

async function shutdown() {
  await app.close();
  await db.destroy();
  process.exit(0);
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

try {
  await app.listen({ port: config.port, host: '0.0.0.0' });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
