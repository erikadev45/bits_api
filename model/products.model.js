const dbConnect = require('../services/dbConnect');

const Product = function (data) {
    this.name = data.name; 
    this.shipping_fee = data.shipping_fee;
    this.type = data.type;
    this.size = data.size;
    this.created_on = new Date;
    this.updated_on = new Date;
}


Product.addProduct = (data, result) => {
    dbConnect.query('INSERT INTO products SET ?', data, (err, res) => {
        if (err)
            result(err, null)
        else {
            result(null, res)
        }
    });
}

Product.getProductById = function (id, result) {

    sql.select('*').where(`p.id = '${id}'`)
   
    sql.get('products p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}


Product.getProducts = function (undefined, result) {

    sql.select('*')
   
    sql.get('products p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Product.deleteById = function (id, result) {
  var where = {
    id: id,
  };
  sql.delete("products", where, (err1, res1) => {
    if (err1) {
      result(err1, null);
    } else {
      if (res1.affectedRows > 0) {
        result(null, 1);
      } else {
        result(null, null);
      }
    }
  });
};

module.exports = Product;
