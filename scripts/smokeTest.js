import http from 'k6/http';
import { group, check } from 'k6';
import { login } from '../utils/auth.js';

const baseUrl = 'http://localhost:3000';

export const options = {
    vus: 1,
    duration: '20s',
    thresholds: {
        http_req_duration: ['p(95)<1']
    },
};


export function setup(){
    


    const authToken = login();

    return {baseUrl, authToken};
    

}

export default function(data){

    const protectedHeaders = {
        'Content-Type':'application/json',
        'Authorization': data.authToken,
    };

    group('01 - Listagem de usuários', () =>{
        const resUser = http.get(`${baseUrl}/usuarios`, {headers: protectedHeaders});

        check(resUser, {
            'Status code == 200': (r) => r.status === 200,
            'Reposta contém conteúdo': (r) => r.body.includes('usuarios'),
        });
    });

    group('02 - Listagem de produtos', () =>{
        const resProd = http.get(`${baseUrl}/produtos`, {headers: protectedHeaders});

        check(resProd, {
            'Status code == 200': (r) => r.status === 200,
            'Reposta contém conteúdo': (r) => r.body.includes('produtos'),
        });
    });

    group('03 - Consulta de carrinho', () =>{
       const resCar =  http.get(`${baseUrl}/carrinhos/qbMqntef4iTOwWfg`, {headers: protectedHeaders});

        check(resCar, {
            'Status code == 200': (r) => r.status === 200,
            'Reposta contém conteúdo': (r) => r.body.includes('produtos'),
        });
    });
}
