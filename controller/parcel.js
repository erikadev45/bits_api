
const Parcel = require('../model/parcels.model')
const Shipping = require('../model/shipping_details.model')
const ShippingProducts = require('../model/shipping_products.model')
const { msg } = require('../helper/msg')
const Common = require('../model/common.model');
const { generateReferenceNumber } = require('../helper/helper');

module.exports.addParcel = (req, res) => {
    let formData = req.body;
    let requestData = {
        "sender_name": "required",
        "sender_address": "required",
        "sender_contact": "required",
        "receiver_name": "required",
        "receiver_address": "required",
        "receiver_contact": "required",
        "status": "required",
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
                reference_number: generateReferenceNumber(),
                sender_name: formData.sender_name,
                sender_address: formData.sender_address,
                sender_contact: formData.sender_contact,
                receiver_name: formData.receiver_name,
                receiver_address: formData.receiver_address,
                receiver_contact: formData.receiver_contact,
                status: formData.status
            };

            
            Parcel.addParcel(data, (err1, res1) => {
                if (err1) {
                    res.status(200).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                } else {
                    var shipping_data = {
                        parcel_id: res1.insertId ,
                        branch_pickup: formData.branch_pickup,
                        branch_processed: formData.branch_processed,
                        date_shipped: formData.date_shipped,
                        date_received: formData.date_received,
                        type: formData.type,
                        status: formData.status
                    }
                    Shipping.addShippingDetails(shipping_data, (err1, res2) => {
                        if (err1) {
                            res.status(500).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                        }else {
                            if (formData.products?.length > 0) {
                                console.log('Products', formData.products)
                                formData.products.forEach((product, i) => {
                                    var shipping_products_data = {
                                        shipping_details_id : res2.insertId,
                                        product_id : product.id,
                                        total: product.total,
                                        shipping_fee: product.shipping_fee,
                                        quantity: product.quantity
                                    }
                                    ShippingProducts.addShippingProduct(shipping_products_data, (err3, res3) => {
                                        if (err3) {
                                            res.status(500).json({ "status": false, "message": msg('MSG001'), "error": err3 });
                                        } else {
                                            if (i === formData.products.length - 1) {
                                                res.status(200).json({ "status": true, "message": msg("MSG024"), data: res2})
                                            }
                                        }
                                    })
                                });
                            } else {
                                res.status(200).json({ "status": true, "message": msg("MSG024"), data: res2})
                            }
                        }
                    })
                }
            })
        }
    })
}

module.exports.getParcels = function(req, res) {
    Parcel.getParcels(undefined, (err2, result) => {
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

module.exports.getParcelById = function(req, res) {
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
            Parcel.getParcelById(id, (err2, result) => {
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

module.exports.getParcelByReferenceNumber = function(req, res) {
    let formData = req.body;
    let schema = {
        "reference_number": "required",
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
            let referenceNo = formData.reference_number
            Parcel.getParcelByReferenceNumber(referenceNo, (err2, result) => {
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

module.exports.updateParcel = function (req, res) {
    let formData = req.body;
    let parcel_id = formData.parcel_id
    let requestData = {
        "parcel_id": "required",
        "reference_number": "required",
        "sender_name": "required",
        "sender_address": "required",
        "sender_contact": "required",
        "receiver_name": "required",
        "receiver_address": "required",
        "receiver_contact": "required",
        "status": "required",
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
                reference_number: formData.reference_number,
                sender_name: formData.sender_name,
                sender_address: formData.sender_address,
                sender_contact: formData.sender_contact,
                receiver_name: formData.receiver_name,
                receiver_address: formData.receiver_address,
                receiver_contact: formData.receiver_contact,
                status: formData.status,
                updated_on: new Date
            }
            let where = { id: parcel_id }
            Common.updateRecord('parcels', postData, where, (err, data) => {
                if (err) {
                    res.status(200).json({
                        "status": false,
                        "message": msg('MSG002'),
                        "error": err
                    });
                }
                else {
                    var postData = {
                        parcel_id: formData.parcel_id ,
                        branch_pickup: formData.branch_pickup,
                        branch_processed: formData.branch_processed,
                        date_shipped: formData.date_shipped,
                        date_received: formData.date_received,
                        type: formData.type,
                        status: formData.status,
                        updated_on: new Date
                    }
                    let where = { parcel_id: parcel_id }
                    Common.updateRecord('shipping_details', postData, where, (err, data) => {
                        if (err) {
                            res.status(200).json({
                                "status": false,
                                "message": msg('MSG002'),
                                "error": err
                            });
                        }
                        else {

                            if (formData.products?.length > 0) {
                                formData.products.forEach((product, i) => {
                                    if (product.shipping_product_id) {
                                        var shipping_products_data_update = {
                                            total: product.total,
                                            shipping_fee: product.shipping_fee,
                                            quantity: product.quantity
                                        }
                                        let where = { id: product.shipping_product_id }
                                        Common.updateRecord('shipping_products', shipping_products_data_update, where, (err3, res3) => {
                                            if (err3) {
                                                res.status(500).json({ "status": false, "message": msg('MSG001'), "error": err3 });
                                            } else {
                                                if (i === formData.products.length - 1) {
                                                    return res.status(200).json({ "status": true, "message": msg("MSG024"), data: res3 })
                                                }
                                            }
                                        })
                                    } else {
                                        var shipping_products_data_new = {
                                            shipping_details_id : formData.shipping_details_id,
                                            product_id : product.id,
                                            total: product.total,
                                            shipping_fee: product.shipping_fee,
                                            quantity: product.quantity
                                        }
                                        ShippingProducts.addShippingProduct(shipping_products_data_new, (err4, res4) => {
                                            if (err4) {
                                                res.status(500).json({ "status": false, "message": msg('MSG001'), "error": err4 });
                                            } else {
                                                if (i === formData.products.length - 1) {
                                                    res.status(200).json({ "status": true, "message": msg("MSG024"), data: res4})
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            });
        }
    })
}

module.exports.deleteByReferenceNumber = function (req, res) {
    let data = req.body;
    let Schema = {
      "reference_number": "required",
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
          Parcel.deleteByReferenceNumber(data.reference_number, (err1, res1) => {
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
                message: "Parcel Item deleted Successfully",
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


module.exports.deleteParcelById = function (req, res) {
    let data = req.body;
    let Schema = {
      "parcel_id": "required"
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
          Parcel.deleteById(data.parcel_id, (err1, res1) => {
          if (err1) {
            res.status(200).json({
              status: false,
              message: msg("MSG002"),
              error: err1,
            });
          } else {
            if (res1 == "1") {
                Shipping.deleteByParcelId(data.parcel_id, (err1, res2) => {
                    if (err1) {
                        res.status(500).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                    }else {
                        res.status(200).json({
                            status: true,
                            message: "Parcel Item deleted Successfully",
                        });
                    }
                })
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

  module.exports.deleteParcelProductById = function (req, res) {
    let data = req.body;
    let Schema = {
      "shipping_product_id": "required"
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
        ShippingProducts.deleteById(data.shipping_product_id, (err1, res1) => {
          if (err1) {
            res.status(200).json({
              status: false,
              message: msg("MSG002"),
              error: err1,
            });
        } else {
            res.status(200).json({
                status: true,
                message: msg("MSG015"),
            });
        }
        });
      }
    });
  };