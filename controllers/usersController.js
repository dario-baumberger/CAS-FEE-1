Users = require('../models/usersModel');

exports.index = function (req, res) {
    Users.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            users
        });
    });
};

exports.new = function (req, res) {
    console.log(req.body)
    let user = new Users();
    user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
    user.lastname = req.body.lastname;
// save the user and check for errors
    user.save(function (err) {
         if (err){
             res.json(err);
         }else{
             res.json({
                 message: 'New user created!',
                 data: user
             });
         }
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Users.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: user
        });
    });
};

exports.update = function (req, res) {
    Users.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.title = req.body.title ? req.body.title : user.title;
        user.content = req.body.content;
        user.created = req.body.created;
        user.due = req.body.due;
// save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: user
            });
        });
    });
};

exports.delete = function (req, res) {
    Users.remove({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};