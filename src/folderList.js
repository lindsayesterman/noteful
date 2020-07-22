import React from 'react';
import Folder from './folder.js'
import folders from './store.js'
import { Link } from 'react-router-dom';


class NoteList extends React.Component {
    static defaultProps = {
      folders,
    };

    render() {
    const folderLocation = this.props.folders.LOCATION
    ? this.props.folders.LOCATION.split(',')
    : [];
    const { folders } = this.props
      return (
        <section className='folder-list'>
            <h1>This is the folder list</h1>
          <Link to={'/'}>
          <ul>
            {folderLocation.map(folder =>
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
  