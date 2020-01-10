import { MODIFIER_DELIMITER } from '../constants';
import { Modifiers } from '../types';

import camelCaseToDash from './camelCaseToDash';
import { filter } from './processModifiers';

export const join = (classNames: string[]): string => classNames.join(' ');

const composeClassNames = (
  className: string,
  modifiers: Modifiers = [],
): string => {
  const classNames = [className];
  for (const modifier of filter(modifiers)) {
    classNames.push(
      `${className}${MODIFIER_DELIMITER}${camelCaseToDash(modifier)}`,
    );
  }
  return join(classNames);
};

export default composeClassNames;
