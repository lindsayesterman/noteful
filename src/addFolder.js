import React from 'react';
import { withRouter } from 'react-router-dom';

class AddFolder extends React.Component{
    static defaultProps = {
        onAddFolder: () => {}
    };
    
    render(){
        return(
            <div>
                <form>
                    <label for="folder-name">Folder Name</label>
                    <input id="folder-name" type="text"></input>
                </form>
                <button type="submit">Add Note</button>
            </div>
        )
    }
}

export default withRouter(AddFolder);