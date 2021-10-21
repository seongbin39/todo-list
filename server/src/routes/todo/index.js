const express = require('express')
const TodoRouter = express.Router()
const Todo = require("../../models/Todo")

TodoRouter.post('/', (req, res) => {
    console.log(`name: ${req.body.name}`)
    Todo.findOne({ name: req.body.name, done: false}, async(err, todo) => {
        if(err) throw err;
        if(!todo){
            const newTodo = new Todo(req.body);
            await newTodo.save().then( () => {
                console.log('saved done !')
                res.json({ status:201, msg: 'new todo created in db !', newTodo})
            })
        }else{ // 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우
            const msg = 'this todo already exists in db !';
            console.log(msg)
            res.json({ status:204, msg})        
        }
    })
})

TodoRouter.get('/', async(req, res) => {
    const todos = await Todo.find()
    res.json({ status:200, todos})
})

TodoRouter.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({ status:200, todo})
    })
})

TodoRouter.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, todo) => {
        if(err) throw err;
        res.json({ status: 204, msg: `todo ${req.params.id} updated in db !`, todo})
    })
})

TodoRouter.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({ status:204, msg: `todo ${req.params.id} deleted in db !`})
    })
})

module.exports = TodoRouter

// TodoRouter.route('/').get( (req, res) => {
//     res.send('all todo list')
// })

// TodoRouter.get('/:id', (req, res) => {
//     res.send(`todo ${req.params.id}`)
// })

// TodoRouter.post('/', (req, res) => {
//     res.send(`todo ${req.body.name} created`)
// })

// TodoRouter.put('/:id', (req, res) => {
//     // 데이터베이스 접속 후 id 값으로 모델 조회하고 변경함.
//     res.send(`todo ${req.params.id} updated`)
// })

// TodoRouter.delete('/:id', (req, res) => {
//     res.send(`todo ${req.params.id} removed`)
// })