import './Header.css'
function Header() {
    return (
        <>
        <section className="header">
            <div className="header-bar">
                <ul className="header-bar-nav">
                    <li>Feed</li>
                    <li>Post a Recipee</li>
                    <li>View Your Recipes</li>
                    <li>Log Out</li>
                </ul>
            </div>
        </section>
        </>
    )
}

export default Header;