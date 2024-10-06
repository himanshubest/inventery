import request from "superagent";

export const GET = (route, params) => {
    return request.get(route).query(params);
};

export const POST = (route, params) => {
    return request.post(route).send(params);
};
export const WithPOSTAndKey = (route, jwtToken, apiKey) => {

    return request
        .post(route)
        .set('Authorization', `Bearer ${jwtToken}`)
        .set('X-Unique-Key', apiKey);
};

export const WithPOSTAPIKey = (route, apiKey) => {

    return request
        .post(route)
        .set('X-Unique-Key', apiKey);
};

export const WithAPIKeyData = (route, apiKey, data) => {

    return request
        .post(route)
        .set('Content-Type', 'application/json') 
        .set('X-Unique-Key', apiKey)
        .send(data);
};
export const WithAPIKeyFormData = (route, apiKey, data) => {

    return request
        .post(route)
        
        .set('X-Unique-Key', apiKey)
        .send(data);
};

export const getBody = (response) => {
    return response.body;
};