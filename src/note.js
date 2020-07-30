import React from 'react';
import config from './config.js'
import NotesContext from './notesContext';

function deleteNoteRequest(noteId, callback) {
  fetch(config.API_ENDPOINT + `/${noteId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function Note(props){
        return(
          <NotesContext.Consumer>
      {(context) => (
            <li className='note'>
                <h3>{props.name}</h3>
                <p>{props.modified}</p>
                <button
              onClick={() => {
                deleteNoteRequest(
                  props.id,
                  context.deleteNote,
                )
              }}
             >
               Delete 
              </button>
            </li>
            )}
          </NotesContext.Consumer>
        )
}
