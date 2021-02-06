const chalk = require('chalk')
const { demandOption } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

//customise yargs version
yargs.version('1.1.0')


// commands we can insert => add , remove , read , list
yargs.command({
    command: "add" ,
    describe: 'to add a new note' ,
    builder: {
        title: {
             describe: 'note title' ,
             demandOption: true,
             type: 'string'
        },
        body: {
              describe: 'define body',
              demandOption: true,
              type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title , argv.body)
    }
})

// remove
yargs.command({
    command: 'remove',
    describe: 'remove a note' ,
    builder: {
        title: {
            describe: 'note title to remove',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
      notes.removeNotes(argv.title)
    }
})

//read
yargs.command({
    command:'read',
    describe: 'reading a note',
    builder: {
       title: {
           describe: 'title to search',
           demandOption: true,
           type: 'string'
       }         
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

// list
yargs.command({
    command:'list',
    describe: 'listing a note',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()
// console.log(yargs.argv)
