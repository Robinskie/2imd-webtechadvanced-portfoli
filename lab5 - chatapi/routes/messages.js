var express = require('express');
var router = express.Router();

// GET all messages
router.get('/', (req, res, next) => {
  let data = {}

  if(req.query.user == undefined) {
    console.log('not fired');
    data = {
      success: true,
      message: 'Getting all messages',
    };
  } else {
    console.log('fired');
    data = {
      success: true,
      message: `Getting messages from user ${req.query.user}`,
    };
  }
  res.send(data);
});

// GET message with ID
router.get('/:id', (req, res, next) => {
  let data = {};

  if(req.params.id < 0) {
    data = {
      success: false,
      message: 'Please provide a valid id.'
    }
  } else {
    data = {
      success: true,
      message: `Getting message with id ${req.params.id}`,
    }
  }

  res.send(data);
});

// POST message
router.post('/', (req, res, next) => {
  let data = {
    success: true,
    message: `Posting new message for user ${req.body.message.user}`,
  }

  res.send(data);
});

// PUT (update) message with ID
router.put('/:id', (req, res, next) => {
  let data = {}

  if(req.params.id < 0) {
    data = {
      success: false,
      message: 'Please provide a valid id.'
    }
  } else {
    data = {
      success: true,
      message: `Updating message with id ${req.params.id} to '${req.body.message.text}'.`,
    }
  }

  res.send(data);
});

// DELETE message with ID
router.delete('/:id', (req, res, next) => {
  let data = {}

  if(req.params.id < 0) {
    data = {
      success: false,
      message: 'Please provide a valid id.'
    }
  } else {
    data = {
      success: true,
      message: `Message with id ${req.params.id} deleted.`,
    }
  }

  res.send(data);
});

module.exports = router;
