import {Request} from 'express'
import {CreateVideoModel, UpdateVideoModel} from './video.model'

export interface GetAllVideoRequest extends Request {
    
}

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
    body: CreateVideoModel
}

export interface UpdateVideoRequest extends Request {
    query: {
        id: string
    }
    body: UpdateVideoModel
}

