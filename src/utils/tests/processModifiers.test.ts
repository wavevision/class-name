import processModifiers from '../processModifiers';
import { USE_VALUE } from '../../constants';

interface TestProps {
  someProp: boolean;
  someOtherProp: string;
  nullableProp: string | null;
}

interface TestState {
  visible: boolean;
}

const testProps: TestProps = {
  someProp: true,
  someOtherProp: 'one',
  nullableProp: null,
};

const testState: TestState = { visible: true };

describe('class-name/utils/processModifiers', () => {
  describe('callback result is void', () => {
    it('returns empty array', () => {
      expect(
        processModifiers(
          ({ props }) => {
            if (props.nullableProp) {
              return {};
            }
          },
          { props: testProps, state: {} },
        ),
      ).toEqual([]);
    });
  });
  describe('callback result is defined', () => {
    it('uses modifier key', () => {
      expect(
        processModifiers<TestProps, TestState>(
          () => ({ someProp: true, nullableProp: true, visible: true }),
          { props: testProps, state: testState },
        ),
      ).toEqual(['someProp', 'visible']);
    });
    it('uses modifier function return value', () => {
      expect(
        processModifiers<TestProps>(
          () => ({
            customModifier: ({ props }) => props.someProp,
            anotherCustomModifier: () => 'use-this',
            omittedCustomModifier: ({ props }) => props.nullableProp !== null,
          }),
          { props: testProps, state: {} },
        ),
      ).toEqual(['customModifier', 'use-this']);
    });
    it('uses modifier prop value', () => {
      expect(
        processModifiers<TestProps>(
          () => ({
            someOtherProp: USE_VALUE,
            nullableProp: USE_VALUE,
          }),
          { props: testProps, state: {} },
        ),
      ).toEqual(['one']);
    });
  });
});
