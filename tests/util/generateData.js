const faker = require("faker");

const generateUser = () => ({
  name: faker.name.findName(),
  email: `test${faker.internet.email().toLocaleLowerCase()}`,
  password: faker.internet.password()
});

module.exports = { generateUser };
