
// from stackoverflow https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
//

export type availableResolutions = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160" | ""

export interface CreateVideoModel {
    author: string
    title: string
    availableResolutions: Array<availableResolutions> | null
}

export interface UpdateVideoModel extends Object {
    author: string
    title: string
    canBeDownloaded: boolean
    minAgeRestriction: IntRange<0, 19> | null
    publicationDate: string
    availableResolutions: Array<availableResolutions> | null
}

export interface StoreVideoModel extends Object {
    id: number
    author: string
    title: string
    canBeDownloaded: boolean
    minAgeRestriction: IntRange<0, 18> | null
    createdAt: string
    publicationDate: string
    availableResolutions: Array<availableResolutions> | null
}
//i need to limit strings there is 3 way
// 1 make correct genericType
// 2 make class validator
// 3 use Proxy
