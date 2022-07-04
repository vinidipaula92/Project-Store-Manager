const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesService');
const connection = require('../../../models/connection');
const sales = require('../mocks/products.mock.js');
const salesModel = require('../../../models/salesModels');

chai.use(chaiAsPromised);

describe('#productService', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('#listSales', () => {
    it('Deve retornar um array se o connection.execute devolver um array', async () => {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesService.listSales();
      chai.expect(result).to.be.an('array');
    });
  });
  describe('#findById', () => {
    it('ao mandar um id errado retorna valor null', () => {
      sinon.stub(salesModel, 'findById').resolves(null);
      return chai.expect(salesService.findById(1)).to.eventually.be.equal(null);
    });
    it('Deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([sales[0]]);
      const result = await salesService.findById(1);
      chai.expect(result).to.be.an('object');
    });
  });
  // describe('#create', () => {
  //   it('deve retornar o id inserido caso dê sucesso', async () => {
  //     sinon.stub(connection, 'query').rejects([{ insertId: 1 }]);
  //     chai.expect(salesService.create({})).to.eventually.equal(1);
  //   });
  //   it('deve reotrnar o id inserido caso dê sucesso', async () => {
  //     sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
  //     chai.expect(salesService.create({})).to.eventually.equal(1);
  //   });
  // });
  describe('#delete', () => {
    it('deve retornar true se o connection.execute retornar true', async () => {
      sinon.stub(connection, 'execute').resolves([true]);
      const result = await salesService.delete(1);
      chai.expect(result).to.be.true;
    });
  });
  // describe('#update', () => {
  //   it('deve retornar true se o connection.execute retornar true', async () => {
  //     sinon.stub(connection, 'execute').resolves([true]);
  //     const result = await salesService.update(1);
  //     chai.expect(result).to.be.true;
  //   });
  // });
});