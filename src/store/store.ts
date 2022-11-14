import * as videoModels from '../models/video.model';
import {availableResolutions, StoreVideoModel} from '../models/video.model';
import {cloneObject} from "../helpers/cloneObject";
import {isIsoDate} from "../helpers/isIsoDate";
import {generateRandomString} from "../helpers/generateRandomString";
import {message} from "../helpers/message";
import {checkValidResolution} from "../helpers/checkValidResolution";
import {type} from "os";


type storeVideo  = videoModels.StoreVideoModel;
type createVideo = videoModels.CreateVideoModel;
type updateVideo = videoModels.UpdateVideoModel;
type storeVideos = Array<storeVideo>;

class Store {
    state: storeVideos
    private _id: number
    readonly availableResolutions: availableResolutions[] = ["P144","P240","P360","P480","P720","P1080","P1440","P2160"]
    private _clear: Array<storeVideo> = []

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
        return {
            canBeDownloaded: false,
            minAgeRestriction: null,
            id: this.generateId(),
            createdAt:new Date(Date.now()).toISOString(),
            publicationDate: new Date(Date.now()).toISOString()
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

    }

    updateAllFieldsHas(body: updateVideo): boolean {
        return this.createAllFieldHas(body) && body.hasOwnProperty('canBeDownloaded')
            && body.hasOwnProperty('minAgeRestriction')
            && body.hasOwnProperty('availableResolution')
            && body.hasOwnProperty('publicationDate')
    }

    updateAllFieldsCorrect(body: updateVideo): boolean {
        if(!this.createFieldsCorrect(body)) return false // check same field as created Video
        if(typeof body.canBeDownloaded !== 'boolean')  return false

        if(typeof body.minAgeRestriction !== 'number') return false
        if(!Number.isInteger(body.minAgeRestriction))  return false
        if(Number.isNaN(body.minAgeRestriction)) return false
        if(body.minAgeRestriction > 18 || body.minAgeRestriction < 0) return false

        return (isIsoDate(body.publicationDate))
    }

    delete(id:number) {
        this.state = this.state.filter(el => el.id !== id)
    }
    
    find(id: number): storeVideo | undefined {
        if (Number.isNaN(id)) return undefined
        return this.state.find( el => el.id === id)
    }
    //
    // checkValidResolution(resolutions: Array<string>): boolean  {
    //     if(!Array.isArray(resolutions)) return false
    //     for(let i of resolutions)
    //     //@ts-ignore
    //         if(!this.availableResolutions.includes(i)) {
    //             return false
    //         }
    //     return true
    // }
}

export const store = new Store([
    {
      "id": 200,
      "title": "string",
      "author": "string",
      "canBeDownloaded": true,
      "minAgeRestriction": null,
      "createdAt": "2022-11-14T10:45:50.180Z",
      "publicationDate": "2022-11-14T10:45:50.180Z",
      "availableResolutions": [
        "P144"
      ]
    },{
        "id": 333,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-14T10:45:50.180Z",
        "publicationDate": "2022-11-14T10:45:50.180Z",
        "availableResolutions": [
          "P144"
        ]
      },{
        "id": 35,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-14T10:45:50.180Z",
        "publicationDate": "2022-11-14T10:45:50.180Z",
        "availableResolutions": [
          "P144"
        ]
      },{
        "id": 976,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-11-14T10:45:50.180Z",
        "publicationDate": "2022-11-14T10:45:50.180Z",
        "availableResolutions": [
          "P144"
        ]
      }
  ])