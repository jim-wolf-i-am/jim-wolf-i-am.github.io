// MY VARIABLES
    var crazyrotate_R = 0;
    var crazyrotate_r = 0;
    var sizeR;
    var moon_offset;
    var speed_Around;
    var speed_Pen_around;
    var desired_shape;
    var willbe_desired_shape;
    var animation_is_running;
    var mostRecentShape;
    var shapecolor;

    var redValue=255;
    var greenValue=126;
    var blueValue=0;

    var hueValue = 30; // value ranges 0 - 360
    var saturationValue = 100; // value ranges 0% – 100%
    var lightnessValue = 50; // value ranges 0% – 100%

    var OutputRedTarget = document.getElementById('outputRed');
    var OutputGreenTarget = document.getElementById('outputGreen');
    var OutputBlueTarget = document.getElementById('outputBlue');

    var OutputHueTarget = document.getElementById('outputHue');
    var OutputLightnessTarget = document.getElementById('outputLightness');
    var OutputSaturationTarget = document.getElementById('outputSaturation');

    var opacityValue = 0.20;
    
    var combinedColor;
    
    var OutputOpacityTarget = document.getElementById('outputOpacity');
    var OutputHorzScale = document.getElementById('outputHorzScale');
    var OutputVertScale = document.getElementById('outputVertScale');
    
    var willbe_desired_horzScale;
    var willbe_desired_vertScale;
    var horzScale=1;
    var vertScale=1;
    var combinedScale;

var mvT_xtracker;  //  WHAT?
var mvT_ytracker;  //  HUH?

var revolutions = 0;
var stopper = 0;

var pattern_amount;
var full_pattern = 6282;  //   WORKS IF 'LARGER CRICLE SPEED' is a whole number
var half_pattern = 3141;  //   HALF ORDER, for things like 9 100 20 99
var third_pattern = 2094;  //   THIRD ORDER, also for things like 9 100 20 99



var captureFrame = false;


	// Get the buttons.
	var turboBtn = document.getElementById('turboBtn');
	var stopBtn = document.getElementById('stopBtn');
	var resetBtn = document.getElementById('resetBtn');

	// A variable to store the requestID.
	var requestID;

	// Canvas
	var canvas = document.getElementById('stage');

	// 2d Drawing Context.
	var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';


var img_svg_blob = new Image();
//img_svg_blob.setAttribute('crossOrigin', 'anonymous');   //   THAT REALLY DIDN'T WORK
//img_svg_blob.src = url;
//img_svg_blob.onload = function() {
img_svg_blob.src = "SVG-Canvas-TEST4-blob.svg";

//var img_svg_blob = document.getElementById('svg_blob_ext');
//var svgDoc = img_svg_blob.contentDocument;
//var svg_inside = svgDoc.getElementById('Layer_1');
//img_svg_blob.src = "SVG_Type.svg";
//img_svg_blob.src = document.getElementById('hot_pink_blob'); // DIDN'T WORK

//var img_svg_blob = new Image();  // DIDN'T WORK
//img_svg_blob.src = document.getElementById('svg_blob_int');

var svgp1_blob = new Path2D("M50.6,37.8c-17.8,16.2-45.4,41.5-48.4,80c-2.8,36.6,17,81.8,44.8,87.2c31.1,6.1,50.6-41.7,78.3-35.2c35.8,8.4,32,95.1,47.8,95.6c19.1,0.6,61-125.2,10.2-190c-5.3-6.7-17-21.6-31.7-20.9c-31.1,1.5-47.3,71.2-55,69.3C91.8,122.6,93,93.8,109.2,2C94.4,7.6,72.2,18.1,50.6,37.8z");

// SMALLER VERSION
//var svg2 = new Path2D('M101.17,2.517c0,80.688,38.821,129.942,96.304,166c-57.295-35.871-129.772-36.058-192.609,0C67.703,132.459,101.17,83.206,101.17,2.517z');
// LARGER VERSION
var svg_puckeredtri = new Path2D('M130,0c0,108.9,52.4,175.4,130,224.1c-77.3-48.4-175.2-48.7-260,0C84.8,175.4,130,108.9,130,0z');

var svg_leaf = new Path2D('M52.5,222.7C115.6,157.1,116,74,52.5,2C-10.7,67.7-11,150.7,52.5,222.7z');

var grad_red_orange=ctx.createLinearGradient(0,0,50,0);
grad_red_orange.addColorStop(0,"rgba(255, 0, 0, 0.15)");
grad_red_orange.addColorStop(1,"rgba(255, 128, 0, 0.15)");

