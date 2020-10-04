import axios from 'axios';

export default{

    createEvent(eventItem) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',};
        return axios.post('/Event', eventItem, {headers:headers});
    },
    getEvent(eventId) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',};
        return axios.get('/Event/' + eventId, {headers:headers});
    }
}