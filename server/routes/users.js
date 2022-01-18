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
router.post('/login', (req, res) => {
    db.query('SELECT * FROM userSession', (err, result) => {
        if (err) { return console.log(err) }
        // res.send(result)
        const { userName, userPassword } = req.body
        // make sure user gave all needed info
        if (!userName || !userPassword) {
            return res.send({ err: "Missing some info" })
        }
        // find the specific user form database
        const user = result.find(user => user.userName == userName && user.userPassword == userPassword)
        if (!user) {
            return res.send({ err: "Wrong username or password info" })
        }
        // save the details in the session array
        req.session.userName = user.userName
        // req.session.role = user.role
        res.send({ msg: "Login Secces", user: req.session.userName, use: user })
    })
});
router.delete('/logout', onlyLoggedUsers, (req, res) => {
    if (!req.session.userName) {
        return res.send({ err: "you are not logged" })
    }
    req.session.destroy()
    res.send({ msg: "bye bye! it was nice to see you again" })
})
router.post('/register', (req, res) => {
    const { userFullName, userName, userPassword, userProfilePic, userPhoneNum } = req.body
    db.query('SELECT * FROM userSession', (err, result) => {
        if (result.some(u => u.userName == userName)) {
            return res.send({ err: "Username already taken"})
        }
        db.query(
            `INSERT INTO userSession(userFullName, userName, userPassword, userProfilePic, userPhoneNum, userJoinDate) VALUES(?,?,?,?,?,?)`,
            [userFullName, userName, userPassword, userProfilePic, userPhoneNum, date],
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({ msg: "User as been created" })
                }
            }
        );
    })
});
router.get('/userSession', onlyLoggedUsers, (req, res) => {
    db.query("SELECT * FROM userSession", async (err, result) => {
        // res.send(req.session.user)
        const sessionUser = await result.find(u => u.userName == req.session.userName)
        if (err) {
            console.log(err)
        } else {
            res.send(sessionUser)
        }
    })
})
router.get('/:profileName', onlyLoggedUsers, (req, res) => {
    const { profileName } = req.params
    db.query("SELECT * FROM userSession", async (err, result) => {
        // res.send(req.session.user)
        const userProfile = await result.find(u => u.userName == profileName)
        if (err) {
            console.log(err)
        } else {
            res.send(userProfile)
        }
    })
})


module.exports = router