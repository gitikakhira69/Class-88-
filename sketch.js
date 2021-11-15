

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

var engine, world;
var particles=[];
var player1,ground;
var playerLife = 0;
var backgroundImg;
var b_partical = [];
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
        if(particles[i].body.position.y>370){
          World.remove(world, particles[i].body);
              particles.splice(i, 1);
              i--;
            
        }
      }
      if(frameCount % 100 === 0){
        boosterPartical()
      }
      for(var i = 0 ;i < b_partical.length;i++){
        b_partical[i].display();
        if(b_partical[i].body.position.y>365){
          World.remove(world,b_partical[i].body);
          b_partical.splice(i,1);
          i--;
        }
      }
    ground.display();
    player1.display();
    Events.on(engine,"collisionStart",collision)
  }
  function collision(event){
    console.log(event.pairs[0])
    var pair = event.pairs
    for(var i; i < pair.length;i++){
      var bodyA = pair[i].bodyA.label
      var bodyB = pair[i].bodyB.label
      if(bodyA == "particlas" && bodyB == "player" || bodyA == "player" && bodyB == "partical"){
        Matter.Body.setPosition(player1.body,{x:mouseX,y:player1.body.position.y+0.05})
      }
    }
  }
  function boosterPartical(){
    var p = new Booster(random(10,width-10), 0, random(5, 10));
      b_partical.push(p);
  }
    function newParticle() {
      var p = new Particle(random(10,width-10), 0, random(5, 10));
      particles.push(p);
    }
  
