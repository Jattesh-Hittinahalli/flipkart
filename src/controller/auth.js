const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: firstName + Math.random().toString(36).substring(2),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created Successfully..!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const { hash_password } = user;
      const isPassword = await bcrypt.compare(req.body.password, hash_password);
      if (isPassword && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(201).json({
          message: "Password Not Matched",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  const result = jwtr.destroy(req.token)
  console.log(result)

}
exports.sendotp = (req, res) => {
  var qs = require("querystring");
  var http = require("http");

  var options = {
    "method": "GET",
    "hostname": "2factor.in",
    "port": null,
    "path": "/API/V1/997854b8-0566-11ec-a13b-0200cd936042/SMS/6360456861/AUTOGEN",

    // http://2factor.in/API/V1/{api_key}/SMS/{phone_number}/AUTOGEN
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(qs.stringify({}));
  req.end();

}

exports.verifyotp = (req, res) => {
  var qs = require("querystring");
  var http = require("http");

  var options = {
    "method": "GET",
    "hostname": "2factor.in",
    "port": null,
    "path": "/API/V1/997854b8-0566-11ec-a13b-0200cd936042/SMS/VERIFY/3fd7df7e-884a-4ed8-9077-fc4474dccf44/863233",
    //http://2factor.in/API/V1/{api_key}/SMS/VERIFY/{session_id}/{otp_input}
    "headers": {
      "content-type": "application/x-www-form-urlencoded"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(qs.stringify({}));
  req.end();

}