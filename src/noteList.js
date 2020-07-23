import React from 'react';
import Note from './note.js'
import { Link } from 'react-router-dom';


class NoteList extends React.Component {
    static defaultProps = {
      notes: []
    };

    render() {
    const { notes } = this.props
    console.log(notes)
      return (
        <section className='note-list'>
          <h2>This is the note list</h2>
          <Link to={'/'}>
          <ul>
            {notes.map(note =>
              <Note
                key={notes.id}
                {...note}
              />
            )}
          </ul>
          </Link>
            <Link to={'/addNote'} className="add-note">
              Add Note
              </Link>
        </section>
      );
    }
  }
  
  export default NoteList;
  