const dbConnect = require('../services/dbConnect');

const Parcel = function (data) {
    this.reference_number = data.reference_number; 
    this.sender_name = data.sender_name;
    this.sender_address = data.sender_address;
    this.sender_contact = data.sender_contact;
    this.receiver_name = data.receiver_name;
    this.receiver_address = data.receiver_address;
    this.receiver_contact = data.receiver_contact;
    this.status = data.status;
    this.created_on = new Date;
    this.updated_on = new Date;
}


Parcel.addParcel = (data, result) => {
    dbConnect.query('INSERT INTO parcels SET ?', data, (err, res) => {
        if (err)
            result(err, null)
        else {
            result(null, res)
        }
    });
}

Parcel.getParcelByReferenceNumber = function (referenceNo, result) {

    sql.select('*').where(`p.reference_number = '${referenceNo}'`)
   
    sql.get('parcels p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Parcel.getParcelById = function (id, result) {

  const select = [
    'p.id as parcel_id',
    'p.reference_number',
    'p.sender_name',
    'p.sender_address',
    'p.sender_contact',
    'p.receiver_name',
    'p.receiver_address',
    'p.receiver_contact',
    'p.status',
    'sd.id as shipping_details_id',
    'sd.branch_pickup',
    'sd.branch_processed',
    'sd.date_shipped',
    'sd.date_received',
    'sd.type'
  ]

  sql.select(select)
    .join('shipping_details sd', 'p.id = sd.parcel_id', 'left')
    .where(`p.id = '${id}'`)
 
  sql.get('parcels p', (err, res) => {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

Parcel.getParcels = function (undefined, result) {

    const select = [
      'p.id as parcel_id',
      'p.reference_number',
      'p.sender_name',
      'p.sender_address',
      'p.sender_contact',
      'p.receiver_name',
      'p.receiver_address',
      'p.receiver_contact',
      'p.status',
      'sd.id as shipping_details_id',
      'sd.branch_pickup',
      'sd.branch_processed',
      'sd.date_shipped',
      'sd.date_received',
      'sd.type'
    ]

    sql.select(select)
      .join('shipping_details sd', 'p.id = sd.parcel_id', 'left')
   
    sql.get('parcels p', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Parcel.deleteByReferenceNumber = function (referenceNo, result) {
  var where = {
    reference_number: referenceNo,
  };
  sql.delete("parcels", where, (err1, res1) => {
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

Parcel.deleteById = function (id, result) {
  var where = {
    id: id,
  };
  sql.delete("parcels", where, (err1, res1) => {
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

module.exports = Parcel;
