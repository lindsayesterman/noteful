import React from 'react';
import NotesContext from './notesContext';

class AddNote extends React.Component{
    static contextType = NotesContext;

    handleClickCancel = () => {
            this.props.history.push('/')
          };

    render(){
        return(
            <div>
                <form>
                    <label for="note-name">Name</label>
                    <input id="note-name" type="text"></input>
                    <label for="note-content">Content</label>
                    <input id="note-content" type="text"></input>
                    <select for="note-folder">
                    <option>Folder</option>
                    </select>                   
                </form>
                <button type='button' 
                onClick={this.handleClickCancel}>
                 Go back
                 </button>
            <button type="submit">Add Note</button>
            </div>
        )
    }
}

export default AddNote;