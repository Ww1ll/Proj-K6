import http from 'k6/http';
import { check } from 'k6';

const baseUrl = 'http://localhost:3000';

export function login(){

    const loginPayload = JSON.stringify({
        "email": "fulano@qa.com",
        "password":"teste"

    });

    const loginHeaders= {'Content-Type':'application/json'};

    const loginRes = http.post(`${baseUrl}/login`, loginPayload, {headers: loginHeaders});

    check(loginRes, {
        'Login com sucesso': (r) => r.status === 200,
    });


    const token = loginRes.json('authorization');
    
    return token;

}