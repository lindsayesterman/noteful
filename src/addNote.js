import React from 'react';
import NotesContext from './notesContext';
import config from './config'

class AddNote extends React.Component{

    static contextType = NotesContext;

    handleNoteSubmit = (e) => {
        const { noteName, noteContent, noteFolder } = e.target
        e.preventDefault();
        const note  = {
            noteName: noteName.value,
            noteContent: noteContent.value, 
            noteFolder: noteFolder.value
        }
        this.setState({error:null})
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
                headers: {
                    'content-type': 'application/json'
                }
        })
        .then(([res]) => {
            if (!res.ok){
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then (data => {
            noteName.value=''
            noteContent.value=''
            noteFolder.value={}
            this.context.addNote(data)
            this.props.history.push('/')
            console.log(data)
        })
        .catch(error=>{
            this.setState({ error })
        })
    }

    handleClickCancel = () => {
            this.props.history.push('/')
          };

    render(){
        const { folders=[] } = this.props
        return(
            <div  className="add-note-form">
                <form onSubmit={this.handleNoteSubmit}>
                    <label htmlFor="noteName">Name</label>
                    <input id="noteName" type="text"></input>
                    <label htmlFor="noteContent">Content</label>
                    <input id="noteContent" type="text"></input>
                    <select htmlFor="noteFolder">
                    {folders.map(folder =>
                    <option id="noteFolder">{folder.name}</option>
                    )}
                    </select>                   
                <button type='button' 
                onClick={this.handleClickCancel}>
                 Go back
                 </button>
                <button type="submit">
                Add Note
                </button>
                </form>
            </div>
        )
    }
}

export default AddNote;