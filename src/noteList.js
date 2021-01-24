import React from 'react';
import Note from './note.js'
import { Link } from 'react-router-dom';
import NotesContext from './notesContext'
import PropTypes from 'prop-types'

class NoteList extends React.Component {
 
  static contextType = NotesContext;

    render() {
      const { notes=[] } = this.props
      return (
        <section className='note-list'>
          <ul>
            {notes.map(note =>
             <Link 
             to={`/notes/${note.id}`}
             style={{ textDecoration: 'none' }}
             key={note.id}>
              <Note
                key={note.id}
                ondeleteNote={this.deleteNote}
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

  Note.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object)
  };

  export default NoteList;