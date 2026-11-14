import Fastify from 'fastify';
import { createMetrics } from './metrics.js';
import { createDeviceRepository } from './devices/device.repository.js';
import { createDeviceService } from './devices/device.service.js';
import { registerDeviceRoutes } from './devices/device.routes.js';

// Monta o app sem abrir porta: server.js escuta, os testes usam app.inject().
export function buildApp({ db, config, logger = true }) {
  const app = Fastify({ logger });
  const metrics = createMetrics();

  const service = createDeviceService({
    repository: createDeviceRepository(db),
    thresholdSeconds: config.heartbeatThresholdSeconds,
    onHeartbeat: () => metrics.heartbeatsTotal.inc(),
  });

  app.get('/health', async () => ({ status: 'ok' }));

  app.get('/metrics', async (_request, reply) => {
    reply.header('Content-Type', metrics.registry.contentType);
    return metrics.registry.metrics();
  });

  registerDeviceRoutes(app, service);
  return app;
}
