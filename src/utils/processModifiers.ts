import { USE_VALUE } from '../constants';
import { ModifiersCallback } from '../types';

const processModifiers = <P = {}>(
  modifiersCallback: ModifiersCallback<P>,
  props: P,
): string[] => {
  const modifiers: string[] = [];
  const result = modifiersCallback(props);
  for (const k in result) {
    const v = result[k];
    if (v === true && props[k as keyof P]) {
      modifiers.push(k);
    } else if (typeof v === 'function') {
      const modifier = v(props);
      if (modifier) modifiers.push(typeof modifier === 'string' ? modifier : k);
    } else if (v === USE_VALUE) {
      const prop = props[k as keyof P];
      if (prop) modifiers.push(String(prop));
    }
  }
  return modifiers;
};

export default processModifiers;
