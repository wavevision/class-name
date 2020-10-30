import processModifiers, { filter, unique } from './utils/processModifiers';
import composeClassNames, { join } from './utils/composeClassNames';
import { ELEMENT_DELIMITER, BLOCK_DELIMITER } from './constants';
import { ClassNameFormatter, ModifiersCallback, Props, State } from './types';

const className = <P = Props, S = State>(
  baseClass: string,
  modifiersCallback?: ModifiersCallback<P, S>,
) => (parameters: { props?: P; state?: S } = {}): ClassNameFormatter<P, S> => {
  const requiredParameters = {
    props: parameters.props || ({} as P),
    state: parameters.state || ({} as S),
  };
  return {
    baseClass,
    block: (...modifiers) => {
      if (typeof modifiersCallback === 'function') {
        modifiers = unique(
          processModifiers(modifiersCallback, requiredParameters),
          filter(modifiers),
        );
      }
      return composeClassNames(baseClass, modifiers);
    },
    compose: (...classNames) => join(classNames),
    create: (newClass, subBlock = true, excludeModifiers = false) => {
      if (subBlock) {
        newClass = `${baseClass}${BLOCK_DELIMITER}${newClass}`;
      }
      return className(
        newClass,
        excludeModifiers ? undefined : modifiersCallback,
      )(requiredParameters);
    },
    element: (className, ...modifiers) =>
      composeClassNames(
        `${baseClass}${ELEMENT_DELIMITER}${className}`,
        modifiers,
      ),
    extra: (className, prefix = '') => {
      if (prefix) {
        return `${prefix}${BLOCK_DELIMITER}${className}`;
      }
      return className;
    },
  };
};

export default className;
