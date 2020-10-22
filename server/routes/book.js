let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/book');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the book List page - Read Operation */
router.get('/', bookController.displayBookList);

// 

/* GET Route for displaying the Add page - CREATE Operation */ 
router.get('/add', requireAuth, bookController.dispalyAddPage);

/* POST Route for processing the Add page - CREATE Operation */ 
    router.post('/add', requireAuth, bookController.processbAddPage); 


/* GET Route for displaying the Edit page - UPDATE Operation */ 
    router.get('/edit/:id', requireAuth, bookController.dispalyEditPage); 

/* POST Route for processing the Edit page - UPDATE Operation */ 
    router.post('/edit/:id', requireAuth, bookController.processbEditPage); 


/* GET to perform Deletion - DELETE Operation */ 
    router.get('/delete/:id', requireAuth, bookController.performDelet);  
    
module.exports = router;




