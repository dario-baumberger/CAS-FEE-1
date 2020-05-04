// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});


router.get('/notifications', function (req, res) {
    res.json({
        title: 'Test',
        content: 'db'
    });
});

let noteController = require('../controllers/notesController');

router.route('/notes')
    .get(noteController.index)
    .post(noteController.new);
router.route('/notes/:note_id')
    .get(noteController.view)
    .patch(noteController.update)
    .put(noteController.update)
    .delete(noteController.delete);

// Export API routes
module.exports = router;