function get() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: 1,
        data: () => {
          return {
            name: 'TEST 01',
            fields: {
              password: 'revealedtestingpassword01',
              type: 'email',
              value: 'testingemail@mail.com',
            },
            notes: 'for testing purpose only',
            owner: 'tester',
            url: 'testing.com',
          }
        },
      },
      {
        id: 2,
        data: () => {
          return {
            name: 'TEST 02',
            fields: {
              password: 'testingpassword',
              type: 'email',
              value: 'testingemail@mail.com',
            },
            notes: 'for testing purpose only',
            owner: 'tester',
            url: 'testing.com',
          }
        },
      },
    ])
  })
}

function add(password) {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}

function doc(passwordId) {
  return {
    delete: () => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    update: () => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    get: () => {
      return new Promise((resolve, reject) => {
        resolve({
          id: 1,
          data: () => {
            return {
              name: 'TEST 01',
              fields: {
                password: 'revealedtestingpassword01',
                type: 'email',
                value: 'testingemail@mail.com',
              },
              notes: 'for testing purpose only',
              owner: 'tester',
              url: 'testing.com',
            }
          },
        })
      })
    },
  }
}

export default {
  collection: (name) => ({
    get,
    add,
    doc,
  }),
}
