type availableResolutions	 = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160"
// from stackoverflow https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
//
interface errorMessage {
    message: string
    field: string
}

export interface iCreateVideoModel {
    tittle: string // how to limit strings length?
    author: string // to limit tha too
    availableResolutions?: Array<keyof availableResolutions>
}

export interface iUpdateVideoModel extends iCreateVideoModel {
    canBeDownloaded: boolean
    minAgeRestriction?: IntRange<1, 18>
    createdAt: Date
    publicationDate: Date
}

export interface iStoreVideoModel extends iUpdateVideoModel {
    id: number
}



export interface APIErrorResult {
    errorsMessages: Array<errorMessage>
}

//i need to limit strings there is 3 way
// 1 make correct genericType
// 2 make class validator
// 3 use Proxy
