var express = require('express')
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOptions = { // CORS 옵션
    origin: 'http://localhost:3000',
    Credentials: true
}

const CONNECT_URL = 'mongodb://localhost:27017/asdf'
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected..."))
.catch(e => console.log('failed to connect mongodb: ${e}'))

app.use(cors(corsOptions)) // CORS 설정
app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // logger 설정

app.use("/api", routes)

app.get('/hello', (req, res) => { // URL 응답 테스트
    res.send('hello world!')
})

app.get('/hello/:id', (req, res) => {
    res.send(req.params.id)
})

app.get('/naver', (req, res) => { // URL 응답 테스트
    res.status(200).send('not found')
})

app.use( (req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
})

app.use( (err, req, res, next) => { // 서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})

app.listen(5000, () => { // 5000 포트로 서버 오픈
    console.log('server is running on port 5000....')
})

// points = [3, 4]
// const app = {}
// app.doubleNums = (points) => {
//     return points.map(p => {
//         return p*p;
//     })
// }

// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(element => {
//         s += element;
//     });
//     return s;
// }

// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]

// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)