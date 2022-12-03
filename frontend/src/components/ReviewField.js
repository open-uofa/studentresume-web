import React from 'react';

// shows a list of the info that the user inputted
const ReviewField = (props) => {
    const { title, data } = props;

    return (
        <div className="">
            {Object.keys(data).map((item, index) => {
                if (title === "basics" && item === "location") {
                    return (
                        <div key={index}>
                            <p style={{ fontSize: '18px' }}>
                                {item.charAt(0).toUpperCase() + item.slice(1) + ": "}{data[item].city}, {data[item].region}, {data[item].countryCode}
                            </p>
                        </div>
                    )
                }
                return (
                    <div key={index} style={{ maxWidth: "100%" }}>
                        <p style={{ fontSize: '18px' }}>
                            {item.charAt(0).toUpperCase() + item.slice(1) + ": " + data[item].toString()}
                        </p>
                    </div>
                )
            })}
        </div>
    );
}

export default ReviewField;