import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import {Link} from "react-router-dom"
const Navbar = () => {
  const [isScrolled,setIsScrolled] = useState(false);
  window.onscroll = ()=>{
      setIsScrolled(window.pageYOffset===0 ? false :true);
      return ()=>{
          window.onscroll=null;
      }
  }
  return (
    <div className={isScrolled ? "navbar scrolled":"navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span>
            <Link to="/" className="link">Homepage</Link>
          </span>
          <span>
          <Link to="/series" className="link">Series</Link>
          </span>
          <span>
          <Link to="/movies" className="link">Movies</Link>
            
          </span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;