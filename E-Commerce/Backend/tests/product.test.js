const mongoose = require('mongoose');
const Product = require('../models/product');

describe('Product Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });
  
  });

  it('create & save product successfully', async () => {
    const validProduct = new Product({ name: 'Test Product', description: 'Test Description', price: 100 });
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
  });

 =
  it('insert product successfully, but the field does not defined in schema should be undefined', async () => {
    const productWithInvalidField = new Product({ name: 'Test Product', description: 'Test Description', price: 100, invalidField: '123' });
    const savedProductWithInvalidField = await productWithInvalidField.save();
    expect(savedProductWithInvalidField._id).toBeDefined();
    expect(savedProductWithInvalidField.invalidField).toBeUndefined();
  });

=
  it('create product without required field should failed', async () => {
    const productWithoutRequiredField = new Product({ name: 'Test Product' });
    let err;
    try {
      const savedProductWithoutRequiredField = await productWithoutRequiredField.save();
      error = savedProductWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

