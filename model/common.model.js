'use strict';
require('dotenv').config();
var Common = {};
var moment = require('moment');

Common.updateRecord = function (table, data, where, result) {
    if (data) {
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        data.updated_on = currentTime;
    }
    sql.update(table, data, where, (err, res) => {
        if (err)
            result(err, null);
        else {
            if (res.affectedRows > 0) {
                result(null, res);
            } else
                result(true, null);
        }
    });
}

module.exports = Common;
