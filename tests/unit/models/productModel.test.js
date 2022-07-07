const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const products = require('../mocks/products.mock.js');

chai.use(chaiAsPromised);


describe('#productModel', () => {
  const mockProduct = products;
  beforeEach(() => {
    sinon.restore();
  })
  describe('#getProducts', () => {
    it('Deve retornar um array se o connection.execute devolver um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct]);
      const result = await productModel.getProducts();
      chai.expect(result).to.be.an('array');
    });
  });
  describe('#findById', () => {
    it('Deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct[0]]);
      const result = await productModel.findById(1);
      chai.expect(result).to.be.an('object');
    });
  });
  describe('#create', () => {
    it('deve retornar o id inserido caso dê sucesso', async () => {
      sinon.stub(connection, 'query').rejects([{ insertId: 1 }]);
      chai.expect(productModel.create({})).to.eventually.equal(1);
    });
    it('deve reotrnar o id inserido caso dê sucesso', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      chai.expect(productModel.create({})).to.eventually.equal(1);
    });
  })
  describe('#delete', () => {
    it('deve retornar true se o connection.execute retornar true', async () => {
      sinon.stub(connection, 'execute').resolves([true]);
      const result = await productModel.delete(1);
      chai.expect(result).to.be.true;
    });
  });
  describe('#update', () => {
    it('deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct[0]]);
      const result = await productModel.update(1, []);
      chai.expect(result).to.be.an('array');
    });
  });
  describe('#search', () => {
    it('deve retornar um array se o connection.execute retornar um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct]);
      const result = await productModel.search('teste');
      chai.expect(result).to.be.an('array');
    });
  });
  describe('#listsId', () => {
    it('deve retornar um array se o connection.execute retornar um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct]);
      const result = await productModel.listsId();
      chai.expect(result).to.be.an('array');
    });
  });
});