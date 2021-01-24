import React from 'react'
import NotesContext from './notesContext'
import config from './config'

class AddFolder extends React.Component{
    state = {
        error: null,
      }
    
    static contextType = NotesContext

    handleFolderSubmit = (e) => {
        e.preventDefault()
        const folder  = {
            folder_name: e.target['folderName'].value,
        }
        this.setState({error:null})
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
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
            this.context.addFolder(data)
            this.props.history.push('/')
        })
        .catch(error=>{
            this.setState({ error })
        })
    }
        
    handleClickCancel = () => {
        this.props.history.push('/')
      }

    render(){
        const { error } = this.state
        return(
            <div className="add-note-form">
                <form onSubmit={this.handleFolderSubmit}>
                    <div className='error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <label htmlFor="folderName">Folder Name</label>
                    <input 
                    id="foldeName" 
                    type="text"
                    name='folderName'
                    placeholder="Name of new Folder"
                    required>
                    </input>
                <button type='button' 
                onClick={this.handleClickCancel}>
                    Go back
                </button>                
                <button 
                type="submit">
                    Add Folder
                </button>
                </form>
            </div>
        )
    }
}

export default AddFolder