var grad_red_blue=ctx.createLinearGradient(0,0,200,0);
grad_red_blue.addColorStop(0,"rgba(23, 85, 255, 0.27)");
grad_red_blue.addColorStop(.5,"rgba(255, 0, 0, 0.10)");
grad_red_blue.addColorStop(1,"rgba(23, 85, 255, 0.27)");

var grad_red_blue_canvas=ctx.createLinearGradient(0,0,0,1400);
grad_red_blue_canvas.addColorStop(0,"rgb(15, 51, 150)");
grad_red_blue_canvas.addColorStop(.5,"rgb(149, 2, 2)");
grad_red_blue_canvas.addColorStop(1,"rgb(15, 51, 150)");

var c_mid_x = ctx.width/2;
var c_mid_y = ctx.height/2;

var rdgrad_red_orange_elipse=ctx.createRadialGradient(0,-200,0,0,-200,100);
rdgrad_red_orange_elipse.addColorStop(0,"rgba(255, 0, 0, 0.15)");
rdgrad_red_orange_elipse.addColorStop(1,"rgba(255, 128, 0, 0.15)");

var rdgrad_red_orange=ctx.createRadialGradient(0,0,0,0,0,100);
rdgrad_red_orange.addColorStop(0,"rgba(255, 0, 0, 0.15)");
rdgrad_red_orange.addColorStop(1,"rgba(255, 128, 0, 0.15)");

var rdgrad_red_orange_canvas=ctx.createRadialGradient(900,700,0,900,700,900);
rdgrad_red_orange_canvas.addColorStop(0,"rgb(198, 99, 0)");
rdgrad_red_orange_canvas.addColorStop(1,"rgb(186, 0, 0)");

var rdgrad_red_blue_canvas=ctx.createRadialGradient(900,700,0,900,700,1100);
rdgrad_red_blue_canvas.addColorStop(.2,"rgb(15, 0, 198)");
rdgrad_red_blue_canvas.addColorStop(1,"rgb(186, 0, 0)");


var userInputForm = document.anim_input;

function btnGetFormClick (e) {

    console.log('start of btnGetFormClick function...');
    
    var n = userInputForm.radius1.value;
    sizeR = (n-1) * 18.75 + 100;
    moon_offset = userInputForm.penoffset.value;
    speed_Around = parseInt(userInputForm.speed_LC.value)/1000;
    speed_Pen_around = parseFloat(userInputForm.speed_sc.value)/1000;
    desired_shape = willbe_desired_shape;
    horzScale = willbe_desired_horzScale;
    vertScale = willbe_desired_vertScale;
    revolutions = 0;
    
    setPatternAmount();

    let random_color = document.getElementById('random_color').checked;
    if(random_color){
        setRandomColor();
    }
        
    makeCombinedColor();
//        console.log('btnGetFormClick thinks animation is not running, and will trigger init');

    init();
    document.getElementById('animInput').setAttribute('class','center fadeaway');
    document.getElementById('main').removeEventListener('keyup', checkSubmit);

    window.scrollTo(0,0);
}

function getRadioCheckedValue(radio_name) {
   var oRadio = document.forms[0].elements[radio_name];
 
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
 
   return '';
}



function draw_Teardrop() {
    

//        ctx.globalAlpha = 0.3;
        ctx.beginPath();
//        ctx.moveTo(-20,-200);
//        ctx.bezierCurveTo(300,100,-90,100,20,-120);  // TEARDROP 1
//        ctx.moveTo(40, 20);
//        ctx.bezierCurveTo(0,100,81,100,40,20);  // TEARDROP 2 (small)
        ctx.moveTo(120, 20);
        ctx.bezierCurveTo(0,300,240,300,120,20);  //  TEARDROP 3, larger
        ctx.closePath();
        ctx.stroke();
}

function draw_Circle() {
                ctx.moveTo(-200,-20);   //  UNLIKE TEARDROP, MOVETO MUST COME BEFORE BEGINPATH
                                            //  WORKS WITH 'INTERESTING'

        ctx.beginPath();

//        ctx.arc(300,100,100,0,2*Math.PI);  // CIRCLE, KINDA BIG PATTERNS
//        ctx.arc(0,0,100,0,2*Math.PI);  // CIRCLE, SLINKY MOTION!!!
        ctx.arc(-100,0,100,0,2*Math.PI);  // CIRCLE, INTERESTING
//        ctx.arc(0,0,100,0,2*Math.PI);  // CIRCLE, IN THE MIDDLE
            ctx.closePath();
        ctx.stroke();
}

