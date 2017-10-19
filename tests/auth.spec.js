const faker = require('faker');
const request = require('supertest')('http://localhost:4444');

let newUser;
let loggedUser;
describe('DataPoint', () => {
  beforeAll(() => {
    newUser = {
      name: faker.name.findName(),
      email: `test${faker.internet.email().toLocaleLowerCase()}`,
      password: faker.internet.password(),
    };
  });

  it('Should throw an error when an empty object is passing', async () => {
    const response = await request.post('/register');
    expect(response.status).toEqual(422);
    expect(response.body.error).toEqual('You must provide an name, email and password');
  });

  it('Should create an user', async () => {
    const response = await request.post('/register').send(newUser);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual(newUser.email);
    expect(response.body._id).not.toBeUndefined();
  });

  it('Should reject the same email', async () => {
    const response = await request.post('/register').send(newUser);
    expect(response.status).toEqual(422);
    expect(response.body.error).toEqual('Email is in use');
    expect(response.body._id).toBeUndefined();
  });

  it('Should login with a valid user', async () => {
    const response = await request.post('/login').send(newUser);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual(newUser.email);
    expect(response.body.token).not.toBeUndefined();
    loggedUser = response.body;
  });

  it('Should fail when login with a invalid user email', async () => {
    newUser.email = 'a@w.c';
    const response = await request.post('/login').send(newUser);
    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Unauthorized');
    expect(response.body.token).toBeUndefined();
  });

  it('Should fail when login with a invalid user password', async () => {
    newUser.password = 'a@w.c';
    const response = await request.post('/login').send(newUser);
    expect(response.status).toEqual(401);
    expect(response.text).toEqual('Unauthorized');
    expect(response.body.token).toBeUndefined();
  });

  it('Should grant access with a valid token', async () => {
    const response = await request.get('/secure').set('authorization', `${loggedUser.token}`);
    expect(response.status).toEqual(200);
  });

  it('Should deny access with a invalid token', async () => {
    const response = await request.get('/secure');
    expect(response.status).toEqual(401);
  });
});
