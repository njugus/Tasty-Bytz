import './Header.css'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <>
        <section className="header">
            <div className="header-bar">
                <ul className="header-bar-nav">
                    <Link to="/timeline"><li>Timeline</li></Link>
                    <Link to = "/post-recipees"><li>Post a Recipee</li></Link>
                    <Link to="/view-recipees"><li>View Your Recipes</li></Link>
                    <Link to="/logout"><li>Log Out</li></Link>
                </ul>
            </div>
        </section>
        </>
    )
}

export default Header;