import React from 'react';
import NotesContext from './notesContext'
import { findNote, findFolder } from './notes-helpers'
import Note from './note'
import PropTypes from 'prop-types'

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
    const { notes=[], folders=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, parseFloat(noteId)) || { note_content: '' }
    const folder = findFolder(folders, parseFloat(note.folder_id)) || { h3: ''}
       return(
           <div className="note-page">
            <Note
          id={note.id}
          note_name={note.note_name}
          note_content={note.note_content}
          date_created={note.date_created}
          onDeleteNote={this.handleDeleteNote}
        />
             <h3>{folder.folder_name}</h3>
          {note.note_content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
       )
      }
   }

   export default NotePage;

   NotePage.defaultProps = {
    note: {
      note_content: ''
    }
  };
  
    NotePage.propTypes = {
      noteId: PropTypes.string
    };