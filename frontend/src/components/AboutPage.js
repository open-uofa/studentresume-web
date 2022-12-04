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
    // show the about page of developer team and the project link to github
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
                <h2>About the project</h2>
                <p>
                    Student Resume Generator is an open-source project of <a href="https://cmput401.ca/">UofA Open</a> developed in class CMPUT 401 FALL 2022.
                    Our open-source project objective is to develop a free and powerful resume generator for university students.
                </p>
                <ul>
                    - Intuitive UI and easy to start with.
                </ul>
                <ul>
                    - Save form in JSON format and upload to continue.
                </ul>
                <ul>
                    - Auto save to local storage and won't lose your progress.
                </ul>
                <ul>
                    - Free template themes to use and custom themes allowed.
                </ul>
                <ul>
                    - Preview and download resume in PDF format.
                </ul>

                <h2> As a user </h2>
                <p>
                    Want to know how to use the app? Check out our user guide <a href="https://docs.google.com/document/d/1x-0QSlkM54YVn0gjceryo7ZhRcZOUs2LfYqc7V2LvGU/edit?usp=sharing">here</a>!
                </p>

                <h2>As a developer</h2>
                <p>
                    Want to contribute? Check out our job requirement <a href="https://docs.google.com/document/d/1x-0QSlkM54YVn0gjceryo7ZhRcZOUs2LfYqc7V2LvGU/edit?usp=sharing">here</a> and keep contributing to it!
                </p>
                <h2>Use pip package</h2>
                <ul>
                    - pip install studentresume
                </ul>
                <p>
                    Read more about the pip package <a href="https://pypi.org/project/studentresume/">here</a>.
                </p>
            </div>
        </div>
    );
}

export default AboutPage;