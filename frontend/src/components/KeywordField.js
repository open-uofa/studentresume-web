import React from 'react';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import "../css/KeywordField.css";
import { getHint, checkRequiredField } from './Utils'

// generate a textbox field on the from on the right side
const KeywordField = (props) => {
    const { id, title, index, fieldValue, onUpdateChange, onAddKeyword, onDeleteKeyword } = props;
    const [keywordInput, setKeywordInput] = React.useState("");
    const handleChange = (e) => {
        setKeywordInput(e.target.value);
    }
    const handleAddKeyword = () => {
        if (keywordInput !== "") {
            onAddKeyword(title, index, id, keywordInput);
            setKeywordInput("");
        }
    }

    const addButtonStyle = {
        // color: "white",
        margin: "1em",
        marginLeft: "0.5em",
        height: "30px",
    };
    const closeIconStyle = {
        width: "0.5em",
        height: "0.5em",
        margin: "0.05em"
    }
    return (
        <div className="keywordBox">
            <div className="fieldRow">
                <TextField
                    className="textField"
                    id={id}
                    data-testid={title + index + id + "INPUT"}
                    // label= "Error"
                    variant="outlined"
                    value={keywordInput}
                    onChange={handleChange}
                    placeholder={getHint(id)}
                />
                <Button data-testid={title + index + id + "BTN"} style={addButtonStyle} variant="text" id={title + 'addKeyword'} onClick={() => handleAddKeyword()}> add </Button>
            </div>

            {fieldValue.map((keyword, keywordIndex) => {
                return (
                    <div className="keyword" key={keywordIndex} data-testid={"skillKeyword"}>
                        {keyword}
                        <CloseIcon style={closeIconStyle} data-testid={title + index + id + keywordIndex + "DeleteBTN"} className="closeIcon" onClick={() => onDeleteKeyword(title, index, id, keywordIndex)} />
                    </div>
                )

            })}
        </div>
    );
}

export default KeywordField;