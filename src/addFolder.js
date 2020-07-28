import React from 'react';
import NotesContext from './notesContext';

class AddFolder extends React.Component{
    static contextType = NotesContext;
    
    handleClickCancel = () => {
            this.props.history.push('/')
          };

    render(){
        return(
            <div>
                <form>
                    <label for="folder-name">Folder Name</label>
                    <input id="folder-name" type="text"></input>
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

export default AddFolder;