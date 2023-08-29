interface SkillType {
    name?: string;
    bgColor?: string;
    icon?: any;
}
interface WorksType {
    company?: string;
    desc?: string;
    name?: string;
    _key?: string;
}

interface experienceType {
    works?: WorksType[];
    year?: string;
    _id?: string;
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip"

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {

    const [experience, setExperience] = useState<experienceType[]>([]);
    const [skills, setSkills] = useState<SkillType[]>([]);

    useEffect(() => {
        const query = '*[_type == "experiences"]';
        const skillsQuery = '*[_type == "skills"]';
        const abortController = new AbortController();


        client.fetch(query, { signal: abortController.signal }).then((data) => {
            setExperience(data);
        }).catch((err) => {
            console.log(err);
        })

        client.fetch(skillsQuery, { signal: abortController.signal }).then((data) => {
            setSkills(data);
        }).catch((err) => {
            console.log(err);
        })

        return () => {
            abortController.abort();
        }

    }, [])
    
    return (
        <>
            <h2 className="head-text">Skills & Experience</h2>

            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    {
                        skills.map((skill,index) => (
                            <motion.div whileInView={{opacity: [0,1] }} transition={{ duration: 0.5,delay: index*0.2 }} className="app__skills-item app__flex" key={skill.name}>
                                <div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
                                    <img src={`${urlFor(skill.icon)}`} alt={skill.name} />
                                </div>
                                <p className="p-text">{skill.name}</p>
                            </motion.div>
                        ))
                    }
                </motion.div>
                <div className="app__skills-exp">
                    {
                        experience.map((experience) => (
                            <motion.div className="app__skills-exp-item" key={experience.year}>
                                <div className="app__skills-exp-year">{experience.year}</div>
                                <motion.div className="app__skills-exp-works">
                                    {experience.works?.map((work, index) => (
                                        <div key={index}>
                                            <motion.div whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5 }} className="app__skills-exp-work" data-tooltip-id={work.name} data-tooltip-content={work.desc} key={work.name}>
                                                <h4 className="bold-text">{work.name}</h4>
                                                <p className="p-text">{work.company}</p>
                                            </motion.div>
                                            <Tooltip id={work.name} className="skills-tooltip" />
                                        </div>
                                    ))
                                    }
                                </motion.div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills", "app__whitebg");

