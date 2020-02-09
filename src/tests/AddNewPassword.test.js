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

test('When user clicking FAB, add password form should appear and disapear when clicking close button', async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )

  // test form reveal and close
  fireEvent.click(app.queryByTestId('fab'))
  expect(app.queryByTestId('addForm')).toBeInTheDocument()
  fireEvent.click(app.queryByTestId('closeFormBtn'))
  expect(app.queryByTestId('addForm')).not.toBeInTheDocument()
})

test('After submitting, user should be redirected to dashboard', async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )

  // Opening form
  fireEvent.click(app.queryByTestId('fab'))
  expect(app.queryByTestId('addForm')).toBeInTheDocument()
  // inputting values
  const values = {
    changeLabel: {
      target: {
        value: 'TEST99 NEW PASSWORD',
      },
    },
    changeUrl: {
      target: {
        value: 'newurl.com',
      },
    },
    changeFieldOption: {
      target: {
        value: 'phone',
      },
    },
    changeFieldValue: {
      target: {
        value: '02587912345',
      },
    },
    changePassword: {
      target: {
        value: 'Qq!12345',
      },
    },
  }

  // password widget should not show tics
  expect(app.queryByTestId('checkLowercase')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkUppercase')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkSpChar')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkNumber')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkValidLength')).not.toHaveClass('fas fa-check ml-2')

  // .change() accept 2 parameters: DOM nodes, and event.
  fireEvent.change(app.queryByTestId('inputLabel'), values.changeLabel)
  fireEvent.change(app.queryByTestId('inputUrl'), values.changeUrl)
  fireEvent.change(app.queryByTestId('inputFieldOption'), values.changeFieldOption)
  fireEvent.change(app.queryByTestId('inputFieldValue'), values.changeFieldValue)
  fireEvent.change(app.queryByTestId('inputPassword'), values.changePassword)

  // password widget should show ticks
  expect(app.queryByTestId('checkLowercase')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkUppercase')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkSpChar')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkNumber')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkValidLength')).toHaveClass('fas fa-check ml-2')

  fireEvent.click(app.queryByTestId('btnSubmitAddForm'))
  setTimeout(() => {
    expect(app.queryByTestId('addForm')).not.toBeInTheDocument()
  }, 50)
})

test('Password Widget Ticks should respond properly', async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )

  // Opening form
  fireEvent.click(app.queryByTestId('fab'))
  expect(app.queryByTestId('addForm')).toBeInTheDocument()
  // inputting values
  const changePassword = {
    target: {
      value: 'Qq!12345',
    },
  }

  // password widget should not show tics
  expect(app.queryByTestId('checkLowercase')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkUppercase')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkSpChar')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkNumber')).not.toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkValidLength')).not.toHaveClass('fas fa-check ml-2')

  // .change() accept 2 parameters: DOM nodes, and event.
  fireEvent.change(app.queryByTestId('inputPassword'), changePassword)

  // password widget should show ticks
  expect(app.queryByTestId('checkLowercase')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkUppercase')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkSpChar')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkNumber')).toHaveClass('fas fa-check ml-2')
  expect(app.queryByTestId('checkValidLength')).toHaveClass('fas fa-check ml-2')
})
