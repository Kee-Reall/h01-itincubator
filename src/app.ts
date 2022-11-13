import  express  from "express"
import {rootRouter} from "./routes/root.route";

const app = express()
const bodyParser = express.json()
app.use(bodyParser)

app.use('/hometask_01/api/videos',rootRouter)

export default app