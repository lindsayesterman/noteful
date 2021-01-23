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
import NoteError from './noteError';


class NoteApp extends Component{
    state = {
        notes: [],
        folders: [],
        error: null
    }

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
              this.setState({ error })
              console.error({error});
          });
  }
  
      handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
        console.log("handleDeleteNote is called")
    };

    setNotes = notes => {
      this.setState({
        notes
      })
    }

    setFolder = folders => {
      this.setState({
        folders
      })
    }
  
    addNote = note => {
      this.setState({
        note: [ ...this.state.notes, note ],
        notes: [...this.state.notes, note]
      })
    }


    addFolder = folder => {
      this.setState({
        folder: [ ...this.state.folders, folder ],
      })
    }

    render(){
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        addFolder: (folder) => {
          this.setState({
            folder
          })
        },
        addNote: (note) => {
          this.setState({
            note
          })
        },
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
            <NoteError>
            <Route
              path='/addFolder'
              render={routeProps => {
                return(
                  <AddFolder
                    {...routeProps}
                    /> 
                )
            }}               
             />
            </NoteError>
            <NoteError>
              <Route
              path='/addNote'
              render={routeProps => {
                  return(
                    <AddNote
                      {...routeProps}
                      folders={value.folders}
                      /> 
                  )
              }}
               />
            </NoteError>
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
                          value.notes,
                          parseFloat(folderId)
                        );
                        console.log(value.notes, folderId, notesForFolder);
                        return (
                          <>
                          <FolderList
                                  {...routeProps}
                                  folders={value.folders}
                              />
                            <NoteList
                                  {...routeProps}
                                  notes={notesForFolder}
                              />
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