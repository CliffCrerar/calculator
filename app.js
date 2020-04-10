/* SIMPLE EXPRESS APP HOST */
const express = require('express');
express()
    .use('/',express.static('./public'))
    .listen(443,()=>{console.log(' App Started on Port 80')});