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
  // async create(id) {
  //   const sql = 'INSERT INTO StoreManager.sales (id) VALUES (?)';
  //   const [rows] = await connection.execute(sql, [id]);
  //   return rows;
  // },
  async delete(id) {
    const sql = 'DELETE FROM StoreManager.sales WHERE id = ?';
    const [rows] = await connection.execute(sql, [id]);
    return rows;
  },
  // async update(id, sales) {
  //   const sql = `UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ?
  //   AND product_id = ?`;
  //   const rows = await connection.execute(sql, [sales.quantity, id, sales.productId]);
  // },  
};

module.exports = salesModel;