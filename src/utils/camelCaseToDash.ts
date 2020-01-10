const camelCaseToDash = (s: string): string =>
  s.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

export default camelCaseToDash;
