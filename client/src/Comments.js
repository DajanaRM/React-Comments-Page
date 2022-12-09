import React, {useCallback, useState} from 'react';
const Filter = require('bad-words');
const filter = new Filter()


const Comment = ({ postId, onSuccess }) =>  {
    const[newPost, setNewPost] = useState('')
    
    function handlePost() {
    
        fetch("http://localhost:3001/api", {
            headers : { 
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({
                "post": filter.clean(newPost)
  
            })
        })
        .then(function (response) {
              if (!response.ok) {
                 const error = new Error(response.message)
                  throw error
              } else {
                  setNewPost('')
                  onSuccess()
                  
              }
              
        })
        .catch((error) => {
                console.log(error)
        })

}

    return( 
             <form method="post" onSubmit={() => {return false}} className="write_post">    
                <div className="comment">
                    <textarea autoFocus value={newPost} maxLength={500} minLength={10} onChange={(e) => setNewPost(e.target.value) } className="comment_text" placeholder="Share something..."/>
                </div>
                <div className="btn_container">
                    <button className="btn" type="button" onClick={() => handlePost()}>
                        Post
                    </button>
                </div>
            </form>
    )
   
}

export default Comment

