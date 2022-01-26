import * as React from 'react';
import renderer from 'jest-expo';

import Button  from '../Button';

it(`renders correctly`, () => {
  const test = renderer.create(<Button onPress={}/>).toJSON()

  expect(test).toMatchSnapshot();
});
