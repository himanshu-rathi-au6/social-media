import React, { Component } from 'react'
import {isAuthenticated} from "../auth/index"
import {read,update,updateUser} from "./apiUser"
import { Redirect } from 'react-router-dom'
import DefaultProfile from "../images/user.jpg"

 class EditProfile extends Component {
     constructor(){
         super()
         this.state={
             id:"",
             name:"",
             email:"",
             password:"",
             redirectToprofile:false,
             error:"",
             fileSize:0,
             loading:false,
             about:""
         }

     }
    init = (userId) =>{
        const token = isAuthenticated().token
         read(userId,token)
        .then (data =>{
            if(data.error){
                this.setState({redirectToprofile:true})
            }else{this.setState({id:data._id,
                name:data.name,
                email:data.email,
                error:"",
                about:data.about
            })}
        })
    
    }
    
    
    
    
    
        componentDidMount(){
            this.userData = new FormData()
          const userId = this.props.match.params.userId
          this.init(userId)
         
        }
isValid = () =>{
    const{name,email,password} =this.state
    if(name.length ===0){
        this.setState({error:"NAme is required",loading:false})
    }
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)){
        this.setState({error:"email is not valid",loading:false})
    }
    if(password.length >=1 && password.length<=5){
        this.setState({error:"Password must be 6 character long",loading:false})
        return false
    }
    return true
}


        handleChange = (name) =>(event) =>{
            const value = name==='photo' ? event.target.files[0]:event.target.value
            this.userData.set(name,value)
            this.setState({[name]:value})
        }
        
    
        clickSubmit = event =>{
            event.preventDefault()
            this.setState({loading:true})
            if (this.isValid()){
             
           
            //    this.signup(user)
            const userId = this.props.match.params.userId
            const token = isAuthenticated().token
               update(userId,token, this.userData).then(data=>{
                   if(data.error) this.setState({error:data.error})
                   else
                   updateUser(data,()=>{ this.setState({
                    redirectToprofile:true}) 
                  
                   })
                       
                   
               })
            }

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
        
        signupForm = (name,email,password,about)=>(
            <form>
                 <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>



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
                                <label className="text-muted"> About
        
                                </label>
                                <textarea onChange ={this.handleChange("about")}  value={about} type="email" className="form-control"/>
                                
                               
        
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
        const {id, name,email,password,redirectToprofile,error,loading,about}=this.state
        if(redirectToprofile){
            return <Redirect to={`/singleUser/${id}`}/>
        }
       const photoUrl = id ? `/singleUser/photo/${id}}?${new Date().getTime()}`: DefaultProfile

        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Edit profile</h2>
            <div className="alert alert-danger" style={{display:error ? " ":"none"}}>
                    { this.state.error}

                </div>
                {loading ?( <div className="jumbotron text-center">
                    <h2>loading...</h2>
                    </div>):("")}
                
               <img style ={{height :"200px",width:"auto"}} className="img-thumbnail" src={photoUrl} onError= {i =>(i.target.src =`${DefaultProfile}`)} alt={name} />
           
               {this.signupForm(name,email,password,about)} </div>
        )
    }
}
export default EditProfile
