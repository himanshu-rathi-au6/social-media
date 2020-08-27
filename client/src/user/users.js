import React, { Component } from 'react'
import {list} from "./apiUser"
import DefaultProfile from "../images/user.jpg"
import {Link} from "react-router-dom"
class Users extends Component {
    constructor(){
    super()
     this.state ={
         users:[]
     }

    }
    componentDidMount() {
        list().then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({users:data})
            }

        })
    }


    renderUsers = users =>(
        <div className="row">
                   {users.map((user,i)=>(
                       <div className="card col-md-4" key={i}>
                                        <img style ={{height :"200px",width:"auto"}} className="img-thumbnail" src={ `/singleUser/photo/${user._id }`} onError= {i =>(i.target.src =`${DefaultProfile}`)} alt={user.name} 
                            
                       style={{width:"100%",height:"15vw",
                       objectFit:"cover"}}/>
                       <div className="card-body">
                         <h5 className="card-title">{user.name}</h5>
                         <p className="card-text">{user.email}</p>
                         <Link to={`/singleUser/${user._id}`} className="btn btn-raised btn-sm btn-primary">View profile</Link>
                       </div>
                     </div>
                      
                   ))}

               </div>
    )
    render() {
        const {users} = this.state
        return (
            <div className="container">
            <div className="row">
               <div className="col-md-6">
               <h2 className="mt-5 mb-5">Users</h2>
               </div>
               </div>
               {this.renderUsers(users)}
               </div>
        )
    }
}
export default Users
