//Game Loop :
function init(){
    canvas = document.getElementById('canvas');
    canvas.width = 500;
    canvas.height = 500;

    pen = canvas.getContext("2d");

    game_over = false ;

    //Snake object : 
    //Underlying data structure : Array
    snake = {
        init_len: 5 , //Initial Length
        color:"blue" ,
        cells:[] , //Each cell consists of relative coordinates of that cell
        direction :"right" ,
        cellSize : 33.5 ,

        createSnake : function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0}) ;
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
            var headX = this.cells[0].x ;
            var headY = this.cells[0].y ;

            //If food is eaten by the snake 
            if(headX==food.x && headY==food.y){
                food = getFood() ;
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

            //To prevent snake from going out 
            var lastX = canvas.width/this.cellSize ;
            var lastY = canvas.height/this.cellSize ;
            if(this.cells[0].x <0 || this.cells[0].x>lastX){
                game_over = true ;
            }
            if(this.cells[0].y<0  || this.cells[0].y>lastY){
                game_over = true ;
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

}

function update(){
    snake.updateSnake() ;
}

function getFood(){ 
    //Returns food object at random coordinates
    var cs = snake.cellSize ;
    var foodX = Math.round(Math.random()*(canvas.width-cs)/cs) ;
    var foodY = Math.round(Math.random()*(canvas.height-cs)/cs) ;

    food = {
        x : foodX ,
        y : foodY ,
        color : "red" ,

        drawFood : function(){
            pen.fillStyle = this.color ;
            pen.fillRect(this.x*cs,this.y*cs,cs-1,cs-1) ;
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
