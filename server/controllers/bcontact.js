let express = require('express');
let router = express.Router();

// creat a refernce to the model
let Contact = require('../models/bcontact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList)=> {
        if(err)
        {
            return console.error(err);
        }
        else
        {
           // console.log(BookList);

           res.render('book/listcontact',
         {title: 'Contact List', 
         ContactList: contactList, 
           displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.dispalyAddPage = (req, res, next) => {
    res.render('book/detaile', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''})
}

module.exports.processbAddPage = (req, res, next) => { 
    let newContact = Contact({
        "name": req.body.name,
        "Email": req.body.Email,
        "phone": req.body.phone,
        
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/contact-list');
        }
    });

}

module.exports.dispalyEditPage = (req, res, next) => { 
        let id = req.params.id;

        Contact.findById(id, (err, contactToEdit) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                //show the edit view
                res.render('book/detaile', {title: 'Edit Contact', contact: contactToEdit, 
                displayName: req.user ? req.user.displayName : ''});

            }
        });
}

module.exports.processbEditPage = (req, res, next) => { 
    let id = req.params.id;
    
    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "Email": req.body.Email,
        "phone": req.body.phone,
        
    });
    
    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/contact-list');
        }

    });

}

module.exports.performDelet = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the book list
             res.redirect('/contact-list');
         }
     });

}