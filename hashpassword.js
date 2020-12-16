const bcrypt = require('bcrypt-nodejs');


bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash("hspcb@123", salt, null, function (err, hash) {
        if (err) return next(err);
        console.log(hash)
    });
});
