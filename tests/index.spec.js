const request = require('supertest')('http://localhost:4444');

describe('DataPoint', () => {
  it('Should start the app', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual('DataPoint API');
  });
});
