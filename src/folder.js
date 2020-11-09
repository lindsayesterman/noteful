import React from 'react';

export default class Folder extends React.Component{
    render(){
        return(
            <li className='folder'>
                <h3>{this.props.folder_name}</h3>
                </li>
        )
    }
}
