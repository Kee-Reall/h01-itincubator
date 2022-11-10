import { Response } from "express";
import * as CustomRequest from "../models/request.model"

class RootController {

    constructor() {}

    async getAll(req: CustomRequest.GetAllVideoRequest, res: Response):Promise<void> {
        const result = {
            getAll: "get All"
        }
        res.json(result)
    }

    async getOneById(req: CustomRequest.GetOneVideoRequest, res: Response) {
        const result = {
            getOne: "get One"
        }
        res.json(result)
    }

    async createVideo(req: CustomRequest.CreateVideoRequest, res: Response) {
        const result = {
            postRequest: "action create"
        }
        res.json(result)

    }

    async updateVideo (req: CustomRequest.UpdateVideoRequest, res: Response){
        const result = {
            putRequest:"put"
        }
        res.json(result)
    }

    async deleteVideo (req: CustomRequest.DeleteVideoRequest, res: Response){

        res.json({detele:"delete"})

    }
}

const rootController = new RootController()
export default rootController