import processModifiers, { filter } from './utils/processModifiers';
import composeClassNames, { join } from './utils/composeClassNames';
import { ELEMENT_DELIMITER, SUB_BLOCK_DELIMITER } from './constants';
import { ClassNameFormatter, ModifiersCallback } from './types';

const className = <P = {}, S = {}>(
  baseClass: string,
  modifiersCallback?: ModifiersCallback<P, S>,
) => (props = {} as P, state = {} as S): ClassNameFormatter<P, S> => ({
  baseClass,
  block: (...modifiers) => {
    if (typeof modifiersCallback === 'function') {
      modifiers = Array.from(
        new Set(
          processModifiers<P, S>(modifiersCallback, props, state).concat(
            ...filter(modifiers),
          ),
        ),
      );
    }
    return composeClassNames(baseClass, modifiers);
  },
  compose: (...classNames) => join(classNames),
  create: (newClass, subBlock = true, excludeModifiers = false) => {
    if (subBlock) {
      newClass = `${baseClass}${SUB_BLOCK_DELIMITER}${newClass}`;
    }
    return className(
      newClass,
      excludeModifiers ? undefined : modifiersCallback,
    )(props);
  },
  element: (className, ...modifiers) =>
    composeClassNames(
      `${baseClass}${ELEMENT_DELIMITER}${className}`,
      modifiers,
    ),
  extra: (className, prefix = '') => {
    if (prefix) {
      return `${prefix}${SUB_BLOCK_DELIMITER}${className}`;
    }
    return className;
  },
});

export default className;
