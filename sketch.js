var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
  fedTime = database.ref("FeedTime");

  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed");
  feed.position(900,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(mouseY,139,mouseX);
  foodObj.display();
 
  //write code to read fedtime value from the database 
  if(foodStock !== undefined) {
    textSize(15);
    fill("red");
    text("Food Remaining: "+foodStock, 250, 650);
}
  if(lastFed>=12) {
    text("Last Fed: "+lastFed%12+" PM", 10, 30);
} 
  else if(lastFed===0) {
    text("Last Fed: Never", 10, 30);
} 
  else {
    text("Last Fed: "+lastFed + " AM", 10, 30);
  }
text("Epilepsy Warning",180,30);
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodStock);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood(foodStock);
  database.ref("/").update({
    Food: foodStock,
    FeedTime: hour()
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food: foodStock
  })
}
