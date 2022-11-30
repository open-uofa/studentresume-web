import React, { Fragment } from 'react';
import '../css/Preview.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from "react-router-dom";
import ReviewField from './ReviewField';
import fileDownload from 'js-file-download';
import { getSectionNameByKeyword } from './Utils';

import Divider from '@mui/material/Divider';

import '../css/ReviewPage.css';


const ReviewPage = (props) => {
    const navigate = useNavigate();
    const { userData, setUploading, onLoadingLocalStorage } = props;
    const { state } = useLocation();
    const fileData = state ? state['fileData'] : null;

    const saveJSON = () => {
        fileDownload(JSON.stringify(userData), "resume.json");
    }

    const backToFrom = () => {
        onLoadingLocalStorage();
        navigate('/form');
    }

    const selectTheme = () => {
        navigate('/theme');
    }

    return (
        <div>

            <div className='review-page'>

                <h2 style={{ alignItems: 'left', marginLeft: '2%', marginTop: "1.5%", fontWeight: 'normal' }}><a href = "/" style={{textDecoration: 'none', color: 'black'}}>Student<b>Resume</b></a></h2>
                {window.innerWidth > 500 && <p style={{ right: '2em', marginRight: '2%', marginTop: "1.5%", position: 'absolute' }} href="#doc_link">Never heard of JSON? Click <a data-testid={"docJSON"} href="https://www.json.org/json-en.html">here</a> for documentation</p>}

                <Box sx={{
                    width: '96%',
                    margin: 'auto',
                    marginBottom: '3em',
                    float: 'center',
                    alignItems: 'center',
                    borderRadius: '25px',
                    backgroundColor: '#e2e2e2',
                }}>
                    <h1 style={{ textAlign: 'center', margin: '2%', marginBottom: '4%', fontSize: '50px', color: '#464646' }}>Please review your information</h1>
                    <Box sx={{
                        width: '65em',
                        maxWidth: '90%',
                        height: 'auto',
                        margin: '2em auto',
                    }}>
                        {Object.keys(userData).filter((key) => key !== "meta").map((sectionName, index) => {
                            return (
                                <Box sx={{
                                    padding: '2em',
                                    margin: '1em',
                                    borderRadius: '10px',
                                    outline: '2px black solid',
                                    backgroundColor: 'white'
                                }}>
                                    <h2>{getSectionNameByKeyword(sectionName)}</h2>
                                    {/* check if userData section is an array (only basics section is not an array) */}
                                    {Array.isArray(userData[sectionName]) ? userData[sectionName].map((item, index2) => {
                                        // console.log(item)
                                        return (
                                            <Fragment>
                                                {index2 !== 0 && <Divider style={{ margin: "0.4em auto", width: "80%" }} />}
                                                <ReviewField
                                                    key={item}
                                                    title={sectionName}
                                                    data={item}
                                                />
                                            </Fragment>
                                        )
                                    }) : (
                                        <ReviewField
                                            key={index}
                                            title={sectionName}
                                            data={userData[sectionName]}
                                        />
                                    )}
                                </Box>
                            )
                        })}
                    </Box>
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '2em',
                    }}>
                        <Button
                            id='backToForm'
                            data-testid={'BackToForm'}
                            onClick={() => backToFrom()}
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '1em',
                                outline: '2px black solid',
                                margin: '1em'
                            }}>
                            back
                        </Button>
                        <Button
                            data-testid={'ReviewPageSaveJSON'}
                            onClick={() => saveJSON()}
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '1em',
                                outline: '2px black solid',
                                margin: '1em'
                            }}>
                            save json
                        </Button>
                        <Button
                            id='ReviewPageSelectTheme'
                            data-testid={'ReviewPageSelectTheme'}
                            onClick={() => selectTheme()}
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '1em',
                                outline: '2px black solid',
                                margin: '1em',
                                paddingLeft: '1em',
                                paddingRight: '1em'
                            }}>
                            Select theme
                        </Button>
                    </Box>

                </Box>
            </div>
        </div>
    );
}

export default ReviewPage;