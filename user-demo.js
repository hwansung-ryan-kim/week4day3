const express = require('express')
const app = express()
app.listen(7777)

let db = new Map() 
var id = 1 // 하나의 객체를 primary key 용도로 사용 

//로그인
app.use(express.json()) // http 외 모듈 'json'
app.post('/login', (req, res) => { 
})


//회원가입  (id, pwd, name 값이 들어간다)
app.post('/join', (req, res) => { 

    if (req.body.name !== undefined) { 
        db.set(id++, req.body)
        res.status(201).json({
            message : `${db.get(id-1).name}님 환영해요!`
        }) 

    } else {
        res.status(400).json({
            message : `입력이 제대로 되지 않았어요! `
        })
    }
})


//회원 개별 조회
// '/users/:id'가 겹친다 => routing! 즉 길이 나뉜다!
app.route('/users/:id')     // url이 들어오면 앞으로 이렇게 작동해줘~ 
    .get ((req, res) => { 
        let {id} = req.params
        id = parseInt(id) 
    
        const user = db.get(id)
        if (user == undefined) { 
            res.status(404).json({
                message : `찾으시는 회원 정보가 없네요ㅠ.ㅠ`
            })
        } else { 
            res.status(200).json ({ 
                userID : user.userId,
                name : user.name 
            })
        }
    })

    //회원 삭제 
    .delete((req, res) => { 
    let {id} = req.params
    id = parseInt(id) 

    const user = db.get(id)
    if (user == undefined) { 
        res.status(404).json({
            message : `찾으시는 회원 정보가 없네요ㅠ.ㅠ`
        })
    } else { 
        db.delete(id)
        res.status(200).json ({ 
            message : `${user.name}님, 다음에 또 뵙겠습니다!`
        })
    }
})

