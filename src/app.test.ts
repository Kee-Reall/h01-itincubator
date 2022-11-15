import request from "supertest";
import app from "./app";
import {generateRandomString} from "./helpers/generateRandomString";
import { isIsoDate } from "./helpers/isIsoDate";
import {StoreVideoModel, UpdateVideoModel} from "./models/video.model";
import {httpStatus} from "./helpers/httpStatus";

const videoURL = '/hometask_01/api/videos'

it('getAll',async ()=>{
const res = await request(app)
    .get(videoURL)
    
    expect(res.body).toEqual(expect.any(Array))
})

it('get one',async() => {
    const res = await request(app).get(videoURL + '/200')
    expect(res.status).toBe(200)
    expect(+res.body.id).toEqual(expect.any(Number))
    expect(res.body.title).toEqual(expect.any(String))
    expect(isIsoDate(res.body.createdAt)).toBe(true)

})

it('crate incorrect',async () => {
    const res1 = await request(app).post(videoURL).send({title:null,author:generateRandomString(4)})
    expect(res1.status).toBe(httpStatus.badRequest)
    expect(res1.body.errorMessages).toEqual(expect.any(Array))
})

it('crate incorrect',async () => {
    const res1 = await request(app).post(videoURL).send({title:NaN,author:undefined,availableResolutions:{length:undefined}})
    expect(res1.status).toBe(httpStatus.badRequest)
    expect(res1.body.errorMessages).toEqual(expect.any(Array))
})

it('crate incorrect',async () => {
    const res1 = await request(app).post(videoURL).send({title:"NaN",author:"undefined",availableResolutions:{length:NaN}})
    expect(res1.status).toBe(httpStatus.badRequest)
    expect(res1.body.errorMessages[0].message).toEqual(expect.any(String))
    expect(res1.body.errorMessages[0].field).toEqual("availableResolutions")
})

it('crate incorrect',async () => {
    const res1 = await request(app).post(videoURL).send({title:"NaN",author:"undefined",availableResolutions:['length','NaN']})
    expect(res1.status).toBe(httpStatus.badRequest)
    expect(res1.body.errorMessages[0].message).toEqual(expect.any(String))
    expect(res1.body.errorMessages[0].field).toEqual("availableResolutions")
})

it('crate correct',async () => {
    const res1 = await request(app).post(videoURL).send({title:"NaN",author:"undefined",availableResolutions:['P144','P720',"P1080"]})
    expect(res1.status).toBe(httpStatus.created)
    expect(res1.body).toEqual(expect.any(Object))
})

it('crate incorrect',async () => {
    const res1 = await request(app).post(videoURL).send({title:"NaN",author:"undefined",availableResolutions:['']})
    expect(res1.status).toBe(httpStatus.badRequest)
    expect(res1.body.errorMessages[0].message).toEqual(expect.any(String))
    expect(res1.body.errorMessages[0].field).toEqual("availableResolutions")
})

it('create than update',async () => {
    const res1 = await request(app).post(videoURL).send({title:"NaN",author:"undefined",availableResolutions:['P144']})
    expect(res1.status).toBe(httpStatus.created)
    expect(res1.body).toEqual(expect.any(Object))
    expect(+res1.body.id).toEqual(1)
    const res2 = await request(app).put(`${videoURL}/${res1.body.id}`).send({
        title:"change",
        author:"change",
        availableResolutions:['P144','P1080'],
        canBeDownloaded: true,
        minAgeRestriction: null,
        publicationDate: "2022-11-15T07:34:06.683Z"
    })

    expect(res2.status).toEqual(httpStatus.noContent)
})

// it('put invaliv with minAgeREstricton',async ()=> {
//
//     const res1 = await request(app).post(videoURL).send({
//         title: "NaN",
//         author: "undefined",
//         availableResolutions: ['P144']
//     })
//     expect(res1.status).toBe(httpStatus.created)
//     expect(res1.body).toEqual(expect.any(Object))
//     expect(+res1.body.id).toEqual(1)
//     const res2 = await request(app).put(`${videoURL}/${res1.body.id}`).send({
//         title: "change",
//         author: "change",
//         availableResolutions: ['P144', 'P1080'],
//         canBeDownloaded: true,
//         minAgeRestriction: 17,
//         publicationDate: "2022-11-15T07:34:06.683Z"
//     })
//
//     expect(res2.status).toEqual(httpStatus.noContent)
// })