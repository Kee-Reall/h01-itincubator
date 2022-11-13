import { Response } from "express";
import * as CustomRequest from "../models/request.model"
import {store} from "../store/store";

class RootController {

    constructor() {}

    async getAll(req: CustomRequest.GetAllVideoRequest, res: Response):Promise<void> {
        res.json(store.state)
    }

    async getOneById(req: CustomRequest.GetOneVideoRequest, res: Response) {
        const found: any = store.find(+req.params.id)
        found === undefined ? res.sendStatus(404) : res.json(found)
    }

    async createVideo(req: CustomRequest.CreateVideoRequest, res: Response) {
        type fieldStr = "title"|"author"|"availableResolutions"
        const field: Array<fieldStr> = []
        if(!req.body.hasOwnProperty('title')) {
            field.push('title')
        }
        if(!req.body.hasOwnProperty('author')) {
            field.push('author')
        }
        if(field.length > 0){
            res.status(400).json({message:"required more data", field})
            return
        }
        // if(req.body.availableResolutions === undefined && req.body.hasOwnProperty('availableResolutions')) {
        //     field.push('availableResolutions')
        //     res.status(400).json({message:"incorrect availableResolutions",field})
        // }
        const operation = store.push(req.body)
        if (operation[0] === true) {
            res.status(201).json(store.find(operation[1]))
        } else {
            res.status(400).json(operation[0])
        }
    }

    async updateVideo (req: CustomRequest.UpdateVideoRequest, res: Response){
        const flag  = store.update(req.body, +req.query.id)
        if (flag === true){
            res.sendStatus(204)
        } else {
            res.json(flag)
        }
    }

    async deleteVideo (req: CustomRequest.DeleteVideoRequest, res: Response) {
        if(store.find(+req.params.id) === undefined) {
            res.sendStatus(404)
        }
        else {
            store.delete(+req.params.id)
            res.sendStatus(204)
        }
    }

    async postWithParam (req: CustomRequest.GetOneVideoRequest, res: Response) {
        res.status(405).json({message:"method is deprecated",field:[]})
    }
}

const rootController = new RootController()
export default rootController