import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const key = process.env.key;

export const loginUser = (req, res, err) => {
    const enteredDetails = {
        email: req.body.email,
        password: req.body.password,
    };
    user.findOne(
        { email: enteredDetails.email },
        async function (err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    bcrypt.compare(
                        enteredDetails.password,
                        foundUser.password,
                        function (err, result) {
                            if (result === true) {
                                if (foundUser.email === "tg.official.1001@gmail.com") {
                                    const token = jwt.sign({ _id: foundUser._id, type: 1 }, key);
                                    req.session.value = token;
                                    res.status(200).json(foundUser);
                                } else {
                                    const token = jwt.sign({ _id: foundUser._id, type: 2 }, key);
                                    req.session.value = token;
                                    res.status(200).json(foundUser);
                                }
                            } else {
                                res.status(201).json({ msg: "Enter correct password" });
                            }
                        }
                    );
                } else {
                    res.status(201).json({ msg: "email id does not exist" });
                }
            }
        }
    );
}

export const logoutUser = (req, res, err) => {
    req.session.value = "NA";
    req.session.destroy();
    console.log("Cookie deleted");
    res.status(200).json("logout successfully");
}

export const signupUser = (req, res, err) => {
    user.findOne({ email: req.body.email }, async function (err, currentUser) {
        if (err) {
            console.log(err);
        }
        if (currentUser) {
            res.status(201).json({ msg: "This Email has already been registered." });
        }
        if (!currentUser) {
            if (req.body.password === "") {
                res.status(201).json({ msg: "Enter a valid password." });
            }
            await bcrypt.hash(
                req.body.password,
                10,
                async function (err, hashedPassword) {
                    if (err) {
                        console.log(err);
                    }
                    const newUser = new user({
                        name: req.body.name,
                        password: hashedPassword,
                        contactNumber: req.body.contactNumber,
                        email: req.body.email,
                    });
                    await newUser.save();
                }
            );
            res.status(200).json(req.body);
        }
    });
}
