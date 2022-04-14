
const Shipping = require('../model/shipping_details.model')
const { msg } = require('../helper/msg')
const Common = require('../model/common.model');

module.exports.addShippingDetails = (req, res) => {
    let formData = req.body;
    let requestData = {
        "parcel_id": "required",
        "branch_pickup": "required",
        "branch_processed": "required",
        "date_shipped": "required",
        "type": "type",
        "status": "required"
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
                parcel_id: formData.parcel_id,
                branch_pickup: formData.branch_pickup,
                branch_processed: formData.branch_processed,
                date_shipped: formData.date_shipped,
                date_received: null,
                type: formData.type,
                status: formData.status
            };

            Shipping.addShippingDetails(data, (err1, res1) => {
                if (err1) {
                    return res.status(200).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                }else {
                    return 'success'
                }
            })
        }
    })
}

module.exports.getShippingDetails = function(req, res) {
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

module.exports.getShippingDetailsByParcelId = function(req, res) {
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

module.exports.updateShippingDetailsByParcelId = function (req, res) {
    let formData = req.body;
    let parcel_id = formData.parcel_id
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
            let where = { id: parcel_id }
            Common.updateRecord('shipping_details', postData, where, (err, data) => {
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

module.exports.deleteByParcelId = function (req, res) {
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