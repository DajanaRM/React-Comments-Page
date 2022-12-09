import {useState, useEffect} from 'react'
import {ReactComponent as Like} from './icons/like.svg'

export default function Likes ({postid, id, posts, likedby, onLike}){
    let initial
    let isLiked
    const[state, setState] = useState({})
    useEffect(() => {
        if(likedby){
        
         initial = likedby.includes(id)
        }
    else { 
     initial = false
    }
    setState({liked:initial})
    }, [likedby])
 
         
    function HandleLike() {
            fetch("http://localhost:3001/api", {
                headers : { 
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                method: 'put',
                mode: 'cors',
                body: JSON.stringify({
                    "likes": 1, 
                    "id": id, 
                    "postId" : postid
                })
            })
            .then((response) => {
                response.json().then((json) => {
                   
                   isLiked  = json.liked 
                        setState({liked: isLiked})
                })
                
                if (!response.ok) {
                    const error = new Error(response.message)
                    throw error
                } else {
                    onLike()
                }
            })
            .catch((error) => {
                    console.log(error)
                })
        
    }
    
 if(state) return (
     <div className="like">
        <Like className={state.liked ? "icon active" : "icon"} alt="like" title="Like" onClick={() => HandleLike()}/>
        {state.liked ? "Liked" : "Like"}
     </div>
 )
}