import {Store} from "./store";

const testStore = new Store([])

testStore.push({
    title:"body",
    author:"ma",
    availableResolutions: ['P720']
})
testStore.push({
    title:"2nd",
    author:"me",
    availableResolutions: ['P1080']
})

testStore.update({canBeDownloaded: true},1)
console.log(testStore.state)

testStore.setInitialState()

console.log("======")
console.log(testStore.state)