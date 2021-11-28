import expedition from "../models/expedition.js";
import reqExp from "../models/requestExp.js";
import requestExp from "../models/requestExp.js";
import expReview from "../models/expReview.js";

export const uploadExpedition = (req, res, err) => {
  const url = req.body.imageUrl[0];
  const name = req.body.name;
  const desc = req.body.desc;
  console.log("hello");
  console.log(req.body);
  const newExpedition = new expedition({
    name: name,
    description: desc,
    basePrice: req.body.basePrice,
    imageUrl: url,
    customItems: req.body.customItems,
    registeredUsers: [],
    endingDate:req.body.endingDate,
    reviews: []
  });
  newExpedition.save();
  res.status(200).json("lessgoo");
}

export const getExpedition = (req, res, err) => {
  expedition.find({}, {}, function (err, data) {
    res.status(200).json(data);
  });
}

export const getIndExp = (req, res, err) => {
  expedition.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json(data);
    }
  })
}

export const uploadExpImage = (req, res, err) => {
  console.log("hello hello");
  console.log(req.body);
  expedition.findByIdAndUpdate(req.body._id, { imageUrl: req.body.imageUrl }, (err, docs) => {
    // console.log(res.data);
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Exp:", docs);
    }

  })
}

export const requestAdminExp = (req, res, err) => {
  const newRequest = new requestExp(req.body);

  newRequest.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
}

export const getPendingRequests = (req, res, err) => {
  requestExp.find({ expId: req.params.id, reqStatus: false }, (err, data) => {
    res.status(200).json(data);
  })
}

export const registerUser = (req, res, err) => {

  console.log(req.body);
  const appId = req.body.approveId;
  expedition.findByIdAndUpdate(req.body.expId, { $push: { registeredUsers: appId } }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  })
}

export const approveRequest = (req, res, err) => {
  console.log(req.params.id);
  reqExp.findOneAndUpdate({ _id: req.params.id }, { reqStatus: true }, (err, request) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json(request);
    }
  })
}

export const declineRequest = (req, res, err) => {
  reqExp.findOneAndDelete({ _id: req.params.id }, (err, request) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json();
    }
  })
}

export const submitReview = (req, res, err) => {
  const newRequest = new expReview(req.body);
  newRequest.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
}

export const showReviews = (req, res, err) => {
  expReview.find({ expId: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json(data);
    }
  })
}

export const isRegistered = (req,res,err) => {
  requestExp.find(req.body, (err,data) => {
    res.status(200).json(data);
  })
}