const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productService = require('../../../services/productService');
const products = require('../mocks/products.mock.js');
const productController = require('../../../controllers/productController');

chai.use(chaiAsPromised);

describe('#productService', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('create', () => {
    it('ao mandar um objeto com name vazio', async () => {
      const req = {};
      const res = {};
      req.body = {};

      const result = await productController.create(req, res);
      chai.expect(result).to.be.eql({ "message": '"name" is required' });


    });
    it('ao mandar um req.body inválido', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub()
      req.body = { name: '' };

      chai.expect(productController.create(req, res)).to.be.rejectedWith('Product not found')
    });
  });
  describe('listProducts', () => {
    it('se o service devolver um array deve chamar o res.status com 200 e o res.json com o array', async () => {
      sinon.stub(productService, 'listProducts').resolves(products);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productController.listProducts(req, res);

      chai.expect(res.status.calledWith(200)).to.be.true;
      chai.expect(res.json.calledWith(products)).to.be.true;
    })
  })
});