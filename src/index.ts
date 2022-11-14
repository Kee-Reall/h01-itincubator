import app from "./app"
const port = process.env.PORT ?? 4000

app.listen(port, (): void => console.info(`Server has been started on ${port}`))