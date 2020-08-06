import React from 'react';
import NotesContext from './notesContext';
import config from './config'

class AddNote extends React.Component{
    state = {
        error: null,
      };

    static contextType = NotesContext;

    handleNoteSubmit = (e) => {
        e.preventDefault();
        const note  = {
            name: e.target['noteName'].value,
            content: e.target['noteContent'].value,
            folderId: e.target['noteFolder'].value,
            modified: new Date(),
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
        .then (note => {
            this.context.addNote(note)
            this.props.history.push('/')
            console.log(note)
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
                    <input id="noteName" name="noteName" type="text"></input>
                    <label htmlFor="noteContent">Content</label>
                    <input id="noteContent" name="noteContent" type="text"></input>
                    <select id='noteFolder' name='noteFolder'>
                    {folders.map(folder =>
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
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