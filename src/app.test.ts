import request from "supertest";
import app from "./app";


test('test correct test environment',()=>{
 expect(1).toBe(1)
})

test('getAll',async ()=>{
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