
const addResult = () => {
  return   {
    url: "google",
    username: "vania",
    password: "1111",
    userId: "111",
    createdAt: "111",
    updatedAt: "1111"
  }
  
};

const data = () => {
  return {
    url: "bla.com",
    username: "asd",
    password: "1111",
    userId: "111",
    createdAt: "111",
    updatedAt: "1111"
  };
};
const get = () => {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: "123",
        data
      }
    ]);
  });
};

const getForAdd = () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: addResult
    });
  });
};
const add = () =>
  new Promise((resolve, reject) => {
    resolve({
      id: "1",
      get: getForAdd
    });
  });

const destroy = () => {
  new Promise((resolve, reject) => {
    resolve({});
  });
};
const doc = id => ({
  delete: destroy
});

const where = (fieldName, operator, value) => ({
  get
});

export default {
  collection: collectionName => ({
    add,
    where,
    doc
  })
};
