import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function FolderList (props){
      return (
        <section className='folder-list'>
          <ul>
            {props.folders.map(folder =>
                <li key={folder.id}>
                <NavLink to={`/folder/${folder.id}`}>
              {folder.name}
              </NavLink>
              </li>
              )}
            </ul>
          <Link to={'/addFolder'} className="add-note">
              Add Folder
              </Link>
        </section>
      );
    }
  
FolderList.defaultProps = {
  folders: []
}
  
  