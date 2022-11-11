import * as videoModels from '../models/video.model';
import {availableResolutions} from '../models/video.model';
import {cloneObject} from "../helpers/cloneObject";
import {errorMessage} from "../models/errorMessage.model";

type storeVideo  = videoModels.StoreVideoModel;
type createVideo = videoModels.CreateVideoModel;
type updateVideo = videoModels.UpdateVideoModel;
type storeVideos = Array<storeVideo>;
type Istrings = videoModels.Istrings

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

    generateId() {
        this._id += 1
        return this._id
    }

    push(element: createVideo): storeVideos| errorMessage {
        const id = this.generateId()
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
                     //вот в этот объект положи новое
                    return {...el, ...element}
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

    checkValidStringsLength(strings: Istrings):{flag: boolean,errorField: Array<keyof Istrings>} {
        const [maxAuthorLength, maxTittleLength] = [20,40]
        let flag = true
        const errorField: Array<keyof Istrings> = []
        if (strings.author.length > maxAuthorLength || strings.author.length <= 0) {
            errorField.push("author")
            flag = false
        }
        if (strings.title.length > maxTittleLength || strings.title.length <= 0) {
            errorField.push("title")
            flag = false
        }
        return {flag,errorField}
    }

    checkValidPush(element: createVideo): true | Array<keyof createVideo> {
        
        
        const isStringsValid = this.checkValidStringsLength({
            author:element.author,
            title:element.title
        })
        let {flag} = isStringsValid
        const errorField: Array<keyof createVideo> = [...isStringsValid.errorField]
        
        const availableResolution: string[] = "P144|P240|P360|P480|P720|P1080|P1440|P2160".split("|")
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

    checkValidUpdate(updateElement: updateVideo):  true | Array<keyof updateVideo> {
        const {
            author, title, canBeDownloaded, minAgeRestriction,
            publicationDate, availableResolutions
        } = updateElement
        const isStringsValid = this.checkValidStringsLength({author,title})
        let {flag} = isStringsValid
        const errorField: Array<keyof updateVideo> = [...isStringsValid.errorField]
        if(typeof canBeDownloaded !== 'boolean'){
            errorField.push('canBeDownloaded')
            flag = false
        }
        // @ts-ignore
        if ( minAgeRestriction !== null) {
            if ( typeof minAgeRestriction !== "number" && (minAgeRestriction > 18 || minAgeRestriction < 0)) {
                errorField.push('minAgeRestriction')
                flag = false
            }  
        }
        
            //validator of correct update Request

        return flag ? flag : errorField
    }
}