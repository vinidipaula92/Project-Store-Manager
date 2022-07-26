const connection = require('./connection');

const productModel = {
  async getProducts() {
    const sql = 'SELECT * FROM StoreManager.products';
    const [rows] = await connection.execute(sql);
    return rows;
  },
  async findById(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id';
    const [rows] = await connection.execute(sql, [id]);
    return rows;
  },
  async create(product) {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const insertId = await connection.execute(sql, [product]);
    return insertId;
  },
  async delete(id) {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?';
    const [rows] = await connection.execute(sql, [id]);
    return rows;
  },
  async update(id, product) {
    const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    const rows = await connection.execute(sql, [product, id]);
    return rows;
  },
  async search(q) {
    const sql = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const [rows] = await connection.query(sql, [`%${q}%`]);
    return rows;
  },
  async listsId() {
    const sql = 'SELECT id FROM StoreManager.products';
    const [items] = await connection.execute(sql);
    return items;
  },
};

module.exports = productModel;