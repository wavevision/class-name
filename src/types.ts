import { USE_VALUE } from './constants';

export type Props = Record<string, unknown>;
export type State = Props;
export type Parameters<P = Props, S = State> = { props: P; state: S };

export type Modifiers = Array<string | null | undefined>;

export type ModifierFunction<P = Props, S = State> = (
  parameters: Parameters<P, S>,
) => unknown;

export type ModifiersCallbackResult<P = Props, S = State> = Record<
  keyof P | keyof S | string,
  boolean | typeof USE_VALUE | ModifierFunction<P, S>
>;

export type ModifiersCallback<P, S> = (
  parameters: Parameters<P, S>,
) => ModifiersCallbackResult<P, S> | void;

export interface ClassNameFormatter<P = Props, S = State> {
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
