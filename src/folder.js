import React from 'react';

export default function Folder (props){
    return(
        <div>
          <li className='folder'>
              <h3>{props.name}</h3>
              <button type="delete">
                  Remove
              </button>
            </li>
        </div>
    )
}
