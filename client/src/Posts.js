import React, { useState, useLayoutEffect, useRef} from 'react';
import Moment from 'react-moment';
import ThumbsUp from './icons/thumbs_up.png'
import Share from './icons/share.svg'
import Likes from './Likes'
import { RWebShare } from "react-web-share";

const Posts = ({  members, posts, modifyTrigger, onLike }) =>  {
    const[load, setLoad] = useState(5)
    const[show, setShow] = useState(null)
    const[expand, setExpand] = useState([])
    function onInnerLike() {
        onLike()
    }
   
    const refs = useRef([])
    function showMore(index){
        if(show === null) {
            setShow(index)
            
        }
            else{ 
           
            handleScroll(index)
            setShow(null)
            }
    }
    function handleScroll(i) {
       refs.current[i].scrollTop = 0
       console.log(refs.current[i])
    }
    
    useLayoutEffect(() => {
    
     const refArray = refs.current.map((e) => e.clientHeight < e.scrollHeight)
     setExpand(refArray)
      
  }, [refs.current, load >= 5])
  
    const post = posts.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
                .map((e, i) => 
    
    {   
   
        let name 
        let role
        let avatar
        for (let j = 0; j < members.length; j++) {
            if (members[j].id == e.id) {
                name = members[j].firstName + ' ' + members[j].lastName
                role = members[j].role
                avatar = members[j].avatar
                break
            }
        }
       
        return (
        <div className="single_post" id={ show == i ? "expand" : ""} key={i} >
            <div className= "posts_top_section">
                <img src={require('./media/'.concat(avatar))} className="profile_image" alt="avatar" />
                <div className="posts_info">
                    <div className= "posts_info_name"> {name} </div> <br/>
                    <div className= "posts_info_role"> {role} </div>
                </div>
             <Moment fromNow>{e.timeStamp}</Moment> <br/>    
            </div>

            <div className="text-post">
                <div className="text" ref={el => refs.current[i] = el}>{e.post}</div>
                <div className="post_likes">
                    <div className="likes_container"><img className="icon" src={ThumbsUp} alt="likes"/>{e.likes}</div>
                    <span className="show_more" onClick={() => showMore(i)}>{expand[i] === false ? '' : show == i ?  "...show less" : "...show more"}</span>
                </div>
                    
            </div> 
            <div className="post_subsection"> 
                <Likes postid={e.postId} id={e.id} posts={posts} likedby={e.likedBy} likes={e.likes} onLike={onInnerLike} />
                <div className="share">
                    <RWebShare  
                        data={{
                            text: e.post,
                            title: "Share"
                        }}
                        onClick={() => console.log("shared successfully!")}>
                        <button><img className="icon" src={Share} alt="Share" title="Share"/></button>
                    </RWebShare>Share      
                 </div>
            </div> 
        
        </div>)
    })
    
    return (
        <>
            {post.slice(0,load)}
            <button className="btn load" onClick={() => load >= 5 && load <= post.length ? setLoad(load+5) : load > post.length ? setLoad(5) : load} >{load <= post.length ? "Load more" : "Show less"}</button>
        </>
    )
}

export default Posts

