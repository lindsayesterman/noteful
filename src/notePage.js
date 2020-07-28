import React from 'react';
import store from './store.js'

const { notes } = store
export default function NotePage(props) {
    const note = notes.find(p =>
        p.id === props.match.params.noteId
      )
       return(
           <div>
                <h2>{note.name}</h2>
                <p className="note-content">
                    {note.content}
                </p>
           </div>
       )
   }