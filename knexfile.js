import { config } from './src/config.js';

export default {
  client: 'pg',
  connection: config.db,
  migrations: { directory: './migrations' },
};
