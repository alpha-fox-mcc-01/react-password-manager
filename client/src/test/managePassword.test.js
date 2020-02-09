import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Dashboard from '../views/Dashboard';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { setQuery } from '../store/actions';

jest.mock('../config/firebase.js', () => {});
jest.mock('../config/firestore.js', () => {
  return {
    collection: collectionName => {
      return {
        where: (field, operator, userId) => {
          return {
            get: () => {
              return new Promise((resolve, reject) => {
                resolve([
                  {
                    id: 1,
                    data: () => {
                      return {
                        url: 'google.com',
                        login: 'ivan',
                        password: '12345',
                        user: 'IQxNY3v6mbZw08RK47sM',
                        createdAt: '',
                        updatedAt: '',
                      };
                    },
                  },
                  {
                    id: 2,
                    data: () => {
                      return {
                        url: 'facebook.com',
                        login: 'gabenroma',
                        password: '12345',
                        user: 'IQxNY3v6mbZw08RK47sM',
                        createdAt: '',
                        updatedAt: '',
                      };
                    },
                  },
                ]);
              });
            },
          };
        },
        add: newPassword => {
          return new Promise((resolve, reject) => {
            resolve({
              get: () => {
                return new Promise((resolve, reject) => {
                  resolve({
                    id: 3,
                    data: () => {
                      return {
                        id: 3,
                        url: newPassword.url,
                        login: newPassword.login,
                        password: newPassword.password,
                        createdAt: '',
                        updatedAt: '',
                        user: 'IQxNY3v6mbZw08RK47sM',
                      };
                    },
                  });
                });
              },
            });
          });
        },
        doc: id => {
          return {
            set: editedPassword => {
              return new Promise((resolve, reject) => {
                resolve();
              });
            },
            get: () => {
              return new Promise((resolve, reject) => {
                resolve({
                  id: 3,
                  data: () => {
                    return {
                      id: 3,
                      url: 'hacktiv8.com',
                      login: 'archerser',
                      password: '$A8er',
                      createdAt: '',
                      updatedAt: '',
                      user: 'IQxNY3v6mbZw08RK47sM',
                    };
                  },
                });
              });
            },
            delete: () => {
              return new Promise((resolve, reject) => {
                resolve();
              });
            },
          };
        },
      };
    },
  };
});

