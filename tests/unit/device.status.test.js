import { describe, it, expect } from 'vitest';
import { computeStatus } from '../../src/devices/device.status.js';

const now = new Date('2026-11-07T12:00:00Z');
const secondsAgo = (s) => new Date(now.getTime() - s * 1000);

describe('computeStatus', () => {
  it('é offline se nunca enviou heartbeat', () => {
    expect(computeStatus(null, now, 60)).toBe('offline');
  });

  it('é online com heartbeat recente', () => {
    expect(computeStatus(secondsAgo(10), now, 60)).toBe('online');
  });

  it('é online exatamente no limite', () => {
    expect(computeStatus(secondsAgo(60), now, 60)).toBe('online');
  });

  it('é offline logo após o limite', () => {
    expect(computeStatus(secondsAgo(61), now, 60)).toBe('offline');
  });

  it('respeita um limite customizado', () => {
    expect(computeStatus(secondsAgo(20), now, 10)).toBe('offline');
  });
});
