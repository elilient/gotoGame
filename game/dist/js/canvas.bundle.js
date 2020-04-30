/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}); // Utility Functions

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
} // Collision resolve function


function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y; // Prevent accidental overlap of particles

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x); // Store mass in var for better readability in collision equation

    var m1 = particle.mass;
    var m2 = otherParticle.mass; // Velocity before equation

    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(otherParticle.velocity, angle); // Velocity after 1d collision equation

    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    }; // Final velocity after rotating axis back to original location

    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle); // Swap particle velocities for realistic bounce effect

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
} // Modified resolve collsion for mouse collision with particles


function resolveCollisionWithMouse(particle, circle) {
  var xVelocityDiff = particle.velocity.x - circle.velocity.x;
  var yVelocityDiff = particle.velocity.y - circle.velocity.y;
  var xDist = circle.x - particle.x;
  var yDist = circle.y - particle.y; // Prevent accidental overlap of particles

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(circle.y - particle.y, circle.x - particle.x); // Store mass in var for better readability in collision equation

    var m1 = particle.mass;
    var m2 = circle.mass; // Velocity before equation

    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(circle.velocity, angle); // Velocity after 1d collision equation

    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    }; // Final velocity after rotating axis back to original location

    var vFinal1 = rotate(v1, -angle); // Swap particle velocities for realistic bounce effect

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
  }
}

function Particle(x, y, radius, color) {
  var _this = this;

  this.x = x;
  this.y = y;
  this.velocity = {
    x: Math.random() * 0.2,
    y: Math.random() * 0.2
  };
  this.radius = radius;
  this.color = color;
  this.mass = 1; // Collision detection between moving particles

  this.update = function (particles) {
    _this.draw();

    for (var i = 0; i < particles.length; i++) {
      if (_this === particles[i]) continue;

      if (distance(_this.x, _this.y, particles[i].x, particles[i].y) - _this.radius * 3 < 0) {
        resolveCollision(_this, particles[i]);
      }
    }

    if (_this.x - _this.radius <= 0 || _this.x + _this.radius >= innerWidth) {
      _this.velocity.x = -_this.velocity.x;
    }

    if (_this.y - _this.radius <= 0 || _this.y + _this.radius >= innerHeight) {
      _this.velocity.y = -_this.velocity.y;
    } // mouse collision


    _this.updateMouseCollision();

    _this.x += _this.velocity.x;
    _this.y += _this.velocity.y;
  };

  this.updateMouseCollision = function () {
    var dist = distance(circle1.x, circle1.y, _this.x, _this.y);

    if (dist - _this.radius * 3 < 0) {
      resolveCollisionWithMouse(_this, circle1);
    }
  };

  this.draw = function () {
    c.beginPath();
    c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
    c.fillStyle = _this.color;
    c.fill();
    c.strokeStyle = _this.color;
    c.stroke();
    c.closePath();
  };
}

function Circle(x, y, radius, color) {
  var _this2 = this;

  this.x = x;
  this.y = y;
  this.lastX = x;
  this.lastY = y;
  this.velocity = {
    x: 0,
    y: 0
  };
  this.radius = radius;
  this.color = color;
  this.mass = 1000000;

  this.update = function () {
    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.arc(_this2.x, _this2.y, _this2.radius, 0, Math.PI * 2, false);
    c.fillStyle = _this2.color;
    c.fill();
    c.strokeStyle = _this2.color;
    c.stroke();
    c.closePath();
  };

  function getVelocity(circle) {
    setTimeout(function () {
      circle.velocity.x = (circle.lastX - mouse.x) / 2;
      circle.velocity.y = (circle.lastY - mouse.y) / 2;
      circle.lastX = mouse.x;
      circle.lastY = mouse.y;
      getVelocity(circle);
    }, 2);
  }

  getVelocity(this);
} // Implementation


var particles;
var circle1;
var particleCount = 30;

function init() {
  particles = [];
  circle1 = new Circle(undefined, undefined, 20, 'red');

  for (var i = 0; i < particleCount; i++) {
    var radius = 20;
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(radius, canvas.height - radius);
    var color = 'blue';

    if (i !== 0) {
      for (var j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }

  console.log(particles);
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  circle1.x = mouse.x;
  circle1.y = mouse.y;
  circle1.update();
  particles.forEach(function (particle) {
    particle.update(particles);
  });
}

init();
animate();

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map