const connection = require('./connection');

const productModel = {
  async getProducts() {
    const sql = 'SELECT * FROM products';
    const [rows] = await connection.execute(sql);
    return rows;
  },
  async findById(id) {
    const sql = 'SELECT * FROM products WHERE id = ? ORDER BY id';
    const [[rows]] = await connection.execute(sql, [id]);
    return rows;
  },
  async create(product) {
    const sql = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(sql, [product.name]);
    return insertId;
  },
};

module.exports = productModel;