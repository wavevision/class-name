# Wavevision Class Name

Create and format BEM class names for React components. The formatter uses [simplified](https://github.com/csswizardry/inuit.css) BEM syntax.

## Installation

Via [Yarn](https://yarnpkg.com)

```bash
yarn add @wavevision/class-name
```

or [npm](https://npmjs.com)

```bash
npm install --save @wavevisio/class-name
```

## Usage

Simple React component

```typescript jsx
import React, { FunctionComponent } from 'react';
import className, { USE_VALUE } from '@wavevision/class-name';

interface ComponentProps {
  booleanProp: boolean;
  nullableProp: string | null;
  stringProp: string;
}

const componentClassName = className<ComponentProps>('component-class', () => ({
  // if prop value is truthy, 'booleanProp' will be used as modifier
  booleanProp: true,
  // if prop value is truthy then the value will be used
  stringProp: USE_VALUE,
  // if nullableProp not null, use 'custom' as modifier
  // if a non-string truthy value is returned, 'customModifier' will be used
  customModifier: props => (props.nullableProp ? 'custom' : null),
}));

const Component: FunctionComponent<ComponentProps> = props => {
  const className = componentClassName(props);
  return (
    <div className={className.block('inline-modifier')}>
      <div
        className={className.compose(
          className.element('child'),
          className.extra('utility-class'),
        )}
      />
      <div className={className.element('element')} />
      <div className={className.element('another', 'element-modifier')} />
    </div>
  );
};
```

will output following when rendered

```typescript jsx
<Component booleanProp={true} nullableProp={null} stringProp={'something'} />
```

```html
<div
  class="component-class component-class--boolean-prop component-class--something"
>
  <div class="component-class__child utility-class"></div>
  <div class="component-class__element"></div>
  <div
    class="component-class__another component-class__another--element-modifier"
  ></div>
</div>
```