function draw_Ellipse() {
//                ctx.moveTo(-200,-20);   //  UNLIKE TEARDROP, MOVETO MUST COME BEFORE BEGINPATH
//    ctx.globalAlpha = 0.14;
                ctx.moveTo(50,0);   //  INTERESTING
    
    mvT_xtracker = 50;
    mvT_ytracker = 0;

        ctx.beginPath();
//ctx.strokeStyle=rdgrad_red_orange_elipse;
//ctx.fillStyle=rdgrad_red_orange_elipse;
    
        ctx.ellipse(0,-200,100,33,-10,0,2*Math.PI);  // ELLIPSE
            ctx.closePath();
    ctx.stroke();
//    ctx.fill();
}

function draw_Triangle() {
//    ctx.globalAlpha = 0.14;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 150);
        ctx.lineTo(0,150);
        ctx.closePath();
        ctx.stroke();
}

function draw_Square() {
    ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 0);
        ctx.lineTo(200,200);
        ctx.lineTo(0,200);
        ctx.closePath();
//    ctx.globalAlpha = 0.14;
        ctx.stroke();

}

function draw_Diamond() {
ctx.lineWidth=0.700;
    ctx.beginPath();
        ctx.moveTo(-100, 0);
        ctx.lineTo(0, -173);
        ctx.lineTo(100,0);
        ctx.lineTo(0,173);
        ctx.closePath();
//    ctx.globalAlpha = 0.14;
        ctx.stroke();

}

function draw_Dots() {
//    ctx.globalAlpha = 0.34;
ctx.fillStyle=combinedColor;
    ctx.beginPath();
    ctx.moveTo(0,0);
        ctx.arc(-100,0,2,0,2*Math.PI);
        ctx.fill();

ctx.beginPath();
    ctx.moveTo(0,0);
        ctx.arc(100,0,2,0,2*Math.PI);
//            ctx.fillStyle = shapecolor;
        ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0,0);
        ctx.arc(0,-173,2,0,2*Math.PI);  
//            ctx.fillStyle = shapecolor;
        ctx.fill();

}

function draw_Line() {
    ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(187,-187)
//    ctx.globalAlpha = 0.34;
        ctx.stroke();
}

function draw_Curve() {
//    ctx.globalAlpha = 0.34;
                ctx.moveTo(0,0);
        ctx.beginPath();

        ctx.ellipse(0,0,200,133,0,0,Math.PI);
    ctx.stroke();
}

function draw_Leaf() {
        ctx.beginPath();
//    ctx.drawImage(img_svg_blob, 0, 0);   //  GOES WITH var img_svg_blob = new Image(); AND THE ATTEMPT AT EMBEDDING THE SVG IN THE HTML DOCUMENT
//    ctx.globalAlpha = 0.14;

    ctx.stroke(svg_leaf);
//    ctx.drawImage(svg_inside, 0, 0);   // DIDN'T WORK  
//    ctx.drawImage(img_svg_blob, 0, 0);   // DIDN'T WORK
//    ctx.drawImage(svgDoc, 0, 0);    
    ctx.stroke();
}

function draw_Puckeredtri() {
    
    ctx.beginPath();
//    ctx.globalAlpha = 0.14;

    ctx.stroke(svg_puckeredtri);
}


function eraseCanvas() {
    // Reset all transformations.  // YES, ALL THIS IS NECESSARY
        ctx.setTransform(1, 0, 0, 1, 0, 0);   
ctx.rotate(0);
ctx.translate(0,0);
        crazyrotate_R = 0;
        crazyrotate_r = 0;
        ctx.fillStyle='#000';
        ctx.strokeStyle='#000';
        ctx.globalAlpha = 1;
		// Clear the canvas.
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Fill the canvas with current fillStyle (hopefully black);
		ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
}
//getRsize();

function testVariables() {
//    console.log('testVariables says that sizeR = ' + sizeR);
//    console.log('testVariables says that moon_offset = ' + moon_offset);
//    console.log('testVariables says that speed_Around = ' + speed_Around);
//    console.log('testVariables says that speed_Pen_around = ' + speed_Pen_around);
//    console.log('testVariables says that shapecolor = ' + shapecolor);
//    console.log('BUT testVariables also says that the current fillStyle = ' + ctx.fillStyle);

    }

//init();

