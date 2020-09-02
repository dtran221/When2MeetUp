import axios from 'axios';

export default{

    createEvent(eventItem) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',};
        return axios.post('/Event', eventItem, {headers:headers});
    }
}