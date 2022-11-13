import {store} from "../store/store";
import {Request, Response} from "express";

class TestingController {
    constructor() {

    }

    clearAll(req: Request, res: Response){
        store.clearAll()
        res.sendStatus(204)
    }

}

export const testingController = new TestingController()