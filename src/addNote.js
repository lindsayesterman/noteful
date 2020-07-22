import React from 'react';
import { withRouter } from 'react-router-dom';

class AddNote extends React.Component{
    static defaultProps = {
        onAddNote: () => {}
    };
    
    render(){
        return(
            <div>
                <h1>hey</h1>
            </div>
        )
    }
}

export default withRouter(AddNote);