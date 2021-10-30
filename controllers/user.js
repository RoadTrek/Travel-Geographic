import User from '../models/user.js';
import user from '../models/user';

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