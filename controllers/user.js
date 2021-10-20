import User from '../models/user.js';

export const loginUser = (req, res, err) => {
    console.log("heyy in login")
	res.status(200).json(req.body.username);
}