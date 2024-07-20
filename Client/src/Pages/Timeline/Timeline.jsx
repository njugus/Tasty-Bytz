import './Timeline.css';
import Search from './Search';
import About from './About';
import Feed from './Feed';
function Timeline() {
    return (
        <>
        <section className="timeline">
        <Search />
        <About />
        <Feed />
        </section>
        </>
    )
}

export default Timeline;