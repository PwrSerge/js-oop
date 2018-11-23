

//Factory function
// function createCircle(radius) {
//     return {
//         radius,
//         draw: function() {
//             console.log(radius);
            
//         }
//     }
    
// }
//  const circle2 = createCircle(2);
// // circle.draw();

// // Constructor function
// function Circle(radius) {
//     //Instance members
//     this.radius = radius;
//     let defaultLocation = {x:0 , y:0};

//     this.getDefaultLocation = function() {
//         return defaultLocation;
//     }
//     // getter and setter
//     Object.defineProperty(this, 'defaultLocation', {
//         get: function() {
//             return defaultLocation;
//         },
//         set: function(value) {
//             if (!value.x || !value.y)
//                 throw new Error('Invalid Location.');
//             defaultLocation = value;
//         }
//     })
  
// }

// //prototype members
// Circle.prototype.draw = function () {    
//     console.log('draw');
// }

Circle.call({},1); // 


const circle = new Circle(1);

// internally it is the same as
const Circle1 = new Function('radius', `
 this.radius = radius;
 this.draw = function () {
     console.log(radius);
 }
`);

const circle3 = new Circle1(2);

//Primitives are copied by their value and Objects are copied by their reference

let obj = { value: 10 };
function increase(obj) {
    obj.value++;
}
increase(obj);


// Add propperty - remove property
circle.location = { x : 1 };
circle['location'] = { x : 1 }; // bracket notification

delete circle.location;

//enumerating properties

// for (let key in circle) {
//     if (typeof circle[key] !== 'function' )
//     console.log(key, circle[key]);    
// }

// const keys = Object.keys(circle);
// console.log(keys);

if ('radius' in circle)
    // console.log('Circle has a radius');
    

// let arr1 =  [1,'efef', [5,6]]
// for (let item of arr1) {
//     console.log(item)
// }

//Ex: 1
// function StopWatch() {
//     let startTime, endTime, running, duration = 0;

//     this.start = function start() {
//         if (running)
//             throw new Error('Stopwatch had already started');
        
//         running = true;
//         startTime =  new Date();
//     }
//     this.stop = function stop() {
//         if (!running)
//             throw new Error('Stopwatch is not started');
//         running = false;

//         endTime =  new Date();

//         const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
//         duration += seconds;
        
//     }
//     this.reset = function reset() {
//         startTime = null;
//         endTime = null;
//         running =  false;
//         duration = 0;        
//     }
//     Object.defineProperty(this, 'duration', {
//         get: function() {
//             return duration;
//         }

//     })
// }

// let watch =  new StopWatch;


// Inheritance Classical vs Prototypical
//Base -  Super -  Parent

// Prototype Inheritance -- prototype is the parent
// let x = {};

// __proto__
// _constructor -- Every object has a constructor property which references the function that was used to construct the object

// let myArray = [];

// muArray --> arrayBase --> objectBase (walks up the prototype chain)
// let person = { name : 'Mosh'};
// let objectBase = Object.getPrototypeOf(person);
// let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');

// console.log(descriptor);


// Object.defineProperty(person, 'name', {
//     writable: false,
//     enumerable: false,
//     configurable: false
// })

//Overide string method on Circle
Circle.prototype.toString = function() {
    return `Circle with radius: ${this.radius}`
}

//iterating through instance members and prototype members
//console.log(Object.keys(circle)) // returns instance members
//for (let key in circle) console.log(key);

// Should not modify the build in objects!! i.e. Array.prototype.shuffle()

//Ex2: Refactor stopwatch with prototypes
//For this scenario, this is a bad idea as it exposes the duraion member {public} and affects the state of the object.
//This is what we would call premature optimization

// function StopWatch() {
//     let startTime, endTime, running, duration = 0;

//         Object.defineProperty(this, 'duration', {
//             get: function () {
//                 return duration;
//             },
//             set: function(value) {
//                 duration = value;
//             }
//         })

   
//     Object.defineProperty(this, 'startTime', {
//         get: function () {
//             return startTime;
//         }
//     })
    
//     Object.defineProperty(this, 'endTime', {
//         get: function () {
//             return endTime;
//         }
//     })
    
//     Object.defineProperty(this, 'running', {
//         get: function () {
//             return running;
//         }
//     })
   
// }

//  Stopwatch.prototype.start = function start() {
//      if (this.running)
//          throw new Error('Stopwatch had already started');

//      this.running = true;
//      this.startTime = new Date();
//  }
//  Stopwatch.prototype.stop = function stop() {
//      if (!this.running)
//          throw new Error('Stopwatch is not started');
//      this.running = false;

//      this.endTime = new Date();

//      const seconds = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
//      duration += seconds;

//  }
//  Stopwatch.prototype.reset = function reset() {
//      this.startTime = null;
//      this.endTime = null;
//      this.running = false;
//      this.duration = 0;
//  }

// Prototypical inheritance
function Shape(color){
    this.color = color;
};

Shape.prototype.duplicate = function () {
    console.log('duplicate');
}


function Circle(radius, color) {
    Shape.call(this, color); // calls the super constructor
    this.radius = radius;
}


//Circle.prototype = Object.create(Shape.prototype);
//whenever you reset the prototype of an object, 
// you should change the constructor of the object back to it's constructor function
//Circle.prototype.constructor = Circle;

extend(Circle, Shape);


// overriding prototype
Circle.prototype.duplicate = function () {
    // Shape.prototype.duplicate.call(this);
    console.log('duplicate Circle');
}


