import axios from 'axios';
var data = JSON.stringify({
  "IdUser": "klj354"
});

var config = {
  method: 'get',
  url: 'http://localhost:5000/api/v1/Company',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzkyYjFiNS0wZTcxLTQxNDItYTk0Ny02YWY0ODZmMWY1YzQiLCJlbWFpbCI6IjYwYjIzODg5OGFiMzgwMDAxNTM3MGM0ZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyMjQ0OTYyNiwiZXhwIjoxNjI1MDQxNjI2fQ.sec8cQdDmODE3pNo2zUauKzKEtf3aKARvPU-0Hy8dME', 
    'Content-Type': 'application/json'
  },
  data : data
};


axios(config).then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
