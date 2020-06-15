const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;

// var Schema = mongoose.Schema;
const Product = require('../model/admin');


// DB Config
const url = require('../config/keys').MongoURI;


MongoClient.connect('mongodb+srv://Ramesh:ramesh123@cluster0-n5l8y.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,  useUnifiedTopology: true }, function(err, client) {
    const business = client.db("business");
    if (err) throw err;
    console.log("Business Coneected"); 
        
    // Welcome Page
    router.get('/', (req, res) =>  {
        business.collection('products').find().toArray(function (err, result){
            res.render("product" , { products : result })
        })
    });

    router.get("/products/:id", function(req,res){
        if(err) throw err;
        business.collection('products').
        findOne({"_id": ObjectId(req.params.id)},
        function(err, product) {
            res.render("viewproduct", { product: product })
        })    
    });

    // Admin 
    router.get('/admin', (req, res) => {
        business.collection('products').find().toArray(function (err, result){
            res.render("admin" , { products : result })
        })
    });

    // Add Product
    router.post('/admin', function(req, res, next) {
        const {title, 
                description, 
                image,
                category,
                price } = req.body;
        business.collection('products').insertOne(req.body,
        function( err, document){
            if(err) throw err;
            res.send("Posted Successfully...")
        })   
    });

    // Delete a single animal document method
    router.delete('/admin',  function(req, res) {

        // Delete a single animal document
        // and redirect to the home page
        products.remove({_id: req.params.id}, function(err) {

            // If error exists display it
            if(err) {
                console.log("Delete Animal Error", err);
            }
            else {
                console.log("Animal deleted!");
                res.redirect("/");
            }

        });
    });

});

module.exports = router;