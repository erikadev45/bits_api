const dbConnect = require('../services/dbConnect');

const Shipping = function (data) {
    this.parcel_id = data.parcel_id;
    this.branch_pickup = data.branch_pickup;
    this.branch_processed = data.branch_processed;
    this.date_shipped = data.date_shipped;
    this.date_received = data.date_received;
    this.type = data.type;
    this.status = data.status;
    this.created_on = new Date;
    this.updated_on = new Date;
}

Shipping.addShippingDetails = (data, result) => {
    dbConnect.query('INSERT INTO shipping_details SET ?', data, (err, res) => {
        if (err)
            result(err, null)
        else {
            result(null, res)
        }
    });
}

Shipping.getShippingDetailsByParcelId = function (parcel_id, result) {

    sql.select('*').where(`p.parcel_id = '${parcel_id}'`)
   
    sql.get('shipping_details p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}


Shipping.getShippingDetails = function (undefined, result) {

    sql.select('*')
   
    sql.get('shipping_details p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Shipping.deleteByParcelId = function (parcel_id, result) {
  var where = {
    parcel_id: parcel_id,
  };
  sql.delete("shipping_details", where, (err1, res1) => {
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

module.exports = Shipping;
