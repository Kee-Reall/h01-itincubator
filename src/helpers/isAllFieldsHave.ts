import {UpdateVideoModel} from "../models/video.model";
import {errorMessage} from "../models/errorMessage.model";

export const isAllFieldsHave = (resBody: UpdateVideoModel): [boolean, errorMessage] => {
    const field: string[] = []
    let message: string = ''
    let flag: boolean = true
    const key = `author:title:canBeDownloaded:minAgeRestriction:publicationDate:availableResolutions`.split(':')
    key.forEach(el => {
        if(!resBody.hasOwnProperty(el)) {
            flag = false
            field.push(el)
        }
    })
    if(!flag) message = 'required more data'
    return [flag, {message,field}]
}