import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../views/Dashboard';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <Dashboard />
      </Router>
    </Provider>
  );
  expect(app.getByTestId('dashboard-container')).toHaveTextContent(/Dashboard/);
});
