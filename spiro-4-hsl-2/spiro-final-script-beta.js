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

    var complete_loop;

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
    var gradiate_color;
    var gradientRange = 100;
    var hueCounter = 0;
    var hueIncrementer = 0;
    var hueCounterDirection = "up";
    var hueCounterDirectionSwitchCount = 0;
    
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

// oscillator function found at
// https://riptutorial.com/javascript/example/10173/periodic-functions-using-math-sin
// function oscillator(time, frequency = 1, amplitude = 1, phase = 0, offset = 0){
//     return Math.sin(time * frequency * Math.PI * 2 + phase * Math.PI * 2) * amplitude + offset; 
// }
function oscillator(time, frequency, amplitude, phase = 0, offset = 0){
    return Math.sin(time * frequency * Math.PI * 2 + phase * Math.PI * 2) * amplitude + offset; 
} // but I couldn't get it to work


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
img_svg_blob.src = "SVG-Canvas-TEST4-blob.svg";

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
    gradiate_color = userInputForm.gradiate_color.checked;
    revolutions = 0;
    hueCounter = 0;
    hueCounterDirection = "up";
    hueCounterDirectionSwitchCount = 0;
    
    setPatternAmount();

    // complete_loop = parseInt(pattern_amount / userInputForm.speed_sc.value);
    // BUT THIS IS BASED ON 'speed_sc' in other words, how many times the object rotates around it's own axis
    // complete_loop = parseInt(pattern_amount / userInputForm.speed_LC.value); // complete loop, based on speed of Large Circle ONLY WORKS IF LARGE CIRCLE IS SMALLER THAN SMALL CIRCLE
    // complete_loop = (parseInt(pattern_amount / userInputForm.speed_sc.value)/2); // so, really, half complete loop
    // complete_loop = (parseInt(pattern_amount / userInputForm.speed_LC.value)/2); // half complete loop, based on speed of Large Circle
    // complete_loop = (parseInt(pattern_amount / userInputForm.speed_LC.value)/4); // quarter complete loop, based on speed of Large Circle
    // complete_loop = (parseInt(pattern_amount / userInputForm.speed_LC.value)/8); // eighth complete loop, based on speed of Large Circle   OMG THIS IS WHAT I WANT. WELL, ONLY WORKS IF LARGE CIRCLE IS SMALLER THAN SMALL CIRCLE
    // complete_loop = (parseInt(pattern_amount / userInputForm.speed_LC.value)/userInputForm.speed_LC.value); // instead of divide by 8, try divide by Large Circle
    complete_loop = (parseInt(pattern_amount / 4)/8); // okay fine you POS, we'll just always divide by 4 and 8 OMG OMG OMG this really works, regardless of Large and or Small Circle size
    // complete_loop = (parseInt(pattern_amount / (userInputForm.speed_LC.value / userInputForm.speed_sc.value ))/2); // half complete loop, based on ratio of Large Circle speed / small circle speed
    // complete_loop = (parseInt(pattern_amount / (userInputForm.speed_sc.value / userInputForm.speed_LC.value ))/2); // half complete loop, based on ratio of Large Circle speed / small circle speed


    let random_color = document.getElementById('random_color').checked;
    if(random_color){
        setRandomColor();
    }

    init();

    makeHueIncrementer();

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
    
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.bezierCurveTo(0,300,240,300,120,20);  //  TEARDROP 3, larger
    ctx.closePath();
    ctx.stroke();
}

function draw_Circle() {
    ctx.moveTo(-200,-20);   //  UNLIKE TEARDROP, MOVETO MUST COME BEFORE BEGINPATH
                            //  WORKS WITH 'INTERESTING'

    ctx.beginPath();
    ctx.arc(-100,0,100,0,2*Math.PI);  // CIRCLE, INTERESTING
    ctx.closePath();
    ctx.stroke();
}

function draw_Ellipse() {
    ctx.moveTo(50,0);   //  INTERESTING
    mvT_xtracker = 50;
    mvT_ytracker = 0;
    ctx.beginPath();
    ctx.ellipse(0,-200,100,33,-10,0,2*Math.PI);  // ELLIPSE
    ctx.closePath();
    ctx.stroke();
}

