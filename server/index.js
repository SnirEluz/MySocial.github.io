const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true  // for standard react client app
}))
app.use(express.json())
app.use(session({
    secret: "theOneAndHolyWord(Blah)",
    name: "session",
    saveUninitialized: true,
    resave: true,
    secure: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.get('/', (req, res)=>{
    res.send({msg:"seccess"})
})
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))

// Running server on localhost 1000
app.listen(1001, () => console.log("Server is running"))