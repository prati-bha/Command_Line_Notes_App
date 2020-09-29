const yargs = require('yargs');
const notes = require('./noteAppUtils');
//add, remove, read, list

//create add command
yargs.command({
    command: 'add',
    describe: 'add an item into the list',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (args) => {
        notes.addNotes(args.title, args.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove an item into the list',
    handler: (args) => {
        notes.removeNote(args.title);
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'list the item list ',
    handler: () => {
        if (notes.loadNotes().length === 0) {
            console.log('No Data in List')
        } else {
            console.log(notes.loadNotes())
        }
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'read an item into the list',
    handler: (args) => {
        notes.readNote(args.title);
    }
})

yargs.parse();
