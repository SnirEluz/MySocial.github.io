const router = require('express').Router()
const mysql = require('mysql');
const { onlyLoggedUsers } = require('../helpers/onlyMembers');

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const today = new Date();
const calcDate = today.getFullYear() + ' ' + (month[today.getMonth()]) + ' ' + today.getDate();
const date = calcDate.split(' ').reverse().join(' ')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Aznir11rins',
    database: 'dataUsers',
});

router.get('/', onlyLoggedUsers, (req, res) => {
    db.query("SELECT * FROM userPosts", async (err, result) => {
        if (err) {
        } else {
            res.send(result)
        }
    })
})

router.post('/creatPost', onlyLoggedUsers, (req, res) => {
    const {
        postId,
        userName,
        userFullName,
        userProfilePic,
        // postDate,
        postBody,
        postImg,
        postLikes,
        postLikesBy,
        postComments
    } = req.body
    db.query(
        'INSERT INTO userPosts (postId, userName, userFullName, userProfilePic, postDate, postBody, postImg, postLikes, postLikesBy, postComments) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [postId, userName, userFullName, userProfilePic, date, postBody, postImg, postLikes, postLikesBy, postComments],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(console.log("insert"))
            }
        }
    );
});

router.put('/likePost/:type', onlyLoggedUsers, (req, res) => {
    const { postId } = req.query
    const { type } = req.params
    if (type == "like") {
        db.query('UPDATE userPosts SET postLikes = postLikes + 1 WHERE postId = ?', [postId],
            async (err, result) => {
                if (err) { res.send({ msg: err }) } else { res.send({ msg: postId }) }
            })
    } else if (type == 'unLike') {
        db.query('UPDATE userPosts SET postLikes = postLikes - 1 WHERE postId = ?', [postId],
            async (err, result) => {
                if (err) { res.send({ msg: err }) } else { res.send({ msg: postId }) }
            })
    }
})

module.exports = router
