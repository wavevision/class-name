import className from '../className';

describe('class-name/className', () => {
  describe('no props and state', () => {
    it('returns class name only', () => {
      const otherClassName = className('other-class')();
      expect(otherClassName.block()).toBe('other-class');
    });
  });
  const cn = className('test-class', () => ({ custom: () => 'custom' }));
  const testClassName = cn();
  describe('block', () => {
    it('returns block class name', () => {
      expect(testClassName.block('something')).toEqual(
        'test-class test-class--custom test-class--something',
      );
    });
  });
  describe('compose', () => {
    it('returns composed class names string', () => {
      expect(
        testClassName.compose(
          testClassName.element('child'),
          testClassName.extra('utility-class'),
        ),
      ).toEqual('test-class__child utility-class');
    });
  });
  describe('create', () => {
    it('creates new formatter', () => {
      const newTestClassName = testClassName.create('new-class', false, true);
      expect(newTestClassName.block()).toEqual('new-class');
      const anotherTestClassName = testClassName.create('block');
      expect(anotherTestClassName.block(undefined, 'modifier')).toEqual(
        'test-class-block test-class-block--custom test-class-block--modifier',
      );
    });
  });
  describe('element', () => {
    it('returns element class name', () => {
      expect(
        testClassName.element('element', 'something', null, 'hello'),
      ).toEqual(
        'test-class__element test-class__element--something test-class__element--hello',
      );
    });
  });
  describe('extra', () => {
    it('returns extra defined class name', () => {
      expect(testClassName.extra('extra')).toEqual('extra');
      expect(testClassName.extra('another', 'prefix')).toEqual(
        'prefix-another',
      );
    });
  });
});
