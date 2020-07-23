import React from 'react';
import Folder from './folder.js'
import folders from './store.js'
import { Link, Route } from 'react-router-dom';
import AddNote from './addNote';


class NoteList extends React.Component {
    static defaultProps = {
      folders,
    };

    render() {
 
    const { folders } = this.props
      return (
        <section className='folder-list'>
          <Link to={'/'}>
          <ul>
            {folders.map(folder =>
              <Folder
                key={folders.id}
                {...folder}
              />
            )}
          </ul>
          </Link>
          <Link to={'/addNote'} className="add-note">
              Add Folder
              </Link>
        </section>
      );
    }
  }
  
  export default NoteList;
  