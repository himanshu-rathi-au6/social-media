import React, { Component } from 'react'
import {isAuthenticated} from "../auth/index"
import { Redirect , Link} from 'react-router-dom'
import {read} from "./apiUser"
import DefaultProfile from "../images/user.jpg"
import DeleteUser from './DeleteUser'
class profile extends Component {
    constructor(){
        super()
        this.state = {
            user:"",
            redirectToSignIn:false
        }
    }

   
init = (userId) =>{
    const token = isAuthenticated().token
     read(userId,token)
    .then (data =>{
        if(data.error){
            this.setState({redirectToSignIn:true})
        }else{this.setState({user:data})}
    })

}





    componentDidMount(){
      const userId = this.props.match.params.userId
      this.init(userId)
     
    }
    

    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        this.init(userId)
       
      }

    render() {
        const photoUrl = this.state.user._id ? `/singleUser/photo/${this.state.user._id }}?${new Date().getTime()}`: DefaultProfile

        const{ redirectToSignIn, user} = this.state
        if(redirectToSignIn)  return <Redirect to="/signin/"/>
        return (
            <div className="container">
                <div className="row">
                   <div className="col-md-6">
                   <h2 className="mt-5 mb-5">Profile</h2>
                   <img style ={{height :"200px",width:"auto"}} className="img-thumbnail" src={photoUrl}  onError= {i =>(i.target.src =`${DefaultProfile}`)} alt={this.state.user.name} />


                  
                   </div>
                   <div className="col-md-6">
                    {isAuthenticated().user && isAuthenticated().user._id === user._id&&(
                        <div className="d-inline-block mt-5">
                            <Link className ="btn btn-raised btn-success mr 5" to={`/singleUser/edit/${user._id}`}>
                            Edit Profile
                            </Link>
                           <DeleteUser userId={user._id}/>
                            <div className="lead mt-5 ml-5">
    <p>  My Name:  {user.name} </p>
                   <p>  My Email {user.email} </p>
                    <p>About me : {user.about}</p>

                   <p> i joined Lokvichar on:   {`Joined ${new Date(user.created).toDateString()}`} </p>

    </div>

                            </div>
                    )}
                   </div>

                   </div>

                   

                   </div>
          
        )
    }
}
export default profile