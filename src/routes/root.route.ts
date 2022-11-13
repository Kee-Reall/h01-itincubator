import express from "express";
import rootController from "../controllers/root.controller"

export const rootRouter = express.Router({caseSensitive:true})

rootRouter.get   ('/'   , rootController.getAll)
rootRouter.get   ('/:id', rootController.getOneById)
rootRouter.post  ('/'   , rootController.createVideo)
rootRouter.post  ("/:id", rootController.deprecated)
rootRouter.put   ("/"   , rootController.deprecated)
rootRouter.put   ('/:id', rootController.updateVideo)
rootRouter.delete('/'   , rootController.deprecated)
rootRouter.delete('/:id', rootController.deleteVideo)
rootRouter.patch ('/'   , rootController.deprecated)