function init () {
// THE INIT FUNCTION REALLY IS THE THING THAT 'RESETS' EVERYTHING
// NO MATTER HOW MANY OTHER PLACES YOU SEE CODE SETTING EVERYTHING TO 0

//    cancelAnimationFrame(requestID);
crazyrotate_R = 0;
crazyrotate_r = 0;
ctx.setTransform(1, 0, 0, 1, 0, 0);   
ctx.rotate(0);
ctx.translate(0,0);
    ctx.fillStyle='#000';
//    ctx.fillStyle=grad_red_blue_canvas;
        ctx.strokeStyle = combinedColor;
//    ctx.strokeStyle = grad_red_blue;
    ctx.lineWidth=1;
//            console.log(JSON.stringify(ctx.lineWidth));

		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Fill the canvas with current fillStyle
		ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
if(!animation_is_running) {
    // console.log('I am an if statement in the init function, and I think the animation is not running, so I will start it running');
        animation_is_running = true;  
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate); // not sure how okay this is, but I discovered that calling this method multiple times speeds up the animation
        animate();
    }
    

function animate() {
/////////  ((sizeR+moon_offset)/10)
        
    if(animation_is_running){

    //            console.log('crazyrotate_R = ' + crazyrotate_R);
    //            console.log('speed_Around = '+ speed_Around)
    //            console.log('crazyrotate_r = ' + crazyrotate_r);
    //            console.log('speed_Pen_around = '+ speed_Pen_around)
    //            console.log('revolutions = ' + revolutions);
                
    //if (revolutions - stopper  == (Math.PI * Math.pow(sizeR,2)) / (Math.PI * Math.pow(moon_offset,2))  && revolutions > 1 ) {
    //
    //    console.log('from within the animate function, revolutions = ' + revolutions);
    //    console.log('revolutions - 35 = '+ (revolutions-35));
    //    console.log('stopper = ' + stopper);
    //    console.log('sizeR =' + sizeR);
    //    console.log('moon_offset =' + moon_offset);
    //    manual_stop();
    //    //   HOWEVER, WHEN r and R are MULTIPLES OF EACH OTHER, start_x will = p1x sometime after 180 revolutions
    //    // THIS ONLY WORKED AFTER YOU MADE start_x A GLOBAL VARIABLE
    //        }
                
    //if(crazyrotate_R >= 6.28) {   //   works okay if speed R = something, and speed r = 0
    //    manual_stop();
    //}

                
    //    if(crazyrotate_R >= speed_Around * 2*Math.PI * 1000) {     //   THIS WORKS, BUT IT DRAWS ONE FRAME TOO MANY
    //        manual_stop();                                          // BASICALLY SAYING, WHEN BIG R COMPLETES A CIRCLE, STOP
    //    }        

    //  if(revolutions == 6282) {  //   WORKS IF 'LARGER CRICLE SPEED' is a whole number
    //      manual_stop();
    //  }

        var preMultiplier = parseFloat(speed_Around*1000) - parseInt(speed_Around*1000);
        if(preMultiplier == 0) {
            var multiplier = 1;
            } else {
            var multiplier = 1 / preMultiplier;
        }
    //        var stopper = multiplier * 6284;
    //        var stopper = multiplier * 6283.18530717959;
    //var stopper = multiplier * 6304.95;  // overshot
        var stopper = multiplier * pattern_amount;
    //var stopper = multiplier * 6282;  //   WORKS IF 'LARGER CRICLE SPEED' is a whole number
    //var stopper = multiplier * 3141;  //   HALF ORDER, for things like 9 100 20 99
    //var stopper = multiplier * 2094;  //   THIRD ORDER, for things like 9 100 20 99
    //var stopper = parseInt(multiplier) * 6285;
    //            console.log('preMultiplier = ' + preMultiplier);
    //            console.log('multiplier = ' + multiplier);
    //            console.log('stopper = ' + stopper);
                
        if(revolutions >= stopper) {  
            manual_stop();
        }

        requestID = requestAnimationFrame(animate);
                
        ctx.setTransform(1, 0, 0, 1, 0, 0);   // MUST BE HERE
        ctx.rotate(0);
        ctx.translate(0,0);
        // Set the fill style for the drawing context.
    //    ctx.fillStyle = 'rgba(225,0,0,.1)';
    //    ctx.strokeStyle = 'rgba(225,0,0,0.3)';   // LETS TRY PUTTING THIS IN THE FUNCTION

    //    ctx.save();       // MUST BE HERE

        ctx.translate((canvas.width/2),(canvas.height/2));


        ctx.rotate(crazyrotate_R);
        ctx.translate(sizeR,sizeR);  // size of R (radius of entire design)
    //    ctx.translate(sizeR,0);  // EXPERIMENT, NOT SO MUCH

        ctx.rotate(crazyrotate_r);
        ctx.translate(0,moon_offset);   //  WAS THE 'MOON' OFFSET, IS NOW 'Pen Offset'
                                // ORIGINAL WAS (0,28.5) 0,100 LOOKS BEST
    //    ctx.translate(moon_offset,0);   //  EXPERIMENT, NOT SO MUCH
        ctx.scale(horzScale,vertScale);

    //    ctx.beginPath();  // PART OF TEARDROP, BUT NEEDED TO BE INCLUDED IN THE FUNCTION, for Circle

    //    ctx.moveTo(20,-200);   //   ORIGINAL (20,-120)   // TEARDROP
    //    ctx.bezierCurveTo(300,100,-90,100,20,-120);  // TEARDROP

    //    draw_Teardrop();   // ATTEMPT TO DRAW A SHAPE WITH A FUNCTION; then use SWITCH to switch functions (shapes)
    //    draw_Ellipse();
    //    draw_Triangle();
    //    draw_Circle();
    //    draw_Square();
    //    draw_Teardrop();
    //    ctx.scale(10,10);
    //        ctx.drawImage(img_svg_blob, 0, 0);   //   THIS WORKS!

    //                ctx.scale = combinedScale;

    //    console.log('we rotated and now we are going to draw a ' + desired_shape);
        
        switch (desired_shape) {
            
            case 'oval':
                draw_Ellipse();
    //            console.log('desired shape, from inside SWITCH: ' + desired_shape);
                break;
            case 'triangle':
                draw_Triangle();
    //            console.log('desired shape, from inside SWITCH: ' + desired_shape);
                break;
            case 'circle':
                draw_Circle();
    //            console.log('desired shape, from inside SWITCH: ' + desired_shape);
                break;
            case 'square':
                draw_Square();
    //            console.log('desired shape, from inside SWITCH: ' + desired_shape);
                break;
            case 'teardrop':
                draw_Teardrop();
                break;
            case 'leaf':
    //            console.log('desired shape, from inside SWITCH: ' + desired_shape);
                draw_Leaf();
                break;
            case 'diamond':
                draw_Diamond();
                break;
            case 'dots':
                draw_Dots();
                break;
            case 'line':
                draw_Line();
                break;
            case 'curve':
                draw_Curve()
                break;
            case 'puckeredtri':
                draw_Puckeredtri();
                break;
            default: 
                draw_Ellipse();
                break;            
        }
        
    //    ctx.stroke();     //  USED TO BE FOR ALL SHAPES; NOW PART OF EACH SHAPE FUNCTION
        
        ////    ctx.fillStyle=grd;
            //    ctx.fill();
        crazyrotate_R -= speed_Around;   //  +=0.3 is a GREAT NUMBER
        //  lowering this decreases how fast r travels around R
        // AS OF NOW, .03 LOOKS REALLY GOOD, for +=
        // crazyrotate_R GETS REAL interesting WHEN IT'S -=
        //  and the WHOLE THING LOOKS PRETTY when both are -=
        crazyrotate_r += speed_Pen_around;  //  +=0.0471 is a GREAT NUMBER
        //  lowering crazyrotate_r decreases how fast 
        //  r rotates around its own center
        // AS OF NOW, .0471 LOOKS REALLY GOOD
        
                revolutions += 1;

    //    horzScale += 0.01;
    //    vertScale += 0.01;
        
        if (captureFrame) {
            captureFrame = false;
            var data = canvas.toDataURL();
        }
    }
}

