import axios from 'axios';

export default{

    createEvent(eventItem) {
        const headers = {
            'Content-Type': 'application/json',};
        return axios.post('/Event', eventItem, {headers:headers});
    }
}