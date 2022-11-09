import { Response } from "express";
import * as CustomRequest from "../models/request.model"

class RootController {

    constructor() {}

    async getAll(req: CustomRequest.GetAllVideoRequest):Promise<void> {

    }

    async getOneById(req: CustomRequest.GetOneVideoRequest, res: Response) {

    }

    async createVideo(req: CustomRequest.CreateVideoRequest, res: Response) {

    }

    async updateVideo (req: CustomRequest.UpdateVideoRequest, res: Response){

    }

    async deleteVideo (req: CustomRequest.DeleteVideoRequest, res: Response){

    }
    *getId() {
       let i:number = -1
       while(true) {
        i++
        yield i
       } 
    }
}

const rootController = new RootController()
export default rootController