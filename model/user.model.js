const dbConnect = require('../services/dbConnect');
const { hash, encrypt, decrypt } = require('../helper/helper');

const User = function (user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
    this.mobile_number = user.mobile_number;
    this.user_type = user.user_type;
    this.created_on = new Date;
    this.updated_on = new Date;
}

User.validateLogin = function (loginUser, result) {
    let data = {
        email: loginUser.email,
        password: loginUser.password,
    };
    sql.select(['id', 'first_name', 'last_name', 'email', 'status', 'user_type'])
        .where({ 'email': data.email, 'password': data.password })
        .get('users', (err, res) => {
            if (err) {
                result(err, null);
            } else {
                if (res != null && res.length > 0) {
                    console.log('Success', res)
                    result(null, res[0]);
                } else {
                    console.log('FAiled', err)
                    result(null, null);
                }
            }
        });
}


User.create = function (newUser, result) {
    dbConnect.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) throw err;

        result(null, res.insertId)
    });
}

User.findByEmail = function (email, result) {

    sql.select('*').from('users u').where({ 'u.email': email, 'u.status !=': 3 })
        .get((err, res) => {
            if (err) throw err;

            return result(null, res)
        })
}

User.getUsers = function (result) {
    dbConnect.query('SELECT * FROM users', (err, res) => {
        if (err) throw err;

        result(null, res);
    });
}

User.getUserPassword = (password, result) => {
    sql.select('*').from('users u').where({ 'u.password': password, 'u.status !=': 3 })
        .get((err, res) => {
            if (err) throw err;

            return result(null, res)
        })
}

User.updatePassword = (user, result) => {
    dbConnect.query('UPDATE users SET password=? where email=?', [
        user.password,
        user.email
    ], (err, res) => {
        if (err) throw err;

        result(null, res);
    });
}

module.exports = User;
