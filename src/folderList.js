import React from 'react';
import Folder from './folder.js'
import folders from './store.js'
import { Link } from 'react-router-dom';


class NoteList extends React.Component {
    static defaultProps = {
      folders,
    };

    render() {
 
    const { folders } = this.props
      return (
        <section className='folder-list'>
            <h2>This is the folder list</h2>
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
        </section>
      );
    }
  }
  
  export default NoteList;
  