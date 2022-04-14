
const Product = require('../model/products.model')
const { msg } = require('../helper/msg')
const Common = require('../model/common.model');

module.exports.addProduct = (req, res) => {
    let formData = req.body;
    let requestData = {
        "name": "required",
        "shipping_fee": "required",
        "type": "required",
        "size": "required"
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
                name: formData.name,
                shipping_fee: formData.shipping_fee,
                type: formData.type,
                size: formData.size
            };
            Product.addProduct(data, (err1, res1) => {
                if (err1) {
                    res.status(200).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                } else {
                    res.status(200).json({ "status": true, "message": msg("MSG024") });
                }
            })
        }
    })
}

module.exports.getProducts = function(req, res) {
    Product.getProducts(undefined, (err2, result) => {
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

module.exports.getProductById = function(req, res) {
    let formData = req.body;
    let loginSchema = {
        "id": "required",
    };
    var validateData = new node_validator(formData, loginSchema);
    validateData.check().then((matched) => {
        if (!matched) {
            res.status(200).json({
                "status": false,
                "message": msg('MSG001'),
                "error": validateData.errors
            });
        } else {
            let id = formData.id
            Product.getProductById(id, (err2, result) => {
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

module.exports.updateProduct = function (req, res) {
    let formData = req.body;
    let product_id = formData.product_id
    let requestData = {
        "name": "required",
        "shipping_fee": "required",
        "type": "required",
        "size": "required"
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
            var postData = {
                name: formData.name,
                shipping_fee: formData.shipping_fee,
                type: formData.type,
                size: formData.size,
                updated_on: new Date
            }
            let where = { id: product_id }
            Common.updateRecord('products', postData, where, (err, data) => {
                if (err) {
                    res.status(200).json({
                        "status": false,
                        "message": msg('MSG002'),
                        "error": err
                    });
                }
                else {
                    res.json({ "status": true, "message": msg('MSG012'), data: {} });
                }
            });
        }
    })
}

module.exports.deleteProductById = function (req, res) {
    let data = req.body;
    let Schema = {
      "product_id": "required"
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
          Product.deleteById(data.product_id, (err1, res1) => {
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
                message: "Product Item deleted Successfully",
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