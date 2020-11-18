//Create variables here
var dog,dogImg,happyDogImg,milkImg,foodS,foodStock,database;
var feed, addFoods, fedTime, lastFed;
var foodObj,Hour;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDogImg =loadImage("happydog.png"); 
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.08;

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);


  addFoods = createButton("Add Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFood);

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)

 /* if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  } */



  foodObj.display();
  drawSprites();
  feed.mousePressed(feedDog);  

  //text to display food remaining
  textSize(18);
 // stroke("White");
 // text("Food Remaining : " + foodS, 230,200);
 // text("Note: Press the UP arrow to feed your pet milk !", 20,30);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Fed : "+lastFed % 12 + "PM",300,30);
  }
  else if(lastFed === 0)
  {
    text("Last Fed : 12 AM", 300,30);
  } 
  else 
  {
    text("Last Fed : "+lastFed+ "AM",300,30)
  }
}

//function to read values in database
function readStock(data)
{
  foodS = data.val();
}

//function to write values in database
function writeStock(x)
{

  if(x<=0)
  {
    x=20;
  }
  else
  {
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog()
{
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.foodStock - 1);
  database.ref('/').update({
   // food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFood()
{
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

async function hour()
{
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var Hour = datetime.slice(11,13);
}