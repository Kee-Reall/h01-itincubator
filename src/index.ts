import app from "./app"
const port = 3000

try{
    app.listen(port, (): void => console.info(`Server has been startet on ${port}`)) 
} catch(e) {
    console.log("We got some issue")
}