//    // Animate.   FROM TUTORIAL
//	function animate() {
//		requestID = requestAnimationFrame(animate);
//
//		// If the box has not reached the end draw on the canvas.
//		// Otherwise stop the animation.
//		if (posX <= (canvas.width - boxWidth)) {
//			ctx.clearRect((posX - pixelsPerFrame), 0, boxWidth, canvas.height);
//			ctx.fillRect(posX, 0, boxWidth, canvas.height);
//			posX += pixelsPerFrame;
//		} else {
//			cancelAnimationFrame(requestID);
//		}
//	}

	// Event listener for the start button.
    // IT MUST STAY INSIDE THE animate() FUNCTION, OR IT WON'T RESTART THE ANIMATION
    
	document.getElementById('turboBtn').addEventListener('click', function(e) {
	e.preventDefault();

    document.getElementById('animInput').setAttribute('class','center fadeaway');
    // console.log('TURBO FUNCTION ACTIVATED!');

    // Start the animation.
        
        if(!animation_is_running){                 
//		requestID = requestAnimationFrame(animate);  //  WITHIN AN IF STATEMENT
            animation_is_running = true;           // RUNS AT 'NORMAL' SPEED
        }

        requestID = requestAnimationFrame(animate);
        // console.log('requestAnimationFrame 1');
        requestID = requestAnimationFrame(animate);
        // console.log('requestAnimationFrame 2');
        requestID = requestAnimationFrame(animate);
        // console.log('requestAnimationFrame 3');
        requestID = requestAnimationFrame(animate);
        // console.log('requestAnimationFrame 4');
//        animation_is_running = true;  
	});

	// Event listener for the stop button.
    document.getElementById('pauseBtn').addEventListener('click', function(e) {
//		e.preventDefault();
        
// console.log('Hello, from the pauseBtn handler');

        if(animation_is_running) {
        cancelAnimationFrame(requestID);
        animation_is_running = false;
            document.getElementById('pauseBtn').innerHTML='Resume';

} else {
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        animation_is_running = true;
        document.getElementById('pauseBtn').innerHTML='Pause';

}
		// Stop the animation;
//		cancelAnimationFrame(requestID);
//       cancelAnimationFrame(ctx);
//    ctx.stroke();  //   STROKING HERE IS SMOOTHER, ALL POINTS ARE PLOTTED, BUT DRAWN ONCE
//                  //   BUT YOU CAN'T SEE IT IN REALTIME
	});

