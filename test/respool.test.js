var async = require('async');
var assert = require('assert');
var rp = require('../respool.js');

var RespoolTest = {
  
  creation:function(callback){
    console.log('1. Instantiation from module:', '------------');
    var respool = rp.createPool();
    console.log(respool);
    assert.ok(respool, console.log("PASS"));
    return callback();
  },
  
  fillPool:function(callback){
    console.log('2. Filing pool from array', '------------');
    var respool = rp.createPool();
    var num_members = 10;
    var pool = [];
    for (var i=0; i<num_members; i+=1){
      pool.push(i);
    }
    respool.fillPool(pool, function(err, res){
      assert.ok(res && (respool.pool.length===num_members), console.log("PASS"));
      console.log(respool);
      return callback();
    });
  },
  
  getFreeMem:function(callback){
    console.log('3. Grab a resource', '------------');
    var respool = rp.createPool();
    var num_members = 5;
    var pool = [];
    for (var i=1; i<num_members+1; i+=1){
      pool.push(i);
    }
    respool.fillPool(pool, function(err, res){
      console.log(respool);
      respool.getResource(function(err, r){
        console.log(respool);
        assert.ok(r && (respool.pool.length===(num_members-1)), console.log("PASS"));
        return callback();
      });
    }); 
  },
  
  freeMem:function(callback){
    console.log('4. Free a resource', '------------');
    var respool = rp.createPool();
    var num_members = 5;
    var pool = [];
    for (var i=1; i<num_members+1; i+=1){
      pool.push(i);
    }
    respool.fillPool(pool, function(err, res){
      console.log(respool);
      respool.getResource(function(err, res){
        console.log(respool);
        console.log('Grabbed res:', res);
        respool.freeResource(res, function(err, res){
          console.log(respool);
          assert.ok(res && (respool.pool.length===num_members), console.log("PASS"));
          return callback();
        });
      });
    });
  },
  
  setUrgency:function(callback){
    console.log('5. Set urgency', '------------');
    var respool = rp.createPool();
    var urgency = 40;
    respool.setUrgency(urgency, function(err, res){
      console.log(respool);
      assert.ok(res && respool.urgency===urgency, console.log("PASS"));
      return callback();
    });
  },
  
  addToPool:function(callback){
    console.log('6. Adding members to pool', '------------');
    var respool = rp.createPool();
    var num_members = 10;
    for (var i=1; i<num_members+1; i+=1){
      respool.addResource(i, function(err, res){
        if (respool.pool.length===num_members){
          assert.ok(res && (respool.pool.length===num_members), console.log("PASS"));
          console.log(respool);
          return callback();  
        }
      });
    }
  },
   
};

var tests = [];

for (var i in RespoolTest) {
  if (RespoolTest.hasOwnProperty(i)){
    tests.push(RespoolTest[i]);  
  }
}

async.series(tests);
