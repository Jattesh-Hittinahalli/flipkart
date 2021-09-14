const cart = require("../models/cart");

exports.addtocart = async (req, res) => {
  //const cartitem = req.body.cartitem;

  let cartitem = [];
  const quantity = req.body.quantity;
  const price = req.body.price;
  const product = req.body.product;
  cartitem.push({ quantity, price, product });

  // if (condition) {
  // } else {
  // }

  cart
    .findOne({ user: req.User._id })
    .exec()
    .then((data) => {
      if (!data) {
        const _cart = new cart({
          user,
          cartitem,
        });

        _cart.save((error, data) => {
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
        cart
          .find(
            { user: req.User._id },
            { cartitem: { $elemMatch: { product: product } } }
          )
          .exec()
          .then((data) => {
            filterdata = data[0].cartitem[0];
            if (!filterdata) {
              cart
                .updateOne(
                  { user: req.User._id },
                  { $push: { cartitem: cartitem } }
                )
                .exec()
                .then((data) => {
                  res.status(200).json({
                    message: "Product is Successfully Added to Cart...",
                  });
                });
            } else {
              console.log(data[0].cartitem[0].quantity + quantity);
              const id = data[0]._id;
              const pid = data[0].cartitem[0]._id;
              const updatedQuantity = data[0].cartitem[0].quantity + quantity;
              const query = {
                _id: id,
                "cartitem._id": pid,
              };
              const updateDocument = {
                $set: { "cartitem.$.quantity": updatedQuantity },
              };
              cart.updateOne(query, updateDocument).exec((error, data) => {
                if (error) {
                  res.status(400).json({
                    message: "Something went wrong...",
                  });
                } else {
                  res.status(200).json({
                    message:
                      "Product is already in Cart, We Incresed the Quantity of Product....",
                  });
                }
              });
            }
          });
      }
    });
};
