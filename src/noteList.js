import React from 'react';
import Note from './note.js'
import { Link } from 'react-router-dom';

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
             <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
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

  export default NoteList;