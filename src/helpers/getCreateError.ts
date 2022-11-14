import e from "express";
import { ErrorMessage, fields } from "../models/errorMessage.model";
import { lengthLimits } from "./lengthLimits";
import { message } from './message'

interface K extends Object {
    author: string,
    title: string
    avaliableResolutions? : string[] | null
}

export function getCreateError(body: K):ErrorMessage[] {
    const errorsMessages: ErrorMessage[] = []
    function addErM(message:string,field: fields = ''): void{
        errorsMessages.push(new ErrorMessage(message, field))
    }
    if(!body.hasOwnProperty('title')) {
        addErM(message.reqiredMore,"title")
    } else {
        if(typeof body.title !== 'string' ) addErM(message.incorrectType,"title")
        else {
            if(body.title.length > 40 || body.title.length < 1) {
                addErM(message.lengthInvalid,"title")
            }
        }
    }
    if(!body.hasOwnProperty('author')) {
        addErM(message.reqiredMore,"author")
    } else {
        if(typeof body.author !== 'string' ) addErM(message.incorrectType,'author')
        else {
            if(body.author.length > 20 || body.author.length < 1) {
                console.log('why')
                addErM(message.lengthInvalid,"author")
            }
        }
    }

    if(body.hasOwnProperty('avaliableResolution')) {
        if(body.avaliableResolutions !== null) {
           if(!Array.isArray(body.avaliableResolutions)) { 
                addErM(message.invalidResolution,'availableResolutions')
            }
            else {
                for(let i of body.avaliableResolutions) {
                    // @ts-ignore
                    if(!availableResolutions.includes(i)) {
                        addErM(message.invalidResolution,'availableResolutions')
                        break;
                    }
                }
            }
        }
    }
    return errorsMessages
}