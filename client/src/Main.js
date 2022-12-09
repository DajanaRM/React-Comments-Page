import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import User from './User'
import Posts from './Posts'
import Comment from './Comments'

function Profile() {
    
    const[members, setMembers] = useState('');
    const[posts, setPosts] = useState('');
    const[render, setRender] = useState({counter: 0})
    
    function increase() {
        setRender({counter: render.counter + 1})
    } 
    
    useEffect(() => {
        
        fetch("http://localhost:3001/api", {
            headers : { 
                'Content-Type': 'application/json',
                Accept: 'application/json',
                type: 'GET',
                dataType: "jsonp"
            }})
            .then(function (response) {
                  if (!response.ok) {
                     const error = new Error(response.message)
                      throw error
                  } else {
                      return response.json()
                  }
            })
            
            .then((dat) => {
                const members = dat.members
                const posts = dat.posts
                setMembers(members)
                setPosts(posts)
                
            })
            .catch((error) => {
                console.log(error)
            })
    }, [render])
  const currentUser = Object.values(members).filter((e) => window.location.pathname.includes(e.id)).map((a) =>  a.firstName.concat(' ').concat(a.lastName))[0]
  
if (members) return (
    <div className="App">
        <Header user={currentUser}/>
        <Footer />    
        <div className= "main">
            <User
                members={members} 
                posts={posts}
                modifyTrigger={render}
            />
            
            <div className="posts" >
                <Comment onSuccess={increase} />
                <Posts
                    members={members} 
                    posts={posts}
                    modifyTrigger={render}
                    onLike={increase}
                />
            </div>
        </div>         
    </div>           
  );
}

export default Profile;