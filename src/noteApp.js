import React, { Component } from 'react';
import FolderList from './folderList.js';
import NoteList from './noteList.js'
import AddNote from './addNote.js'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddFolder from './addFolder.js';
import NotePage from './notePage.js';
import {getNotesForFolder} from './notes-helpers';
import NotesContext from './notesContext.js'
import config from './config'
import store from './store.js'
import NoteError from './noteError';

const { notes, folders } = store

class NoteApp extends Component{
    state = {
        notes: [],
        folders: [],
    };


    componentDidMount() {
      Promise.all([
          fetch(`${config.API_ENDPOINT}/notes`),
          fetch(`${config.API_ENDPOINT}/folders`)
      ])
          .then(([notesRes, foldersRes]) => {
              if (!notesRes.ok)
                  return notesRes.json().then(e => Promise.reject(e));
              if (!foldersRes.ok)
                  return foldersRes.json().then(e => Promise.reject(e));

              return Promise.all([notesRes.json(), foldersRes.json()]);
          })
          .then(([notes, folders]) => {
              this.setState({
                notes, 
                folders
              });
          })
          .catch(error => {
              console.error({error});
          });
  }
  
      handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    render(){
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote
    };
    
        return(
          <NotesContext.Provider value={value}>
            <div>
            <header>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <h1>Noteful</h1>
            </Link>
            </header>
            <Route
              path='/addFolder'
              component={AddFolder}
                />

              <Route
              path='/addNote'
              component={AddNote}
               />
              <Route
                path='/note/:noteId'
                component={NotePage}
                /> 
              {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    render={routeProps => {
                        const {folderId} = routeProps.match.params;
                        const notesForFolder = getNotesForFolder(
                            notes,
                            folderId
                        );
                        return (
                          <>
                          <NoteError>
                          <FolderList
                                  {...routeProps}
                                  folders={folders}
                              />
                            <NoteList
                                  {...routeProps}
                                  notes={notesForFolder}
                              />
                            </NoteError>
                          </>
                        );
                    }}
                />
            ))}
        </div>
       </NotesContext.Provider>
        )
    }
}


export default NoteApp