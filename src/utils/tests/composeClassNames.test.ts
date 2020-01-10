import composeClassNames from '../composeClassNames';

describe('class-name/utils/composeClassNames', () => {
  it('joins class name with valid modifiers', () => {
    expect(composeClassNames('class')).toBe('class');
    expect(composeClassNames('base-class', ['one', null, 'modified'])).toBe(
      'base-class base-class--one base-class--modified',
    );
  });
});
