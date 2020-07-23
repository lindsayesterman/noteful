import React from 'react';

export default function Note(props){
        return(
            <li className='note'>
                <h3>{props.name}</h3>
                <p>{props.modified}</p>
                <button type="delete">
                    Delete
                </button>
            </li>
        )
}
