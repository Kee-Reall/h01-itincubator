import bodyParser from "body-parser"
import  express  from "express"

const app = express()
const bp = express.json()
app.use(bp)

const db: any = [
    {name:"Evlampy", age: 26},
    {name:"Jane", age:324}
]

//app.use(bodyParser)

app.get('/',async (req,res) => {
    console.info("HEllo from get")
    res.status(200).json(db)
})

app.post('/', async (req,res) => {
    console.log("INSIDE POST HANDLER")
    try {
        console.log(req.body)
        res.sendStatus(204)
    } catch(e) {
        res.status(400).json(JSON.stringify({no:"nononono"}))
    }
})

export default app