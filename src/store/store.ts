type ChangeMe = any[]
type inputNew = any
type storeModel = any
type inputUpdate = any

export class Store {
    constructor(public state: ChangeMe){}

    push(element: inputNew) {
        const toPush: storeModel = {}
        this.state.push(toPush)
    }

    update(element: inputUpdate) {
        this.state = this.state.map(el => {
            if (el.id === element.id) {
                const obj: any = {}
                return obj
            } else return el
        })
    }
}
