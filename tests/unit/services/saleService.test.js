const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesService');
const connection = require('../../../models/connection');
const sales = require('../mocks/products.mock.js');
const salesModel = require('../../../models/salesModels');
const salesMock = require('../mocks/sales.mock.js');

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
  describe('#delete', () => {
    it('deve retornar true se o connection.execute retornar true', async () => {
      sinon.stub(connection, 'execute').resolves([true]);
      const result = await salesService.delete(1);
      chai.expect(result).to.be.true;
    });
  });
  describe('#add', () => {
    const mockSales = salesMock;
    it('ao mandar um objeto inválido retorna valor null', () => {
      sinon.stub(salesModel, 'add').resolves(null);
      return chai.expect(salesService.add(mockSales)).to.eventually.be.equal(null);
    });
    it('AO mandar um dado válido deve salvar no banco', async () => {
      sinon.stub(salesModel, 'add').resolves(sales[0]);
      const result = await salesService.add(mockSales);
      chai.expect(result).to.be.an('object');
    });
  });
  describe('#checkIsExists', () => {
    it('ao mandar um id errado retorna valor false', () => {
      sinon.stub(salesModel, 'exists').resolves(false);
      return chai.expect(salesService.checkIsExists(1)).to.eventually.be.false;
    });
    it('ao mandar um id válido retorna valor true', async () => {
      sinon.stub(salesModel, 'exists').resolves(true);
      const result = await salesService.checkIsExists(1);
      chai.expect(result).to.be.true;
    });
  });
  describe('#update', () => {
    const mockSales = salesMock;
    it('ao mandar um objeto inválido retorna valor null', () => {
      sinon.stub(salesModel, 'update').resolves(null);
      return chai.expect(salesService.update(mockSales)).to.eventually.be.equal(null);
    });
    it('ao mandar um objeto válido deve salvar no banco', async () => {
      sinon.stub(salesModel, 'update').resolves(sales[0]);
      const result = await salesService.update(mockSales);
      chai.expect(result).to.be.an('object');
    });
  })
});