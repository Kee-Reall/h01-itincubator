import app from "./app"
const port = 3000

app.listen(port, (): void => console.info(`Server has been startet on ${port}`))