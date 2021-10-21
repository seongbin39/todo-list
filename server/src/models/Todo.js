const mongoose = require('mongoose')

// trim : 문자열 양쪽 공백 제거
const todoSchema = mongoose.Schema({ // 스키마 정의
    name: { type: String, require: true, trim: true } ,
    done: { type: Boolean, default: false },
    description: { type: String, require: true, trim: true }
})

const Todo = mongoose.model('Todo', todoSchema) // 스키마로부터 생성된 모델 객체
module.exports = Todo;