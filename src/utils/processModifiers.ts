import { USE_VALUE } from '../constants';
import { Modifiers, ModifiersCallback } from '../types';

const inPropsOrState = <P, S>(props: P, state: S) => (v: unknown): unknown =>
  props[v as keyof P] || state[v as keyof S];

export const filter = (modifiers: Modifiers): string[] =>
  modifiers.filter(m => m != null) as string[];

const processModifiers = <P = {}, S = {}>(
  modifiersCallback: ModifiersCallback<P, S>,
  props: P,
  state: S,
): string[] => {
  const modifiers: string[] = [];
  const result = modifiersCallback(props, state) || {};
  const exists = inPropsOrState<P, S>(props, state);
  for (const k in result) {
    const v = result[k];
    if (v === true && exists(k)) {
      modifiers.push(k);
    } else if (typeof v === 'function') {
      const modifier = v(props, state);
      if (modifier) modifiers.push(typeof modifier === 'string' ? modifier : k);
    } else if (v === USE_VALUE) {
      const prop = exists(k);
      if (prop) modifiers.push(String(prop));
    }
  }
  return modifiers;
};

export default processModifiers;
