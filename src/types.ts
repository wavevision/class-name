import { USE_VALUE } from './constants';

export type Modifiers = Array<string | null | undefined>;

export type ModifierFunction<P, S> = (props: P, state: S) => unknown;

export type ModifiersCallbackResult<P, S> = Record<
  string,
  boolean | typeof USE_VALUE | ModifierFunction<P, S>
>;

export type ModifiersCallback<P, S> = (
  props: P,
  state: S,
) => Partial<ModifiersCallbackResult<P, S>> | void;

export interface ClassNameFormatter<P, S> {
  readonly baseClass: string;
  readonly block: (...modifiers: Modifiers) => string;
  readonly compose: (...classNames: string[]) => string;
  readonly create: (
    newClass: string,
    subBlock?: boolean,
    excludeModifiers?: boolean,
  ) => ClassNameFormatter<P, S>;
  readonly element: (className: string, ...modifiers: Modifiers) => string;
  readonly extra: (className: string, prefix?: string) => string;
}