function draw_Triangle() {
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
        ctx.stroke();

}

function draw_Dots() {
    ctx.fillStyle=combinedColor;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(-100,0,2,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(100,0,2,0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,-173,2,0,2*Math.PI);  
    ctx.fill();

}

function draw_Line() {
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(187,-187)
    ctx.stroke();
}

function draw_Curve() {
    ctx.moveTo(0,0);
    ctx.beginPath();

    ctx.ellipse(0,0,200,133,0,0,Math.PI);
    ctx.stroke();
}

function draw_Leaf() {
    ctx.beginPath();
    ctx.stroke(svg_leaf);
    ctx.stroke();
}

function draw_Puckeredtri() {
    ctx.beginPath();
    ctx.stroke(svg_puckeredtri);
    // ctx.fillStyle=combinedColor;
}

function draw_ShapeText() {
    ctx.fillStyle="rgba(0,0,0," + opacityValue + ")";
    ctx.fillText(shape_text_value,0,0);
    ctx.strokeText(shape_text_value,0,0);
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

function testVariables() {
//    console.log('testVariables says that sizeR = ' + sizeR);
//    console.log('testVariables says that moon_offset = ' + moon_offset);
//    console.log('testVariables says that speed_Around = ' + speed_Around);
//    console.log('testVariables says that speed_Pen_around = ' + speed_Pen_around);
//    console.log('testVariables says that shapecolor = ' + shapecolor);
//    console.log('BUT testVariables also says that the current fillStyle = ' + ctx.fillStyle);
    }

function init() {
// THE INIT FUNCTION REALLY IS THE THING THAT 'RESETS' EVERYTHING
// NO MATTER HOW MANY OTHER PLACES YOU SEE CODE SETTING EVERYTHING TO 0

//    cancelAnimationFrame(requestID);
    crazyrotate_R = 0;
    crazyrotate_r = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);   
    ctx.rotate(0);
    ctx.translate(0,0);
    ctx.fillStyle='#000';
    // ctx.strokeStyle = combinedColor;
    ctx.lineWidth=1;

    revolutions = 0;
    hueCounter = 0;
    hueIncrementer = 0;
    hueCounterDirection = "up";
    hueCounterDirectionSwitchCount = 0;
    ctx.font = "100px Arial";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fill the canvas with current fillStyle
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    if(!animation_is_running) {
        animation_is_running = true;
        setHuevalue();
        makeCombinedColor();
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate); // not sure how okay this is, but I discovered that calling this method multiple times speeds up the animation
        animate();
    }
function animate() {
        
    if(animation_is_running){

        var preMultiplier = parseFloat(speed_Around*1000) - parseInt(speed_Around*1000);
        if(preMultiplier == 0) {
            var multiplier = 1;
            } else {
            var multiplier = 1 / preMultiplier;
        }

        var stopper = multiplier * pattern_amount;
        
        if(revolutions == 0){
            if(gradiate_color == false){
                ctx.strokeStyle = combinedColor;
            }
        }

        if(revolutions >= stopper) {  
            manual_stop();
        }

        if (gradiate_color){
            ctx.strokeStyle = 'hsla(' + parseFloat(hueValue + hueCounter) + ', ' + saturationValue + '%, ' + lightnessValue + '%, ' + opacityValue + ')';
            ctx.fillStyle = 'hsla(' + parseFloat(hueValue + hueCounter) + ', ' + saturationValue + '%, ' + lightnessValue + '%, ' + opacityValue + ')';
        }
        // fixed numbers it is: complete_loop/5. /4 works, but doesn't look as good. BUT may interfere with random color
        if( revolutions % (complete_loop/5) == 0){

            if(hueCounterDirection == "up" && hueCounterDirectionSwitchCount % 2 == 0){
                hueCounterDirection = "down";
                hueCounterDirectionSwitchCount += 1;
            } else {
                hueCounterDirectionSwitchCount += 1;
                hueCounterDirection = "up";
            }
        }

        if(hueCounterDirection == "up"){
            hueCounter += hueIncrementer;
        } 
        if(hueCounterDirection == "down") {
            hueCounter -= hueIncrementer;
        }

        requestID = requestAnimationFrame(animate);
                
        ctx.setTransform(1, 0, 0, 1, 0, 0);   // MUST BE HERE
        ctx.rotate(0);
        ctx.translate(0,0);
        ctx.translate((canvas.width/2),(canvas.height/2));

        ctx.rotate(crazyrotate_R);
        ctx.translate(sizeR,sizeR);  // size of R (radius of entire design)

        ctx.rotate(crazyrotate_r);
        ctx.translate(0,moon_offset);   //  WAS THE 'MOON' OFFSET, IS NOW 'Pen Offset'
                                // ORIGINAL WAS (0,28.5) 0,100 LOOKS BEST
        ctx.scale(horzScale,vertScale);

        switch (desired_shape) {
            
            case 'oval':
                draw_Ellipse();
                break;
            case 'triangle':
                draw_Triangle();
                break;
            case 'circle':
                draw_Circle();
                break;
            case 'square':
                draw_Square();
                break;
            case 'teardrop':
                draw_Teardrop();
                break;
            case 'leaf':
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
            case 'shape_text':
                draw_ShapeText();
                break;
            default: 
                draw_Ellipse();
                break;            
        }

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
        
        if (captureFrame) {
            captureFrame = false;
            var data = canvas.toDataURL();
        }
    }
}
	// Event listener for the start button.
    // IT MUST STAY INSIDE THE animate() FUNCTION, OR IT WON'T RESTART THE ANIMATION
    
	document.getElementById('turboBtn').addEventListener('click', function(e) {
	e.preventDefault();

    document.getElementById('animInput').setAttribute('class','center fadeaway');

    // Start the animation.
        
        if(!animation_is_running){                 
            animation_is_running = true;           // RUNS AT 'NORMAL' SPEED
        }

        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
        requestID = requestAnimationFrame(animate);
	});

	// Event listener for the stop button.
    document.getElementById('pauseBtn').addEventListener('click', function(e) {
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
    });
//  END OF THE animate FUNCTION
}


	// Event listener for the reset button.
