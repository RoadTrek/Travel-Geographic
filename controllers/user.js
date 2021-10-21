import User from '../models/user.js';

export const loginUser = (req, res, err) => {
    console.log("heyy in login")
    console.log(req.body.username);
	res.status(200).json(req.body.username);
}