Circle.prototype.draw = function() {
    console.log('draw');
}

function Square(size) {
    this.size = size;
}

//Polymorphism
extend(Square, Shape);
Square.prototype.duplicate = function () {
    console.log('duplicate Square');
}


// intermediate function inheritance
function extend (Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

const s = new Shape();
const c = new Circle(1, 'blue');

const shapes = [ 
    new Circle(),
    new Square()
]

for (let shape of shapes) {
    shape.duplicate();
}

//Avoid creating inheritance hierachies, keep it to one level --> favor compisition  over inheritance
function mixin(target, ...sources) {
    Object.assign(target, ...sources);
}


const canEat = {
    eat: function() {
        this.hunger--;
        console.log('eating');
    }
}

const canWalk = {
    walk: function () {
        console.log('walking');
    }
}

const canSwim = {
    swim: function () {
        console.log('swim');
    }
}

function Person() {};
function Fish() { };

mixin(Person.prototype, canEat, canWalk);
mixin(Fish.prototype, canEat, canSwim)
const personA =  new Person();
const goldFish = new Fish();

// console.log(personA);
// console.log(goldFish);

//Ex 3: Prototypical Inheritance
// HTMLElement
// HTMLSelectElement


function HtmlElement() {
    this.click = function () {
        console.log('clicked');
    }  
};

HtmlElement.prototype.focus = function () {
    console.log('focused');
}

function HtmlSelectElement(items = []){
    this.items = items;
    this.addItem = function(item) {
        this.items.push(item);
    }
    this.removeItem = function(item){
        let index =  items.indexOf(item);
        if (index > -1) {
            items.splice(index , 1);
        }
    }
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

const h =  new HtmlElement();
const htmls =  new HtmlSelectElement();

// ES6 Classes

class CircleS {
    constructor(radius){
        this.radius =  radius;
        this.move = function(){};
    }

    // Instance method
    draw() {
      console.log('draw');        
    }

    // Static Method
    static parse(str){
        const radius = JSON.parse(str).radius;
        return new CircleS(radius);
    }
}

const cf = CircleS.parse('{"radius": 1}');
// console.log(cf);


//Function  Declaration--> no semi-colons
function sayHelloD(){}

// //Function Expression
const sayHelloE = function() {};

// //Class Declaration -- not hoisted !
class CircleD {}

// //Class Expression
const SquareE =  class Square{};

'use strict';
//Method Call
//cf.draw();

const draw =  cf.draw;

//Function Call
//draw();

// Adding private properties with Symbol
// const _radius = Symbol();
// const _draw =  Symbol();
// class CircleSymb {
//     constructor(radius) {
//         this[_radius] = radius;
//     }

//     [_draw]() {
//     }
// }

// Weakmap
const _radius = new WeakMap();
const _move = new WeakMap();

const privateProps = new WeakMap(); //setting all private properties within a single WeakMap

class CircleWeakMap {
    constructor(radius) {

        privateProps.set(this, {
            radius: radius,
            move: () => {
                console.log('move', this);
            }
        });

        privateProps.get(this).radius;

        _radius.set(this, radius);
        _move.set(this, () =>  {
            console.log('move', this);            
        }) // es6 arrow functions use the "this" value of their containing function
    }

    draw() {
        //console.log(_radius.get(this))
        _move.get(this)();
        console.log('draw');
        
    }
}

const cWeakMap = new CircleWeakMap(3);

// Setters and Getters with ES6 classes
const _radiusG = new WeakMap();

class CircleG {
    constructor(radius) {
        _radiusG.set(this, radius);
    }

    get radius() {
        return _radiusG.get(this);
    }

    set radius(value) {
        if (value <= 0) throw new Error('invalid radius');
        _radiusG.set(this, value);
    }


}

const cG  =  new CircleG(3);

// Inheritance

// class Animal {

//     constructor(legs) {
//         this.legs = legs;
//     }
//  walk() {
//      console.log('I can walk');     
//  }
// }

// class Dog extends Animal {

//     constructor(legs, color) {
//         super(legs)
//         this.color = color;
//     }

//     bark() {
//         console.log('bark')
//     }
// }

// const pug =  new Dog(3, 'brown');

// Method Overriding

class Animal {

    constructor(legs) {
        this.legs = legs;
    }
    walk() {
        console.log('I can walk');
    }
}

class Dog extends Animal {

    constructor(legs, color) {
        super(legs)
        this.color = color;
    }

    walk() {
        super.walk();
        console.log('pug walk')

    }

    bark() {
        console.log('bark')
    }
}
const pug = new Dog(3, 'brown');

//Ex: 4 

const _items = new WeakMap();

class Stack {

    constructor() {
        _items.set(this, []);
    }

    get peek() {
        const items = _items.get(this);
        if (items.length === 0)
            throw new Error('Stack is empty');

        return items[items.length -1];
    }

    pop() {
        const items = _items.get(this);
        if(items.length === 0 )
            throw new Error('Stack is empty');

        return items.pop();

    }

    push(obj) {
        _items.get(this).push(obj);
    }

    get count() {
        return _items.get(this).length;
    }
}

const amazingStack = new Stack('d');

//Modules
//AMD used for Browser
//CommonJS for Node.js
//UMD Browser/Node.js
//ES6 native 

//CommonJS format
// const CircleCJS = require('./circle');\

//ES6 Modules
import {CircleCJS} from "./circle.js";
const cjs = new CircleCJS(4);
cjs.draw();