test('Manage Password', async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <Dashboard />
      </Router>
    </Provider>
  );
  expect(app.getByTestId('dashboard-navbar')).toHaveTextContent(/Oasis/);
  expect(app.getByTestId('add-button')).toBeInTheDocument();

  await waitForElement(() => app.getAllByRole('listitem'));

  // app.debug();
  const url = {
    target: {
      value: 'slack.com',
    },
  };

  const login = {
    target: {
      value: 'saberser',
    },
  };

  const password = {
    target: {
      value: '',
    },
  };

  fireEvent.click(app.getByTestId('add-button'));
  expect(app.getByTestId('modal-addPassword')).toBeInTheDocument();
  fireEvent.change(app.queryByTestId('url-input'), url);
  fireEvent.change(app.queryByTestId('login-input'), login);
  fireEvent.change(app.queryByTestId('password-input'), password);

  expect(
    app
      .queryByTestId('minimum-length')
      .firstChild.classList.contains('fa-times')
  ).toBe(true);
  expect(
    app.queryByTestId('upper-case').firstChild.classList.contains('fa-times')
  ).toBe(true);
  expect(
    app.queryByTestId('lower-case').firstChild.classList.contains('fa-times')
  ).toBe(true);
  expect(
    app.queryByTestId('number').firstChild.classList.contains('fa-times')
  ).toBe(true);
  expect(
    app
      .queryByTestId('special-character')
      .firstChild.classList.contains('fa-times')
  ).toBe(true);

  const minimumLength = {
    target: {
      value: 'saber',
    },
  };
  fireEvent.change(app.queryByTestId('password-input'), minimumLength);
  expect(
    app
      .queryByTestId('minimum-length')
      .firstChild.classList.contains('fa-check')
  ).toBe(true);

  const upperCase = {
    target: {
      value: 'Saber',
    },
  };
  fireEvent.change(app.queryByTestId('password-input'), upperCase);
  expect(
    app.queryByTestId('upper-case').firstChild.classList.contains('fa-check')
  ).toBe(true);

  const lowerCase = {
    target: {
      value: 'Saber',
    },
  };
  fireEvent.change(app.queryByTestId('password-input'), lowerCase);
  expect(
    app.queryByTestId('lower-case').firstChild.classList.contains('fa-check')
  ).toBe(true);

  const number = {
    target: {
      value: '5aber',
    },
  };
  fireEvent.change(app.queryByTestId('password-input'), number);
  expect(
    app.queryByTestId('number').firstChild.classList.contains('fa-check')
  ).toBe(true);

  const specialCharacter = {
    target: {
      value: '$aber',
    },
  };
  fireEvent.change(app.queryByTestId('password-input'), specialCharacter);
  expect(
    app
      .queryByTestId('special-character')
      .firstChild.classList.contains('fa-check')
  ).toBe(true);

  const fullStrength = {
    target: {
      value: '$A8er',
    },
  };

  fireEvent.change(app.queryByTestId('password-input'), fullStrength);
  // app.debug();

  expect(
    app
      .queryByTestId('minimum-length')
      .firstChild.classList.contains('fa-check')
  ).toBe(true);
  expect(
    app.queryByTestId('upper-case').firstChild.classList.contains('fa-check')
  ).toBe(true);
  expect(
    app.queryByTestId('lower-case').firstChild.classList.contains('fa-check')
  ).toBe(true);
  expect(
    app.queryByTestId('number').firstChild.classList.contains('fa-check')
  ).toBe(true);
  expect(
    app
      .queryByTestId('special-character')
      .firstChild.classList.contains('fa-check')
  ).toBe(true);

  // End Password Widget

  // ============================
  // Add Password
  // fireEvent.submit(app.queryByTestId('new-password-form'));
  fireEvent.click(app.queryByTestId('add-password-btn'));
  await waitForElement(() => app.getAllByRole('listitem'));
  expect(app.queryByTestId('password-list').children.length).toBe(3);
  expect(app.queryByText('saberser')).toBeInTheDocument();
  // app.debug();

  // ============================
  // Edit Password
  fireEvent.click(app.getAllByTestId('edit-button')[0]);
  expect(app.queryByText(/Edit Password/)).toBeInTheDocument();
  expect(app.queryByText(/URL/)).toBeInTheDocument();
  expect(app.queryByText(/Login/)).toBeInTheDocument();
  expect(app.queryByText('Password')).toBeInTheDocument();
  // app.debug();

  const editLogin = {
    target: {
      value: 'archerser',
    },
  };

  const editUrl = {
    target: {
      value: 'hacktiv8.com',
    },
  };
  fireEvent.change(app.queryByTestId('login-input-edit'), editLogin);
  fireEvent.change(app.queryByTestId('url-input-edit'), editUrl);
  fireEvent.submit(app.queryByTestId('edit-form'));
  await waitForElement(() => app.getAllByRole('listitem'));
  // app.debug();
  expect(app.queryByText('archerser')).toBeInTheDocument();
  expect(app.queryByText('hacktiv8.com')).toBeInTheDocument();

  fireEvent.click(app.getAllByTestId('delete-button')[2]);
  expect(app.queryByText(/Delete Password/)).toBeInTheDocument();
  // app.debug();
  fireEvent.click(app.queryByTestId('delete-password-btn'));
  await waitForElement(() => app.getAllByRole('listitem'));
  expect(app.queryByTestId('password-list').children.length).toBe(2);
  expect(app.queryByText('archerser')).not.toBeInTheDocument();
  expect(app.queryByText('hacktiv8.com')).not.toBeInTheDocument();
  // app.debug();

  const searchQuery = {
    target: {
      value: 'iv',
    },
  };
  fireEvent.change(app.queryByTestId('search-input'), searchQuery);
  // app.debug();
  expect(app.queryByText(/ivan/)).toBeInTheDocument();
  expect(app.queryByText(/google/)).toBeInTheDocument();
  expect(app.queryByText(/facebook/)).not.toBeInTheDocument();
  expect(app.queryByText(/gabenroma/)).not.toBeInTheDocument();
  searchQuery.target.value = '';
  fireEvent.change(app.queryByTestId('search-input'), searchQuery);
  // app.debug();
  expect(app.queryByText(/ivan/)).toBeInTheDocument();
  expect(app.queryByText(/google/)).toBeInTheDocument();
  expect(app.queryByText(/facebook/)).toBeInTheDocument();
  expect(app.queryByText(/gabenroma/)).toBeInTheDocument();
});
