import React, { Component } from 'react';
import FolderList from './folderList.js';
import NoteList from './noteList.js'
import store  from './store.js'
import AddNote from './addNote.js'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

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

    render(){
        const { notes } = this.state
        const { folders } = this.state
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
                  render={() =>
                    <FolderList
                      folders={folders}
                    />}
                />
                <Route
                  exact
                  path='/'
                  render={() =>
                    <NoteList
                      notes={notes}
                    />}
                />
                <Route 
                path='/addNote'
                render={() => 
                <AddNote
                onAddNote={this.addNote}
                />}
                />
            </div>
        )
    }
}


export default NoteApp