//<code/>
//Create variables here
var dog1,happyDog;
var foodS,foodStock;
var database;
var name="Sheru";
var foodObj;
var lastFed;

function preload()
{
	//load images here
  dog1=loadImage("dogImg.png")
  happyDog=loadImage("dogImg1.png");

}

async function setup() {
  database=firebase.database();
  //console.log(database);

	createCanvas(1000,750);

  dog=createSprite(500,300)
  dog.addImage(dog1);
  dog.scale=0.2

  feed=createButton("Feed "+name);
  feed.position(1000,400);
  feed.mousePressed(feedDog);

  add=createButton("Add Food");
  add.position(1000,440);
  add.mousePressed(addFood);

  foodObj=new Food();




 foodStockRef=database.ref('food')

  await foodStockRef.on("value",function(data){
    foodS=data.val();
  });

  await database.ref('fedTime').on("value",function(data){
    lastFed=data.val();
  })
//console.log(lastFed);
//name="Sheru";
}


function draw() {  
background(46,139,87);

foodObj.display();
foodObj.updateFoodStock(foodS);

//text commands
textSize(15);
fill("white");
text("Note:Press The Button To Feed Sheru",5,50)
text("Food Left For The Dog: "+foodS,20,100);
//text("Last Fed Sheru at:"+lastFed,20,140)
text("Name Of The Dog:" +name,20,180); 

if(lastFed>=12){
  text("Last Fed Sheru at:" +lastFed%12 +" PM",20,140)
}
else if(lastFed===0){
  text("Last Fed Sheru at:12AM",20,140)
}
else{
  text("Last Fed Sheru at:"+lastFed +" AM",20,140)
}

drawSprites();
}

function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  dog.addImage(happyDog);
  //console.log(foodObj.getFoodStock())

  if(foodObj.getFoodStock()<=0)
  {
     foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else
  {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  }

  database.ref("/").update(
    {
      food: foodObj.getFoodStock(),
      fedTime: hour()
    }
  )
}

/*function writeStock(x)
{
  database.ref('/').update({
    'Food':foodS-1
  })
}*/

function addFood(){
  foodS++;
  dog.addImage(dog1)
  database.ref("/").update({
  food: foodS,
})
}