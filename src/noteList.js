import React from 'react';
import Note from './note.js'
import { Link } from 'react-router-dom';
import NotesContext from './notesContext';

class NoteList extends React.Component {
  static defaultProps = {
    notes: []
  };
    render() {
      const { notes } = this.props
      return (
        <section className='note-list'>
          <ul>
            {notes.map(note =>
             <Link to={`/note/${note.id}`}>
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
  