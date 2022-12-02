import React, { Fragment } from 'react';
import '../css/Preview.css';
import { json, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { useLocation } from "react-router-dom";
import fileDownload from 'js-file-download'
import changeTheme from '../img/changeTheme.png';
import jsonDownload from '../img/jsonDownload.png';
import pdfDownload from '../img/pdfDownload.png';
import backToForm from '../img/backToForm.png';

// display the preview of the generated resume
const PreviewPage = (props) => {
    const { userData } = props;
    const { state } = useLocation();
    const fileData = state ? state['fileData'] : null;
    var file = null, fileURL = null;

    //checks for a pdf file for display
    if (fileData) {
        file = new Blob([fileData], { type: 'application/pdf' });
        fileURL = URL.createObjectURL(file);
        const iframe = document.querySelector("iframe");
        if (iframe?.src) iframe.src = file;
    }

    const savePDF = () => {
        if (fileData) fileDownload(fileData, "resume.pdf");
        else alert("No file to download");
    }

    const saveJSON = () => {
        fileDownload(JSON.stringify(userData), "resume.json");
    }
    const isMobile = window.innerWidth < 500;
    return (

        <div className='preview_page'>

            <h2 style={{ alignItems: 'left', marginLeft: '2%', marginTop: "1.5%", fontWeight: 'normal' }}><a href = "/" style={{textDecoration: 'none', color: 'black'}}>Student<b>Resume</b></a></h2>
            {!isMobile && <p style={{ right: '2em', marginRight: '2%', marginTop: "1.5%", position: 'absolute' }} href="#doc_link">Never heard of JSON? Click <a data-testid={"docJSON"} href="https://www.json.org/json-en.html">here</a> for documentation</p>}


            <Box sx={{
                width: '96%',
                height: '91%',
                margin: 'auto',
                alignItems: 'center',
                float: 'center',
                borderRadius: '25px',
                backgroundColor: '#e2e2e2',
            }}
            >
                <Box sx={{
                    width: '77%',
                    height: '90%',
                    margin: '1%',
                    borderRadius: "10px",
                    backgroundColor: "black",
                    float: 'left',
                }}
                >
                    {/* the display preview of the resume */}
                    <iframe src={`${fileURL}#view=fitH`} width="100%" height="100%"></iframe>

                </Box>

                <Box sx={{
                    width: '20%',
                    height: '90%',
                    float: 'right',
                    borderRadius: "20px",
                    backgroundColor: '#E2E2E2',
                }}>
                    {/* to rechoose theme */}
                    <Link to="/theme" style={{ textDecoration: 'none' }}>
                        <Box
                            data-testid={'goToThemePage'}
                            sx={{
                                width: '95%',
                                height: '25%',
                                margin: 'auto',
                                marginTop: '5%',
                                marginBottom: '2%',
                                float: 'center',
                                borderRadius: "20px",
                                background: "#323539",
                                textAlign: 'center',
                            }}>
                            <Box sx={{
                                width: '95%',
                                height: '60%',
                                margin: 'auto',
                                marginTop: "2%",
                            }}>
                                <img src={changeTheme} alt='' width={'65%'} height={'100%'}></img>
                            </Box>

                            <Box sx={{
                                width: '99%',
                                height: '26%',
                                margin: 'auto',
                                marginTop: "2%",
                                borderTop: "2px white solid",
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}>
                                <h5 style={{ textAlign: 'center', margin: '2%', marginTop: '4%', fontSize: '20px', color: 'white' }}>Change Theme</h5>
                            </Box>
                        </Box>
                    </Link>

                    {isMobile && <Fragment>
                        {/* button that saves the resume as a pdf */}
                        <Box
                            data-testid={'savePDF'}
                            sx={{
                                width: '95%',
                                height: '25%',
                                margin: 'auto',
                                marginTop: '5%',
                                marginBottom: '2%',
                                float: 'center',
                                borderRadius: "20px",
                                background: "#323539",
                                textAlign: 'center',
                            }} onClick={() => savePDF()}>
                            <Box sx={{
                                width: '95%',
                                height: '60%',
                                margin: 'auto',
                                marginTop: "2%",
                            }}>
                                <img src={pdfDownload} alt='' width={'65%'} height={'100%'}></img>
                            </Box>

                            <Box sx={{
                                width: '99%',
                                height: '26%',
                                margin: 'auto',
                                marginTop: "2%",
                                borderTop: "2px white solid",
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}>
                                <h5 style={{ textAlign: 'center', margin: '2%', marginTop: '4%', fontSize: '20px', color: 'white' }}>Download PDF</h5>
                            </Box>
                        </Box>
                        {/* button that saves the resume as a json */}
                        <Box
                            data-testid={'savePDF'}
                            sx={{
                                width: '95%',
                                height: '25%',
                                margin: 'auto',
                                marginTop: '5%',
                                marginBottom: '2%',
                                float: 'center',
                                borderRadius: "20px",
                                background: "#323539",
                                textAlign: 'center',
                            }} onClick={() => saveJSON()}>
                            <Box sx={{
                                width: '95%',
                                height: '60%',
                                margin: 'auto',
                                marginTop: "2%",
                            }}>
                                <img src={jsonDownload} alt='' width={'65%'} height={'100%'}></img>
                            </Box>

                            <Box sx={{
                                width: '99%',
                                height: '26%',
                                margin: 'auto',
                                marginTop: "2%",
                                borderTop: "2px white solid",
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}>
                                <h5 style={{ textAlign: 'center', margin: '2%', marginTop: '4%', fontSize: '20px', color: 'white' }}>Download JSON</h5>
                            </Box>
                        </Box>
                    </Fragment>}


                    {/* check if mobile user and change the placement of the buttons */}
                    {!isMobile && <Fragment>
                        {/* button that saves the resume as a pdf */}
                        <Box
                            clickable
                            data-testid={'savePDF'}
                            sx={{
                                width: '95%',
                                margin: 'auto',
                                height: '15%',
                                marginTop: '5%',
                                marginBottom: '2%',
                                float: 'center',
                                borderRadius: "20px",
                                background: "#323539",
                            }}
                            onClick={() => savePDF()}
                        >
                            <Box sx={{
                                float: 'left',
                                width: '30%',
                                marginTop: '-2%',
                                marginLeft: '-4%',
                                height: '95%',
                            }}>
                                <img src={pdfDownload} alt='' width={'120%'} height={'120%'} marginTop={'2%'}></img>

                            </Box>
                            <Box sx={{
                                width: '60%',
                                height: '100%',
                                float: 'left',
                                marginLeft: '8%',
                                borderLeft: "2px white solid",
                            }}>
                                <h5 style={{ textAlign: 'center', fontSize: '25px', color: 'white' }}>Download PDF</h5>

                            </Box>
                        </Box>

                        {/* button that saves the resume as a json */}
                        <Box
                            data-testid={'saveJSON'}
                            sx={{
                                width: '95%',
                                margin: 'auto',
                                height: '15%',
                                marginTop: '5%',
                                marginBottom: '2%',
                                float: 'center',
                                borderRadius: "20px",
                                background: "#323539",
                            }}
                            onClick={() => saveJSON()}
                        >
                            <Box sx={{
                                float: 'left',
                                width: '30%',
                                marginTop: '1%',
                                height: '95%',
                            }}>
                                <img src={jsonDownload} alt='' width={'100%'} height={'100%'} marginTop={'2%'}></img>

                            </Box>
                            <Box sx={{
                                width: '60%',
                                height: '100%',
                                float: 'left',
                                marginLeft: '4%',
                                borderLeft: "2px white solid",

                            }}>
                                <h5 style={{ textAlign: 'center', fontSize: '25px', color: 'white' }}>Download JSON</h5>
                            </Box>
                        </Box>
                    </Fragment>}


                    {/* button that takes the user back to the form to edit info*/} 
                    <Link to="/form" style={{ textDecoration: 'none' }}>
                        <Box
                            id='backToForm'
                            data-testid={'goToForm'}
                            sx={{
                                width: '95%',
                                height: '30%',
                                margin: 'auto',
                                marginTop: '5%',
                                marginBottom: '2%',
                                float: 'center',
                                borderRadius: "20px",
                                background: "#323539",
                                textAlign: 'center',
                            }}>
                            <Box sx={{
                                width: '95%',
                                height: '70%',
                                marginLeft: '2%',
                            }}>
                                <h5 style={{ textAlign: 'center', fontSize: '1px', color: '#323539' }}>.</h5>
                                <img src={backToForm} alt='' width={'100%'} height={'100%'}></img>

                            </Box>


                            <Box sx={{
                                width: '99%',
                                height: '26%',
                                margin: 'auto',
                                marginTop: "2%",
                                borderTop: "2px white solid",
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}>
                                <h5 style={{ textAlign: 'center', margin: '2%', marginTop: '4%', fontSize: '20px', color: 'white' }}>Back to Form</h5>
                            </Box>


                        </Box>
                    </Link>
                </Box>
            </Box>

        </div >
    );
}

export default PreviewPage;