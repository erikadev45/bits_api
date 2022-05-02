const User = require("../model/user.model")
const { msg } = require("../helper/msg")

module.exports.registerUser = (req, res) => {
	const newUser = new User(req.body)
    
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		return res.status(400).send({ error: true, message: msg("MSG001") })
	}

	User.findByEmail(req.body.email, async (err1, user1) => {
		if (err1) {
			return res.status(500).send({ error: true, message: msg("MSG002") })
		}

		if (user1.length === 0) {
			User.create(newUser, (err, user) => {
				if (err) {
					console.log("err User create", err)
					return res.status(500).send({
						error: true,
						message: msg("MSG002"),
					})
				}

				return res.json({
					success: true,
					message: msg("MSG004"),
					data: user,
				})
			})
		} else {
			return res.status(400).send({ error: true, message: msg("MSG009") })
		}
	})
}

module.exports.login = function (req, res) {
    let loginData = req.body;
    let loginSchema = {
        email: 'required',
        password: 'required'
    };
    var validateData = new node_validator(loginData, loginSchema);
    validateData.check().then((matched) => {
        if (!matched) {
            res.status(200).json({
                "status": false,
                "message": msg('MSG001'),
                "error": validateData.errors
            });
        } else {
            User.validateLogin(loginData, (err, result) => {
                if (err) {
                    return res.status(500).json({ "status": false, "message": msg('MSG002'), "error": true });
                } 

                if (result !== null) {
                    return res.json({
                        success: true,
                        message: msg("MSG005"),
                        data:  { "user": result },
                    })
                } else {
                    return res.status(400).json({ "status": false, "message": msg('MSG008'), "error": true });
                }
            });
        }
    });
}

module.exports.forgotPassword = (req, res) => {
    const { email, password } = req.body

     // Verify request
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({error: true, message: msg('MSG001')});
    }

    User.findByEmail(email, async (err1, user1) => {
        if (err1) {
            res.status(500).send({error: true, message: msg('MSG002')});
            throw err1;
        }
    
        if (user1.length > 0) {

            User.getUserPassword(password, (err3, user3) => {
                if (err3) {
                    res.status(500).send({error: true, message: msg('MSG002')});
                    throw err3;
                } else {
                    if (user3.length === 0) {
                        User.updatePassword(req.body, (err2, user2) => {
                            if (err2) {
                                res.status(500).send({error: true, message: msg('MSG002')});
                                throw err2;
                            } else {
                                res.status(200).send({
                                    message: msg('MSG018'),
                                    success: true,
                                })
                            }
                        })
                    } else {
                        res.status(400).send({error: true, message: 'Please try another password'});
                    }
                }
            })
        } else {
            return res.status(400).send({error: true, message: msg('MSG023')});
        }
    })
}