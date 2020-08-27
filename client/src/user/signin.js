
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Signin extends Component {
    constructor(){
        super()
        this.state = {
            
            email:"",
            password:"",
            error:"",
            redirectToRefer: false,
            loading:false
        }
    }

    handleChange = (name) =>(event) =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value})
    }

    signin = (user) =>{
       
        return fetch( `/signin`,{
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



    authenticate =(jwt,next) =>{
        if(typeof window !=="undefined"){
            localStorage.setItem("jwt",JSON.stringify(jwt))
            next()
        }
    }
    

    clickSubmit = event =>{
        event.preventDefault()
        this.setState({loading:true})
        const {  email, password } = this.state
        const user = {
          
            email,
            password
        }
        console.log(user)
       this.signin(user)
       .then(data=>{
           if(data.error) {this.setState({error:data.error,loading:false})}
           else {
               //authenticate user
               //store token in local storage
               this.authenticate(data,() =>{
                    //redirect
                   this.setState({redirectToRefer: true})
               })
              
           }
       })
    }

  
signInForum = (email,password)=>(
    <form>
      
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
        const { email, password,error,redirectToRefer , loading} = this.state

       
        if (redirectToRefer) {
            return <Redirect to="/" />;
        }
        return (
           
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
                <div className="alert alert-danger" style={{display:error ? " ":"none"}}>
                    { this.state.error}

                </div>
              
                {loading ?( <div className="jumbotron text-center">
                    <h2>loading...</h2>
                    </div>):("")}
                {this.signInForum(email,password)}

            </div>
        )
    }
}
export default Signin

