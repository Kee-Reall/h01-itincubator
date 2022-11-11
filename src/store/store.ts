import * as videoModels from '../models/video.model';
import {availableResolutions} from '../models/video.model';
import {cloneObject} from "../helpers/cloneObject";
import {errorMessage} from "../models/errorMessage.model";

type storeVideo  = videoModels.StoreVideoModel;
type createVideo = videoModels.CreateVideoModel;
type updateVideo = videoModels.UpdateVideoModel;
type storeVideos = Array<storeVideo>;
type isString = videoModels.IsStrings

export class Store {
    state: storeVideos
    private _id: number
    readonly availableResolutions: Array<string> = "P144|P240|P360|P480|P720|P1080|P1440|P2160".split("|")

    constructor( public initialState: storeVideos) {
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

    push(element: createVideo): [boolean,number] | [errorMessage] {
        const id = this.generateId()
        if(!element.hasOwnProperty("availableResolutions")){
            element.availableResolutions = null
        }
        const validCall = this.checkValidPush(element)
        if(validCall === true) {
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
            return [true, id]
        }else{
            return [{
                message:"There is some error inside. Check field to see witch field has error",
                // @ts-ignore
                field: validCall
            }]
        }
    }

    update(element: updateVideo,id: number): true | errorMessage | undefined  {
        const isValid = this.checkValidUpdate(element)
        if(isValid === true){
            // @ts-ignore
            this.state = this.state.map( (el: storeVideo) => el.id === id ? {...el, ...element} :  el)
            return true
        }
        else{
            return {
                message:'Some fields are not valid',
                field: isValid
            }
        }
    }

    find(id: number): storeVideo | undefined {
        return this.state.find( el => el.id === id)
    }

    delete(id:number):boolean {
        let flag: boolean = false
        this.state.filter(el => {
            if(el.id !== id) {
                console.log(el.id !== id)
                flag = true
                return false
            } else return true
        })
        return flag
    }

    checkValidStringsLength(strings: isString):{flag: boolean,errorField: Array<keyof isString>} {
        const [maxAuthorLength, maxTittleLength] = [20,40]
        let flag = true
        const errorField: Array<keyof isString> = []
        if(typeof strings.author !== "string") {
            errorField.push("author")
            flag = false
        }
        if(typeof strings.title !== "string") {
            errorField.push("title")
            flag = false
        }
        if (strings.author.length > maxAuthorLength || strings.author.length <= 0) {
            errorField.push("author")
            flag = false
        }
        if (strings.title.length > maxTittleLength || strings.title.length <= 0) {
            errorField.push("title")
            flag = false
        }
        return {
            flag,
            errorField: errorField.filter((el,i,ar)=> i === ar.indexOf(el))}
    }

    checkValidResolution(resolutions: Array<string>): boolean  {
        let flag = true
        const errorField: Array<string> = []
        for(let i of resolutions) {
            if(!this.availableResolutions.includes(i)) {
                return false
            }
        }
        return true
    }

    checkValidPush(element: createVideo): boolean | Array<string> {
        const isStringsValid = this.checkValidStringsLength({
            author:element.author,
            title:element.title
        })
        let {flag} = isStringsValid
        let arr: string[] = []
        const errorField: Array<string> = [...isStringsValid.errorField,...arr]
        if(element.availableResolutions !== null){
            const isAvailableResolutionsValid = this.checkValidResolution(element.availableResolutions)
            if(!isAvailableResolutionsValid) {
                errorField.push("availableResolutions")
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
        const isAvailableResolutionsValid = availableResolutions === null ? true : this.checkValidResolution(availableResolutions)
        if(!isAvailableResolutionsValid){
            errorField.push("availableResolutions")
            flag = false
        }

        if(typeof canBeDownloaded !== 'boolean') {
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
        const newDate = +updateElement.publicationDate
        if(Number.isNaN(newDate)){
            flag = false
            errorField.push('publicationDate')
        }
        
            //validator of correct update Request

        return flag ? flag : errorField
    }
}

export const store = new Store([])