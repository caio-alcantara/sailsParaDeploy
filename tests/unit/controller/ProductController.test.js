const sinon = require('sinon');
const assert = require('assert');
const ProductController = require('../../../api/controllers/ProductController');
const { mockAsync } = require('../../util/index');

// Mock do modelo Product
const Product = {
  create: async () => {},
};

describe('ProductController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      allParams: sinon.stub().returns({ name: 'Produto 1', price: 10, description: 'novo produto' }),
    };

    res = {
      json: sinon.stub().returnsThis(),
      serverError: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Deve criar um novo produto', async () => {
    const newProduct = { name: 'Produto 1', price: 10, description: 'novo produto' };
    const product = { ...newProduct, id: 1 };

    const createStub = mockAsync(Product, 'create', product);

    await ProductController.create(req, res);

    //assert(res.json.calledOnceWith(product));
    assert.strictEqual(createStub.calledOnce, true);
  });

  it('Deve retornar um erro de servidor quando uma exceção é lançada', async () => {
    const error = new Error('Error creating product');
    mockAsync(Product, 'create', Promise.reject(error));

    await ProductController.create(req, res);

    assert(res.serverError.calledOnceWith(error));
  });
});
