import { describe, it, expect, afterAll } from 'vitest';
import { config } from '../../src/config.js';
import { createDb } from '../../src/db.js';
import { buildApp } from '../../src/app.js';

describe('interface web', () => {
  const db = createDb(config.db);
  const app = buildApp({ db, config, logger: false });

  afterAll(async () => {
    await app.close();
    await db.destroy();
  });

  it('serve a página inicial em /', async () => {
    const res = await app.inject({ method: 'GET', url: '/' });
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');
    expect(res.body).toContain('monitor-api');
  });
});
