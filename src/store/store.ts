import * as videoModels from '../models/video.model'
type storeVideo = videoModels.StoreVideoModel
type createVideo = videoModels.CreateVideoModel
type updateVideo = videoModels.UpdateVideoModel
type storeVideos = Array<storeVideo>
export class Store {
    state: storeVideos
    constructor(public initialState: storeVideos){
        this.state = {...initialState}
    }

    push(element: createVideo) {
        const toPush: storeVideo ///i know i need to code that later
        this.state.push(toPush)
    }

    update(element: updateVideo) {
        this.state = this.state.map(el => {
            if (el.id === element.id) {
                const obj: any = {}
                return obj
            } else return el
        })
    }
}
