const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const Product = require('../models/product');

describe('Product Search Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__); 

    await Product.create({
      name: 'Test Product 1',
      description: 'Description 1',
      price: 100,
      variants: [{ name: 'Variant A', sku: 'VA', additionalCost: 10, stockCount: 100 }]
    });

    await Product.create({
      name: 'Another Test Product',
      description: 'Another Description',
      price: 200,
      variants: [{ name: 'Variant B', sku: 'VB', additionalCost: 20, stockCount: 50 }]
    });
  });

  test('It should return products matching the search criteria for the name', async () => {
    const searchQuery = 'Test Product';
    const response = await request(app).get(`/products/search?name=${searchQuery}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.some(product => product.name.includes(searchQuery))).toBe(true);
  });

  test('It should return products matching the search criteria for the description', async () => {
    const searchQuery = 'Description';
    const response = await request(app).get(`/products/search?description=${searchQuery}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.some(product => product.description.includes(searchQuery))).toBe(true);
  });

  test('It should return products matching the search criteria for variant name', async () => {
    const searchQuery = 'Variant A';
    const response = await request(app).get(`/products/search?variantName=${searchQuery}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.some(product => product.variants.some(variant => variant.name === searchQuery))).toBe(true);
  });

  afterAll(async () => {
   
    await Product.deleteMany({});
    await mongoose.connection.close();
  });
});
