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
import NotesContext from './notesContext.js'

const  { folders, notes } = store


class NoteApp extends Component{
    state = {
        notes: [],
        folders: [],
    };

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

      deleteNote = noteId => {
            const newNotes = this.state.notes.filter(n =>
              n.id !== noteId
            )
            this.setState({
              notes: newNotes
            })
          }

      renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={FolderList}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePage} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }


      renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteList}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePage} />
            </>
        );
    }

    render(){
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        addNote: this.addNote,
        deleteNote: this.deleteNote
    };
    
        return(
            <div>
                <NotesContext.Provider>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
                </NotesContext.Provider>
            </div>
        )
    }
}


export default NoteApp