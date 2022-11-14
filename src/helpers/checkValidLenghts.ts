import e from "express";
import { ErrorMessage } from "../models/errorMessage.model";
import { lengthLimits } from "./lengthLimits";
import { message } from './message'

interface K extends Object {
    author: string,
    title: string
    avaliableResolutions? : string[] | null
}

export function getTitleAndAuthorError(body: K):ErrorMessage[]{
    const errorsMessages: ErrorMessage[] = []
    if(!body.hasOwnProperty('title')){ 
        errorsMessages.push(new ErrorMessage(message.reqiredMore,"title"))
    } else {
        if(typeof body.title !== 'string' ) errorsMessages.push(new ErrorMessage(message.incorrectType,"title"))
        else {
            if(body.title.length > lengthLimits.maxTitle || body.title.length < lengthLimits.minTitle) errorsMessages.push(new ErrorMessage(message.lengthInvalid,"title"))
        }
    }
    if(!body.hasOwnProperty('author')) {
        errorsMessages.push(new ErrorMessage(message.reqiredMore,"author"))
    } else {
        if(typeof body.title !== 'string' ) errorsMessages.push(new ErrorMessage(message.incorrectType,'author'))
        else {
            if(body.title.length > lengthLimits.maxAuthor || body.title.length < lengthLimits.minAuthor) errorsMessages.push(new ErrorMessage(message.lengthInvalid,"author"))
        }
    }
    return errorsMessages
}