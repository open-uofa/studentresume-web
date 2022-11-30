import React from 'react';
import Box from '@mui/material/Box';
import theme1 from '../img/theme1.png';
import theme2 from '../img/theme2.png';
import theme3 from '../img/theme3.png';
import { submitForm } from '../actions/forms';
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import fileIcon from '../img/file_icon.png';


const ThemePage = (props) => {

    const navigate = useNavigate();
    const { userData, setUploading, onSavingLocalStorage } = props;

    const generateResume = (themeNum) => {

        setUploading(true);
        submitForm(userData, themeNum).then((res) => {
            setTimeout(() => {
                navigate('/preview', { state: { fileData: res.data } });
                setUploading(false);
            }, 500);
        }).catch((err) => {
            alert(err);
            setUploading(false);
        });
    }

    const goToPreview = () => {

        navigate('/preview');

    }

    const reader = new FileReader();
    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            reader.readAsText(file);
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const data = reader.result;
                //setUploading(true);
                let isValid = false;
                // validateForm(data).then((res) => {
                //     isValid = res.data['message'] === 'Valid Resume';
                //     if (isValid) {
                //         setState(JSON.parse(data));
                //         onSavingLocalStorage();
                //         navigate('/form', { state: { type: 'upload' } });
                //     }
                //     else {
                //         alert("Invalid JSON file");
                //     }
                //     setUploading(false);
                // }).catch((err) => {
                //     setTimeout(() => {
                //         console.log(err);
                //         alert("Invalid JSON file");
                //         setUploading(false);
                //     }, 500);
                // });
            };
        });
    };

    const { getRootProps, getInputProps } = useDropzone({ maxFiles: 1, accept: { '.json': ['.json'] }, onDrop })


    return (


        <div className='main_page'>

            {/*header */}
            <h2 style={{ alignItems: 'left', marginLeft: '2%', marginTop: "1.5%", fontWeight: 'normal' }}><a href = "/" style={{textDecoration: 'none', color: 'black'}}>Student<b>Resume</b></a></h2>
            {window.innerWidth > 500 && <p style={{ right: '2em', marginRight: '2%', marginTop: "1.5%", position: 'absolute' }} href="#doc_link">Never heard of JSON? Click <a data-testid={"docJSON"} href="https://www.json.org/json-en.html">here</a> for documentation</p>}


            <Box sx={{
                width: '96%',
                height: '91%',
                margin: 'auto',
                marginLeft: '2%',
                float: 'center',
                alignItems: 'center',
                borderRadius: '25px',
                backgroundColor: '#e2e2e2',
            }}
            >


                <h5 className='drag_drop_text2' style={{ textAlign: 'center', margin: '2%', marginBottom: '3%', fontSize: '45px', color: '#464646' }}>Choose a Default Theme:</h5>


                <Box sx={{
                    width: '94%',
                    height: '55%',
                    margin: 'auto',
                    float: 'center',
                    marginTop: '40px',
                }}
                >


                    <Box
                        id='theme1'
                        onClick={() => generateResume(1)}
                        sx={{
                            width: '30%',
                            height: '95%',
                            margin: 'auto',
                            float: 'left',
                            borderRadius: '10px',
                            outline: '2px black solid',
                            backgroundColor: 'white',
                        }}
                    >

                        <img src={theme1} alt='' width={'100%'} height={'100%'}></img>

                    </Box>
                    <Box
                        id='theme3'
                        onClick={() => generateResume(3)}
                        sx={{
                            width: '30%',
                            height: '95%',
                            margin: 'auto',
                            float: 'right',
                            outline: '2px black solid',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                        }}
                    >



                        <img src={theme3} alt='' width={'100%'} height={'100%'}></img>


                    </Box>
                    <Box
                        id='theme2'
                        onClick={() => generateResume(2)}
                        sx={{
                            width: '30%',
                            height: '95%',
                            margin: 'auto',
                            float: 'center',
                            borderRadius: '10px',
                            outline: '2px black solid',
                            backgroundColor: 'white',
                        }}
                    >

                        <img src={theme2} alt='' width={'100%'} height={'100%'}></img>

                    </Box>



                    <h5 className='drag_drop_text2' style={{ textAlign: 'center', margin: '2%', marginBottom: '3%', marginTop: '3%', fontSize: '40px', color: '#464646' }}>Upload a Custom Theme File:</h5>

                    <Box sx={{
                        width: '40%',
                        height: '100%',
                        margin: 'auto',
                        marginTop: '3%',
                        marginBottom: '2%',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                    >
                        

                        <div className="center">
                            {/* Drag Box */}
                            <div {...getRootProps()} className="drag_drop" data-testid="dragdrop">
                                <input {...getInputProps()} />
                                <img src={fileIcon} alt='' width={'30%'} height={'70%'}></img>
                                <h5 style={{ textAlign: 'center', margin: '2%', marginBottom: '4%', fontSize: '15px', color: '#464646' }}>Drag and Drop your files here</h5>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>



            <h1 style={{ fontSize: '0.1px' }} onClick={goToPreview} data-testid={"previewPageBTN"}>This is for testing purposes only</h1>

        </div>

    );
}

export default ThemePage;