import client from 'prom-client';

// Um registry por app: evita "metric already registered" nos testes.
export function createMetrics() {
  const registry = new client.Registry();
  const heartbeatsTotal = new client.Counter({
    name: 'heartbeats_received_total',
    help: 'Total de heartbeats recebidos',
    registers: [registry],
  });
  return { registry, heartbeatsTotal };
}
