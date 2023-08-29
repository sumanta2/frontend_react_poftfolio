
import { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.myLogo} alt="image" />
            </div>
            <ul className="app__navbar-links">
                {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item) => (
                    <li key={`link-${item}`} className="app__flex p-text">
                        <div />
                        <a href={`#${item}`}>{item}</a>
                    </li>
                ))}
            </ul>

            <div className="app__navbar-menu" >

                {!toggle ?<HiMenuAlt4  onClick={() => setToggle(true)} />:<HiX onClick={() => setToggle(false)} style={{ color: "var(--white-color)" }} />}
                {
                    toggle && (
                        <motion.div style={{opacity:"0"}}
                            whileInView={{ x: [300, 0],opacity:[0.9,1]}}
                            transition={{ duration: 0.85, ease: "easeOut" }}
                        >

                            {/* I Work Properly */}
                            {/* <HiX onClick={() => setToggle(false)} /> */}
                            <ul>
                                {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item) => (
                                    <li key={item}  >
                                        <div />
                                        <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar