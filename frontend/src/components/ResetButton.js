import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

    const { handleReset } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetForm = () => {
        setOpen(false);
        handleReset();
    }

    return (
        <div>
            <Button
                data-testid={"resetFormBTN"}
                id='resetForm'
                style={{
                    width: 'auto',
                    height: '1.5em',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    marginTop: '2.5em',
                    marginLeft: '1em',
                }}
                onClick={handleClickOpen}>
                Reset
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Reset Form
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to reset the form?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => resetForm()} autoFocus>
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}