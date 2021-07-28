//Game Loop :
function init(){
    canvas = document.getElementById('canvas');
    canvas.width = 500;
    canvas.height = 500;

    pen = canvas.getContext("2d");

    game_over = false ;
    score = 0 ;

    //Sound object :
    eat_audio = new Audio("./Audio/Eat.mp3") ;

    //Food and trophy image objects :
    food_img = new Image() ;
    food_img.src="./Images/Apple.png" ;
    trophy_img = new Image() ;
    trophy_img.src = "./Images/Trophy.png" ;

    //Snake object : 
    //Underlying data structure : Array
    snake = {
        init_len: 5 , //Initial Length
        color:"blue" ,
        cells:[] , //Each cell consists of relative coordinates of that cell
        direction :"none" ,
        cellSize : 33.5 ,

        createSnake : function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i+2,y:0}) ;
            }
        },

        drawSnake : function(){
            pen.fillStyle = this.color;
            var cs = this.cellSize;

            for(var i=0 ;i<this.cells.length ;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-1,cs-1) ;
            }
        },

        updateSnake : function(){
            if(this.direction=="none"){
                return ;
            }

            var headX = this.cells[0].x ;
            var headY = this.cells[0].y ;

            //If food is eaten by the snake 
            if(headX==food.x && headY==food.y){
                food = getFood() ;
                score++ ;
                eat_audio.play() ;
            }
            //If food is eaten no need to reduce the length 
            else { 
                this.cells.pop() ;
            }


            if(this.direction=="right"){
                var nextX = headX+1 ;
                var nextY = headY ;
            }
            else if(this.direction=="left"){
                var nextX = headX-1 ;
                var nextY = headY ;
            }
            if(this.direction=="up"){
                var nextX = headX ;
                var nextY = headY-1 ;
            }
            if(this.direction=="down"){
                var nextX = headX ;
                var nextY = headY+1 ;
            }

            this.cells.unshift({x:nextX,y:nextY}) ;

        },

        checkSnake : function(){
            var headX = this.cells[0].x ;
            var headY = this.cells[0].y ;

            //To prevent snake from going out 
            var lastX = canvas.width / this.cellSize;
            var lastY = canvas.height / this.cellSize;
            if (headX < 0 || headX > lastX) {
                game_over = true;
            }
            if (headY < 0 || headY > lastY) {
                game_over = true;
            }

            //To prevent snake to overlap itself 
            for(var i = 1 ;i<this.cells.length ;i++){
                if(headX == this.cells[i].x && headY == this.cells[i].y){
                    game_over = true ;
                }
            }

        }
    };

    //Food object :
    food = getFood();

    snake.createSnake() ;

    function keyPressed(event){
        if(event.key=='ArrowRight'){
            snake.direction='right' ;
        }
        else if(event.key=='ArrowLeft'){
            snake.direction='left' ;
        }
        else if(event.key=='ArrowUp'){
            snake.direction='up' ;
        }
        else if(event.key=='ArrowDown'){
            snake.direction='down' ;
        }
    }

    document.addEventListener('keydown',keyPressed) ;
}

function draw(){
    //Erase the old frame
    pen.clearRect(0,0,canvas.width,canvas.height) ;

    snake.drawSnake() ;
    food.drawFood() ;
    getScore() ;

}

function update(){
    snake.updateSnake() ;
    snake.checkSnake() ;
}

function getScore(){
    var cs = snake.cellSize ;
    pen.drawImage(trophy_img,12,9,cs,cs) ;
    pen.fillStyle="black" ;
    pen.font="15px Roboto" ;
    pen.fillText(score,25,25) ;
}

function getFood(){ 
    //Returns food object at random coordinates
    var cs = snake.cellSize ;
    var foodX = Math.round(Math.random()*(canvas.width-cs)/cs) ;
    var foodY = Math.round(Math.random()*(canvas.height-cs)/cs) ;

    food = {
        x : foodX ,
        y : foodY ,

        drawFood : function(){
            pen.drawImage(food_img,this.x*cs,this.y*cs,cs-1,cs-1) ;
        }
    };

    return food ;
}

function gameLoop(){
    if(game_over==true){
        clearInterval(main) ;
        alert("Game Over") ;
        return ;
    }
    draw() ;
    update() ;
}

init() ;
var main = setInterval(gameLoop,150) ;
