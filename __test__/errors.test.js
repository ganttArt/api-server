'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mockRequest = supertest(server);

describe('Test API Error Handling', () => {
  it('should respond with a 404 on a bad route', async () => {
    return mockRequest.get('/badroute').then(data => {
      expect(data.status).toBe(404);
    });
  });

  it('should respond with a 404 on a bad method', async () => {
    const response = await mockRequest.put('/family');
    expect(response.status).toBe(404);
  });
});