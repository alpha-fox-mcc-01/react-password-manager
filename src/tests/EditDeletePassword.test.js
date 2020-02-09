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

test('Edit Page Should display current data to the form', async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
  await waitForElement(() => {
    return app.queryByText('TEST 01')
  })

  act(async () => {
    fireEvent.click(app.queryByTestId('link1'))
    await waitForElement(() => {
      app.findAllByText(/Edit/i)
    })
    expect(app.queryByTestId('inputLabel')).toHaveValue('TEST 01')
    expect(app.queryByTestId('inputUrl')).toHaveValue('testing.com')
    expect(app.queryByTestId('inputFieldOption')).toHaveValue('email')
    expect(app.queryByTestId('inputFieldValue')).toHaveValue('Ttestingemail@mail.com')
    expect(app.queryByTestId('inputPassword')).toHaveValue('revealedtestingpassword01')
  })
})

test('User should redirected to Dashboard after saving', () => {
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
      fireEvent.click(app.queryByTestId('link1'))
      return waitForElement(() => {
        return app.queryByTestId('inputLabel')
      })
    })
    .then(() => {
      fireEvent.click(app.queryByTestId('btnSaveEdit'))
      setTimeout(() => {
        expect(app.queryAllByText(/reveal/i)).toBeInTheDocument()
      }, 100)
    })
})

test('Delete confirmation should appear before deleting password, and when user confirm, user should be redirected to dashboard', () => {
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
      fireEvent.click(app.queryByTestId('link1'))
      return waitForElement(() => {
        return app.queryByTestId('inputLabel')
      })
    })
    .then(() => {
      expect(app.queryByTestId('confirmDeletion')).not.toBeInTheDocument()
      fireEvent.click(app.queryByTestId('btnDelete'))
      expect(app.queryByTestId('confirmDeletion')).toBeInTheDocument()
      fireEvent.click(app.queryByTestId('linkDeletePasswordConfirmed'))
      expect(app.queryAllByText(/reveal/i)).toBeInTheDocument()
    })
})
