import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../App'

const mockFirestore = require('./helpers/mockFirestore')

jest.mock('./configs/firebase', () => {
  return {}
})

jest.mock('./configs/firestore', () => {
  return mockFirestore
})

test('App should render', () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
})
