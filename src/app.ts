import  express  from "express"
import {rootRouter} from "./routes/root.route";
import {testingRouter} from "./routes/testing.route";

const app = express()
const bodyParser = express.json()
app.use(bodyParser)

app.use('/hometask_01/api/videos',rootRouter)
app.use('/ht_01/api/testing',testingRouter)

export default app