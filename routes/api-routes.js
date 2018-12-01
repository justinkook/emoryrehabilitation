const db = require('../models/');
const searchBy = require('../public/js/search.js');
const axios = require('axios');
require("dotenv").config();
const RestfulAPI = require('./RestClass');

module.exports = function (app) {

    const location = new RestfulAPI('location', app, db.Location);
    location.find();
    location.create();

    const insurance = new RestfulAPI('insurance', app, db.Insurance);
    insurance.find();

    app.post('/api/review', function (req, res) {

        db.Review.create(req.body)
            .then(function (dbReview) {
                db.Location.findOneAndUpdate({
                        alias: req.body.url
                    }, {
                        $set: {
                            personal_review: {
                                personal_review_text: dbReview.text,
                                personal_review_rating: dbReview.rating,
                                personal_review_time: dbReview.time_created,
                                already_reviewed: dbReview.already_reviewed
                            }
                        }
                    })
                    .then(function (dbUser) {
                        res.json(dbUser)
                    })
                    .catch(function (err) {
                        res.json(err);
                    });
            });
    })

    app.put('/api/update/:id', function (req, res) {
        db.Location.findOneAndUpdate({
                alias: req.params.id
            }, {
                $set: {
                    personal_review: req.body
                }
            })
            .then(function (dbUser) {
                res.json(dbUser)
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    
    app.get('/api/location/:alias', function (req, res) {
        db.Location.find({
                alias: req.params.alias
            })
            .then(function (dbLocation) {
                res.json(dbLocation);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/review/:alias', function (req, res) {
        let alias = req.params.alias;
        let regex = {
            $regex: new RegExp(alias, 'i')
        };
        db.Location.find({
                'alias': alias
            })
            .or([{
                'url': regex
            }])
            .then(function (aliasReview) {
                res.json(aliasReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get('/api/business/:alias', function (req, res) {
        db.Location.find({
                alias: req.params.alias
            })
            .then(function (dbLocation) {
                res.json(dbLocation);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/search', function (req, res) {
        let searchTerm = req.body.searchInput;
        let location = req.body.locationInput;
        searchBy.keywordAndLocation(searchTerm, location, res);
    });

    app.get('/api/geocode/:location', function (req, res) {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: req.params.location,
                    key: process.env.GEOCODE_KEY
                }
            })
            .then(function (result) {
                res.json(result.data);
            })
            .catch(function (err) {
                res.json(err);
            })
    });
}