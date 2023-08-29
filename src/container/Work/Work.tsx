interface worksType {
    title?: string;
    description?: string;
    imgUrl?: any;
    codeLink?: string;
    projectLink?: string;
    tags?: string[];
}

import { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [works, setWorks] = useState<worksType[] | undefined>([]);
    const [filterWork, setFilterWork] = useState<worksType[] | undefined>([]);

    useEffect(() => {
        const query = '*[_type == "works"]';
        const abortController = new AbortController();


        client.fetch(query, { signal: abortController.signal }).then((data) => {
            setWorks(data)
            setFilterWork(data);
        }).catch((err) => {
            console.log(err);
        })

        return () => {
            abortController.abort();
        }
    }, [])


    const handleWorkFilter = (item: string) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });

        const reference=setTimeout(()=>{
            setAnimateCard({ y: 0, opacity: 1 });

            if(item === 'All'){
                setFilterWork(works);
            }else{
                setFilterWork(works?.filter((work)=>work.tags?.includes(item)))
            }
            return () => {
                clearTimeout(reference);
            }
        },500)
    }

    return (
        <>
            <h2 className="head-text">My Creative <span>Portfolio</span> section</h2>

            <div className="app__work-filter">
                {
                    ['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
                        <div key={index} onClick={() => handleWorkFilter(item)}
                            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ""}`}
                        >
                            {item}
                        </div>
                    ))
                }
            </div   >
            <motion.div animate={animateCard} transition={{ duration: 0.5, delayChildren: 0.5 }} className="app__work-portfolio" >

                {
                    filterWork?.map((work, index) => (
                        <div className="app__work-item app__flex" key={index}>
                            <div className="app__work-img app__flex">
                                <img src={`${work.imgUrl?urlFor(work.imgUrl):"https://fakeimg.pl/200x200/?text=No%20Image"}`} alt="Image" />
                                {/* staggerChildren used to make the cards appear one after the other after 0.5 seconds */}
                                <motion.div whileHover={{ opacity: [0, 1] }} transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }} className="app__work-hover app__flex">
                                    {work.projectLink!=="noLink" &&
                                        <a href={work.projectLink} target="_blank" rel="noreferrer">
                                            <motion.div whileInView={{ scale: [0, 1] }} whileHover={{ scale: [1, 0.90] }} transition={{ duration: 0.25 }} className="app__flex">
                                                <AiFillEye />
                                            </motion.div>
                                        </a>
                                    }
                                    {work.codeLink !== "noLink" &&
                                        <a href={work.codeLink} target="_blank" rel="noreferrer">
                                            <motion.div whileInView={{ scale: [0, 1] }} whileHover={{ scale: [1, 0.9] }} transition={{ duration: 0.25 }} className="app__flex">
                                                <AiFillGithub />
                                            </motion.div>
                                        </a>
                                    }

                                </motion.div>
                            </div>
                            <div className="app__work-content app__flex">
                                <h4 className="bold-text">{work.title}</h4>
                                <p className="p-text" style={{ marginTop: "10px" }}>{work.description}</p>

                                <div className="app__work-tag app__flex">
                                    <p className="p-text">{work.tags?.at(0)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </motion.div>

        </>
    )
}


export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__primarybg");
