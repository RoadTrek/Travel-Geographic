import gallery from "../models/gallery.js";

export const uploadImage = (req,res,err) => {
    const url = req.body.url.secure_url;
    const name = req.body.name
    console.log(url);
    const newImage = new gallery({
      name: name,
      imageUrl: url
    });
    newImage.save();
}

export const getImage = (req,res,err) => {
  gallery.find({}, {}, function (err, data) {
    res.status(200).json({ image: data });
  });
}