//  END OF THE animate FUNCTION
}


	// Event listener for the reset button.
	document.getElementById('optionsBtn').addEventListener('click', function(e) {
		e.preventDefault();
        
		// Stop the animation;
//		cancelAnimationFrame(requestID);
//                eraseCanvas();

		// Reset all transformations.  // YES, ALL THIS IS NECESSARY
//        ctx.setTransform(1, 0, 0, 1, 0, 0);   
//ctx.rotate(0);
//ctx.translate(0,0);
//        crazyrotate_R = 0;
//        crazyrotate_r = 0;
//        ctx.fillStyle='#000';
//        ctx.strokeStyle='#000';
		// Clear the canvas.
//		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Fill the canvas with current fillStyle (hopefully black);
//		ctx.fillRect(0, 0, canvas.width, canvas.height);
//        getRsize();
//        sizeR = prompt('Choose a radius: 1-9');
//        sizeR = (sizeR-1) * 31.25;

//                    eraseCanvas();


        formReset();

	});

function formReset() {
//    userInputForm.radius1.value = 9;
//    moon_offset = userInputForm.penoffset.value = 100;
//    userInputForm.speed_LC.value = 30;
//    userInputForm.speed_sc.value = 40.71;
//    var ele = document.getElementsByName("penshape");
//   for(var i=0;i<ele.length;i++)
//      ele[i].checked = false;
    document.getElementById('animInput').setAttribute('class','center');
    document.getElementById('main').addEventListener('keyup', checkSubmit);

}

        //   FIRST SOLUTION, WORKS ALL THE TIME, NOW THAT WE CONVERT SVG FILES
	document.getElementById('saveBtn').addEventListener('click', function(e) {        
//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
//window.location.href=image; // it will save locally

        //   SECOND SOLUTION, ALSO WORKS INTERMITENTLY

//        document.getElementById('saveBtn').addEventListener('click', function() {
//  captureFrame = true;
//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
//window.location.href=image;
//        }, false);
canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
});
    
    });


function adjust_params_small_screen(){
    radius1 = 0;
    let = document.getElementById('radius1').value = 0;
    // console.log('radius1 = ' + radius1);
    let = document.getElementById('penoffset').value = 0;
    // console.log('penoffset.value = ' + penoffset.value);
    let = document.getElementById('horzscale').value = 0.5;
    let = document.getElementById('vertscale').value = 1.2;
}

function adjust_params_medium_screen(){
    let = document.getElementById('radius1').value = 5;
}

