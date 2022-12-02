import React, { Fragment } from 'react';
import "../css/Form.css";
import FormField from './FormField';
import DatePicker from './DatePicker';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { MaximizeTwoTone } from '@mui/icons-material';

// generates a button colums on the right side of the form
const Form = (props) => {
    const { title, sectionData, onUpdateChange, onAddEntry, onDeleteEntry, onAddKeyword, onDeleteKeyword, btnId } = props;

    return (
        <div className="Form" hidden={!(title === btnId)}
            style={{
                // backgroundColor: key === btnId ? "#28567e" : "#7e5028"
                marginTop: '2.5em',
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '1em',
                outline: '2px black solid',
                maxWidth: '92%',
            }}>
            <div className='section-body'>
                {/* if sectionData is an array, then it is a list of items */}
                {(sectionData instanceof Array) ? (
                    // one section can have multiple entries
                    sectionData.map((entry, index) => {
                        return (
                            <div className='section-entry' key={index}>
                                {index !== 0 && <Divider style={{ margin: "0.4em auto", width: "80%" }} />}
                                <div className='section-title'>
                                    <h3 style={{ margin: '0.3em' }}>{title === "basics" ? "Personal Information" :
                                        title === "work" ? "Experience" :
                                            title.charAt(0).toUpperCase() + title.slice(1)} {index > 0 && `(${index + 1})`}
                                    </h3>
                                    <IconButton data-testid={title + "DeleteSection"} aria-label="delete" size="small" onClick={() => onDeleteEntry(title, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                {Object.keys(entry).map((key) => {
                                    // if the key is date, then render a date picker field
                                    if (key === 'startDate' || key === 'endDate' || key === 'releaseDate' || key === 'date') {
                                        return (
                                            <DatePicker id={key} key={key} index={index} title={title} fieldValue={entry[key]} onUpdateChange={onUpdateChange} />
                                        );
                                    }
                                    else return (
                                        // field for each entry in other sections   
                                        <FormField id={key} key={key} index={index} title={title} fieldValue={entry[key]} onUpdateChange={onUpdateChange} onAddKeyword={onAddKeyword} onDeleteKeyword={onDeleteKeyword} />
                                    );
                                })}
                            </div>
                        )
                    })
                ) : (
                    // basics info
                    <Fragment>
                        <div className='section-title'>
                            <h3 style={{ margin: '0.3em' }}>
                                Personal Information
                            </h3>
                        </div>
                        {Object.keys(sectionData).map((key) => (
                            <FormField id={key} key={key} title={title} fieldValue={sectionData[key]} onUpdateChange={onUpdateChange} />
                        ))}
                    </Fragment>
                )}
                {sectionData instanceof Array && (
                    <Button data-testid={title + "NewSection"} style={{ margin: "0em auto", flexBasis: "90%" }} onClick={() => onAddEntry(title)}>Add a new section</Button>
                )}
            </div>
        </div >
    )
}

export default Form;