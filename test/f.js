const FormData = require('form-data'); // npm install --save form-data
var fs = require('fs')
var axios = require('axios')
const form = new FormData();
form.append('file', fs.createReadStream('145currentImage.png'));
form.append('file', fs.createReadStream('145currentImage.png'));

const request_config = {
  headers: {
    // 'Authorization': `Bearer ${access_token}`,
    ...form.getHeaders()
  }
};

 axios.post('http://localhost:8080/post-test', form, request_config).then(r=>{
     console.log(r.data.r)
 })