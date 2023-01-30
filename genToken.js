import axios from "axios";
import { writeFileSync, readFileSync } from "fs";

let refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhOTJmMjVlMS0zMDZhLTRkZTYtYWI3OS01MTQ1NmU4ODdkMGEifQ.eyJleHAiOjE2NzUxMDc2NjQsImlhdCI6MTY3NTEwNTg2NCwianRpIjoiZDg1MzcwYzQtZTJjYy00ZmQ0LWEwZWMtYjBkM2UzOTc4NDYzIiwiaXNzIjoiaHR0cHM6Ly9zZWd1cmFuY2FvcmNyaW0ubWouZ292LmJyL2F1dGgvcmVhbG1zL3ByZG9yY3JpbSIsImF1ZCI6Imh0dHBzOi8vc2VndXJhbmNhb3JjcmltLm1qLmdvdi5ici9hdXRoL3JlYWxtcy9wcmRvcmNyaW0iLCJzdWIiOiJmYTQ3MDRjYS0yOTI0LTQ5MmEtOWIyZi0yMjA4NTNlNjYzMGUiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoib3JjcmltLWZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjQyNTBkNjk5LTEwN2YtNDZmNC1iZDgxLTgxZWVkMjBhNDM4OSIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgb3JjcmltLWJhY2tlbmQifQ.VU3mCPXTyU9pOCPCOlwyuLAbbT4tfRDu8cU8y0DoUWc";

var token_options = {
  method: 'POST',
  url: 'https://segurancaorcrim.mj.gov.br/auth/realms/prdorcrim/protocol/openid-connect/token',
  headers: {
    cookie: 'a5eb76b0e410071d412f6e54f211bb80=df9d5ee459ad7bfb8da100f463bfe8b1; TS01376d48=01d99a2cce5a1b6e29ff2ae0df6f62596ed403bd99f501671ff92fe80f070b208b4cd0f1bed068c9791ac027af9bed4b24c6bda47053798bf8d549df2053f7930b9d277b09',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    client_id: 'orcrim-frontend'
  }
};

const getToken = async () => {
  await axios.request(token_options).then(function (response) {
    writeFileSync('./token.txt', response.data.access_token);
    refreshToken = response.data.refresh_token;
  }).catch(function (error) {
    console.error(error);
  });
}

getToken();

setInterval(function() {
  getToken();
}, 60 * 1000);
