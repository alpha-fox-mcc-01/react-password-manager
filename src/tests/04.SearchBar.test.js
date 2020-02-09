import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Provider } from 'react-redux'
import store from '../store'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../App'
import { act } from 'react-dom/test-utils'

jest.mock('../configs/firebase', () => {
  return {}
})

jest.mock('../configs/firestore', () => {
  const mockFirestore = require('./helpers/mockFirestore')
  return mockFirestore
})
console.error = jest.fn()

test('search result should appear', () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
  waitForElement(() => {
    return app.queryByText('TEST 01')
  }).then(() => {
    const searchKeywordFound = {
      target: {
        value: 'TEST 0',
      },
    }
    const searchKeywordNotFound = {
      target: {
        value: 'TEST 99',
      },
    }

    fireEvent.change(app.queryByTestId('searchBar'), searchKeywordFound)
    expect(app.queryByTestId('searchResult').children.length).toBe(2)

    fireEvent.change(app.queryByTestId('searchBar'), searchKeywordNotFound)
    expect(app.queryByTestId('searchResult').children.length).toBe(0)
  })
})

test('user should be redirected when clicking on the search result', () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
  waitForElement(() => {
    return app.queryByText('TEST 01')
  })
    .then(() => {
      const searchKeywordFound = {
        target: {
          value: 'TEST 0',
        },
      }

      // user input, and then clicking
      fireEvent.change(app.queryByTestId('searchBar'), searchKeywordFound)
      expect(app.queryByTestId('resultName1')).toHaveTextContent(/TEST 01/i)
      fireEvent.click(app.queryByTestId('resultLink1'))
      return waitForElement(() => {
        app.findByText(/edit/i)
      })
    })
    .then(() => {
      expect(app.queryByTestId('inputLabel')).toHaveValue('TEST 01')
    })
    .catch(console.log)
})
