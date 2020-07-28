import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Folder from './folder.js'
import NotesContext from './notesContext';

class FolderList extends React.Component{
static defaultProps = {
  folders:[]
}
      render(){
        const { folders } = this.props
        return(
        <section className='folder-list'>
          <ul>
            {folders.map(folder =>
                <div key={folder.id}>
                <NavLink to={`/folder/${folder.id}`}>
                  <Folder 
                    key={folder.id}
                    {...folder}
                  />  
              </NavLink>
              </div>
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