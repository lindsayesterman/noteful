import React from 'react';

export default function Folder (props){
    return(
          <div>
          <li className='folder'>
              <p>{props.name}</p>
          </li>
              <button type="delete">
                  Delete
              </button>
          </div>
    )
}
