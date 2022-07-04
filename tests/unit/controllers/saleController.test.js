const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const salesService = require('../../../services/salesService');
const sales = require('../mocks/products.mock.js');
const saleController = require('../../../controllers/salesController');

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
    })
  });
  // describe('create', () => {
  //   it('É chamado a mensagem "name" is required quando o name não for passado', async () => {
  //     const res = {};
  //     const req = {};

  //     req.body = { name: '' };
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);

  //     await saleController.create(req, res);
  //     chai.expect(res.status.calledWith(400)).to.be.equal(true);
  //   });
  // })
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
    })
  });
});