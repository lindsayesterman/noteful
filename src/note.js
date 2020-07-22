import React from 'react';

export default function Note (props){
        return(
            <li className='note'>
                <p>{props.name}</p>
                {console.log(props.name)}
                <p>{props.modified}</p>
                <button type="delete">
                    Delete
                </button>
            </li>
        )
}
