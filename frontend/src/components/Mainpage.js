import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/Mainpage.css';
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { validateForm } from '../actions/forms';
import resume from '../img/resume.png';
import fileIcon from '../img/file_icon.png';

// the start page of the website
const Mainpage = (props) => {
    const { setUploading, setState, onSavingLocalStorage } = props;

    const navigate = useNavigate();

    // check if its mobile or desktop
    const isMobile = window.innerWidth <= 500;

    // Checks if file is JSON and validates it
    const reader = new FileReader();
    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            reader.readAsText(file);
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const data = reader.result;
                setUploading(true);
                let isValid = false;
                validateForm(data).then((res) => {
                    isValid = res.data['message'] === 'Valid Resume';
                    if (isValid) {
                        setState(JSON.parse(data));
                        onSavingLocalStorage();
                        navigate((isMobile ? '/form-mobile' : 'form'), { state: { type: 'upload' } });
                    }
                    else {
                        alert("Invalid JSON file");
                    }
                    setUploading(false);
                }).catch((err) => {
                    setTimeout(() => {
                        console.log(err);
                        alert("Invalid JSON file");
                        setUploading(false);
                    }, 500);
                });
            };
        });
    };

    // set only accept json file
    const { getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { '.json': ['.json'] }, onDrop })

    return (
        <div className='main_page'>
            {/*header */}
            <h2 style={{ alignItems: 'left', marginLeft: '2%', marginTop: "1.5%", fontWeight: 'normal' }}><a href = "/" style={{textDecoration: 'none', color: 'black'}}>Student<b>Resume</b></a></h2>
            {!isMobile && <p style={{ right: '2em', marginRight: '2%', marginTop: "1.5%", position: 'absolute' }} href="#doc_link">Never heard of JSON? Click <a data-testid={"docJSON"} href="https://www.json.org/json-en.html">here</a> for documentation</p>}
            <Box sx={{
                width: '95%',
                margin: '0 auto',
                float: 'center',
                alignItems: 'center',
                borderRadius: '25px',
                backgroundColor: '#e2e2e2',
                paddingBottom: '5em',
            }}
            >
                <h1 style={{ textAlign: 'center', margin: '2%', marginBottom: '4%', fontSize: '3em', color: '#464646' }}>How would you like to start?</h1>
                <Box sx={{
                    width: '95%',
                    margin: '0 auto',
                    marginTop: '1em',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}
                >
                    {/* button to the form page */}
                    <Link to={isMobile ? '/form-mobile' : 'form'} style={{
                        width: '30em',
                        maxWidth: '90%',
                        marginBottom: '1em',
                        textDecoration: 'none'
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '26em',
                            borderRadius: '10px',
                            outline: '2px black solid',
                            backgroundColor: 'white',
                        }} data-testid="goToForm"
                        id="goToForm"
                        >

                            <Box sx={{
                                width: '100%',
                                height: '65%',
                                margin: 'auto',
                                textAlign: 'center',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                backgroundColor: '#fefeff',
                            }}
                            >
                                <img src={resume} alt='' width={'75%'} height={'100%'}></img>
                            </Box>

                            <Box sx={{
                                width: '100%',
                                height: '35%',
                                margin: 'auto',
                                float: 'left',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                backgroundColor: '#f6f6f6',
                            }}
                            >
                                <h3 style={{ textAlign: 'center', margin: '2%', marginTop: '7%', fontSize: '25px', color: '#464646' }}>Create a New Resume</h3>
                                <h4 style={{ textAlign: 'center', margin: '2%', marginTop: '4%', fontSize: '16px', color: '#A9A9A9' }}>We'll guide you through each resume section!</h4>
                            </Box>

                        </Box>
                    </Link>


                    <Box sx={{
                        width: '30em',
                        maxWidth: '90%',
                        height: '26em',
                        marginBottom: '1em',
                        outline: '2px black solid',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                    }}
                    >

                        <Box sx={{
                            width: '100%',
                            height: '65%',
                            margin: 'auto',
                            float: 'left',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                            backgroundColor: 'white',
                            textAlign: 'center',
                        }}
                        >
                            {/* the drop box for uploading json file */}
                            <div className="center">
                                <div className='drag_drop_text2' style={{ textAlign: 'center', margin: '2%', marginBottom: '4%', fontSize: '15px', color: '#464646' }}>Only JSON files are allowed</div>
                                {/* Drag Box */}
                                <div {...getRootProps()} className="drag_drop" data-testid="dragdrop">
                                    <input {...getInputProps()} />
                                    <img src={fileIcon} alt='' width={'30%'} height={'70%'}></img>
                                    <h5 style={{ textAlign: 'center', margin: '2%', marginBottom: '4%', fontSize: '15px', color: '#464646' }}>Drag and Drop your files here</h5>
                                </div>
                            </div>
                        </Box>

                        <Box sx={{
                            width: '100%',
                            height: '35%',
                            margin: 'auto',
                            float: 'left',
                            borderBottomLeftRadius: '10px',
                            borderBottomRightRadius: '10px',
                            backgroundColor: '#f6f6f6',
                        }}
                        >
                            <h3 style={{ textAlign: 'center', margin: '2%', marginTop: '7%', fontSize: '25px', color: '#464646' }}>Upload my JSON File</h3>
                            <h4 style={{ textAlign: 'center', margin: '2%', marginTop: '4%', fontSize: '16px', color: '#A9A9A9' }}>We'll move everything to the fill out form!</h4>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <p style={{flexBasis:'100%', textAlign:'center', margin:'1.5em auto'}}>Wanna know more about the development team? Click <Link to={'/about'}>here</Link></p>
        </div>

    );
}

export default Mainpage;