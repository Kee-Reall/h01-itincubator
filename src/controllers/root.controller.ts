import e, { Response } from "express";
import * as CustomRequest from "../models/request.model"
import {store} from "../store/store";
import {isAllFieldsHave} from "../helpers/isAllFieldsHave";
import { httpStatus } from "../helpers/httpStatus";
import { ApiError, ErrorMessage } from "../models/errorMessage.model";

class RootController {

    constructor() {}

    async getAll(req: CustomRequest.GetAllVideoRequest, res: Response):Promise<void> {
        res.status(httpStatus.ok).json(store.state)
    }

    async getOneById(req: CustomRequest.GetOneVideoRequest, res: Response) {
        const found: any = store.find(+req.params.id)
        if (found !== undefined){
            res.sendStatus(httpStatus.nofFound)
            return
        }
        else {
            res.status(httpStatus.ok).json(found)
        }
    }

    async createVideo(req: CustomRequest.CreateVideoRequest, res: Response) {
        if(store.createAllFieldHas(req.body)) {
            if(store.createFieldsCorrect) {

            }
        }else{

        }
    }

    async updateVideo(req: CustomRequest.UpdateVideoRequest, res: Response) {
        if(!store.find(+req.params.id)) {
            res.sendStatus(404)
            return
        }
        else {
            const [bol,massive] = isAllFieldsHave(req.body)
            if(!bol){
                res.status(400).json(massive)
                return
            }
            const flag = store.update(req.body, +req.query.id)
            if (flag === true) {
                await res.sendStatus(204)
                return
            } else {
                res.status(400).json(flag)
            }
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

    async deprecated (req: CustomRequest.GetOneVideoRequest, res: Response) {
        res.status(405).json(new ApiError([
            new ErrorMessage("Method is deprecated", "")
        ]))
    }
}

const rootController = new RootController()
export default rootController