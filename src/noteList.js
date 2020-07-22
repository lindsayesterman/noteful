import React from 'react';
import Note from './note.js'
import { Link } from 'react-router-dom';


class NoteList extends React.Component {
    static defaultProps = {
      notes: []
    };

    render() {
    const noteLocation = this.props.notes.LOCATION
    ? this.props.notes.LOCATION.split(',')
    : [];
    const { notes } = this.props
      return (
        <section className='note-list'>
          <h1>This is the note list</h1>
          <Link to={'/'}>
          <ul>
            {noteLocation.map(note =>
              <Note
                key={notes.id}
                {...note}
              />
            )}
          </ul>
          </Link>
            <Link to={'/addNote'}>
              Add Note
              </Link>
        </section>
      );
    }
  }
  
  export default NoteList;
  