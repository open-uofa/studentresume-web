import axios from "axios";
import fileDownload from 'js-file-download'


export const customTheme = (data) => {
    // send form data to backend
    return new Promise((resolve, reject) => {
        // theme_json = JSON.stringify(theme_json);
        // console.log("sending data: ", json_data);
        // axios.post("http://localhost:8000/resume?theme=" + themeNum, data, {
        axios.post('https://curtiskennedy.com/resume/custom',data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                resolve(res);
            })
            .catch(() => {
                axios.post('http://10.2.9.18/resume/custom' ,data, {
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