import React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import { Provider } from 'react-redux'
import store from './store'


jest.mock('./config/firebase', () => {
  return {}
})

jest.mock('./config/firestore', () => {
  const firestoreMock = require('./helpers/firestoreMock');
  return firestoreMock;
})


test('App should render', () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )

  expect(app.queryByTestId("home-page")).toBeInTheDocument()
});
