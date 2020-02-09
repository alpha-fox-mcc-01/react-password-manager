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

test('On Launch, App should render properly', async () => {
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
  expect(app.queryByText('Dashboard')).toBeInTheDocument()
  expect(app.queryByTestId('navigationbar')).toBeInTheDocument()
  expect(app.queryByTestId('fab')).toBeInTheDocument()
})

test('On Launch, App should fetch from database', async () => {
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
  expect(app.queryByTestId('passwordList').children.length).toBe(2)
  expect(app.queryByText('TEST 01')).toBeInTheDocument()
})

test('Password should be revealed when user click on the lock button', async () => {
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
  expect(app.queryByTestId('passwordList').children.length).toBe(2)
  expect(app.queryByText('TEST 01')).toBeInTheDocument()

  // reveal password
  fireEvent.click(app.queryByTestId('revealButton1'))
  expect(app.queryByText('revealedtestingpassword01')).toBeInTheDocument()

  // conceal password
  fireEvent.click(app.queryByTestId('concealButton1'))
  expect(app.queryByText('revealedtestingpassword01')).not.toBeInTheDocument()
})

test('User should be redirected to edit page when clicking on the Password card label', async () => {
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
    expect(app.findAllByText(/Edit/i)).toBeInTheDocument()
  })
})
