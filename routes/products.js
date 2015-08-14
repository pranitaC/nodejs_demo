var express = require('express');
var router = express.Router();
var Product = require('../models/product');

function showProducts(res, err, productsList){
  res.render('products/index', { records: productsList });
}


/* GET users index page. */
router.get('/products', function(req, res, next) {
  Product.find({}, function(err, products){
    showProducts(res, err, products);
  });
});


router.get('/products/new', function(req, res, next){
  res.render('products/new', { product: new Product() });
});


router.post('/products', function(req, res){
  console.log(req.body.product);
  var product1 = new Product(req.body.product);
  product1.save(function (err) {
    if (err){
      console.log(err);
      res.render('products/new');
    } else {
      console.log('Product created...');
      res.redirect('/products/'+product1._id);
    }
  });
});

router.get('/products/:id', function(req, res, next){
  Product.findOne({ 
    _id: req.params['id'] 
  }, function(err, product){
    if(err) {
      res.redirect('/products');
    } else {
      res.render('products/show', { product: product });
    }
  });
});


router.get('/products/:id/edit', function(req, res, next){
  Product.findOne({ _id: req.params['id'] }, function(err, product){
    if(err) {
      res.redirect('/products');
    } else {
      res.render('products/edit', { product: product });
    }
  });
});

router.put('/products/:id', function(req, res){
  console.log(req.body.product);
  var product = new Product(req.body.product);
  product._id = req.params['id'];
  Product.update({ _id: req.params['id'] }, req.body.product, {}, function (err, raw) {
    if (err){
      console.log(err);
      res.render('products/edit', { product: product });
    } else {
      console.log('Product details updated...');
      console.log(raw);
      res.redirect('/products/'+product._id);
    }
  });
});

router.delete('/products/:id', function(req, res, next){
  Product.findOne({ _id: req.params['id'] }, function(err, product){
    if(err) {
      res.redirect('/products');
    } else {
      product.remove(function(err, product){
        if (err) {
          res.redirect('/s');
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removed Product: ' + product.name);
          res.redirect('/products');
        }
      });
    }
  });
});

module.exports = router;
