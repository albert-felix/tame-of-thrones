const fs = require('fs')

const textFile = process.argv[2]
let fileContent = ''
const results = []
const kingdoms = {
    space: "gorilla",
    land: "panda",
    water: "octopus",
    ice: "mammoth",
    air: "owl",
    fire: "dragon"
}

// Reading the input text file and formatting
const readInputFile = () => {
    return new Promise((res,rej) => {
        fs.readFile(textFile, 'utf-8', (err,data) => {
        if(err) rej(err)
        res(fileContent = data.split("\n"))
    })
})
}

// Converting the secret message to actual message
const decryptMessage = (message) => {
    let mess = [...message]
    let animal = kingdoms[mess[0].toLowerCase()]
    mess.splice(0,1)
    let secret = mess.join("").toLowerCase()
    let decrypt = ''
    for(let i in secret){
        let actualCharCode = secret.charCodeAt(i) - animal.length
        if(actualCharCode < 97){
            let diff = 97 - actualCharCode
            actualCharCode = 123 - diff
        }
        decrypt += String.fromCharCode(actualCharCode)
    }
    return(decrypt)
}

// Verifying kingdoms based on condition
const verifyMessage = (message, actualMessage) => {
    let kingdom = message[0].toLowerCase()
    let animal = kingdoms[kingdom]
    let letterMatch = 0
    let indexValues = {}
    for(let letter of animal){
        let indexVal = -1
        if(indexValues.hasOwnProperty(letter)){
            indexVal = actualMessage.indexOf(letter, indexValues[letter]+1)
        }
        else{
            indexVal = actualMessage.indexOf(letter)
        }
        if(indexVal > -1){
            indexValues[letter] = indexVal
            letterMatch += 1
        }
    }
    if(letterMatch === animal.length){
            if(!results.includes(kingdom)){
                results.push(kingdom)
            }
        }
}

try{
    readInputFile()
    .then(() => {
        for(let line of fileContent){
            let message = line.split(" ")
            let actualMessage = decryptMessage(message)
            verifyMessage(message,actualMessage)
        }
    })
    .then(() => {
        if(results.length >= 3){
            console.log(`SPACE ${results.join(" ").toUpperCase()}`)
        }
        else{
            console.log('NONE')
        }
    })
    .catch(e =>{
        console.log(e)
    })
}catch(e){
    console.log(e)
}

