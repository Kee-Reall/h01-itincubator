// export default function* IDgenerator(): Generator<string>{
//     function randomString(): string {
//         return (Math.ceil(Math.random()*Number.MAX_SAFE_INTEGER)).toString(36)
//     }
//     while(true){
//         yield randomString()
//     }
// } i've forgot that id shoud be integer

export function* IDgenerator(): Generator<number>{
    let i = -1
    while(true) {
        ++i
        yield i
    }
} // not sure i need it

// to delete this file