import React from 'react'
import NotesContext from './notesContext'
import config from './config'

class AddNote extends React.Component{
    state = {
        error: null,
      }

    static contextType = NotesContext

    handleNoteSubmit = (e) => {
        e.preventDefault()
        const note  = {
            note_name: e.target['noteName'].value,
            note_content: e.target['noteContent'].value,
            folder_id: e.target['noteFolder'].value,
            date_created: new Date(),
        }
        this.setState({error:null})
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
                headers: {
                    'content-type': 'application/json'
                }
        })
          .then(res => {
            if (!res.ok){
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then (data => {
            this.context.addNote(data)
            this.props.history.push('/')
            window.location.href=`/`
        })
        .catch(error=>{
            this.setState({ error })
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render(){
        const { folders=[] } = this.props
        const { error } = this.state
        return(
            <div  className="add-note-form">
                <form onSubmit={this.handleNoteSubmit}>
                <div className='error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <label htmlFor="noteName">Name</label>
                    <input 
                    id="noteName" 
                    name="noteName" 
                    type="text"
                    placeholder="Name of note"
                    required>
                    </input>
                    <label htmlFor="noteContent">Content</label>
                    <input 
                    id="noteContent" 
                    name="noteContent" 
                    type="text"
                    placeholder="Content of note"
                    required></input>
                    <select 
                    id='noteFolder' 
                    name='noteFolder'>
                    {folders.map(folder =>
                        <option 
                        key={folder.id} 
                        value={folder.id}>
                        {folder.folder_name}
                        </option>
                    )}
                    </select>                   
                <button type='button' 
                onClick={this.handleClickCancel}>
                  Go back
                 </button>
                <button 
                type="submit">
                     Add Note
                </button>
                </form>
            </div>
        )
    }
}

export default AddNote