const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesService');
const sales = require('../mocks/products.mock.js');
const saleController = require('../../../controllers/salesController');
const saleMock = require('../mocks/salesAdd.mock');
const saleUpdateMock = require('../mocks/salesUpdated.mock');


chai.use(chaiAsPromised);

describe('#productController', () => {
  const mockSale = sales;
  beforeEach(() => {
    sinon.restore();
  });
  describe('listSales', () => {
    it('ao mandar um array com os objetos', async () => {
      const res = {};
      const req = {};

      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'listSales').resolves([mockSale[0]]);
      chai.expect(saleController.listSales(req, res)).to.be.fulfilled;
    });
  });
  describe('findById', () => {
    it('ao mandar um id', async () => {
      const res = {};
      const req = {};

      req.params = { id: 1 };
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'findById').resolves([mockSale[0]]);
      chai.expect(saleController.findById(req, res)).to.be.fulfilled;
    });
    it('ao mandar um id que não existe', async () => {
      const res = {};
      const req = {};

      req.params = { id: 999 };
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'findById').resolves([]);
      chai.expect(saleController.findById(req, res)).to.be.fulfilled;
    });
  });
  describe('#delete', () => {
    it('ao mandar um id', async () => {
      const res = {};
      const req = {};

      req.params = { id: 1 };
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'delete').resolves([mockSale[0]]);
      chai.expect(saleController.delete(req, res)).to.be.fulfilled;
    });
    it('é chamado o status com código 404 quando não encontrar produto', async () => {
      const res = {};
      const req = {};

      req.params = { id: 999 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await saleController.delete(req, res);
      chai.expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });
  describe('#add', () => {
    const mockAddSales = saleMock;
    it('ao mandar um array com os objetos', async () => {
      const res = {};
      const req = {};

      req.body = mockAddSales;
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'add').resolves([mockAddSales[0]]);
      chai.expect(saleController.add(req, res)).to.be.fulfilled;
    });
  });
  describe('#update', () => {
    const mockUpdateSale = saleUpdateMock;
    it('ao mandar um array com os objetos', async () => {
      const res = {};
      const req = {};

      req.params = { id: 1 };
      req.body = mockUpdateSale;
      req.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns(res);

      sinon.stub(salesService, 'update').resolves([mockUpdateSale[0]]);
      chai.expect(saleController.update(req, res)).to.be.fulfilled;
    });
  });
});