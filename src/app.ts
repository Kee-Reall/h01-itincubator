import  express  from "express"
import {rootRouter} from "./routes/root.route";

const app = express()
const bodyParser = express.json()
app.use(bodyParser)

app.use(rootRouter)

export default app