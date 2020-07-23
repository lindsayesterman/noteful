import React from 'react';
import Folder from './folder.js'
import { Link } from 'react-router-dom';
//import { NavLink } from 'react-router-dom';

class FolderList extends React.Component {
    static defaultProps = {
      folders: []
    };

  render() {
    const { folders } = this.props
      return (
        <section className='folder-list'>
          <ul>
            {folders.map(folder =>
              <Folder
                key={folders.id}
                {...folder}
              />
            )}
          </ul>
          <Link to={'/addFolder'} className="add-note">
              Add Folder
              </Link>
        </section>
      );
    }
  }
  
  export default FolderList;
  