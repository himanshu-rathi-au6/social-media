
import React, { Component } from 'react'
import {Link} from "react-router-dom"


class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            error:""
        }
    }

    handleChange = (name) =>(event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value})
    }
    

    clickSubmit = event =>{
        event.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name,
            email,
            password
        }
        //console.log(user)
       this.signup(user)
       .then(data=>{
           if(data.error) this.setState({error:data.error})
           else this.setState({
               error:"",
               name:"",
               email:"",
               password:"",
               open:true
           })
       })
    }
//signup
signup = (user) =>{
    return fetch(`/signup`,{
         method : "POST",
         headers : {
             Accept :"application/json",
             "Content-Type" :"application/json"
         },
         body:JSON.stringify(user)
     })
     .then(response =>{
         return response.json()
     })
     .catch(err => console.log(err))
  }



signupForm = (name,email,password)=>(
    <form>
                    <div className="form-group">
                        <label className="text-muted"> Name

                        </label>
                        <input onChange ={this.handleChange("name")} value={name} type="text" className="form-control">
                        
                        </input>

                    </div>
                    <div className="form-group">
                        <label className="text-muted"> Email

                        </label>
                        <input  onChange ={this.handleChange("email")}  value={email} type="email" className="form-control"/>
                        
                       

                    </div>
                    <div className="form-group">
                        <label className="text-muted"> Password

                        </label>
                        <input  onChange ={this.handleChange("password")}  value={password} type="password" className="form-control"/>
                        
                       <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">submit</button>

                    </div>
                    </form>
)





    render() {
        const {name , email, password,error,open} = this.state
        return (
           
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-primary" style={{display:error ? " ":"none"}}>
                    { this.state.error}

                </div>
                <div className="alert alert-info" style={{display:open ? " ":"none"}}>
                    New account is succesfully created 
                    please <Link to="/signin"> Sign In</Link>

                </div>
                {this.signupForm(name,email,password)}

            </div>
        )
    }
}
export default Signup

