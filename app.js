const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;

app.get('/api/autocomplete/:query', (req, res) => {
    const endpoint =`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=c2NaQFDA4Z8RgPb7ymQi&app_code=tW2AcIJC1znWusv4LZ32SA&query=${req.params.query}&beginHighlight=<b>&endHighlight=</b>&country=AUS&maxresults=5`;
    axios({
        method: 'GET',
        url : endpoint, 
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        }).then(response => {
            res.send(JSON.stringify(response.data));
        }).catch(error => {
            res.send(JSON.stringify(error),400);
        })
    
})

app.listen(PORT,()=> {
    console.log('Express server is running');
})