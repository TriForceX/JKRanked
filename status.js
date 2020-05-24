const Gamedig = require('gamedig');

Gamedig.query({
    type: 'swjk',
    host: 'skirata.pro',
    port: '29070'
}).then((state) => {
    console.log(state);
}).catch((error) => {
    console.log("Server is offline");
});