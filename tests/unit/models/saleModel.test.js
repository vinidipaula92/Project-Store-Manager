const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesModel = require('../../../models/salesModels');
const connection = require('../../../models/connection');
const sales = require('../mocks/sales.mock.js');

chai.use(chaiAsPromised);

describe('#salesModel', () => {
  const mockSales = sales;
  beforeEach(() => {
    sinon.restore();
  });
  describe('#getSales', () => {
    it('Deve retornar um array se o connection.execute devolver um array', async () => {
      sinon.stub(connection, 'execute').resolves([mockSales]);
      const result = await salesModel.getSales();
      chai.expect(result).to.be.an('array');
    });
  });
  describe('#findById', () => {
    it('Deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([mockSales[0]]);
      const result = await salesModel.findById(1);
      chai.expect(result).to.be.an('object');
    });
  });
  // describe('#create', () => {
  //   it('deve retornar o id inserido caso dê sucesso', async () => {
  //     sinon.stub(connection, 'query').rejects([{ insertId: 1 }]);
  //     chai.expect(salesModel.create({})).to.eventually.equal(1);
  //   });
  //   it('deve reotrnar o id inserido caso dê sucesso', async () => {
  //     sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
  //     chai.expect(salesModel.create({})).to.eventually.equal(1);
  //   });
  // })
  describe('#delete', () => {
    it('deve retornar true se o connection.execute retornar true', async () => {
      sinon.stub(connection, 'execute').resolves([true]);
      const result = await salesModel.delete(1);
      chai.expect(result).to.be.true;
    });
  });
  // describe('#update', () => {
  //   it('deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
  //     sinon.stub(connection, 'execute').resolves([mockSales[0]]);
  //     const result = await salesModel.update(1, []);
  //     chai.expect(result).to.be.an('array');
  //   });
  // });
});
