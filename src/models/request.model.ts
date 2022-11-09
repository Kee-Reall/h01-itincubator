import {Request} from 'express'
import {iCreateVideoModel, iUpdateVideoModel} from './video.model'

export interface GetOneVideoRequest extends Request {
    query: {
        id: string
    }
}

export interface DeleteVideoRequest extends Request {
    query: {
        id: string
    }
}

export interface CreateVideoRequest extends Request {
    body: iCreateVideoModel
}

export interface UpdateVideoRequest extends Request {
    query: {
        id: string
    }
    body: iUpdateVideoModel
}

