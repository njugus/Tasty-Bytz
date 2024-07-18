import './About.css'
import laksa from '../../assets/chicken laksa.jpg'


function About() {
    return (
        <>
        <section className="about-us">
            <div className="about-image">
                <img src={laksa}  className="about-image-demo"/>
            </div>
            <div className="about-description">
                <p className="about-paragraph">
                "Discover culinary masterpieces from chefs around the world.
                 Share your own recipes and inspire others to cook with love!"
                </p>
            </div>
        </section>
        </>
    )
}
export default About;