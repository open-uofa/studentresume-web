import axios from "axios";

export const submitForm = (data, themeNum) => {
    // send form data to backend
    return new Promise((resolve, reject) => {
        // const json_data = JSON.stringify(data);
        // console.log("sending data: ", json_data);
        // axios.post("http://localhost:8000/resume?theme=" + themeNum, data, {
        axios.post('http://[2605:fd00:4:1001:f816:3eff:fe21:fc]/resume?theme=' + themeNum, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch(() => {
                axios.post('http://10.2.14.2/resume?theme=' + themeNum, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
    });
}

export const validateForm = (json_data) => {
    // send form data to backend
    return new Promise((resolve, reject) => {

        // axios.post("http://localhost:8000/validate", json_data, {
        axios.post('http://[2605:fd00:4:1001:f816:3eff:fe21:fc]/validate', json_data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch(() => {
                axios.post('http://10.2.14.2/validate', json_data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
    });
}