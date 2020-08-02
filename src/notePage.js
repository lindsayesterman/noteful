import React from 'react';
import NotesContext from './notesContext'
import { findNote } from './notes-helpers'
import Note from './note'

class NotePage extends React.Component{
    static defaultProps = {
        match: {
          params: {}
        }
      }

      handleDeleteNote = noteId => {
        this.props.history.push(`/`)
      }
    
      static contextType = NotesContext;

    render(){
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
       return(
           <div className="note-page">
            <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
       )
    }
   }

   export default NotePage;