window.onload = function() {
    
    init_canvas();
    console.log('onload function fired');
//    userInputForm.sbmtBtn.addEventListener('click', btnGetFormClick);  //  ORIGINAL LOCATION
//    document.anim_input.sbmtBtn.preventDefault;
    // makeCombinedColor();

    if(innerWidth < 800 ){
        console.log('wow thats a tiny screen');
        adjust_params_small_screen();
    }

    if( innerWidth > 800 && innerWidth < 1500 ){
        console.log('you must be on a laptop');
        adjust_params_medium_screen();
    }

    cancelAnimationFrame(requestID);

    animation_is_running = false;
//                    eraseCanvas();

//		 Reset all transformations.  // YES, ALL THIS IS NECESSARY
        ctx.setTransform(1, 0, 0, 1, 0, 0);   
        ctx.rotate(0);
        ctx.translate(0,0);
        crazyrotate_R = 0;
        crazyrotate_r = 0;
        ctx.fillStyle='#000';
        ctx.strokeStyle='#000';
        ctx.globalAlpha = 1;

//		 Clear the canvas.
		ctx.clearRect(0, 0, canvas.width, canvas.height);
//		 Fill the canvas with current fillStyle (hopefully black);
		ctx.fillRect(0, 0, canvas.width, canvas.height);   //   DISABLED THIS BECAUSE ENTIRE CANVAS WAS FILLING, AFTER ADDING shapecolor
    
    var n = userInputForm.radius1.value;
    sizeR = parseFloat((n-1) * 18.75 + 100);
    moon_offset = parseFloat(userInputForm.penoffset.value);
    speed_Around = parseFloat(userInputForm.speed_LC.value)/1000;
    speed_Pen_around = parseFloat(userInputForm.speed_sc.value)/1000;
    
//    var radio_name = document.getElementsByName('penshape');
    
//    getRadioCheckedValue(radio_name);
//    desired_shape = userInputForm.fieldset.penshape.value;
    desired_shape = document.getElementsByName('penshape');
    
    setHorzScale();
    setVertScale();
//    setOpacityvalue();
//    OutputRedTarget = document.getElementById('outputRed');
//    console.log('desired shape is: ' + desired_shape[0].value);
    
    userInputForm.sbmtBtn.addEventListener('click', btnGetFormClick);
    document.getElementById('main').addEventListener('keyup', checkSubmit);
    document.getElementById('main').addEventListener('keyup', checkReset);

//    userInputForm.toggleClass('fadeaway');
}; // END OF window.onload function

window.addEventListener('resize', function(){
    if(!animation_is_running){
        init_canvas();
        formReset();
    }
});

var checkSubmit = function (e) {
		e.preventDefault();

       console.log('checkSubmit function fired');
    
    if(e && e.keyCode == 13) {
btnGetFormClick();
//        if(!animation_is_running) {
//            console.log('checkSubmit triggered btnGetFormClick function');
//console.log('checkSubmit says that animation_is_running is ' + animation_is_running);
//        btnGetFormClick();
////                    animation_is_running = false;
////            		cancelAnimationFrame(requestID);
//
//        }
    }
    
}

var checkReset = function (e) {
    if(e && e.keyCode == 82) {
       console.log('checkReset triggered formReset function');
       formReset();
   }
}

function manual_stop() {
        animation_is_running = false;
            console.log('I triggered the manual stop() function');

		// Stop the animation;
		cancelAnimationFrame(requestID);
    }

function setPatternAmount() {
    
        x = userInputForm.pattern_amount.value;

    switch (x) {
            case 'full':
            pattern_amount = 6282;
            break;
            case 'half':
            pattern_amount = 3141;
            break;
            case 'third':
            pattern_amount = 2094;
            break;
            default: 
            pattern_amount = 6282;
            break;  
    };
}

function setShape(shape) {
    willbe_desired_shape = shape;
}

function setColor() {
    shapecolor = document.getElementById("colorpicker").value;
    console.log( 'shapecolor, from within the setColor function ' + shapecolor);
}

var colorSwatchIndicator = document.getElementById('colorSwatch');

function setRedvalue() {
    setRedvalue.preventDefault;
    redValue = document.getElementById('red_value').value;
    console.log( 'redValue, from within the setRedvalue function ' + redValue);
    makeCombinedColor();
//    colorSwatchIndicator.style.backgroundColor = combinedColor;
    console.log('setRedvalue function says combinedColor = ' + combinedColor);
    OutputRedTarget.innerHTML = 'Red: ' + redValue;
}

function setGreenvalue() {
    setGreenvalue.preventDefault;
    greenValue = document.getElementById('green_value').value;
    console.log( 'greenValue, from within the setGreenvalue function ' + greenValue);
    makeCombinedColor();
//    colorSwatchIndicator.style.backgroundColor = combinedColor;
    OutputGreenTarget.innerHTML = 'Green: ' + greenValue;

}

function setBluevalue() {
    setBluevalue.preventDefault;
    blueValue = document.getElementById('blue_value').value;
    makeCombinedColor();
//    colorSwatchIndicator.style.backgroundColor = combinedColor;
    OutputBlueTarget.innerHTML = 'Blue: ' + blueValue;
}

