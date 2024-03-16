const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId // Id mongo assigns all database entries (primary key)

let err

const getAll = async (req, res) => {
  // swagger.tags=['repeaters']
  /*
    #swagger.description = 'Returns all repeaters in the database.';
    */
  const result = await mongodb.getDatabase().db().collection('repeaters').find();
  result.toArray().then((repeaters) => {
    res.setHeader('Content-Type', "application/json");
    res.status(200).json(repeaters);
  });
};

const getSingle = async (req, res) => {
  // swagger.tags=['repeaters']
  /*
    #swagger.description = 'Returns a repeater from the database using the repeaters ID number';
    */
  const repeaterId = new ObjectId(req.params.id)
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid repeater id to find a repeater.')
  }
  const result = await mongodb.getDatabase().db().collection('repeaters').find({ _id: repeaterId });
  result.toArray().then((repeaters) => {
   res.setHeader('Content-Type', "application/json");
   res.status(200).json(repeaters[0]);
  });
};

const createRepeater = async (req, res) => {
  // swagger.tags=['repeaters']
  /*
    #swagger.description = 'Create a repeater in the database, every field is required. The repeatered ID number is automatically assigned by the database after submition.
    Any field that is ommitted will be set to "NULL"';
    */
  const repeater = {
    location: req.body.location,
    county: req.body.county,
    callSign: req.body.callSign,
    frequency: req.body.frequency,
    toneUp: req.body.toneUp,
    toneDown: req.body.toneDown,
    modes: req.body.modes,
    updated: req.body.updated,
    status: req.body.status
  }
  
  const response = await mongodb.getDatabase().db().collection('repeaters').insertOne(repeater)
  if (response.acknowledged) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'An error occured while creating the repeater.')
  };
}

const updateRepeater = async (req, res) => {
  // swagger.tags=['repeaters']
  /*
    #swagger.description = 'Update a repeater information using the repeater ID number.The repeatered ID number is automatically assigned by the database after submition.
     Any field that is ommitted will be set to "NULL"';
    */
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid repeater id to update a repeater.')
  }
  const repeaterId = new ObjectId(req.params.id)
  const repeater = {
    location: req.body.location,
    county: req.body.county,
    callSign: req.body.callSign,
    frequency: req.body.frequency,
    toneUp: req.body.toneUp,
    toneDown: req.body.toneDown,
    modes: req.body.modes,
    updated: req.body.updated,
    status: req.body.status
  }
  
  const response = await mongodb.getDatabase().db().collection('repeaters').replaceOne({ _id: repeaterId }, repeater)
  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'An error occured while updating the repeater.')
  };
}

const deleteRepeater = async (req, res) => {
  // swagger.tags=['repeaters']
  /*
    #swagger.description = 'Delete a repeater from the database using the repeaters ID number.';
    */
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid repeater id to delete a repeater.')
  }
  const repeaterId = new ObjectId(req.params.id)
  const response = await mongodb.getDatabase().db().collection('repeaters').deleteOne({ _id: repeaterId })
  if (response.deleteCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'An error occured while deleting the repeater.')
  };
}

module.exports = {
  getAll,
  getSingle,
  createRepeater,
  updateRepeater,
  deleteRepeater
}
