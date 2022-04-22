const dbConnect = require('../services/dbConnect');

const ShippingProducts = function (data) {
    this.shipping_details_id = data.shipping_details_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.shipping_fee = data.shipping_fee;
    this.total = data.total;
    this.created_on = new Date;
    this.updated_on = new Date;
}

ShippingProducts.addShippingProduct = (data, result) => {
    dbConnect.query('INSERT INTO shipping_products SET ?', data, (err, res) => {
        if (err)
            result(err, null)
        else {
            result(null, res)
        }
    });
}

ShippingProducts.getShippingProductsByShippingId = function (shipping_details_id, result) {

    sql.select('*').where(`p.shipping_details_id = '${shipping_details_id}'`)
   
    sql.get('shipping_products p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}


ShippingProducts.getShippingProducts = function (undefined, result) {

    sql.select('*')
   
    sql.get('shipping_products p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

ShippingProducts.deleteByShippingId = function (shipping_details_id, result) {
  var where = {
    shipping_details_id: shipping_details_id,
  };
  sql.delete("shipping_products", where, (err1, res1) => {
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

module.exports = ShippingProducts;
