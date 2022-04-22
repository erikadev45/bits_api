const dbConnect = require('../services/dbConnect');

const Rate = function (data) {
    this.fullname = data.fullname
    this.address = data.address
    this.contact = data.contact
    this.rate = data.rate
    this.message = data.message
    this.created_on = new Date;
    this.updated_on = new Date;
}

Rate.addRate = (data, result) => {
    dbConnect.query('INSERT INTO ratings SET ?', data, (err, res) => {
        if (err)
            result(err, null)
        else {
            result(null, res)
        }
    });
}


Rate.getRateById = function (id, result) {

    sql.select('*').where(`r.id = '${id}'`)
   
    sql.get('ratings r', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Rate.getRatings = function (undefined, result) {

    sql.select('*')
   
    sql.get('ratings r', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Rate.deleteById = function (id, result) {
  var where = {
    id: id,
  };
  sql.delete("ratings", where, (err1, res1) => {
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

module.exports = Rate;
