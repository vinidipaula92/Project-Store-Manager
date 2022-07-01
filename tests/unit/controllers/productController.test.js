const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productService = require('../../../services/productService');
const products = require('../mocks/products.mock.js');
const productController = require('../../../controllers/productController');

chai.use(chaiAsPromised);

describe('#productController', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('listProduct', () => {
    it('ao mandar um array com os objetos', async () => {
      const res = {};
      const req = {};

      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(productService, 'listProducts').resolves([products[0]]);
      chai.expect(productController.listProducts(req, res)).to.be.fulfilled;
    });
  });
  describe('findById', () => {
    it('ao mandar um id', async () => {
      const res = {};
      const req = {};

      req.params = { id: 1 };
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(productService, 'findById').resolves([products[0]]);
      chai.expect(productController.findById(req, res)).to.be.fulfilled;
    });
    it('ao mandar um id que não existe', async () => {
      const res = {};
      const req = {};

      req.params = { id: 1 };
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(productService, 'findById').resolves([]);
      chai.expect(productController.findById(req, res)).to.be.fulfilled;
    });
  });
  describe('create', () => {
    it('É chamado a mensagem "name" is required quando o name não for passado', async () => {
      const res = {};
      const req = {};

      req.body = { name: '' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.create(req, res);
      chai.expect(res.status.calledWith(400)).to.be.equal(true);
    });
    it('É chamado a mensagem "name" length must be at least 5 characters long quando o name for menor que 5', async () => {
      const res = {};
      const req = {};

      req.body = { name: 'Batm' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.create(req, res);
      chai.expect(res.status.calledWith(422)).to.be.equal(true);
    });
    it('retorna o produto criado', async () => {
      const res = {};
      const req = {};

      req.body = { name: 'Batman' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.create(req, res);
      chai.expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
  describe('delete', () => {
    it('ao mandar um id', async () => {
      const mock = products;
      const res = {};
      const req = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productService, 'findById').resolves([mock[0]]);
      sinon.stub(productService, 'delete').resolves([mock[0]]);
      chai.expect(productController.delete(req, res)).to.be.fulfilled;
    });
    it('ao mandar um id que não existe', async () => {
      const res = {};
      const req = {};

      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productController.delete(req, res);
      chai.expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });
})