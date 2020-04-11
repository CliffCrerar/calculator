/* SIMPLE EXPRESS APP HOST */
const express = require('express');
express()
    .use('/', express.static('./public'))
    .listen(8080, () => console.log(' App Started on Port 8080'));