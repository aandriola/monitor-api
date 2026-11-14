import { computeStatus } from './device.status.js';

export function createDeviceService({
  repository,
  thresholdSeconds,
  clock = () => new Date(),
  onHeartbeat = () => {},
}) {
  const toView = (row) => ({
    id: row.id,
    name: row.name,
    host: row.host,
    type: row.type,
    lastHeartbeatAt: row.last_heartbeat_at,
    status: computeStatus(row.last_heartbeat_at, clock(), thresholdSeconds),
  });

  return {
    async register(input) {
      return toView(await repository.create({ type: 'generic', ...input }));
    },

    async list() {
      return (await repository.findAll()).map(toView);
    },

    // retorna null se o dispositivo não existe
    async heartbeat(id) {
      const row = await repository.touchHeartbeat(id, clock());
      if (!row) return null;
      onHeartbeat();
      return toView(row);
    },
  };
}
