import expedition from "../models/expedition.js";

export const uploadExpedition = (req,res,err) => {
    const url = req.body.imageUrl[0];
    const name = req.body.name;
    const desc=req.body.desc;
    console.log(req.body);
    const newExpedition = new expedition({
      name: name,
      description: desc,
      basePrice: req.body.basePrice,
      imageUrl: url,
      customItems: req.body.customItems,
      registeredUsers: [],
      reviews: []
    });
    newExpedition.save();
}

export const getExpedition = (req,res,err) => {
  expedition.find({}, {}, function (err, data) {
    res.status(200).json({ image: data });
  });
}