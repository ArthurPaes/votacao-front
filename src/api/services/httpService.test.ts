import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpService } from './httpService';

vi.stubGlobal('fetch', vi.fn());
const mockFetch = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;

describe('httpService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls fetch with GET method', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ data: 'test' }) });
    const result = await httpService.get('/test');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/test'), expect.objectContaining({ method: 'GET' }));
    expect(result).toEqual({ data: 'test' });
  });

  it('calls fetch with POST method', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ data: 'test' }) });
    const result = await httpService.post('/test', { foo: 'bar' });
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/test'), expect.objectContaining({ method: 'POST' }));
    expect(result).toEqual({ data: 'test' });
  });

  it('calls fetch with PUT method', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ data: 'test' }) });
    const result = await httpService.put('/test', { foo: 'bar' });
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/test'), expect.objectContaining({ method: 'PUT' }));
    expect(result).toEqual({ data: 'test' });
  });

  it('calls fetch with DELETE method', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ data: 'test' }) });
    const result = await httpService.delete('/test');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/test'), expect.objectContaining({ method: 'DELETE' }));
    expect(result).toEqual({ data: 'test' });
  });
}); 