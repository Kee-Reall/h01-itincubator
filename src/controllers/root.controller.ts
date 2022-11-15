import { Response } from "express";
import * as CustomRequest from "../models/request.model"
import { store } from "../store/store";
import { httpStatus } from "../helpers/httpStatus";
import { ErrorMessage } from "../models/errorMessage.model";
import { getCreateError } from "../helpers/getCreateError";
import { ApiError} from "../helpers/ApiError";
import { getUpdateError } from "../helpers/getUpdateError";


class RootController {

    constructor() {}

    async getAll(req: CustomRequest.GetAllVideoRequest, res: Response):Promise<void> {
        res.status(httpStatus.ok).json(store.state)
    }

    async getOneById(req: CustomRequest.GetOneVideoRequest, res: Response) {
        const found: any = store.find(+req.params.id)
        if (found === undefined){
            res.sendStatus(httpStatus.nofFound)
        }
        else {
            res.status(httpStatus.ok).json(found)
        }
    }

    async createVideo(req: CustomRequest.CreateVideoRequest, res: Response) {
        if(store.createAllFieldHas(req.body)) {
            if(store.createFieldsCorrect(req.body)) {
                const id = store.push(req.body)
                const found: any = store.find(id)
                res.status(httpStatus.created).json(found)
                return
            }
        }
        res.status(httpStatus.badRequest).json(ApiError(...getCreateError(req.body)))
    }

    async updateVideo(req: CustomRequest.UpdateVideoRequest, res: Response) {
        if(store.find(+req.params.id) === undefined) {
            res.sendStatus(httpStatus.nofFound)
            return
        }
        if(store.updateAllFieldsHas(req.body)){
            console.log("all has")
            if(store.updateAllFieldsCorrect(req.body)) {
                store.update(req.body,+req.params.id)
                res.sendStatus(httpStatus.noContent)
                return
            }else{
                console.log('not all has')
            }
        }

        res.status(httpStatus.badRequest).json(ApiError(...getUpdateError(req.body)))

        //res.status(httpStatus.badRequest).json("ApiError(...updateCreateError(req.body))")


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