const connection = require('./connection');

const salesModel = {
  async getSales() {
    const sql = `SELECT saleP.sale_id as saleId, s.date, saleP.product_id as productId,
    saleP.quantity FROM StoreManager.sales_products as saleP
    INNER JOIN StoreManager.sales as s 
    ON saleP.sale_id = s.id
    ORDER BY saleP.sale_id, saleP.product_id`;
    const [rows] = await connection.execute(sql);
    return rows;
  },
  async findById(id) {
    const sql = `SELECT s.date, saleP.product_id as productId,
    saleP.quantity FROM StoreManager.sales_products as saleP
    INNER JOIN StoreManager.sales as s 
    ON saleP.sale_id = s.id and saleP.sale_id = ?
    ORDER BY saleP.sale_id, saleP.product_id`;
    const [rows] = await connection.execute(sql, [id]);
    return rows;
  },
  async delete(id) {
    const sql = 'DELETE FROM StoreManager.sales WHERE id = ?';
    const [rows] = await connection.execute(sql, [id]);
    return rows;
  },
  async add(data) {
    await connection.execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
    const [[newIdSale]] = await connection.execute('SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1');
    const sql = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    const newSale = {
      id: newIdSale.id,
      itemsSold: data,
    };
    data.forEach((item) => connection.execute(sql, [newIdSale.id, item.productId, item.quantity]));
    return newSale;
  },
  async exists(id) {
    const sql = `SELECT 1 from StoreManager.sales WHERE id = ?`;
    const [[rows]] = await connection.execute(sql, [id]);
    return !!rows;
  }
};

module.exports = salesModel;