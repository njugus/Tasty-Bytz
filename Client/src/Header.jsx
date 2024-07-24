
import './Header.css'
import { Link } from 'react-router-dom'
import { useUser } from './Context/Context'
import { useNavigate } from 'react-router-dom';
function Header() {
    const user = useUser();
    const navigate = useNavigate();
    console.log(user);
    const handleClick = async() => {
        user.setUserInformation(null)
        // navigate('/login')
    }
    return (
        <>
        <section className="header">
            <div className="header-bar">
                <ul className="header-bar-nav" style={{textDecoration : "none"}}>
                    <Link to="/timeline"><li style={{textDecoration : "none"}}>Timeline</li></Link>
                    <Link to = "/postrecipees"><li style={{textDecoration : "none"}}>Post a Recipee</li></Link>
                    <Link to="/view-recipees"><li style={{textDecoration : "none"}}>View Your Recipes</li></Link>
                    <Link to = "/profile"><li style={{textDecoration : "none"}}>Profile</li></Link>
                    <Link to="/logo"><li onClick={() => handleClick()} style={{textDecoration : "none"}}>Log Out</li></Link>
                </ul>
            </div>
        </section>
        </>
    )
}

export default Header;