import axios from "axios";

export const customTheme = (formData, themeData) => {
    // send form data to backend
    return new Promise((resolve, reject) => {
        // const json_data = JSON.stringify(data);
        // console.log("sending data: ", json_data);
        // axios.post("http://localhost:8000/resume?theme=" + themeNum, data, {
        axios.post('http://[2605:fd00:4:1001:f816:3eff:fe21:fc]/resume/theme',formData,themeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch(() => {
                axios.post('http://10.2.14.2/resume?theme=' + themeNum, formData, {
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