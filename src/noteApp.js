import React, { Component } from 'react';
import FolderList from './folderList.js';
import NoteList from './noteList.js'
import store  from './store.js'
import AddNote from './addNote.js'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddFolder from './addFolder.js';
import NotePage from './notePage.js';
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import config from './config'

const  { folders, notes } = store


class NoteApp extends Component{
    state = {
        notes,
        folders
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
              this.setState({notes, folders});
          })
          .catch(error => {
              console.error({error});
          });
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(n =>
        n.id !== noteId
      )
      this.setState({
        notes: newNotes
      })
    }

    setNotes = notes => {
        this.setState({
          notes,
          folders
        })
      }
    
      addNote = note => {
        this.setState({
          notes: [ ...this.state.notes, note ],
        })
      }

      addFolder = folder => {
        this.setState({
          folder: [ ...this.state.folders, folder ],
        })
      }

    render(){
        const { notes, folders  } = this.state
        return(
            <div>
               <header>
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h1>Noteful</h1>
                </Link>
                </header>
                <Route
                  path='/addFolder'
                  render={({ history }) => {
                  return <AddFolder
                  onAddFolder={this.addFolder}
                  onClickCancel={() => history.push('/')}
                   />
                 }}
                />
                 <Route
                  path='/addNote'
                  render={({ history }) => {
                  return <AddNote
                  onAddNote={this.addNote}
                  onClickCancel={() => history.push('/')}
              />
            }}
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
                                <NoteList
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
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
                                <FolderList
                                    {...routeProps}
                                    folders={folders}
                                />
                            );
                        }}
                    />
                ))}
            </div>
        )
    }
}


export default NoteApp