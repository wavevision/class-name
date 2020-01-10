import { MODIFIER_DELIMITER } from '../constants';

import camelCaseToDash from './camelCaseToDash';

const composeClassNames = (
  className: string,
  modifiers: Array<string | null>,
): string => {
  const classNames = [className];
  const filtered: string[] = modifiers.filter(m => m !== null) as string[];
  for (const modifier of filtered) {
    classNames.push(
      `${className}${MODIFIER_DELIMITER}${camelCaseToDash(modifier)}`,
    );
  }
  return classNames.join(' ');
};

export default composeClassNames;
