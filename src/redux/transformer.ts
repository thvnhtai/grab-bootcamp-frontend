import { camelObject } from '../utils/common';

// Mapping data to convert it to camelCase
export function transformerArray<T extends Record<string, unknown>>(
  payload: T[]
): T[] {
  return payload.map((item) => camelObject(item));
}

export function transformerObject<T extends Record<string, unknown>>(
  payload: T
): T {
  return camelObject(payload);
}
