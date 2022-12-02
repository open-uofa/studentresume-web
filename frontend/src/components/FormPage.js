import React, { Fragment } from 'react';
import "../css/FormPage.css";
import Button from "@mui/material/Button";
import Form from './Form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { checkSectionComplete } from './Utils';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import fileDownload from 'js-file-download'
import { validateForm } from '../actions/forms';


const FormPage = (props) => {
    // get user data from props
    const { userData, sectionComplete, onUpdateChange, onAddEntry, onDeleteEntry, onDeleteSection, onAddKeyword, onDeleteKeyword, setUploading, onUpdateSectionComplete, onLoadingLocalStorage, onSavingLocalStorage, cleanLocalStorage } = props;

    // use location to get section title
    const location = useLocation();
    const [btnId, setBtnId] = React.useState("basics");

    const navigate = useNavigate();

    //Downloads the JSON file
    const saveJSON = () => {
        fileDownload(JSON.stringify(userData), "resume.json");
    }

    const removeUncompleteSections = (userData) => {

        for (let key in userData) {
            if (sectionComplete[key] === -1 || sectionComplete[key] === false && key != 'basics' && key != 'education' && key != 'skills') {
                delete userData[key];
            }
        }
    }

    const onSubmit = () => {
        setUploading(true);
        onSavingLocalStorage();
        removeUncompleteSections(userData)
        validateForm(userData).then((res) => {
            navigate('/review');
            setUploading(false);
        }).catch((err) => {
            setTimeout(() => {
                console.log(err);
                onLoadingLocalStorage();
                alert("Please Fill out all required fields");
                setUploading(false);
            }, 500);
        });
    }
    // This is for testing purposes
    const goToReview = () => {
        navigate('/review');
    }

    const handleOpen = (key) => {
        checkSectionComplete(btnId, userData[btnId], onUpdateSectionComplete);
        setBtnId(key);
        checkSectionComplete(key, userData[key], onUpdateSectionComplete);
        onSavingLocalStorage();
    }

    const handleReset = () => {
        cleanLocalStorage();
        window.location.reload();
    }
    const isMobile = window.innerWidth < 768;

    // on didmount
    React.useEffect(() => {
        // if the device is mobile, go to mobile friendly form page
        if (isMobile) {
            navigate("/form-mobile");
        }
        if (!location.state) {
            onLoadingLocalStorage();
            for (let key in userData) {
                checkSectionComplete(key, userData[key], onUpdateSectionComplete);
            }
        }
        else {
            // when uploading json file
            for (let key in userData) {
                checkSectionComplete(key, userData[key], onUpdateSectionComplete);
            }
            onSavingLocalStorage();
        }
    }, []);

    return (
        <div className='FormPage'>

            <h2 style={{ alignItems: 'left', marginLeft: '2%', marginTop: "1.5%", fontWeight: 'normal' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Student<b>Resume</b></a></h2>

            {window.innerWidth > 500 && <p style={{ right: '2em', marginRight: '2%', marginTop: "1.5%", position: 'absolute' }} href="#doc_link">Never heard of JSON? Click <a data-testid={"docJSON"} href="https://www.json.org/json-en.html">here</a> for documentation</p>}
            <Fragment>
                <Grid
                    container spacing={1}
                    style={{
                        margin: '1em',
                        borderRadius: '25px',
                        backgroundColor: '#e2e2e2',
                    }}>
                    <Grid item xs={4}>
                        <Box textAlign="center" sx={{ width: 1, textAlign: 'left', margin: '0.5em', marginLeft: "50px" }}>
                            <div style={{ display: 'flex' }}>
                                <h1 style={{ marginLeft: "5px" }} >Mandatory sections</h1>
                                <Button
                                    data-testid={"resetFormBTN"}
                                    style={{
                                        width: 'auto',
                                        height: '1.5em',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 'auto',
                                        marginTop: '2.5em',
                                    }}
                                    id='resetForm'
                                    onClick={() => handleReset()}>
                                    Reset
                                </Button>
                            </div>
                            {Object.keys(props.userData).map((key) => {
                                if (key === "basics" || key === "profiles" || key === "education" || key === "skills") {
                                    return (
                                        <Fragment>
                                            <Button id={key} key={key} data-testid={key + "BTN"}
                                                style={{
                                                    // backgroundColor: key === btnId ? "#28567e" : "#7e5028"
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    fontSize: '1.1em',
                                                    borderRadius: '1em',
                                                    outline: '2px black solid'
                                                }}
                                                size='large'
                                                sx={{
                                                    width: 1 / 2 - 1 / 30,
                                                    alignItems: 'left',
                                                    height: '6em',
                                                    margin: '5px',
                                                }}
                                                onClick={(() => handleOpen(key))}>{key === "basics" ? "Personal Information" :
                                                    key === "work" ? "Experience" : key}
                                                {sectionComplete[key] !== -1 &&
                                                    sectionComplete[key] === true ? (
                                                    <CheckIcon data-testid={"CheckMark"} style={{ color: "green", position: "absolute", right: "0.4em", top: "0.4em", border: "2px solid", borderColor: sectionComplete[key] === true ? "green" : "red", borderRadius: "50%" }} />
                                                ) : (<ClearIcon data-testid={"CheckMark"} style={{ color: "red", position: "absolute", right: "0.4em", top: "0.4em", border: "2px solid", borderColor: sectionComplete[key] === true ? "green" : "red", borderRadius: "50%" }} />
                                                )}
                                            </Button>
                                        </Fragment>
                                    )
                                }
                            })}

                            <h1 style={{ marginLeft: "5px", marginTop: "0.5em" }}>Optional sections</h1>
                            {Object.keys(props.userData).map((key) => {
                                if (key === "work" || key === "volunteer" || key === "projects" || key === "publications" || key === "awards") {
                                    return (
                                        <Button id={key} key={key} data-testid={key + "BTN"}
                                            style={{
                                                // backgroundColor: key === btnId ? "#28567e" : "#7e5028"
                                                backgroundColor: 'white',
                                                color: 'black',
                                                fontSize: '1.1em',
                                                borderRadius: '1em',
                                                outline: '2px black solid'
                                            }}
                                            size='large'
                                            sx={{
                                                width: 1 / 2 - 1 / 30,
                                                alignItems: 'left',
                                                height: '6em',
                                                margin: '0.3em',
                                            }}
                                            onClick={(() => handleOpen(key))}>{key === "basics" ? "Personal Information" :
                                                key === "work" ? "Experience" : key}
                                            {sectionComplete[key] !== -1 &&
                                                sectionComplete[key] === true ? (
                                                <CheckIcon style={{ color: "green", position: "absolute", right: "0.4em", top: "0.4em", border: "2px solid", borderColor: sectionComplete[key] === true ? "green" : "red", borderRadius: "50%" }} />
                                            ) : (<ClearIcon style={{ color: "red", position: "absolute", right: "0.4em", top: "0.4em", border: "2px solid", borderColor: sectionComplete[key] === true ? "green" : "red", borderRadius: "50%" }} />
                                            )}
                                        </Button>
                                    )
                                }
                            })}
                        </Box>
                    </Grid>

                    <Grid item xs={7.5}>
                        {/* add new section */}
                        <Box
                            sx={{
                                margin: 'auto',
                                width: '90%'
                            }}>
                            {Object.keys(props.userData).map((key) => (
                                <Form key={key} id={key} title={key} sectionData={userData[key]} btnId={btnId} onUpdateChange={onUpdateChange} onAddEntry={onAddEntry} onDeleteEntry={onDeleteEntry} onAddKeyword={onAddKeyword} onDeleteKeyword={onDeleteKeyword} />
                            ))}
                        </Box>

                    </Grid>
                </Grid>
                <div style={{
                    position: "fixed",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    bottom: "2em",
                    height: "auto",
                    right: "1.5em",
                }}>
                    <Button
                        onClick={() => saveJSON()}
                        data-testid={'FormPageSaveJSON'}
                        style={{
                            width: '8em',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.8em',
                            outline: '2px black solid'
                        }}>
                        save json
                    </Button>
                    <Button
                        style={{
                            marginTop: "1em",
                            width: '8em',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.8em',
                            outline: '2px black solid'
                        }}
                        id='goToReview'
                        onClick={() => onSubmit(userData)}>
                        continue
                    </Button>

                </div>

            </Fragment>
            <h1 style={{ fontSize: '0.1px', color: "#f9f6f2" }} onClick={goToReview} data-testid={"FormPageContinueBTN"}>This is for testing purposes only</h1>
        </div>

    );
}

export default FormPage;