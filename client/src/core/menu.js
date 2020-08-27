import React from 'react'
import { Link,  withRouter } from 'react-router-dom'
import {isAuthenticated} from "../auth/index"

const isActive = (history,path) =>{
    if(history.location.pathname === path) return{color:"#ff9900"}
    else return {color:"#fffff"}
}


export const signout = (next) =>{
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next()
    return fetch(`/signout`,{
        method:"GET"

    })
    .then(response => {
        console.log("signout")
        return response.json()
    })
    .catch(err =>console.log(err))
}


const Menu =({history}) =>(



<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<Link className="nav-link"  style={isActive(history,"/")} to="/">Lokvichar</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item ">
      <Link className="nav-link"  style={isActive(history,"/")} to="/">Home</Link>
      </li>
      <li className="nav-item ">
      <Link className="nav-link"  style={isActive(history,"/users")} to="/users">Users</Link>
      </li>
      {!isAuthenticated() && (
          <>
              <li className="nav-item">
      <Link className="nav-link" style={isActive(history,"/signin")}   to="/signin">Sign In</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" style={isActive(history,"/signup")}  to="/signup">Sign Up</Link>
      </li>
          </>
      )}
      
    {isAuthenticated ()&& (
        <>
              <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>


                    <li className="nav-item">
                        <span
                            className="nav-link"
                           
                        >
                            <Link to={`/singleUser/${isAuthenticated().user._id}`} 
                            style={isActive(history,`/singleUser/${isAuthenticated().user._id}`)
                            }>
                            {`${isAuthenticated().user.name}'s Profile`}</Link>
                        </span>
                    </li>
        </>
    )}
     
      
    </ul>
  </div>
</nav> 
)
export default withRouter(Menu);