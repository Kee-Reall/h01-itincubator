import {Request, Response} from "express";
import {rootRouter} from "../routes/root.route";
import {IDgenerator} from "../helpers/IDgenerator";

class RootController {

    constructor() {}

    async getAll():Promise<void> {

    }

    async getById(req: Request, res: Response) {

    }

    async createVideo(req: Request, res: Response) {

    }

    async updateVideo (req: Request, res: Response){

    }

    async deleteVideo (req: Request, res: Response){

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