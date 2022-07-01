const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productService = require('../../../services/productService');
const connection = require('../../../models/connection');
const products = require('../mocks/products.mock.js');
const productModel = require('../../../models/productModel');

chai.use(chaiAsPromised);

describe('#productService', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('#listProducts, findById and create', () => {
    const mockProduct = products;
    it('Ao mandar um id válido', async () => {
      sinon.stub(productModel, 'getProducts').resolves([mockProduct]);
      return chai.expect(productService.listProducts()).to.eventually.be.an('array');
    });
  });
  describe('#create', () => {
    const mockProduct = products;
    it('Ao mandar um objeto inválido retorna valor null', () => {
      sinon.stub(productModel, 'create').resolves(null);
      return chai.expect(productService.create(mockProduct)).to.eventually.be.equal(null);
    });
    it('AO mandar um dado válido deve salvar no banco', async () => {
      sinon.stub(productModel, 'create').resolves(1);
      const result = await productService.create({ name: "Martelo de Thor" });
      return chai.expect(result).to.be.equal(1);
    });
  });
  describe('#findById', () => {
    const mockProduct = products;
    it('ao mandar um id errado retorna valor null', () => {
      sinon.stub(productModel, 'findById').resolves(null);
      return chai.expect(productService.findById(1)).to.eventually.be.equal(null);
    })
    it('Ao mandar um objeto válido', async () => {
      sinon.stub(productModel, 'findById').resolves(mockProduct);
      return chai.expect(productService.findById(1)).to.eventually.be.equal(mockProduct);
    });
  })
});