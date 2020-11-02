import { USE_VALUE } from '../constants';
import {
  Modifiers,
  ModifiersCallback,
  Parameters,
  Props,
  State,
} from '../types';

const inPropsOrState = <P, S>({ props, state }: Parameters<P, S>) => (
  v: unknown,
): unknown => props[v as keyof P] || state[v as keyof S];

export const filter = (modifiers: Modifiers): string[] =>
  modifiers.filter(m => m != null) as string[];

export const unique = (...modifiers: Array<string[]>): string[] =>
  Array.from(
    new Set(modifiers.reduce((next, current) => [...next, ...current])),
  );

const processModifiers = <P = Props, S = State>(
  modifiersCallback: ModifiersCallback<P, S>,
  parameters: Parameters<P, S>,
): string[] => {
  const modifiers: string[] = [];
  const result = modifiersCallback(parameters);
  if (result) {
    const exists = inPropsOrState<P, S>(parameters);
    for (const k in result) {
      const v = result[k];
      if (v === true && exists(k)) {
        modifiers.push(k);
      } else if (typeof v === 'function') {
        const modifier = v(parameters);
        if (modifier) {
          modifiers.push(typeof modifier === 'string' ? modifier : k);
        }
      } else if (v === USE_VALUE) {
        const prop = exists(k);
        if (prop) modifiers.push(String(prop));
      }
    }
  }
  return modifiers;
};

export default processModifiers;
