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
    private _id: number
    constructor(
        public initialState: storeVideos        
    ) {
        this.state = cloneObject(this.initialState)
        this._id = -1
    }

    setInitialState(): storeVideos {
        this.state = cloneObject(this.initialState)
        return this.state
    }

    genereateId() {
        this._id += 1
        return this._id
    }

    push(element: createVideo): storeVideos| errorMessage {
        const id = this.genereateId()
        if(!element.hasOwnProperty("availableResolutions")){
            element.availableResolutions = null
        }
        const validCall = this.checkValidPush(element)
        if(validCall) {
            const currentDate = new Date(Date.now());
            const nextDate = new Date(Date.now())
            nextDate.setDate(nextDate.getDate() + 1)
            const toPush:storeVideo = {
                ...element,
                id,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: currentDate.toISOString(),
                publicationDate: nextDate.toISOString()
            }
            this.state.push(toPush)
            return this.state
        }else{
            return {
                message:"There is some error inside. Check field to see witch field has error",
                field:validCall
            }
        }
    }

    update(element: updateVideo,id: number): storeVideo | undefined {
        try {
            this.state = this.state.map( (el: storeVideo) => {
                if (el.id === id) {
                    const obj = {...element,id} //вот в этот объект положи новое
                    return obj
                } else {
                    return el
                }
            })
            return this.find(id)
        } catch (e) {
            console.log('something go wrong\nstate has no change')
            return undefined
        }
    }

    find(id: number): storeVideo | undefined {
        return this.state.find(el => el.id === id)
    }

    checkValidPush(element: createVideo): true | Array<keyof createVideo> {
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