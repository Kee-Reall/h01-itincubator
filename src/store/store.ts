import * as videoModels from '../models/video.model';
import {availableResolutions} from '../models/video.model';
import {cloneObject} from "../helpers/cloneObject";
import {isIsoDate} from "../helpers/isIsoDate";
import {generateRandomString} from "../helpers/generateRandomString";


type storeVideo  = videoModels.StoreVideoModel;
type createVideo = videoModels.CreateVideoModel;
type updateVideo = videoModels.UpdateVideoModel;
type storeVideos = Array<storeVideo>;
type isString = videoModels.IsStrings

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

    push(element: createVideo) {
        
    }

    createAllFieldHas(body: Object): boolean {
        if(!body.hasOwnProperty('title')) {
            return false
        }
        if(!body.hasOwnProperty('author')) {
            return false
        }
        return true
    }

    createFieldsCorrect(body: Object): boolean {
        return true
    }


    update(element: updateVideo,id: number) {
        
    }

    delete(id:number) {
        this.state = this.state.filter(el => el.id !== id)
    }
    
    find(id: number): storeVideo | undefined {
        if (Number.isNaN(id)) return undefined
        return this.state.find( el => el.id === id)
    }

    checkValidResolution(resolutions: Array<string>): boolean  {
        if(!Array.isArray(resolutions)) return false
        for(let i of resolutions) 
        //@ts-ignore
            if(!this.availableResolutions.includes(i)) {
                return false
            }
        return true
    }
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