const express = require('express');
const router = express.Router();


//? Importing Constants Logout Messages
const {
    LOGOUT_SUCCESS_MESSAGE,
    ERROR_MESSAGE
} = require("../../Constants/User/LogoutMessages");


//? Logout Route
router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('userToken');

        res.status(200).json({ message: LOGOUT_SUCCESS_MESSAGE });

    } catch (error) {

        res.status(500).json({ error: ERROR_MESSAGE });
    }
});

module.exports = router;
