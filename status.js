const Gamedig = require('gamedig');

Gamedig.query({
    type: 'swjk',
    host: '142.44.198.205',
    port: '29070'
}).then((state) => {
    console.log(state);
}).catch((error) => {
    console.log("Server is offline");
});

//142.44.198.205:29070