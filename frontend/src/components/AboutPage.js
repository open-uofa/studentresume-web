import React from 'react';
import { useEffect } from 'react';
import '../css/AboutPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faThumbsUp as faThumbsUp1 } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUp2 } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faThumbsUp1, faThumbsUp2)

const AboutPage = () => {
    const heading = "Meet Our Team";
    let i = 0;
    const typing = () => {
        if (i < heading.length) {
            document.getElementById("heading").innerHTML += heading.charAt(i);
            i++;
            setTimeout(typing, 150);
        }
    };

    useEffect(() => {
        setTimeout(500);
        typing();
    }, []);

    const [contributor, setState] = React.useState(require("../constants/contributor.json"));

    console.log(contributor)

    return (
        <div className='AboutPage'>
            <h1 className='about-title' id='heading'></h1>
            <div className='about-team'>
                {contributor.map((item, index) => {
                    return (
                        <div className='about-card' key={index}>
                            <div className='avatar'>
                                <img src={require("../img/avatar-sample.png")} alt="avatar" />
                            </div>
                            <div className='content'>
                                <h3>{item.name}<br /><span>{item.role}</span></h3>
                                <div className='sci'>
                                    <a href={item.github} className='about-btn'><FontAwesomeIcon icon="fa-brands fa-github" /></a>
                                    <a href={item.linkedin} className='about-btn'><FontAwesomeIcon icon="fa-brands fa-linkedin" /></a>
                                    <Link className='about-btn'><FontAwesomeIcon icon="fa-regular fa-thumbs-up" /></Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='about-project'>
                Want to contribute?
                Student Resume Generator is an open-source project of UofA Open.
            </div>
        </div>
    );
}

export default AboutPage;