// Função pura: sem banco, sem relógio global. Ótima para testes unitários.
export function computeStatus(lastHeartbeatAt, now = new Date(), thresholdSeconds = 60) {
  if (!lastHeartbeatAt) return 'offline';
  const elapsedSeconds = (now - new Date(lastHeartbeatAt)) / 1000;
  return elapsedSeconds <= thresholdSeconds ? 'online' : 'offline';
}
