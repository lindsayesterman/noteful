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
import config from './config'

const  { notes, folders } = store


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

    render(){
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        addNote: this.addNote,
        deleteNote: this.deleteNote
    };
    
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