var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/products/' })

function showProducts(req, res, err, productsList){
  var is_ajax_request = req.xhr;
  if(is_ajax_request){
    res.json({ 
      data: productsList,
      err: err
    });
  } else {
    res.render('products/index', { records: productsList }); 
  }
}


/* GET products index page. */
router.get('/products', function(req, res, next) {
  Product.find({}, function(err, products){
    showProducts(req, res, err, products);
  });
});


router.get('/products/new', function(req, res, next){
  res.render('products/new', { product: new Product(), error: null });
});


router.post('/products',upload.single('photo'), function(req, res){
  console.log(req.file);
  if(req.file) {
    req.body.product.image_url = "/uploads/products/"+req.file.filename;
  }
  var product1 = new Product(req.body.product);
  product1.save(function (err) {
    if (err){
      console.log(err);
      res.render('products/new', { product: product1, error: err });
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
      res.render('products/edit', { product: product, error: null });
    }
  });
});

router.put('/products/:id',upload.single('photo'), function(req, res){
  console.log(req.file);
  Product.findOne({ _id: req.params['id'] }, function(err, product){
    if(err) {
      res.redirect('/products');
    } else {
      if(req.file) {
        req.body.product.image_url = "/uploads/products/"+req.file.filename;
      }
      Product.update({ _id: req.params['id'] }, req.body.product, {}, function (err, raw) {
        if (err){
          console.log(err);
          res.render('products/edit', { product: product, error: err });
        } else {
          console.log('Product details updated...');
          console.log(raw);
          res.redirect('/products/'+product._id);
        }
      });
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
