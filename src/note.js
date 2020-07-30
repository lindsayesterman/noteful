import React from 'react';
import config from './config';

function deleteNoteRequest(noteId, cb) {
    fetch(config.API_ENDPOINT + `/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log({ data })
        cb(noteId)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
export default function Note (props){
        return(
            <li className='note'>
                <h3>{props.name}</h3>
                <p>{props.modified}</p>
                <button 
                type="delete"
                onClick={() => {
                    deleteNoteRequest(
                      props.id,
                      props.deleteNote,
                    )
                  }}>
                    Remove
                </button>
            </li>
        )
}

