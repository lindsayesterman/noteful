import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Folder from './folder.js'
import NotesContext from './notesContext'
import PropTypes from 'prop-types'

export default class FolderList extends React.Component{

static contextType = NotesContext;

      render(){
        const { folders=[] } = this.props
        return(
        <section className='folder-list'>
            {folders.map(folder =>
                <ul key={folder.id}>
                <NavLink to={`/folders/${folder.id}`}
                 style={{ textDecoration: 'none' }}>
                  <Folder 
                    key={folder.id}
                    {...folder}
                  />  
              </NavLink>
              </ul>
              )}
          <Link to={'/addFolder'} className="add-note">
              Add Folder
              </Link>
        </section>
      );
    }
  }

  FolderList.propTypes = {
    folder: PropTypes.object
  };