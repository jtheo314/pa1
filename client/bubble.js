function BubblePop(x,y,r,c) {
    this.x=x; this.y=y; this.r=r; this.c=c;
}

BubblePop.prototype.caught = function(f) {
    var d = distFromOrigin(f.x-this.x,f.y-this.y);
    return(d<(f.r+this.r));
}

function distFromOrigin(x,y) { return Math.sqrt(x*x + y*y);}

function Bubble(x,y,r,c,vx,vy){
    this.x=x;
    this.y=y;
    this.r=r;
    this.c=c;
    this.vx=vx;
    this.vy=vy;
    this.alive = true;
}

Bubble.prototype.update = function(dt){
    if ((this.y + this.r >= 100) || (this.y - this.r <= 0)) this.vy *= -1;
    if ((this.x + this.r >= 100 )|| (this.x - this.r <= 0)) this.vx *= -1;
    this.x += this.vx*dt;
    this.y += this.vy*dt;

}

f1 = new Bubble(50,50,5,"slateblue",10,-5);
f2 = new Bubble(50,50,10,"black",45,15);

function BubbleModel(){
    this.w=100;
    this.h=100;
    this.net = new BubblePop(10,10,10,"black");
    this.bubbleList = [];
    this.bgcolor="black";
}

BubbleModel.prototype.addBubble = function(f){
    this.bubbleList.push(f);
}
BubbleModel.prototype.update = function(dt){
    var theNet = this.net;
    _.each(this.bubbleList,
           function(f){
               f.update(dt);
               if (theNet.caught(f)) {
                   f.alive = false;
               }
           
           }
       );
    this.bubbleList = _.filter(this.bubbleList,
                                function(f){return f.alive})
}

theModel = new BubbleModel();  
theModel.addBubble(f1);
theModel.addBubble(f2);
for(var i =0; i<300; i++){
    var myvx = Math.random()*10-5;
    var myvy = (Math.random()-0.5)*10;
    var c = (Math.random()<0.5)?"white":"white";
    theModel.addBubble(new Bubble(50,50,1,c,myvx,myvy))
}

var counter=0;
var lastTime = (new Date()).getTime();

function draw(){

    var drawContext = gameboard.getContext("2d");
    
    drawContext.fillStyle="white";
    drawContext.fillRect(0,0,gameboard.width,gameboard.height);
    drawContext.strokeStyle="#f00";

    _.each(theModel.bubbleList,
        function(f) {
            if (!f.alive) return;
            drawContext.fillStyle = f.c;
            drawContext.lineWidth = 5;
            drawContext.beginPath();
            drawContext.arc(f.x*gameboard.width/100,
                            f.y*gameboard.height/100,
                            f.r*gameboard.width/100,
                            0,2*Math.PI,true);
            drawContext.fill();
            drawContext.stroke();
        }
    );
    
    
    var net = theModel.net;
    drawContext.lineWidth = 8;
    drawContext.strokeStyle = net.c;
    drawContext.fillStyle = "white";
    drawContext.beginPath();
    drawContext.arc(net.x*gameboard.width/100,
                    net.y*gameboard.height/100,
                    net.r*gameboard.width/100,
                    0,2*Math.PI,true);
    drawContext.fill();
    drawContext.stroke();
        
}

function gameLoop(){
    var theTime = (new Date()).getTime();
    var dt = theTime - lastTime; // in milliseconds
    lastTime = theTime;
    var fps = 1000/(dt);

    theModel.update(dt/500.0);
    draw();
    
    if (running) 
        window.requestAnimationFrame(gameLoop);
}

drawIt = draw;
var running = false;

Template.bubble.events({
    "click #startgame": function(event){
        
        if (!running) {
            lastTime = (new Date()).getTime();
            running=true;
            gameLoop();
            if(first){
                Session.set('time', new Date().getSeconds());
                first=false;
            } else {
                Session.set('time', Session.get('interm') - Session.get('time'));
            }

            console.log(Session.get('time'))


            $("#startgame").html("Stop");

        } else {
            Session.set('interm', new Date().getSeconds());
            running=false;
            $("#startgame").html("Start");
            console.log(Session.get('time'))

        }
        

    }
})

Template.bubble.rendered = function(){
document.getElementById("gameboard").addEventListener('mousemove', 
  function(e){
   if (running) {
        theModel.net.x = 100*(e.pageX-gameboard.offsetLeft)/gameboard.width;
        theModel.net.y = 100*(e.pageY-gameboard.offsetTop)/gameboard.height;
     }
  }
);
}

