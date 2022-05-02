const dbConnect = require('../services/dbConnect');

const Branch = function (data) {
    this.name = data.name;
    this.address = data.address;
    this.municipality = data.municipality;
    this.zipcode = data.zipcode;
    this.contact_number = data.contact_number;
    this.schedule = data.schedule;
    this.status = data.status;
    this.created_on = new Date;
    this.updated_on = new Date;
}

Branch.addBranch = (data, result) => {
    dbConnect.query('INSERT INTO branches SET ?', data, (err, res) => {
        if (err)
            result(err, null)
        else {
            result(null, res)
        }
    });
}


Branch.getBranchById = function (id, result) {

    sql.select('*').where(`b.id = '${id}'`)
   
    sql.get('branches b', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Branch.getBranches = function (undefined, result) {

    sql.select('*')
   
    sql.get('branches b', (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    })
}

Branch.deleteById = function (id, result) {
  var where = {
    id: id,
  };
  sql.delete("branches", where, (err1, res1) => {
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

module.exports = Branch;
