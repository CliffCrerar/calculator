/* SIMPLE EXPRESS APP HOST */
const express = require('express');
express()
    .use('/',express.static('./public'))
    .listen(3000,()=>{console.log(' App Started on Port 3000')});