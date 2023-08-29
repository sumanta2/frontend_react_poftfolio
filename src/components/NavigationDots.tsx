// import React from 'react'

interface propTypes {
    active: string;
}

const NavigationDots = ({active}:propTypes) => {
    return (
        <div className='app__navigation'>
            {['home', 'about', 'work', 'skills','testimonial', 'contact'].map((item, index) => (

                <a href={`#${item}`} key={item + index} className='app__navigation-dot' style={active === item ? { backgroundColor: '#313BAC' } : {}} />
            ))}
        </div>
    )
}

export default NavigationDots