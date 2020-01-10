import processModifiers from '../processModifiers';
import { USE_VALUE } from '../../constants';

interface TestProps {
  someProp: boolean;
  someOtherProp: string;
  nullableProp: string | null;
}

const testProps: TestProps = {
  someProp: true,
  someOtherProp: 'one',
  nullableProp: null,
};

describe('class-name/utils/processModifiers', () => {
  describe('callback result is void', () => {
    it('returns empty array', () => {
      expect(
        processModifiers(props => {
          if (props.nullableProp) {
            return {};
          }
        }, testProps),
      ).toEqual([]);
    });
  });
  describe('callback result is defined', () => {
    it('uses modifier key', () => {
      expect(
        processModifiers<TestProps>(
          () => ({ someProp: true, nullableProp: true }),
          testProps,
        ),
      ).toEqual(['someProp']);
    });
    it('uses modifier function return value', () => {
      expect(
        processModifiers<TestProps>(
          () => ({
            customModifier: props => props.someProp,
            anotherCustomModifier: () => 'use-this',
            omittedCustomModifier: props => props.nullableProp !== null,
          }),
          testProps,
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
          testProps,
        ),
      ).toEqual(['one']);
    });
  });
});
