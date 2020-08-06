import React from 'react';
import config from './config';
import NotesContext from './notesContext'

class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }

  static contextType = NotesContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }


render(){
  const { name, modified } = this.props
        return(
            <li className='note'>
                <h3>{name}</h3>
                <p>{modified}</p>
                <button
                 type='button'
                 onClick={this.handleClickDelete}>
               Delete 
              </button>
            </li>
        )
     }
}


export default Note; 
