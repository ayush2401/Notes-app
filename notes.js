const fs = require('fs')
const chalk = require('chalk')

const addNote = (title , body) => {
    const notes = loadNotes()
    /* with ES6 */
    const duplicate = notes.filter((note) => note.title === title) 

    /*find function search for only first match (boolean)*/
    const duplicateFind = notes.find((note) => note.title === title)

    /* WITHOUT ES6
    const duplicate = notes.filter(function(note) {
        return note.title === title
    })
    */

    if(!duplicateFind) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log('added')
    }
    else {
        console.log('already exist')
    } 
}

const removeNotes = (title) => {
    const notes = loadNotes()

    // with ES6
    const similar = notes.filter((note) => note.title !== title )

    /* WITHOUT ES6
    const similar = notes.filter(function(note) {
        return note.title !== title
    })
    */
    
    if(notes.length === similar.length)
        console.log(chalk.bgRed('No note found!'))
    else
        console.log(chalk.bgGreen.black('Note removed'))

    saveNotes(similar)
}

const listNotes = () => {
     console.log(chalk.blue('Listing...'))
     loadNotes().forEach((note) => {
         console.log('title: ' + note.title + ' , body: ' + note.body)
     });
}


const readNotes = (title) => {
     const notes = loadNotes()
     const Found = notes.find((note) => note.title === title)

     if(!Found)
        console.log(chalk.red.inverse('not found items'))
     else {
            console.log(chalk.bold.yellow(Found.title))
            console.log(Found.body)
        }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json' , dataJSON)
}

const loadNotes = () => {

    try {
     const dataBuffer = fs.readFileSync('notes.json')
     const dataJSON = dataBuffer.toString()
           return JSON.parse(dataJSON)
    } 
    catch(e) {
        return []
    }
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}

