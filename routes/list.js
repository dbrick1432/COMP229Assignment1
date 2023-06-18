let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Contact Model
let contact = require('../modules/list');

//Get Route for the Contact List page - READ operaton
router.get('/', async (req, res, next)=>{
    try{
        let contactList = await contact.find();
        res.render('list/contactList',{title: 'Contact List', ContactList: contactList})
    }catch (err){
        console.log(err);
    }
});

//Get Route for the Add page - CREATE Operation
router.get('/add', async (req, res, next)=>{
    try{
        res.render('list/add',{title: 'Contact List'})
    }catch (err){
        console.log(err);
    }
});

//Post Route for processing the Add page - CREATE Operation
router.post('/add',async(req, res, next)=>{
    let newContact = new Contact({
        "username": req.body.username,
        "email" :req.body.email,
        "password": req.body.password
    });

    try{
        await newContact.save();
        res.redirect('/contact-list')
    }catch (err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Get Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id',async(req, res, next)=>{
    let id = req.params.id;

    try{
        let contactToEdit = await Contact.findById(id);
        res.render('list/edit', {title: 'Edit Contact', contact: contactToEdit});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Post Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id',async(req, res, next)=>{
    let id = req.params.id;
    let updatedContact = {
        "username": req.body.username,
        "email" :req.body.email,
        "password": req.body.password
    }
    try{
        await Contact.updateOne({_id:id}, updatedContact);
        res.redirect('/contact-list');
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Get to perform Deletion - DELETE Operation
router.get('/delete/:id',async(req, res, next)=>{
    let id = req.params.id;

    try{
        await Contact.findByIdAndRemove(id);
        res.redirect('/contact-list');
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;