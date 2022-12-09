import EditUser from './EditUser'

const User = ({ members, posts}) =>  {
    const path = window.location.pathname
    members = members.filter((e) => path.includes(e.id))[0]
    posts = posts.filter((e) => e.id === members.id) 
    const likes = posts.map((e) => e.likes).reduce((a, b) => a + +b, 0)
    const numberOfPosts = posts.length
    const name = members.firstName.concat(' ').concat(members.lastName)
    const role = members.role
    
    return (
        <div className="profile">
            <div className= "profile_top_section">
            <EditUser 
                    firstName={members.firstName}
                    lastName={members.lastName}
                    role = {role} 
                    id={members.id}
                />
                <div>
                <img src={require('./media/'.concat(members.avatar))} className="profile_image" alt="avatar" />
                
                </div>
                    <div className= "user_name"> {name}<br/> {role} </div>
                
                </div>
                <div className="profile_bottom_section">
                    <div className="likes">
                        <div className="number">
                        {likes}<br/> 
                        </div>
                        <div className="subsection"> Likes 
                        </div>
                    </div>
                    <div className="likes">
                        <div className="number">
                        {numberOfPosts} <br/> 
                        </div>
                        <div className="subsection"> Posts 
                        </div>
                    </div>
            </div>
        </div>
    )
    
}

export default User