const User = require("../models/assi");

exports.createBook = (req, res) => {
    console.log(req.file)
    User.findOne({ title: req.body.title }).exec(async (error, user) => {
        if (user)
            return res.status(400).json({
                message: "Book already exist",
            });
        if (!req.file) {
            res.status(500);
        }
        const img = req.file.path;
        // console.log(img)
        const { title, author, gener } = req.body;
        const _user = new User({
            title,
            author,
            gener,
            img
        });

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: error
                });
            }
            if (data) {
                return res.status(201).json({
                    message: "Book created Successfully..!",
                });
            }
        });
    });
};

exports.updateBook = (req, res) => {
    const img = req.file.filename;
    const { title, author, gener } = req.body;
    User.findOne({ _id: req.body._id })
        .exec().then((data) => {
            if (!data) {
                const _user = new User({
                    title,
                    author,
                    gener,
                    img
                });

                _user.save((error, data) => {
                    if (error) {
                        res.status(400).json({
                            message: "Something Went Wrong ...",
                        });
                    } else {
                        res.status(200).json({
                            message: "Product is Successfully Added to Cart255...",
                        });
                    }
                });
            }
            if (data) {
                User
                    .find(
                        { _id: req._id },
                    ).exec().then((data) => {
                        if (data) {
                            var myquery = { _id: req.body._id };

                            var newvalues = { $set: { title: title, author: author, gener: gener, img: img } };
                            User
                                .updateOne(myquery, newvalues).exec((error, data) => {
                                    if (error) {
                                        res.status(400).json({
                                            message: "Something went wrong...",
                                        });
                                    } else {
                                        res.status(200).json({
                                            message: "Book has Updated"

                                        });
                                    }
                                });
                        }
                    })
            }

        })
}

exports.getBook = (req, res) => {
    User.find({}).exec((error, book) => {
        if (error) return res.status(400).json({ error });
        if (book) {
            res.status(200).json({ book });
        }
    });
};

exports.deleteBook = (req, res) => {
    console.log(req.body._id)
    if (req.body._id) {
        User.findOneAndDelete({ _id: req.body._id }).exec((book) => {
            if (book) {
                return res.status(200).json({
                    book
                })
            }
            else {
                return res.status(400).json(
                    {
                        message: "something went wrong"
                    }

                )

            }
        });
    }
};