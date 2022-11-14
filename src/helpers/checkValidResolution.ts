import { availableResolutions } from "../models/video.model"

export function checkValidResolution(resolutions: Array<string>): boolean  {
    const availableResolutions: availableResolutions[] = ["P144","P240","P360","P480","P720","P1080","P1440","P2160"]
    if(!Array.isArray(resolutions)) return false
    for(let i of resolutions)
        // @ts-ignore
        if(!availableResolutions.includes(i)) {
            return false
        }
    return true
}