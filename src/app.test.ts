import request from "supertest";
import app from "./app";
import {generateRandomString} from "./helpers/generateRandomString";
import {StoreVideoModel, UpdateVideoModel} from "./models/video.model";

const videoURL = '/hometask_01/api/videos'

it('getAll',async ()=>{
 await request(app)
     .get(videoURL)
     .expect(200)
})

test('putNotValid',async ()=>{
 await  request(app)
     .post(videoURL)
     .send({})
     .expect(400,{
      message:"required more data",
      field:['title','author']
     })

    const res = await request(app)
        .post(videoURL)
        .send({
            title:generateRandomString(8),
            author: generateRandomString(18),
            availableResolutions:`undefined\``
        })
    expect(res.status).toBe(400)
    expect(res.body.message).toEqual(expect.any(String))


})

it('put valid',async ()=>{
    const post = {title:generateRandomString(5),author:generateRandomString(6)}
    const {status, body} = await request(app)
        .post(videoURL)
        .send(post)
    const {id,canBeDownloaded,author,title,minAgeRestriction,createdAt,publicationDate,availableResolutions}: StoreVideoModel = body

    expect(status).toBe(201)
    expect(author).toEqual(expect.any(String))
    expect(title).toEqual(expect.any(String))
    expect(+id).toEqual(expect.any(Number))
    expect(canBeDownloaded).toBe(false)
    expect(minAgeRestriction).toEqual(null)
    expect(availableResolutions).toEqual(null)
    expect(createdAt).toEqual(expect.any(String))
    expect(publicationDate).toEqual(expect.any(String))

})

test('put valid then delete, and then delete not existet' ,async ()=>{
    const post = {title:generateRandomString(5),author:generateRandomString(6)}
    const req = await request(app)
        .post(videoURL)
        .send(post)
    expect(req.status).toBe(201)
    expect(req.body.hasOwnProperty('id')).toBe(true)

    const del = await request(app)
        .delete(`${videoURL}/${req.body.id}`)

    expect(del.status).toBe(204)

    const del2 = await request(app)
        .delete(`${videoURL}/${req.body.id}`)

    expect(del2.status).toBe(404)

    const get = await request(app)
        .get(videoURL)

    expect(get.body).toEqual(expect.any(Array))
})

test('Valid update test' ,async ()=> {
    const number = 13
    const res = await request(app).get(`${videoURL}/${number}`)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(expect.any(Object))
    const {id} = res.body
    expect(+id).toBe(number)

    const [author,title] = [generateRandomString(4),generateRandomString(5)]
    const dat = new Date(Date.now()).toISOString()
    const updateOne: UpdateVideoModel = {
        author,
        title,
        canBeDownloaded: true,
        availableResolutions: ["P720","P360"],
        publicationDate: dat,
        minAgeRestriction: 13,
    }

    await request(app).put(`${videoURL}/${id}`).send(updateOne).expect(204)

    const {body: getOne} = await request(app).get(`${videoURL}/${id}`)

    expect(getOne.author).toBe(author)
    expect(getOne.title).toEqual(expect.any(String))
    expect(+getOne.id).toBe(number)
    expect(getOne.canBeDownloaded).toBe(true)
    expect(getOne.minAgeRestriction).toEqual(13)
    expect(getOne.availableResolutions).toEqual(["P720","P360"])
    expect(getOne.publicationDate).toEqual(expect.any(String))
})

it('update non existed', async ()=>{

    const [author,title] = [generateRandomString(4),generateRandomString(5)]
    const dat = new Date(Date.now()).toISOString()
    const updateOne: UpdateVideoModel = {
        author,
        title,
        canBeDownloaded: true,
        availableResolutions: ["P720","P360"],
        publicationDate: dat,
        minAgeRestriction: 13,
    }
    await request(app).put(`${videoURL}/34524`).send(updateOne).expect(404)
    await request(app).put(`${videoURL}/noexist`).send(updateOne).expect(404)
    await request(app).put(`${videoURL}/NaN`).send(updateOne).expect(404)
})

test("invalid update, not all data", async ()=> {
    const res = await request(app).put(`${videoURL}/4`).send({
        title:'afaf'
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("required more data")
    expect(res.body.field).toEqual(expect.any(Array))
})

test("invalid update, some of data incorrect", async ()=> {
    const [author,title] = [generateRandomString(4),generateRandomString(5)]
    const dat = new Date(Date.now()).toISOString()
    const updateOne = {
        author,
        title,
        canBeDownloaded: true,
        availableResolutions: ["P720","P360"],
        publicationDate: dat,
        minAgeRestriction: 20,
    }

    const updateTwo = {
        author,
        title,
        canBeDownloaded: true,
        availableResolutions: ["P720","P360"],
        publicationDate: 13,
        minAgeRestriction: 10,
    }

    const res = await request(app).put(`${videoURL}/4`).send(updateOne)
    const res2 = await request(app).put(`${videoURL}/24`).send(updateTwo)

    expect(res.status).toEqual(400)
    expect(res2.status).toBe(400)
    expect(res2.body).toEqual({
        "message": "Some fields are not valid",
        "field": [
        "publicationDate"
    ]})
})