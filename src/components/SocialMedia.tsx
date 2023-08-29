// import React from 'react'
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs'
// import { FaFacebook } from 'react-icons/fa'
// import { BsInstagram } from 'react-icons/bs'


const SocialMedia = () => {
    return (
        <div className='app__social'>
            <div>
            <a href="https://twitter.com/Sumantagorai21" target="_blank" rel="noopener noreferrer">
            <BsTwitter />
                </a>
                
            </div>
            <div>
                <a href="https://www.linkedin.com/in/sumanta-gorai/" target="_blank" rel="noopener noreferrer">
                    <BsLinkedin />
                </a>
            </div>
            <div>
                <a href="https://github.com/sumanta2" target="_blank" rel="noopener noreferrer">
                    <BsGithub />
                </a>
            </div>
        </div>
    )
}

export default SocialMedia
