import React from 'react';
import config from './config';
import NotesContext from './notesContext'
import PropTypes from 'prop-types'

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
  const { note_name, date_created } = this.props
        return(
            <li className='note'>
                <h3>{note_name}</h3>
                <p>{date_created}</p>
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

Note.propTypes = {
  date_created: PropTypes.string,
  id: PropTypes.string,
  note_name: PropTypes.string.isRequired,
  note_content: PropTypes.string.isRequired,
  handleDelete: PropTypes.func
};


