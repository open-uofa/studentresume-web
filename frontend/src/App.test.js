import App from './App';
import React from 'react';
import renderer from 'react-test-renderer'

test("First snapshot test", () => {
  const component = renderer.create(
    <App />
  );

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
})

test("State Testing", () => {

  const tempState = require("./constants/example.json");

  expect(tempState[0]).toBe(App.state);

}) 