import { USE_VALUE } from './constants';

export type ModifierFunction<P> = (props: P) => unknown;

export type ModifiersCallbackResult<P> = Record<
  string,
  boolean | typeof USE_VALUE | ModifierFunction<P>
>;

export type ModifiersCallback<P> = (
  props: P,
) => Partial<ModifiersCallbackResult<P>> | void;

export interface ClassNameFormatter<P> {
  readonly baseClass: string;
  readonly block: (...modifiers: string[]) => string;
  readonly compose: (...classNames: string[]) => string;
  readonly create: (
    newClass: string,
    subBlock?: boolean,
    excludeModifiers?: boolean,
  ) => ClassNameFormatter<P>;
  readonly element: (className: string, ...modifiers: string[]) => string;
  readonly extra: (className: string, prefix?: string) => string;
}
