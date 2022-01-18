module.exports.onlyLoggedUsers = (req, res, next) => {
    if (req.session.userName) {
        next()
    } else {
        res.send(console.log("sensetive content for logged users only, plesae log in"))
    }
}
