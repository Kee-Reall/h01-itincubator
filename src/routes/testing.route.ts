import express from "express";
import {testingController} from "../controllers/testing.controller";

export const testingRouter = express.Router({caseSensitive:true})

testingRouter.delete ('/all-data',testingController.clearAll)