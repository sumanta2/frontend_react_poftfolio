interface aboutType {
  title: string;
  description: string;
  imgUrl: string;
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client";

import { AppWrap, MotionWrap } from "../../wrapper";
// import { images } from "../../constants";

import "./About.scss"
const About = () => {

  const [abouts, setAbouts] = useState<aboutType[]>();

  useEffect(() => {
    const query = `*[_type == "abouts"]`;
    const abortController = new AbortController();

    client.fetch(query, { signal: abortController.signal }).then((data) => {
      setAbouts(data);
    }).catch((err) => {
      console.log(err);
    })

    return () => {
      abortController.abort();
    }

  }, [])

  // const abouts1 = [
  //   { title: 'Web Development', description: 'I am a good web developer.', imgUrl: images.about01 },
  //   {title:'Frontend Development', description:'I am a good web developer.', imgUrl:images.about02},
  //   { title: 'UI/UX', description: 'I am a good web developer.', imgUrl: images.about03 },
  //   {title:'Backend Development', description:'I am a good web developer.', imgUrl:images.about04},
  // ]

  return (
    <>
      <h2 className="head-text">I Know That <span>Good Dev</span> Means <span>Good Business</span></h2>

      <div className="app__profiles">
        {
          abouts?.map((about, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className="app__profile-item"
              key={about.title + index}
            >
              <img src={`${urlFor(about.imgUrl)}`} alt={about.title} />
              <h2 className="bold-text" style={{ marginTop: "20" }}> {about.title}</h2>
              <p className="p-text" style={{ marginTop: "10" }}> {about.description}</p>

            </motion.div>
          ))
        }

      </div>
    </>
  )
}

export default AppWrap(MotionWrap(About, "app__about"), "about", "app__whitebg");