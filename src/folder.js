import React from 'react';

export default function Folder (props){
    return(
        <div>
          <li className='folder'>
              <h3>{props.name}</h3>
            </li>
        </div>
    )
}
