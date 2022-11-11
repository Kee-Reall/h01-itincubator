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
        if(Object.entries(req.body).length === 0) res.status(400).json({
            Message:"incorrect data",
            field: ['all']
        })
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

    async deleteVideo (req: CustomRequest.DeleteVideoRequest, res: Response){
        if(store.delete(+req.params.id)) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}

const rootController = new RootController()
export default rootController