import camelCaseToDash from '../camelCaseToDash';

describe('class-name/utils/camelCaseToDash', () => {
  it('converts camel case string to dash case', () => {
    expect(camelCaseToDash('someCamelString')).toBe('some-camel-string');
  });
});
