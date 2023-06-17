let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let contact = require('../modules/list');

router.get('/', async (req, res, next)=>{
    try{
        let contactList = await contact.find();
        res.render('contactList',{title: 'Contact List', ContactList: contactList})
    }catch (err){
        console.log(err);
    }
});

module.exports = router;