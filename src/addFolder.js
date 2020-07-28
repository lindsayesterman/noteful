import React from 'react';
import { withRouter } from 'react-router-dom';

class AddFolder extends React.Component{
    static defaultProps = {
        onAddFolder: () => {}
    };
    
    render(){
        const { onClickCancel } = this.props
        return(
            <div>
                <form>
                    <label for="folder-name">Folder Name</label>
                    <input id="folder-name" type="text"></input>
                </form>
                <button type='button' 
                onClick={onClickCancel}>
                 Go back
                 </button>                
                 <button type="submit">Add Folder</button>
            </div>
        )
    }
}

export default withRouter(AddFolder);