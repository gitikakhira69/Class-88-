const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

var engine, world;
var particles=[];
var player1,ground;
var playerLife = 0;
var backgroundImg;
function preload() {
  backgroundImg = loadImage("images/bg1.jpg");
  
}

function setup() {

    createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;

    player1 = new player(300, height - 30, 100, 100)
    ground = new Ground(600, height, 1200, 5);
  
  }
  function draw() {
  
    Engine.update(engine);
    background(0);
    imageMode(CENTER);
    image(backgroundImg, 600, 200, 1200, 400);

    playerLife = Math.round(frameCount / 10);

    textSize(30)
    fill("white")
    text("LifeTime  " + playerLife, width - 250, 50);

    if (frameCount % 30 == 0) {
        newParticle();
      }
      for (var i = 0; i < particles.length; i++) {
        particles[i].display();
      }
    ground.display();
    player1.display();
  }
    function newParticle() {
      var p = new Particle(600, 0, random(5, 10));
      particles.push(p);
    }
  