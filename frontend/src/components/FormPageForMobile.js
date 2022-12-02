import React, { Fragment } from 'react';
import "../css/FormPage.css";
import Button from "@mui/material/Button";
import Form from './Form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from "react-router-dom";
import { checkSectionComplete } from './Utils';
import CheckIcon from '@mui/icons-material/Check';
import fileDownload from 'js-file-download'
import { validateForm } from '../actions/forms';

// same as FormPage.js, but for mobile
const FormPageForMobile = (props) => {
    // get user data from props
    const { userData, sectionComplete, onUpdateChange, onAddEntry, onDeleteEntry, onAddKeyword, onDeleteKeyword, setUploading, onUpdateSectionComplete, onLoadingLocalStorage, onSavingLocalStorage, cleanLocalStorage } = props;

    // use location to get section title
    const location = useLocation();
    const [btnId, setBtnId] = React.useState("basics");

    const navigate = useNavigate();

    //Downloads the JSON file
    const saveJSON = () => {
        fileDownload(JSON.stringify(userData), "resume.json");
    }

    const onSubmit = () => {
        setUploading(true);
        validateForm(userData).then((res) => {
            navigate('/review');
            setUploading(false);
        }).catch((err) => {
            setTimeout(() => {
                console.log(err);
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
        // TODO: test if section is complete here
        // console.log(sectionComplete);
        setBtnId(key);
        checkSectionComplete(key, userData[key], onUpdateSectionComplete);
        onSavingLocalStorage();
    }

    const handleReset = () => {
        cleanLocalStorage();
        window.location.reload();
    }

    const isMobile = window.innerWidth <= 500;

    // didmount
    React.useEffect(() => {
        if(!isMobile) {
            navigate("/form");
        }
        if (!location.state) {
            onLoadingLocalStorage();
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
            <h2 style={{ alignItems: 'left', marginLeft: '2%', marginTop: "1.5%", fontWeight: 'normal' }}>Student<b>Resume</b></h2>
            {window.innerWidth > 500 && <p style={{ right: '2em', marginRight: '2%', marginTop: "1.5%", position: 'absolute' }} href="#doc_link">Never heard of JSON? Click <a data-testid={"docJSON"} href="https://www.json.org/json-en.html">here</a> for documentation</p>}
            <Fragment>
                <Grid
                    container spacing={1}
                    style={{
                        margin: '2.5%',
                        borderRadius: '25px',
                        backgroundColor: '#e2e2e2',
                        width: '95%',
                        paddingBottom: '1em',
                    }}>

                    <Grid>
                        <Box textAlign="center" sx={{ width: 1, textAlign: 'left', margin: '0.5em', marginLeft: "1em" }}>
                            <div style={{ display: 'flex' }}>
                                <h2>Mandatory sections</h2>
                                <Button
                                    data-testid={"resetFormBTN"}
                                    style={{
                                        width: 'auto',
                                        height: '1.5em',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: 'auto',
                                        marginTop: '1.8em',
                                    }}
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
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    fontSize: '1.1em',
                                                    borderRadius: '1em',
                                                    outline: '2px black solid'
                                                }}
                                                sx={{
                                                    width: '43%',
                                                    height: '6em',
                                                    margin: '1.5%',
                                                }}
                                                onClick={(() => handleOpen(key))}>{key === "basics" ? "Personal Information" :
                                                    key === "work" ? "Experience" : key}
                                                {sectionComplete[key] !== -1 && <CheckIcon data-testid={"CheckMark"} style={{ color: sectionComplete[key] === true ? "green" : "red", position: "absolute", right: "0.4em", top: "0.4em", border: "2px solid", borderColor: sectionComplete[key] === true ? "green" : "red", borderRadius: "50%" }} />}
                                            </Button>
                                        </Fragment>
                                    )
                                }
                            })}

                            <h2 style={{ marginLeft: "5px", marginTop: "0.5em" }}>Optional sections</h2>
                            {Object.keys(props.userData).map((key) => {
                                if (key === "work" || key === "volunteer" || key === "projects" || key === "publications" || key === "awards") {
                                    return (
                                        <Button id={key} key={key} data-testid={key + "BTN"}
                                            style={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                fontSize: '1.1em',
                                                borderRadius: '1em',
                                                outline: '2px black solid'
                                            }}
                                            sx={{
                                                width: '43%',
                                                height: '6em',
                                                margin: '1.5%',
                                            }}
                                            onClick={(() => handleOpen(key))}>{key === "basics" ? "Personal Information" :
                                                key === "work" ? "Experience" : key}
                                            {sectionComplete[key] !== -1 && <CheckIcon style={{ color: sectionComplete[key] === true ? "green" : "red", position: "absolute", right: "0.4em", top: "0.4em", border: "2px solid", borderColor: sectionComplete[key] === true ? "green" : "red", borderRadius: "50%" }} />}
                                        </Button>
                                    )
                                }
                            })}
                        </Box>
                    </Grid>

                    {/* form box */}
                    <Box
                        sx={{
                            margin: 'auto',
                            width: '100%',
                            marginTop: '-1.5em'
                        }}>
                        {Object.keys(props.userData).map((key) => (
                            <Form key={key} id={key} title={key} sectionData={userData[key]} btnId={btnId} onUpdateChange={onUpdateChange} onAddEntry={onAddEntry} onDeleteEntry={onDeleteEntry} onAddKeyword={onAddKeyword} onDeleteKeyword={onDeleteKeyword} />
                        ))}
                    </Box>
                </Grid>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    margin: '2em',
                    marginTop: '0',
                }}>
                    <Button
                        onClick={() => navigate('/')}
                        data-testid={'FormPageBackButton'}
                        style={{
                            width: '8em',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.8em',
                            outline: '2px black solid',
                        }}>
                        back
                    </Button>
                    <Button
                        onClick={() => saveJSON()}
                        data-testid={'FormPageSaveJSON'}
                        style={{
                            width: '8em',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.8em',
                            outline: '2px black solid',
                        }}>
                        save json
                    </Button>
                    <Button
                        style={{
                            // marginTop: "1em",
                            width: '8em',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '0.8em',
                            outline: '2px black solid'
                        }}
                        onClick={() => onSubmit(userData)}>
                        continue
                    </Button>

                </div>

            </Fragment>
        </div>

    );
}

export default FormPageForMobile;