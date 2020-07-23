import React, { Component } from 'react';
import FolderList from './folderList.js';
import NoteList from './noteList.js'
import store  from './store.js'
import AddNote from './addNote.js'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddFolder from './addFolder.js';
import NotePage from './notePage.js';


const  { folders, notes } = store

class NoteApp extends Component{
    state = {
        notes,
        folders
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

    render(){
        const { notes, folders  } = this.state
        return(
            <div>
               <header>
              <Link to={'/'}>
                <h1>Noteful</h1>
                </Link>
                </header>
                <Route
                  exact
                  path='/'
                  render={({ history }) => {
                    return <FolderList folders={folders} />
                  }}
                />
                <Route
                  exact
                  path='/'
                  render={({ history }) => {
                    return <NoteList notes={notes} />
                  }}
                />
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
            </div>
        )
    }
}


export default NoteApp