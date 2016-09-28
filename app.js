var imported = require('./scott'); 

console.log(imported.dsScott); 

function placeAnOrder(orderNumber){
    console.log('customer order #', orderNumber); 
    cookAndDeliverFood(function(){
        console.log('delivered food order', orderNumber); 
    }); 
}

function cookAndDeliverFood(callback){
    setTimeout(callback, 3000); 
}

placeAnOrder(1); 
placeAnOrder(2); 
placeAnOrder(3); 
placeAnOrder(4); 
placeAnOrder(5); 
placeAnOrder(6); 

var Scott = {
    printName: function(){
        console.log('"THIS" when in a method on an obj to refers to the obj itself'); 
        console.log(this === Scott); 
    }
};
Scott.printName(); 

function globalObj(){
    console.log('When in a function NOT within an obj, "THIS" refers to the global obj'); 
    console.log(this === global); 
}
globalObj(); 

function User(name){
    this.name = name; 
    this.life = 100; 
    this.giveLife = function giveLife(targetPlayer){
        targetPlayer.life++;
        this.life--;  
        console.log(this.name + ' gave ' + targetPlayer.name + ' one life point'); 
    }; 
}

var Bucky = new User('Bucky'); 
var Wendy = new User('Wendy'); 
Bucky.giveLife(Wendy); 
console.log('Bucky: ' + Bucky.name + Bucky.life + '\nWendy: ' + Wendy.name + Wendy.life); 

User.prototype.upperCut = function upperCut(targetPlayer){
        targetPlayer.life -=3; 
        console.log(this.name + ' just upperCutted ' + targetPlayer.name); 
}; 

Wendy.upperCut(Bucky); 
console.log(Wendy); 
console.log(Bucky); 