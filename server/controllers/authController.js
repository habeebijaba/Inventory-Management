const User = require('../models/user.js')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


const signUp = async (req, res) => {

    try {
        let { username, email, password } = req.body

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json("User already exists!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        res.status(200).json("User has been Created")
    } catch (error) {
        res.status(500).json(err)
    }
}


const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("No user exists with entered email.");
        }
        if (!user.isAuthorised) {
            return res.status(403).json('Please wait for your account verification.')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Password is incorrect.");
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.password = undefined;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(user)
    } catch (error) {
        res.status(500).json(error);
    }

};

const logout = (req, res) => {

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has benn logged Out.")
}

const getAuthRequests = async (req, res) => {
    try {
        const requests = await User.find({ isAuthorised: false })
        res.status(200).json(requests)

    } catch (error) {
        res.status(500).json(error)
    }
}

const aproveRequests = async (req, res) => {
    try {
        const userId = req.params.id

        await User.findByIdAndUpdate(userId, { isAuthorised: true })

        const requests = await User.find({ isAuthorised: false })
        res.status(200).json(requests)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    signUp,
    login,
    logout,
    getAuthRequests,
    aproveRequests
}


