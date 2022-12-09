import {useState} from 'react'
import Edit from './icons/edit.svg'
import Close from './icons/close_icon.svg'



export default function EditUser ({ id, firstName, lastName, role}){
    const[openForm, setOpenForm] = useState()
    const[info, setInfo] = useState({firstname: "", lastname: "", role: ""})
    const message = []

    function HandleEdit() {
            fetch("http://localhost:3001/edit", {
                headers : { 
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                method: 'put',
                mode: 'cors',
                body: JSON.stringify({
                    "firstName": info.firstname,
                    "lastName" : info.lastname,
                    "id": id, 
                    "role": info.role
                })
            })
            .then((response) => {
                response.json()
                if (!response.ok) {
                    const error = new Error(response.message)
                    throw error
                } else {
                    console.log('')
                    message.push('Changed succesfully, click x to exit')
                }
            })
            .catch((error) => {
                    console.log(error)
                })
        
    }
    
return (
    <><img className="edit_icon" src={Edit} onClick={() => setOpenForm(true)} alt="edit"/>
    <form className={ openForm ? "edit_form" : "hidden" } onSubmit={() => {return false}}>
        {message[0]}
        <img src={Close} className="close_icon" onClick={() => setOpenForm(false)} alt="close"/>
        <input onChange={(e) => info.firstname = e.target.value } placeholder={firstName}/>
        <input onChange={(e) => info.lastname = e.target.value } placeholder={lastName}/>
        <input onChange={(e) => info.role = e.target.value } placeholder={role}/>
        <button className="btn load" onClick={() => HandleEdit() }>Save Changes</button>
    </form></>
 )
}