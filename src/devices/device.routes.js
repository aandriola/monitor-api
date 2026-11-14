const idParams = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'integer', minimum: 1 } },
};

const createBody = {
  type: 'object',
  required: ['name', 'host'],
  additionalProperties: false,
  properties: {
    name: { type: 'string', minLength: 1, maxLength: 100 },
    host: { type: 'string', minLength: 1, maxLength: 255 },
    type: { type: 'string', minLength: 1, maxLength: 50 },
  },
};

// Camada HTTP: valida entrada e delega ao service.
export function registerDeviceRoutes(app, service) {
  app.post('/devices', { schema: { body: createBody } }, async (request, reply) => {
    const device = await service.register(request.body);
    return reply.code(201).send(device);
  });

  app.get('/devices', async () => service.list());

  app.post('/devices/:id/heartbeat', { schema: { params: idParams } }, async (request, reply) => {
    const device = await service.heartbeat(request.params.id);
    if (!device) return reply.code(404).send({ error: 'Dispositivo não encontrado' });
    return device;
  });
}
