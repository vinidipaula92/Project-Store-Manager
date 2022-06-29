const sinon = require('sinon');
const {expect} = require('chai');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');

describe('#productModel', () => { 
  beforeEach(() => {
    sinon.restore();
  })
  describe('#getProducts()', () => { 
    it('Espera que retorne um objeto com os produtos', async () => {
      sinon.stub(connection, 'execute').resolves();
    })
  })
})