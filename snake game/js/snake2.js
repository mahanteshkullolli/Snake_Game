let dir={x:0,y:0};
const move=new Audio('music/move.mp3');
const foodd=new Audio('music/food.mp3');
const music=new Audio('music/music.mp3');
const gameover=new Audio('music/gameover.mp3')
let speed=5;
let lastpainttime=0;
let snakearr=[
    {x:13,y:15}
];
food={x: 7, y: 8};
score=0;




function main(ctime) {  
  window.requestAnimationFrame(main);

if((ctime-lastpainttime)/1000 < 1/speed){
return;
}
lastpainttime=ctime;
gameengine();
}
  
function iscollide(sarr){
  for(let i=1;i<snakearr.length;i++){
  if(snakearr[i].x===snakearr[0].x && snakearr[i].y===snakearr[0].y){
    return true;
  }
}
//if u bump into the wall
 if(snakearr[0].x>=18 || snakearr[0].x<=0 || snakearr[0].y>=18 || snakearr[0].y<=0){
     return true;
   }
 }
 function gameengine(){
    //part 1:update the snake array
    
    if(iscollide(snakearr)){
      gameover.play();
      music.pause();
      dir={x:0,y:0};
      alert("Game Over,press any key to play again!");
      snakearr=[{x:13,y:15}];
      music.play();
      score=0;

    }
    //if u have eaten the food ,increment score and regenerate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
      foodd.play();
      score+=1;
      if(score>highscoreval){
        highscoreval=score;
        localStorage.setItem('highscore',JSON.stringify(highscoreval));
        highscorebox.innerHTML="highscore:" + highscoreval;
      }
      scorebox.innerHTML='score: '+score;
      snakearr.unshift({x: snakearr[0].x+dir.x,y:snakearr[0].y+dir.y}) ;

      let a=2;
      let b=16;
      food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //moving a snake
    for(let i=snakearr.length-2;i>=0;i--){
      snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=dir.x;
    snakearr[0].y+=dir.y;

    //part 2:display the snake and food
    //display the snake
   box.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
       
        if(index===0){
          snakeElement.classList.add('head');
        }else{
          snakeElement.classList.add('snake');
        }
       box.appendChild(snakeElement);
    });
    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
   box.appendChild(foodElement);
 }
//main logic starts here
 music.play();
let highscore=localStorage.getItem('highscore');
 if( highscore===null){ 
 highscoreval=0;
 localStorage.setItem('highscore',JSON.stringify(highscoreval));
}else{
  highscoreval=JSON.parse(highscore);

  highscorebox.innerHTML='highscore= ' + highscore;
 
}

 window.requestAnimationFrame(main);
 window.addEventListener('keydown',e=>{
  dir={x:0,y:1}//start game
  move.play();
  switch(e.key){
    case "ArrowUp":
      console.log("arrowup");
      dir.x=0;
      dir.y=-1;
      break;
    case "ArrowDown":
      dir.x=0;
      dir.y=1; 
      console.log("arrowdown");
      break;
      case "ArrowLeft":
        dir.x=-1;
        dir.y=0;
        console.log('arrowleft');
        break;
        case "ArrowRight":
          dir.x=1;
          dir.y=0;
          console.log("arrowright");
          break;
          default:
            break;
  }
 });