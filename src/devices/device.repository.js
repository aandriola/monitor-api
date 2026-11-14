// Repository: único lugar que conhece o banco.
export function createDeviceRepository(db) {
  return {
    async create({ name, host, type }) {
      const [row] = await db('devices').insert({ name, host, type }).returning('*');
      return row;
    },

    findAll() {
      return db('devices').orderBy('id');
    },

    async touchHeartbeat(id, at) {
      const [row] = await db('devices').where({ id }).update({ last_heartbeat_at: at }).returning('*');
      return row ?? null;
    },
  };
}
