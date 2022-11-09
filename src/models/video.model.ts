export type availableResolutions	 = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160"
// from stackoverflow https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
//

export interface CreateVideoModel extends Object{
    tittle: string // how to limit strings length?
    author: string // to limit tha too
    availableResolutions: Array<keyof availableResolutions> | null
}

export interface UpdateVideoModel extends CreateVideoModel {
    id: number
    canBeDownloaded: boolean
    minAgeRestriction?: IntRange<1, 18>
    createdAt: Date
    publicationDate: Date
}

export interface StoreVideoModel extends UpdateVideoModel {
    
}
//i need to limit strings there is 3 way
// 1 make correct genericType
// 2 make class validator
// 3 use Proxy
