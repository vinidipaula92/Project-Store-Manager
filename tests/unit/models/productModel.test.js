const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const products = require('../mocks/products.mock.js');


describe('#productModel', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('#getProducts, findById and create', () => {
    const mockProduct = products;
    it('Deve retornar um array se o connection.execute devolver um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct]);
      const result = await productModel.getProducts();
      expect(result).to.be.an('array');
    });
    it('Deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([mockProduct[0]]);
      const result = await productModel.findById(1);
      expect(result).to.be.an('object');
    });
    it('ao enviar um objeto com o atributo name deve salvar os dados e retornar o id', async () => {
      const expecteId = 1;
      sinon.stub(connection, 'execute').resolves([{ insertId: expecteId }]);
      const id = await productModel.create({ name: 'Martelo de Thor' });
      expect(id).to.be.equal(expecteId);
    })
  });
});