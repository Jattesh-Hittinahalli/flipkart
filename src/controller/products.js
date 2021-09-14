const slugify = require("slugify");
const products = require("../models/products");

exports.createproduct = (req, res) => {
  if (!req.files) {
    res.status(500);
  }
  const details = req.files;

  let productImage = [];
  let reviews = [];

  // if(req.files.length > 0)
  // {
  //     productImage = req.files.map(file =>{
  //         return {img : file.filename}
  //     });
  // }

  for (let i of details) {
    const data = i.filename;
    productImage.push({ img: data });
  }

  const { name, price, quantity, description, category, review } = req.body;
  const createdby = req.User._id;
  console.log(createdby);
  reviews.push({ review: review });
  const slug = slugify(name);
  const _products = new products({
    name,
    price,
    quantity,
    description,
    category,
    review: reviews,
    slug,
    createdby,
    productImage
  });

  _products.save((error, data) => {
    if (data) {
      return res.status(200).json({
        data
      });
    } else {
      return res.status(400).json({
        error
      });
    }
  });
};

// // const salman =  cart.find(
//         { user : req.User._id},
//         { cartitem : { $elemMatch : { product : Product } } }
//       ).exec().then((data)=>{
//          return res.json({data});
//       })
