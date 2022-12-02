import React from 'react';
import "../css/Form.css";
import TextField from '@mui/material/TextField';
import { getHint, checkRequiredField } from './Utils'
import KeywordField from './KeywordField';
import LocationPicker from './LocationPicker';
// import { useFormik } from 'formik';

// gererate a form field boxes
const FormField = (props) => {
    const { id, title, index, fieldValue, onUpdateChange, onAddKeyword, onDeleteKeyword } = props;
    const isContentField = id === "summary" || id === "description" || id === "highlights";

    const fieldname = (i, t) => {
        if (checkRequiredField(i, t) == true) {
            return id === "studyType" ? "Degree Type" : id.charAt(0).toUpperCase() + id.slice(1)
        } else {
            return id === "studyType" ? "Degree Type" : id.charAt(0).toUpperCase() + id.slice(1) + " (optional)"
        }
    }

    const validatePhoneNumberAndMail = (id, fieldValue) => {
        if(id === "phone" && fieldValue.length > 0){
            if(fieldValue.length <10){
                console.log (fieldValue.value)
                return "Phone number must be at least 10 digits"
            }
        }
        if(id === "email" && fieldValue.length > 0){
            // was gonna use the useformik hook to validate the email but it was not working
            if(!fieldValue.includes("@") && !fieldValue.includes(".")){
                return "Email not vaild"
            }
        }
        if(id === 'url' && fieldValue.length > 0){
            if(!fieldValue.includes(".") && !fieldValue.includes("/")){
                return "Invaild URL"
            }
        }
        return ""
    }

    return (

        <div key={id} style={{ margin: "0.5em", textAlign: "left", marginBottom: "30px", maxWidth: '100%'}}>

            <div className="fieldName" style={{ textAlign: "left", marginBottom: "12px" }}>
                {fieldname(title, id)}
            </div>
            {id === "keywords" ? (
                <KeywordField id={id} title={title} index={index} fieldValue={fieldValue} onAddKeyword={onAddKeyword} onDeleteKeyword={onDeleteKeyword} />
            ) : (title === "basics" && id === "location") ? (
                <LocationPicker
                    locationData={fieldValue}
                    id={id}
                    key={id}
                    title={title}
                    index={index}
                    onUpdateChange={onUpdateChange}
                />
            ) : (
                <TextField
                    // allow many lines of text
                    multiline={isContentField}
                    className={isContentField ? "contentField" : "textField"}
                    id={id}
                    variant="outlined"
                    value={id === "highlights" ? fieldValue.join("\n") : fieldValue}
                    placeholder={getHint(title + "_" + id)}
                    onChange={(e) => onUpdateChange(title, index, id, e.target.value)}
                    error={fieldValue !== "" && ((id === 'email' || id == 'phone' || id === 'url') && validatePhoneNumberAndMail(id, fieldValue) !== "")}
                    helperText={id === 'email' || id == 'phone' || id == 'url' ? validatePhoneNumberAndMail(id, fieldValue) : ""}
                />
            )}
        </div>
    );
}

export default FormField;