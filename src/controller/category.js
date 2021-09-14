const category = require("../models/category");
const slugify = require("slugify");

exports.create_category = (req, res) => {
  const name = req.body.name;
  const slug = slugify(req.body.name);

  const obj = {
    name,
    slug
  };

  if (req.body.parentId) {
    obj.parentId = req.body.parentId;
  }

  const _category = new category(obj);

  _category.save((error, data) => {
    if (error)
      return res.status(400).json({
        error
      });

    if (data) return res.status(400).json({ data });
  });
};

exports.get_category = (req, res) => {
  category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(201).json({ categoryList });
    }
  });
};

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cat => cat.parentId == undefined);
  } else {
    category = categories.filter(cat => cat.parentId == parentId);
  }

  for (let cate of category) {
    let data = {
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      childern: createCategories(categories, cate._id)
    };

    categoryList.push(data);
  }

  return categoryList;
}
