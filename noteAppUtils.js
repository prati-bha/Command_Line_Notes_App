const fs = require('fs');


const addNotes = (title, body) => {
    const currNotes = loadNotes();
    if (checkForExistingNote(title).index === undefined) {
        currNotes.push({
            title,
            body
        });
        console.log('note added!')
    } else {
        console.log('no duplicates!')
    }
    saveNotes(currNotes)
}

const readNote = (title) => {
    const returnedObject = checkForExistingNote(title);
    if (returnedObject.data) {
        console.log(returnedObject.data)
    } else {
        console.log(returnedObject.errorMessage)
    }
}

const removeNote = (title) => {
    const returnedObject = checkForExistingNote(title);
    if (returnedObject.data) {
        const currNotes = loadNotes()
        currNotes.splice(returnedObject.index, 1);
        saveNotes(currNotes);
        console.log('note deleted');
        console.log("Current List\n", currNotes)
    } else {
        console.log(returnedObject.errorMessage)

    }
}

const checkForExistingNote = (title) => {
    const currNotes = loadNotes();
    let singleNote;
    let index = null
    currNotes.some((noteObjec, i) => {
        if (noteObjec.title === title) {
            singleNote = noteObjec
            index = i
        }
    })
    if (index === null) {
        return {
            errorMessage: 'oh no !!! No Data Found'
        }
    }
    return {
        index,
        data: singleNote
    }
}
const saveNotes = (array) => {
    fs.writeFileSync('noteStorage.json', JSON.stringify(array))
}
const loadNotes = () => {
    try {
        const data = fs.readFileSync('noteStorage.json');
        const dataJSON = data.toString();
        return JSON.parse(dataJSON)
    } catch (err) {
        return []
    }
}
module.exports = {
    addNotes,
    loadNotes,
    readNote,
    removeNote
}