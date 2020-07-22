import React from 'react';

export default function Folder (props){
    return(
        <li className='folder'>
            <p>{props.name}</p>
            {console.log(props.name)}
            <p>{props.modified}</p>
            <button type="delete">
                Delete
            </button>
        </li>
    )
}
