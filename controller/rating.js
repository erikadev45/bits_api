
const Rate = require('../model/rating.model')
const { msg } = require('../helper/msg')

module.exports.addRate = (req, res) => {
    let formData = req.body;
    let requestData = {
        "fullname": "required",
        "address": "required",
        "contact": "required",
        "rate": "required",
        "message": "required"
    };
    var validateData = new node_validator(formData, requestData);
    validateData.check().then((matched) => {
        if (!matched) {
            res.status(200).json({
                "status": false,
                "message": msg('MSG001'),
                "error": validateData.errors
            });
        } else {
            var data = {
                fullname: formData.fullname,
                address: formData.address,
                contact: formData.contact,
                rate: formData.rate,
                message: formData.message
            };
            Rate.addRate(data, (err1, res1) => {
                if (err1) {
                    res.status(200).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                } else {
                    res.status(200).json({ "status": true, "message": msg("MSG012") });
                }
            })
        }
    })
}

module.exports.getRatings = function(req, res) {
    Rate.getRatings(undefined, (err2, result) => {
        if (err2)
            res.status(200).json({
                "status": false,
                "message": msg('MSG002'),
                "error": err2
            });
        else {
            if (result != null && result.length) {
                res.json({
                    "status": true,
                    "message": msg('MSG006'),
                    "data": result
                });
            } else {
                res.json({
                    "status": false,
                    "message": msg('MSG007'),
                    "data": {}
                });
            }
        }
    })
}

module.exports.getRatingById = function(req, res) {
    let formData = req.body;
    let schema = {
        "id": "required",
    };
    var validateData = new node_validator(formData, schema);
    validateData.check().then((matched) => {
        if (!matched) {
            res.status(200).json({
                "status": false,
                "message": msg('MSG001'),
                "error": validateData.errors
            });
        } else {
            let id = formData.id
            Rate.getRateById(id, (err2, result) => {
                if (err2)
                    res.status(200).json({
                        "status": false,
                        "message": msg('MSG002'),
                        "error": err2
                    });
                else {
                    if (result != null && result.length) {
                        res.json({
                            "status": true,
                            "message": msg('MSG006'),
                            "data": result
                        });
                    } else {
                        res.json({
                            "status": false,
                            "message": msg('MSG007'),
                            "data": {}
                        });
                    }
                }
            })
        }
    })
}

module.exports.deleteRatingById = function (req, res) {
    let data = req.body;
    let Schema = {
      "id": "required",
    };
    var validateData = new node_validator(data, Schema);
    validateData.check().then((matched) => {
      if (!matched) {
        res.status(200).json({
          status: false,
          message: msg("MSG001"),
          error: validateData.errors,
        });
      } else {
          Rate.deleteById(data.id, (err1, res1) => {
          if (err1) {
            res.status(200).json({
              status: false,
              message: msg("MSG002"),
              error: err1,
            });
          } else {
            if (res1 == "1") {
              res.status(200).json({
                status: true,
                message: "Rate deleted Successfully",
              });
            } else {
              res.status(200).json({
                status: false,
                message: msg("MSG007"),
              });
            }
          }
        });
      }
    });
  };
