const request = require('supertest');
const app = require('../index');

describe('Product API', () => {
  let newProductId;

 
  it('POST /products - create a product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      variants: [
        { name: 'Variant 1', sku: 'V1', additionalCost: 10, stockCount: 100 }
      ]
    };

    const response = await request(app).post('/products').send(newProduct);
    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toEqual(newProduct.name);

    
    newProductId = response.body._id;
  });

  
  it('GET /products - success', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

 
  it('GET /products/:id - success', async () => {
    const response = await request(app).get(`/products/${newProductId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body._id).toEqual(newProductId);
  });

  
  it('PUT /products/:id - update a product', async () => {
    const updatedProduct = {
      name: 'Updated Test Product',
      description: 'Updated Description',
      price: 150
    };

    const response = await request(app).put(`/products/${newProductId}`).send(updatedProduct);
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual(updatedProduct.name);
  });

 
  it('DELETE /products/:id - delete a product', async () => {
    const response = await request(app).delete(`/products/${newProductId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Product deleted successfully');
  });
});
