import { Response } from "express";
import * as CustomRequest from "../models/request.model"
import { store } from "../store/store";
import { httpStatus } from "../helpers/httpStatus";
import { ApiError, ErrorMessage } from "../models/errorMessage.model";
import { getCreateError } from "../helpers/getCreateError";



class RootController {

    constructor() {}

    async getAll(req: CustomRequest.GetAllVideoRequest, res: Response):Promise<void> {
        res.status(httpStatus.ok).json(store.state)
    }

    async getOneById(req: CustomRequest.GetOneVideoRequest, res: Response) {
        const found: any = store.find(+req.params.id)
        console.log(found)
        if (found === undefined){
            res.sendStatus(httpStatus.nofFound)
        }
        else {
            res.status(httpStatus.ok).json(found)
        }
    }

    async createVideo(req: CustomRequest.CreateVideoRequest, res: Response) {
        if(store.createAllFieldHas(req.body)) {
            if(store.createFieldsCorrect({})) {
                console.log('never get here')
                return
            }
        }
        const j = ApiError(...getCreateError(req.body))
        res.status(httpStatus.badRequest).json(ApiError(...getCreateError(req.body)))
    }

    async updateVideo(req: CustomRequest.UpdateVideoRequest, res: Response) {
        
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

    async deprecated (req: CustomRequest.GetOneVideoRequest, res: Response) {
        res.status(405).json(ApiError(new ErrorMessage("Method is deprecated", "")))
    }
}


const rootController = new RootController()
export default rootController