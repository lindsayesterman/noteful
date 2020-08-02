import React from 'react';
import Note from './note.js'
import { Link } from 'react-router-dom';
import NotesContext from './notesContext';
import { getNotesForFolder } from './notes-helpers'

class NoteList extends React.Component {
 
  static contextType = NotesContext;

    render() {
      const { notes=[] } = this.props
      const {folderId} = this.props.match.params;
      const notesForFolder = getNotesForFolder(
          notes,
          folderId
      );
      return (
        <section className='note-list'>
          <ul>
            {notes.map(note =>
             <Link to={`/note/${note.id}`}
             style={{ textDecoration: 'none' }}>
              <Note
                key={note.id}
                {...note}
              /> 
              </Link>
            )}
        </ul>
            <Link to={'/addNote'} className="add-note">
              Add Note
              </Link>
        </section>
      );
    }
  }

  export default NoteList;
  