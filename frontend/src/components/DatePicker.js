import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';

// returns a date picker box that will be used in the form
const DatePicker = (props) => {
    const { id, title, index, fieldValue, onUpdateChange } = props;
    return (
        <div key={id} style={{ margin: "0.5em", textAlign: "left", marginBottom: "30px", maxWidth:'100%' }}>
            {/* date picker here */}
            <div className="fieldName" style={{ textAlign: "left", marginBottom: "12px" }}>{id === "startDate" ? "Start Date" :
                id === "endDate" ? "End Date" :
                    id === "releaseDate" ? "Release Date" : "Date"}</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    views={['year', 'month']}
                    className="dateField"
                    id={id}
                    variant="outlined"
                    inputFormat="YYYY-MM"
                    value={fieldValue || null}
                    onChange={(e) => onUpdateChange(title, index, id, e.toISOString().split('T')[0])}
                    renderInput={(params) => <TextField id={id} {...params} inputProps={
                        {
                            ...params.inputProps,
                            placeholder: "year-month"
                        }
                    } />}
                />
            </LocalizationProvider>
        </div>
    )
}

export default DatePicker;
