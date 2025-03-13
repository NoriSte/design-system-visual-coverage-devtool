import type { Configuration, ReferencesToGlobals } from '../types';

interface PlainObject {
  hasOwnProperty<K extends string>(key: K): this is Record<K, unknown>;

  // Object.hasOwn() is intended as a replacement for Object.hasOwnProperty(). See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
  hasOwn<K extends string>(key: K): this is Record<K, unknown>;
}

function isPlainObject(value: unknown): value is PlainObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isReferencesToGlobals(value: unknown): value is ReferencesToGlobals {
  if (!isPlainObject(value)) return false;

  // eslint-disable-next-line no-prototype-builtins
  if (!value.hasOwnProperty('createCalculateDsVisualCoverages')) return false;

  const { createCalculateDsVisualCoverages } = value;

  if (typeof createCalculateDsVisualCoverages !== 'string') return false;

  const obj = { createCalculateDsVisualCoverages };
  const isValid: ReferencesToGlobals = obj;
  const noNewOptionalProps: Omit<Required<ReferencesToGlobals>, keyof typeof obj> = {};

  const allChecksPassed = !!isValid && !!noNewOptionalProps;
  return allChecksPassed;
}

export function isConfiguration(value: unknown): value is Configuration {
  if (!isPlainObject(value)) return false;

  // eslint-disable-next-line no-prototype-builtins
  if (!value.hasOwnProperty('referencesToGlobals')) return false;

  const { referencesToGlobals } = value;

  if (!isReferencesToGlobals(referencesToGlobals)) return false;

  const obj = { referencesToGlobals };
  const isValid: Configuration = obj;
  const noNewOptionalProps: Omit<Required<Configuration>, keyof typeof obj> = {};

  const allChecksPassed = !!isValid && !!noNewOptionalProps;
  return allChecksPassed;
}
