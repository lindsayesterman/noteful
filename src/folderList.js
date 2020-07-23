import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Folder from './folder.js'


export default function FolderList (props){
      return (
        <section className='folder-list'>
          <ul>
            {props.folders.map(folder =>
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
  
FolderList.defaultProps = {
  folders: []
}
  
  