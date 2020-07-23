import React from 'react';
import { withRouter } from 'react-router-dom';

class AddNote extends React.Component{
    static defaultProps = {
        onAddNote: () => {}
    };
    
    render(){
        const { onClickCancel } = this.props

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
                onClick={onClickCancel}>
                 Go back
                 </button>
            <button type="submit">Add Note</button>
            </div>
        )
    }
}

export default withRouter(AddNote);