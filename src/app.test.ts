import request from "supertest";
import app from "./app";
import {generateRandomString} from "./helpers/generateRandomString";
import {StoreVideoModel} from "./models/video.model";


test('test correct test environment',()=>{
 expect(1).toBe(1)
})

it('getAll',async ()=>{
 await request(app)
     .get('/')
     .expect(200,[])
})

test('putNotValid',async ()=>{
 await  request(app)
     .post('/')
     .send({})
     .expect(400,{
      message:"required more data",
      field:['title','author']
     })

    const res = await request(app)
        .post('/')
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
        .post('/')
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
        .post('/')
        .send(post)
    expect(req.status).toBe(201)
    expect(req.body.hasOwnProperty('id')).toBe(true)

    const del = await request(app)
        .delete(`/${req.body.id}`)

    expect(del.status).toBe(204)

    const del2 = await request(app)
        .delete(`/${req.body.id}`)

    expect(del2.status).toBe(404)

    const get = await request(app)
        .get('/')

    expect(get.body).toEqual(expect.any(Array))
})