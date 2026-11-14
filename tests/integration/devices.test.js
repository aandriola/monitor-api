import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { config } from '../../src/config.js';
import { createDb } from '../../src/db.js';
import { buildApp } from '../../src/app.js';

describe('fluxo de dispositivos (ponta a ponta)', () => {
  let db;
  let app;

  beforeAll(async () => {
    db = createDb(config.db);
    await db.migrate.latest();
    app = buildApp({ db, config, logger: false });
    await app.ready();
  });

  beforeEach(async () => {
    await db('devices').del();
  });

  afterAll(async () => {
    await app.close();
    await db.destroy();
  });

  it('cadastra, recebe heartbeat e lista como online', async () => {
    const created = await app.inject({
      method: 'POST',
      url: '/devices',
      payload: { name: 'Switch sala 1', host: '192.168.0.10', type: 'switch' },
    });
    expect(created.statusCode).toBe(201);
    const { id } = created.json();
    expect(created.json().status).toBe('offline');

    const beat = await app.inject({ method: 'POST', url: `/devices/${id}/heartbeat` });
    expect(beat.statusCode).toBe(200);

    const list = await app.inject({ method: 'GET', url: '/devices' });
    expect(list.statusCode).toBe(200);
    expect(list.json()).toHaveLength(1);
    expect(list.json()[0].status).toBe('online');
  });

  it('retorna 404 para heartbeat de dispositivo inexistente', async () => {
    const res = await app.inject({ method: 'POST', url: '/devices/99999/heartbeat' });
    expect(res.statusCode).toBe(404);
  });

  it('retorna 400 ao cadastrar sem nome', async () => {
    const res = await app.inject({ method: 'POST', url: '/devices', payload: { host: 'x' } });
    expect(res.statusCode).toBe(400);
  });
});
