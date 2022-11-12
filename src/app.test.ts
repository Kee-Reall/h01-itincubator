import request from "supertest";
import app from "./app";
import {generateRandomString} from "./helpers/generateRandomString";


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
})

it('put valid',async ()=>{
    const post = {title:generateRandomString(5),author:generateRandomString(6)}
    const res = await request(app)
        .post('/')
        .send(post)

    expect(res.status).toBe(201)
    expect(+res.body.id).toEqual(expect.any(Number))

})