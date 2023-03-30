import "./Form.css"
import { useState } from "react"
import { toast } from 'react-toastify'

const Form = (props) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        accessAllowed: false,
        hiredSince: ""
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }  

    const handleCheckboxChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.checked
        })
    }

    const formSubmit = (event) => {
        event.preventDefault()

        const getLastID = () =>{
           let lastID = props.data[props.data.length - 1].uid
           return parseInt(lastID)
        }

        const usernames = props.data.map( (row) => {
            return row.username
        })

        if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) { 
            toast("invalid phone number") 
        } else if (formData.email && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData.email)) {
            toast("invalid email")
            // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
        } else if (formData.username && usernames.indexOf(formData.username) > -1) {
            toast("invalid username")
        } else {
            const item = {
                "uid": getLastID() + 1,
                "first name": formData.firstName,
                "last name": formData.lastName,
                "username": formData.username,
                "email": formData.email,
                "phone number": formData.phoneNumber,
                "access allowed": formData.accessAllowed.toString(),
                "hired since": formData.hiredSince ? `${formData.hiredSince}:00Z` : "" 
            }
    
            props.setData([
                ...props.data,
                item
            ])

            setFormData({
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                phoneNumber: "",
                accessAllowed: false,
                hiredSince: ""
            })
            
            props.hideForm()

            toast.success("Saved!")
        }
    }

    return props.showForm && <div className="fixed-form" ref={props.refForm}>
        
        <form className="hidden-form" onSubmit={formSubmit}>
            <h2 className="form-h2">Add new entry</h2>
            <span className="exit-button" onClick={props.hideForm}>X</span>
            <div className="item">
                <label htmlFor="firstName">first name: </label>
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="first name"
                  onChange={handleChange}
                  value={formData.firstName}
                />
            </div>
            <div className="item">
                <label htmlFor="lastName">last name: </label>
                <input 
                  type="text" 
                  id="lastName"
                  placeholder="last name"
                  onChange={handleChange}
                  value={formData.lastName}
                />
            </div>
            <div className="item">
                <label htmlFor="username">username: </label>
                <input 
                  type="text" 
                  id="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={formData.username}
                />
            </div>
            <div className="item">
                <label htmlFor="email">email: </label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="email"
                  onChange={handleChange}
                  value={formData.email}
                />
            </div>
            <div className="item">
                <label htmlFor="phoneNumber">phone number: </label>
                <input 
                  type="text" 
                  id="phoneNumber"
                  placeholder="phone number"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
            </div>
            <div className="item">
                <label htmlFor="accessAllowed">access allowed: </label>
                <input 
                  type="checkbox" 
                  id="accessAllowed"
                  placeholder="access allowed"
                  onChange={handleCheckboxChange}
                  checked={formData.accessAllowed}
                />
            </div>
            <div className="item">
                <label htmlFor="hiredSince">hired since: </label>
                <input 
                  type="datetime-local"
                  id="hiredSince"
                  placeholder="hired since"
                  onChange={handleChange}
                  value={formData.hiredSince}
                />
            </div>
            <div>
                <input className="hidden-form-submit" type="submit" value="Send"/>
            </div>
        </form>
    </div>
}

export default Form
