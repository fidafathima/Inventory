import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const navItems = [
  { page: "HOME", link: "/" },
  { page: "CONTACT", link: "/contact" },
  { page: "ABOUT", link: "/about" },
  { page: "SUPPORT", link: "/support" },
];
function Header() {
  const navigate = useNavigate();
  // const { user } = useContext(UserContext);
  return (
    <div className="header1">
      <h1 className="head">LOGO</h1>
        <ul>
          {navItems.map((ele) => (
            <NavLink to={ele.link} key={ele.link}>
              <li>{ele.page}</li>
            </NavLink>
          ))}
        </ul>
        {/* {user ? (
          <Link to="/profile">
            <i class="fa-regular fa-user"></i>
          </Link>
        ) : (
          <i className="icon" onClick={()=>navigate("/login")} class="fa-solid fa-right-to-bracket"></i>
        )} */}
    </div>
  );
}
export default Header;
