import * as videoModels from '../models/video.model'
import {cloneObject} from "../helpers/cloneObject";
import {availableResolutions} from "../models/video.model";
import {errorMessage} from "../models/errorMessage.model";

type storeVideo  = videoModels.StoreVideoModel
type createVideo = videoModels.CreateVideoModel
type updateVideo = videoModels.UpdateVideoModel
type storeVideos = Array<storeVideo>

export class Store {
    state: storeVideos
    constructor(
        public initialState: storeVideos
    ) {
        this.state = cloneObject(this.initialState)
    }

    setInitialState(): storeVideos {
        this.state = cloneObject(this.initialState)
        return this.state
    }

    push(element: createVideo,id:number): storeVideos| errorMessage {
        if(!element.hasOwnProperty("availableResolutions")){
            element.availableResolutions = null
        }
        const validCall = this.checkValidPush(element)
        if(validCall){
            const toPush:storeVideo = {
                ...element,
                id,

            }
            this.state.push(toPush)
            return this.state
        }else{
            return {
                message:"",
                field:validCall
            }
        }
    }

    update(element: updateVideo) {
        try {
            this.state = this.state.map( (el: storeVideo) => {
                if (el.id === element.id) {
                    const obj: any = {} //вот в этот объект положи новое
                    return obj
                } else return el
            })
            return this.state
        } catch (e) {
            console.log('something go wrong\nstate has no change')
        }
    }

    checkValidPush(element: createVideo): true | any[] {
        const [maxAuthorLength, maxTittleLength] = [20,40]
        let flag: boolean = true
        const errorField: Array<keyof createVideo> = []
        const availableResolution: string[] = "P144|P240|P360|P480|P720|P1080|P1440|P2160".split("|")

        if (element.author.length > maxAuthorLength || element.author.length <= 0) {
            errorField.push("author")
            flag = false
        }
        if (element.tittle.length > maxTittleLength || element.tittle.length <= 0) {
            errorField.push("tittle")
            flag = false
        }
        if(element.availableResolutions !== null){
            for(let i of element.availableResolutions){
                // @ts-ignore
                if(!availableResolution.includes(i)){
                    errorField.push("availableResolutions")
                    flag = false
                    break
                }
            }
        }
        return flag ? flag : errorField
    }
}

