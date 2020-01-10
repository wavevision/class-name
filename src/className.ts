import processModifiers from './utils/processModifiers';
import composeClassNames from './utils/composeClassNames';
import { ELEMENT_DELIMITER, SUB_BLOCK_DELIMITER } from './constants';
import { ClassNameFormatter, ModifiersCallback } from './types';

const className = <P = {}>(
  baseClass: string,
  modifiersCallback?: ModifiersCallback<P>,
) => (props: P): ClassNameFormatter<P> => ({
  baseClass,
  block: (...modifiers) => {
    if (typeof modifiersCallback === 'function') {
      modifiers = Array.from(
        new Set(
          processModifiers<P>(modifiersCallback, props).concat(...modifiers),
        ),
      );
    }
    return composeClassNames(baseClass, modifiers);
  },
  compose: (...classNames) => classNames.join(' '),
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
