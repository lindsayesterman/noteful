import React from 'react';

export default function Note(props){
        return(
            <div>
            <li className='note'>
                <p>{props.name}</p>
                <p>{props.modified}</p>
            </li>
                <button type="delete">
                    Delete
                </button>
            </div>
        )
}