document.getElementById('optionsBtn').addEventListener('click', function(e) {
	e.preventDefault();
    formReset();
});

function formReset() {
    document.getElementById('animInput').setAttribute('class','center');
    document.getElementById('main').addEventListener('keyup', checkSubmit);
}

//   FIRST SOLUTION, WORKS ALL THE TIME, NOW THAT WE CONVERT SVG FILES
document.getElementById('saveBtn').addEventListener('click', function(e) {        
    canvas.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });
});


function adjust_params_small_screen(){
    radius1 = 0;
    let = document.getElementById('radius1').value = 0;
    let = document.getElementById('penoffset').value = 0;
    let = document.getElementById('horzscale').value = 0.5;
    let = document.getElementById('vertscale').value = 1.2;
}

function adjust_params_medium_screen(){
    let = document.getElementById('radius1').value = 5;
}

window.onload = function() {
    
    init_canvas();
    console.log('onload function fired');

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
    ctx.fillRect(0, 0, canvas.width, canvas.height);   //   DISABLED THIS BECAUSE ENTIRE CANVAS WAS FILLING, AFTER ADDING shapecolor
    
    var n = userInputForm.radius1.value;
    sizeR = parseFloat((n-1) * 18.75 + 100);
    moon_offset = parseFloat(userInputForm.penoffset.value);
    speed_Around = parseFloat(userInputForm.speed_LC.value)/1000;
    speed_Pen_around = parseFloat(userInputForm.speed_sc.value)/1000;
    
    desired_shape = document.getElementsByName('penshape');
    
    setHorzScale();
    setVertScale();

    userInputForm.sbmtBtn.addEventListener('click', btnGetFormClick);
    document.getElementById('main').addEventListener('keyup', checkSubmit);
    document.getElementById('main').addEventListener('keyup', checkReset);

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
            console.log('-----------------------------');

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
    if(shape == "shape_text"){
        getShapeText();
    }
}

