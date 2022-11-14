// export default function* IDgenerator(): Generator<string>{
//     function randomString(): string {
//     while(true){
//         yield randomString()
//     }
// } i've forgot tha' id shoudda integer

export function* IDgenerator(): Generator<number>{
    let i = -1
    while(true) {
        ++i
        yield i
    }
} // not sure i'd need it

// to delete this file