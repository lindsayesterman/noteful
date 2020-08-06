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
    const note = findNote(notes, noteId) || { content: '' }
    const folder = findFolder(folders, note.folderId) || { h3: ''}
       return(
           <div className="note-page">
            <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
             <h3>{folder.name}</h3>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
       )
      }
   }

   export default NotePage;

   NotePage.defaultProps = {
    note: {
      content: ''
    }
  };
  
    NotePage.propTypes = {
      noteId: PropTypes.string
    };