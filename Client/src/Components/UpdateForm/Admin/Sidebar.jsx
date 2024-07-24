import './Sidebar.css'
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <>
        <section className="Sidebar">
            <h1>Admin Dashboard</h1>
            <ul className="sidebar-links" style={{listStyleType: "none"}}>
                <li ><Link to="/users">Manage Users</Link></li>
                <li><Link to="/Therapist">Manage Categories</Link></li>
                <li><Link>Reports</Link></li>
                <li><Link>Settings</Link></li>   
            </ul>
        </section>
        </>
    )
}

export default Sidebar;