function setHuevalue() {
    setHuevalue.preventDefault;
    hueValue = document.getElementById('hueValue').value;
    makeCombinedColor();
    OutputHueTarget.innerHTML = 'Hue: ' + hueValue;
}

function setSaturationvalue() {
    setSaturationvalue.preventDefault;
    saturationValue = document.getElementById('saturationValue').value;
    makeCombinedColor();
    OutputSaturationTarget.innerHTML = 'Saturation: ' + saturationValue;
}

function setLightnessvalue() {
    setLightnessvalue.preventDefault;
    lightnessValue = document.getElementById('lightnessValue').value;
    makeCombinedColor();
    OutputLightnessTarget.innerHTML = 'Lightness: ' + lightnessValue;
}

var random_Red;
var random_Green;
var random_Blue;

function setRandomColor() {
    // document.getElementById('red_value').value = Math.floor(Math.random() * 256);
    // document.getElementById('green_value').value = Math.floor(Math.random() * 256);
    // document.getElementById('blue_value').value = Math.floor(Math.random() * 256);

    document.getElementById('hueValue').value = Math.floor(Math.random() * 361);

    // setRedvalue();
    // setGreenvalue();
    // setBluevalue();

    setHuevalue();
}

function maybeChangeColor() {
    let x = document.getElementById('random_color').checked;
    if (x) {
        setRandomColor();
    }
}

function setOpacityvalue() {
    setOpacityvalue.preventDefault;
//    opacityValue = document.getElementById('opacity_value').value;
    opacityValue = parseFloat(document.getElementById('opacity_value').value).toFixed(2);
    OutputOpacityTarget.innerHTML = 'Opacity: ' + opacityValue;
    makeCombinedColor();
}

function setHorzScale() {
    var h = document.getElementById('horzscale').value;
    willbe_desired_horzScale = parseFloat(h);
    OutputHorzScale.innerHTML = 'Horzontal<br>Scale: ' + h;

}

function setVertScale() {
    var v = document.getElementById('vertscale').value;
    willbe_desired_vertScale = parseFloat(v);
    OutputVertScale.innerHTML = 'Vertical<br>Scale: ' + v;
}

function makeCombinedColor() {
    makeCombinedColor.preventDefault;
    // combinedColor = 'rgba(' + redValue + ', ' + greenValue + ', ' + blueValue + ', ' + opacityValue + ')';
    combinedColor = 'hsla(' + hueValue + ', ' + saturationValue + '%, ' + lightnessValue + '%, ' + opacityValue + ')';

    colorSwatchIndicator.style.backgroundColor = combinedColor; // NOTE: inline styles will automatically convert to rgba. No way to prevent that. pOOp!

}

function makeCombinedScale() {
//    combinedScale = '(' + horzScale + ',' + vertScale + ')';
    combinedScale = '(' + horzScale + ',' + vertScale + ')';
}

function init_canvas(){
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    
    canvas.height = screen_height;
    canvas.width = screen_width;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    ctx.translate(centerX,centerY);
} // END of init_canvas function


//function modifyOffset() {
//	var el, newPoint, newPlace, offset, siblings, k, outputTag;
//	width    = this.offsetWidth;
//	newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
//	offset   = -1;
//	if (newPoint < 0) { newPlace = 0;  }
//	else if (newPoint > 1) { newPlace = width; }
//	else { newPlace = width * newPoint + offset; offset -= newPoint;}
//	siblings = this.parentNode.childNodes;
//	for (var i = 0; i < siblings.length; i++) {
//		sibling = siblings[i];
//		if (sibling.id == this.id) { k = true; }
//		if ((k == true) && (sibling.nodeName == "OUTPUT")) {
//			outputTag = sibling;
//		}
//	}
//    console.log( 'modifyOffset function says siblings = ' + siblings);
////	outputTag.style.left       = newPlace + "px";
////	outputTag.style.marginLeft = offset + "%";
//	outputTag.innerHTML        = this.value;
//}

//function modifyInputs() {
//    
//	var inputs = document.getElementsByTagName("input");
//	for (var i = 0; i < inputs.length; i++) {
//		if (inputs[i].getAttribute("type") == "range") {
////			inputs[i].onchange = modifyOffset;
//
//			// the following taken from http://stackoverflow.com/questions/2856513/trigger-onchange-event-manually
//			if ("fireEvent" in inputs[i]) {
//			    inputs[i].fireEvent("onchange");
//			} else {
//			    var evt = document.createEvent("HTMLEvents");
//			    evt.initEvent("change", false, true);
//			    inputs[i].dispatchEvent(evt);
//			}
//		}
//	}
//}
//
//modifyInputs();

    
