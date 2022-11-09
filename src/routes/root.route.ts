import express from "express";
import rootController from "../controllers/root.controller"

export const rootRouter = express.Router({caseSensitive:true})

rootRouter.get   ('/'   , rootController.getAll)
rootRouter.get   ('/:id', rootController.getById)
rootRouter.post  ('/'   , rootController.createVideo)
rootRouter.put   ('/:id', rootController.updateVideo)
rootRouter.delete('/:id', rootController.deleteVideo)
