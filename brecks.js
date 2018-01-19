var canvas = document.getElementById('brickbreaker');
var contex = canvas.getContext('2d');
function brecks(){
    this.levels;
    this.status = 1;
    this.bricks = [];
    this.x = 0;
    this.y = 0;
    this.levelsarray=1;
                     switch (this.levelsarray) {
            case 1:
                this.levels = level1;
             break;
            case 2:
                this.levels = level2;
             break;
            case 3:
                this.levels = level3;
             break;
            case 4:
                this.levels = level4;
             break;
    }
}
brecks.prototype.getBrecks = function (){
  
     for(key in this.levels) {
            this.bricks[key] = [];
            for(key2 in this.levels) {
                this.bricks[key][key2] = { x: this.x, y: this.y, status: this.status };
            }
        }
}
brecks.prototype.levelup= function(){

    if(this.levelsarray>=4){
        this.levelsarray+=1;
    }else{
        this.levelsarray = 0;
    }      

}
brecks.prototype.drawBricks = function(){
 
    for(key in this.levels) {
        for(key2 in this.levels) {
            if(this.bricks[key][key2].status == 1) {
                for(k in this.levels){
                var brickX = this.levels[k].x
                var brickY = this.levels[k].y;
                this.bricks[key][key2].x = brickX;
                this.bricks[key][key2].y = brickY;
                contex.beginPath();
                contex.fillStyle = this.levels[k].color;
                contex.rect(brickX, brickY,this.levels[k].width, this.levels[k].height);
                contex.fill();
                contex.closePath();
                }
            }
        }
    }
}
function color(){
    
	brecks.call(this);
}
color.prototype=Object.create(brecks.prototype);
color.prototype.colorFunc=function(){
	brecks.prototype.drawBricks.call(this);
    console.log(this);
		for (key in this.levels) {
			for (key2 in this.levels) {
				 contex.fillStyle = this.levels[key2].color;		
			}
		}
}
 var c = new color();

var testbricks = new brecks();

 testbricks.getBrecks();
//  testbricks.levelup();
 setInterval(testbricks.drawBricks.bind(testbricks), 10);


