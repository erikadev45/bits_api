
const Branch = require('../model/branches.model')
const { msg } = require('../helper/msg')
const Common = require('../model/common.model');

module.exports.addBranch = (req, res) => {
    let formData = req.body;
    let requestData = {
        "name": "required",
        "address": "required",
        "municipality": "required",
        "zipcode": "required",
        "contact_number": "required",
        "schedule": "required",
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
                name: formData.name,
                address: formData.address,
                municipality: formData.municipality,
                zipcode: formData.zipcode,
                contact_number: formData.contact_number,
                schedule: formData.schedule,
                status: formData.status
            };
            Branch.addBranch(data, (err1, res1) => {
                if (err1) {
                    res.status(200).json({ "status": false, "message": msg('MSG001'), "error": err1 });
                } else {
                    res.status(200).json({ "status": true, "message": msg("MSG012") });
                }
            })
        }
    })
}

module.exports.getBranches = function(req, res) {
    Branch.getBranches(undefined, (err2, result) => {
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

module.exports.getBranchById = function(req, res) {
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
            Branch.getBranchById(id, (err2, result) => {
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

module.exports.updateBranch = function (req, res) {
    let formData = req.body;
    let branch_id = formData.branch_id
    let requestData = {
        "name": "required",
        "address": "required",
        "municipality": "required",
        "zipcode": "required",
        "contact_number": "required",
        "schedule": "required",
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
                name: formData.name,
                address: formData.address,
                municipality: formData.municipality,
                zipcode: formData.zipcode,
                contact_number: formData.contact_number,
                schedule: formData.schedule,
                status: formData.status,
                updated_on: new Date
            }
            let where = { id: branch_id }
            Common.updateRecord('branches', postData, where, (err, data) => {
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

module.exports.deleteBranchById = function (req, res) {
    let data = req.body;
    let Schema = {
      "branch_id": "required",
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
          Branch.deleteById(data.branch_id, (err1, res1) => {
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
                message: "Branch deleted Successfully",
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