var shape_text_value;

function getShapeText(){
    shape_text_value = prompt("enter some text", "pizza");
    // in the if statement below, if you use '= null' it sets the variable to null!
    if(shape_text_value == null || shape_text_value == ""){
        console.log('pizza for everybody!');
        shape_text_value = "pizza";
    }
}

function setColor() {
    shapecolor = document.getElementById("colorpicker").value;
}

var colorSwatchIndicator = document.getElementById('colorSwatch');

function setRedvalue() {
    setRedvalue.preventDefault;
    redValue = document.getElementById('red_value').value;
    makeCombinedColor();
    OutputRedTarget.innerHTML = 'Red: ' + redValue;
}

function setGreenvalue() {
    setGreenvalue.preventDefault;
    greenValue = document.getElementById('green_value').value;
    makeCombinedColor();
    OutputGreenTarget.innerHTML = 'Green: ' + greenValue;

}

function setBluevalue() {
    setBluevalue.preventDefault;
    blueValue = document.getElementById('blue_value').value;
    makeCombinedColor();
    OutputBlueTarget.innerHTML = 'Blue: ' + blueValue;
}

function setHuevalue() {
    setHuevalue.preventDefault;
    hueValue = parseInt(document.getElementById('hueValue').value); // without parseInt, it was adding a string and number together, elsewhere in the program!
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
    document.getElementById('hueValue').value = Math.floor(Math.random() * 361);
    setHuevalue();
    makeCombinedColor();
}

function maybeChangeColor() {
    let x = document.getElementById('random_color').checked;
    if (x) {
        setRandomColor();
    }
}

function setOpacityvalue() {
    setOpacityvalue.preventDefault;
    opacityValue = parseFloat(document.getElementById('opacity_value').value).toFixed(2);
    OutputOpacityTarget.innerHTML = 'Opacity: ' + opacityValue;
    makeCombinedColor();
}

function setHorzScale() {
    var h = document.getElementById('horzscale').value;
    willbe_desired_horzScale = parseFloat(h);
    OutputHorzScale.innerHTML = 'Horzontal <br class="hide_on_mobile">Scale: ' + h;

}

function setVertScale() {
    var v = document.getElementById('vertscale').value;
    willbe_desired_vertScale = parseFloat(v);
    OutputVertScale.innerHTML = 'Vertical <br class="hide_on_mobile">Scale: ' + v;
}

function makeCombinedColor() {
    makeCombinedColor.preventDefault;
    combinedColor = 'hsla(' + hueValue + ', ' + saturationValue + '%, ' + lightnessValue + '%, ' + opacityValue + ')';

    colorSwatchIndicator.style.backgroundColor = combinedColor; // NOTE: inline styles will automatically convert to rgba. No way to prevent that. pOOp!
}

function makeCombinedScale() {
    combinedScale = '(' + horzScale + ',' + vertScale + ')';
}

function makeHueIncrementer() {

    // hueIncrementer = gradientRange / complete_loop; // based on 'loop' length
    // hueIncrementer = 0.1; // does a fixed amount gradiate evenly? Well, not more evenly, but can be less radical if a fixed number. Or can be based on user input
    // hueIncrementer = 0.3; // let's try a higher value. Nope didn't look as good.
    // hueIncrementer = 0.1; // back to 0.1 looks good when LC is 4
    // hueIncrementer = 0.5; // trying this with LC: 27, sc: 5. Better, not great
    // hueIncrementer = 0.3; // trying this with LC: 27, sc: 5. Meh.
    // hueIncrementer = 1; // trying this with LC: 27, sc: 5. Better than the other values, but at LC 27, it's a hot mess no matter how the gradient increments.
    makeHueIncrementer.preventDefault;
    hueIncrementer = document.getElementById('gradient_range').value / 10; // you just had to give the user control over this, didn't you?
    document.getElementById('outputgradiant_range').innerHTML = "Gradient Range: " + hueIncrementer * 10;
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

// THAT'S ALL FOLKS!