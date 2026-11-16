import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    // SLO: 95% das requisições de GET /devices abaixo de 300 ms
    'http_req_duration{name:list}': ['p(95)<300'],
  },
};

// Cadastra um dispositivo para os heartbeats do teste
export function setup() {
  const res = http.post(
    `${BASE}/devices`,
    JSON.stringify({ name: 'k6-device', host: '10.0.0.1', type: 'smoke' }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  return { id: res.json('id') };
}

export default function (data) {
  const beat = http.post(`${BASE}/devices/${data.id}/heartbeat`, null, {
    tags: { name: 'heartbeat' },
  });
  check(beat, { 'heartbeat 200': (r) => r.status === 200 });

  const list = http.get(`${BASE}/devices`, { tags: { name: 'list' } });
  check(list, { 'list 200': (r) => r.status === 200 });

  sleep(1);
}
