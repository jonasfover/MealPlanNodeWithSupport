var express = require('express');
var hbs = require('express-handlebars');
var {Food} = require('../models/food');
var {mongoose} = require('../db/mongoose');
const _ = require('lodash');
var router = express.Router();
var app = express();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/addfood', function(req, res, next) {
  res.render('addfood');
});

router.post('/addfood', (req, res) => {
  var food = new Food({
    name: req.body.foodName,
    calories: req.body.calories,
    protein: req.body.protein,
    carbs: req.body.carbs,
    fat: req.body.fat,
    quantity: 1,
  });
  food.save().then(() => {
    Food.find()
        .then(function(doc) {
          console.log(JSON.stringify(doc));
          var bmr = 2200;
          var totalCal = 0;
          var totalProtein = 0;
          var totalCarb = 0;
          var totalFat = 0;
          doc.forEach((e) => {
            e.calories = e.calories * e.quantity;
             e.protein = e.protein * e.quantity;
            e.carbs = e.carbs * e.quantity;
            e.fat = e.fat * e.quantity;
          });
          doc.forEach((e) => {
            totalCal += e.calories;
            totalProtein += e.protein;
            totalCarb += e.carbs;
            totalFat += e.fat;
          });
          var remainCal = bmr - totalCal;
            res.render('update', {
              rCal: remainCal,
              myBMR: bmr,
              items: doc,
              totalCalories: totalCal,
              totalProtein: totalProtein,
              totalCarbs: totalCarb,
              totalFat: totalFat
            });
        });
  });
});

router.get('/update', function(req, res, next) {
  Food.find()
      .then(function(doc) {
        var bmr = 2200;
        var totalCal = 0;
        var totalProtein = 0;
        var totalCarb = 0;
        var totalFat = 0;
        doc.forEach((e) => {
          e.calories = e.calories * e.quantity;
           e.protein = e.protein * e.quantity;
          e.carbs = e.carbs * e.quantity;
          e.fat = e.fat * e.quantity;
        });
        doc.forEach((e) => {
          totalCal += e.calories;
          totalProtein += e.protein;
          totalCarb += e.carbs;
          totalFat += e.fat;
        });
        var remainCal = bmr - totalCal;

  res.render('update', {
    rCal: remainCal,
    myBMR: bmr,
    items: doc,
    totalCalories: totalCal,
    totalProtein: totalProtein,
    totalCarbs: totalCarb,
    totalFat: totalFat
  });
  });
});

router.post('/update', (req, res) => {
  var query = {name: req.body.findFoodName};
  var q = req.body.quantity;
  Food.findOne(query).then((doc) => {
    var tmp = {
      name: req.body.findFoodName,
      calories: doc.calories,
      protein: doc.protein,
      carbs: doc.carbs,
      fat: doc.fat,
      quantity: q
    }
    Food.findOneAndUpdate(query, {$set:tmp},{new: true}).then((result) => {
      console.log(result);
      Food.find()
          .then(function(doc) {
            var bmr = 2200;
            var totalCal = 0;
            var totalProtein = 0;
            var totalCarb = 0;
            var totalFat = 0;
            doc.forEach((e) => {
              e.calories = e.calories * e.quantity;
               e.protein = e.protein * e.quantity;
              e.carbs = e.carbs * e.quantity;
              e.fat = e.fat * e.quantity;
            });
            doc.forEach((e) => {
              totalCal += e.calories;
              totalProtein += e.protein;
              totalCarb += e.carbs;
              totalFat += e.fat;
            });
            var remainCal = bmr - totalCal;
      res.render('update', {
        rCal: remainCal,
        myBMR: bmr,
        items: doc,
        totalCalories: totalCal,
        totalProtein: totalProtein,
        totalCarbs: totalCarb,
        totalFat: totalFat

      });
      });
    });
  });


});

router.get('/burn', (req, res) => {
  res.render('burn');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', (req, res) => {
  var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
          user: 'youremail@address.com',
          pass: 'yourpassword'
    }
  });
  const mailOptions = {
    from: req.body.email,
    to: 'zdyb647@gmail.com',
    subject: req.body.subject,
    html: req.body.message
  };
  transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
   });
   res.render('index');
});

router.post('/burn', (req, res) => {
  res.render('burn', {
    wlCal: req.body.wlCal,
    carCal: req.body.carCal,
  });
})

router.get('/chat', function(req, res, next) {
  res.render('chat');
});

module.exports = router;
