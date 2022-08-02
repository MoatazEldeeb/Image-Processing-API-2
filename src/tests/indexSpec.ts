import supertest = require('supertest');
import app from '../index';
import { editPicture, processImage } from '../utils/imageResizing';
import { promises as fsPromises } from 'fs';

const request = supertest(app);
describe('Testing endpoint', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('response with error if filename is not in full folder', async () => {
    const response = await request.get(
      '/api/images?filename=alaska&width=200&height=200'
    );
    console.log(response.text);
    expect(response.text).toBe(
      'Error: Input filename not found or width and/or height is not numbers!'
    );
  });

  it('response with error if width and/or height are not numbers', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=a'
    );
    console.log(response.text);
    expect(response.text).toBe(
      'Error: Input filename not found or width and/or height is not numbers!'
    );
  });

  it('testing image processing function without sending requests', async () => {
    expect(async () => {
      await processImage('fjord', 280, 123);
    }).not.toThrow();
  });
});
