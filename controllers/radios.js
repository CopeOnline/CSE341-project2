const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId // Id mongo assigns all database entries (primary key)

let err

const getAll = async (req, res) => {
  // swagger.tags=['radios']
  /*
    #swagger.description = 'Returns all radios in the database.';
    */
  const result = await mongodb.getDatabase().db().collection('radios').find();
  result.toArray().then((radios) => {
    res.setHeader('Content-Type', "application/json");
    res.status(200).json(radios);
  });
};

const getSingle = async (req, res) => {
  // swagger.tags=['radios']
  /*
    #swagger.description = 'Returns a radio from the database using the radios ID number';
    */
  const radioId = new ObjectId(req.params.id)
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid radio id to find a radio.')
  }
  const result = await mongodb.getDatabase().db().collection('radios').find({ _id: radioId });
  result.toArray().then((radios) => {
   res.setHeader('Content-Type', "application/json");
   res.status(200).json(radios[0]);
  });
};

const createRadio = async (req, res) => {
  // swagger.tags=['radios']
  /*
    #swagger.description = 'Create a radio in the database, every field is required. The radio ID number is automatically assigned by the database after submition.
    Any field that is ommitted will be set to "NULL"';
    */
  const radio = {
    make: req.body.make,
    model: req.body.model,
    partNumber: req.body.partNumber,
    bands: req.body.bands,
    watts: req.body.watts,
    mode: req.body.mode,
    price: req.body.price
  }
  const response = await mongodb.getDatabase().db().collection('radios').insertOne(radio)
  if (response.acknowledged) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'An error occured while creating the radio.')
  };
}

const updateRadio = async (req, res) => {
  // swagger.tags=['radios']
  /*
    #swagger.description = 'Update a radios information using the radios ID number.The radio ID number is automatically assigned by the database after submition.
     Any field that is ommitted will be set to "NULL"';
    */
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid radio id to update a radio.')
  }
  const radioId = new ObjectId(req.params.id)
  const radio = {
    make: req.body.make,
    model: req.body.model,
    partNumber: req.body.partNumber,
    bands: req.body.bands,
    watts: req.body.watts,
    mode: req.body.mode,
    price: req.body.price
  }
  const response = await mongodb.getDatabase().db().collection('radios').replaceOne({ _id: radioId }, radio)
  if (response.modifiedCount = 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'An error occured while updating the radio.')
  };
}

const deleteRadio = async (req, res) => {
  // swagger.tags=['radios']
  /*
    #swagger.description = 'Delete a radio from the database using the radios ID number.';
    */
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid radio id to delete a radio.')
  }
  const radioId = new ObjectId(req.params.id)
  const response = await mongodb.getDatabase().db().collection('radios').deleteOne({ _id: radioId })
  if (response.deletedCount > 0) {
    res.status(204).send()
   } else {
    res.status(500).json(response.error || 'An error occured while deleting the radio.')
  };
}

module.exports = {
  getAll,
  getSingle,
  createRadio,
  updateRadio,
  deleteRadio
}
