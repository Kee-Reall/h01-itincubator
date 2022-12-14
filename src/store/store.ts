import * as videoModels from '../models/video.model';
import {cloneObject} from "../helpers/cloneObject";
import {isIsoDate} from "../helpers/isIsoDate";
import {checkValidResolution} from "../helpers/checkValidResolution";
import { addDays } from '../helpers/addDay';



type storeVideo  = videoModels.StoreVideoModel;
type createVideo = videoModels.CreateVideoModel;
type updateVideo = videoModels.UpdateVideoModel;
type storeVideos = Array<storeVideo>;

class Store {
    state: storeVideos
    private _id: number
    private readonly availableResolutions: videoModels.availableResolutions[] = ["P144","P240","P360","P480","P720","P1080","P1440","P2160"]
    private readonly _clear: Array<storeVideo> = []

    constructor( public initialState: storeVideos) {
        this.state = cloneObject(this.initialState)
        this._id = -1
    }

    setInitialState(): storeVideos {
        this.state = cloneObject(this.initialState)
        return this.state
    }

    clearAll(): void {
        this.state = [...[]]
    }

    generateId() {
        this._id += 1
        return this._id
    }

    defaultObj(): any{
        const createDate = new Date(Date.now())
        return {
            canBeDownloaded: false,
            minAgeRestriction: null,
            id: this.generateId(),
            createdAt:createDate.toISOString(),
            publicationDate: addDays(createDate,1).toISOString()
        }
    }

    push(element: createVideo):number {
        if(!element.hasOwnProperty('availableResolutions')){
            element.availableResolutions = null
        }
        //@ts-ignore
        const defaultObj = this.defaultObj()
        this.state.push({...element,...defaultObj})
        return defaultObj.id
    }

    createAllFieldHas(body: Object): boolean {
        return body.hasOwnProperty('title') && body.hasOwnProperty('author')
    }

    createFieldsCorrect(body: any): boolean {
        if(typeof body.title !== 'string' ) return false
        else {
            if(body.title.trim().length > 40 || body.title.trim().length < 1) {
                return false
            }
        }
        if(typeof body.author !== 'string' ) return false
        else {
            if(body.author.trim().length > 20 || body.author.trim().length < 1) {
                return false
            }
        }
        if(body.hasOwnProperty('availableResolutions')) {
            if(body.availableResolutions !== null) {
                if(Array.isArray(body.availableResolutions)) {
                    if (body.availableResolutions.length <= 0) return false
                    return checkValidResolution(body.availableResolutions)
                }
                else {
                    return false
                }
            }
        }
        return true
    }

    update(element: updateVideo,id: number) {
        this.state = this.state.map((el) => {
            if(el.id === id) {
                return cloneObject({
                        ...el,
                        canBeDownloaded: element.canBeDownloaded,
                        author: element.author,
                        title: element.title,
                        availableResolutions: element.availableResolutions,
                        publicationDate: element.publicationDate,
                        minAgeRestriction: element.minAgeRestriction
                    })
                }
            return el
        })    
    }

    updateAllFieldsHas(body: updateVideo): boolean {
        return this.createFieldsCorrect(body) && body.hasOwnProperty('canBeDownloaded')
            && body.hasOwnProperty('minAgeRestriction') && body.hasOwnProperty('availableResolutions')
            && body.hasOwnProperty('publicationDate')
    }

    updateAllFieldsCorrect(body: updateVideo): boolean {
        if(!this.createFieldsCorrect(body)) return false // check same field as created Video
        if(typeof body.canBeDownloaded !== 'boolean')  return false
        if(body.minAgeRestriction !== null) {
            if(typeof body.minAgeRestriction !== 'number') return false
            if(!Number.isInteger(body.minAgeRestriction))  return false
            if(Number.isNaN(body.minAgeRestriction)) return false
            if(body.minAgeRestriction > 18 || body.minAgeRestriction < 0) return false
        }

        if(!isIsoDate(body.publicationDate)) return false
        return true
    }

    delete(id:number) {
        this.state = this.state.filter(el => el.id !== id)
    }
    
    find(id: number): storeVideo | undefined {
        if (Number.isNaN(id)) return undefined
        return this.state.find( el => el.id === id)
    }
}

export const store = new Store([])