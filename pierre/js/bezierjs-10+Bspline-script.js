// BASED ON
// p5-Bezier / p5-bezier-5-circular.html
// p5-Bezier / p5-bezier-5-script-circular.js

// VERSION 8: Added Laser Light Show ( with music ! )

p5.disableFriendlyErrors = true; // disables FES

var drawing_status = false;
var loop_status = true;

var revolutions = 0;
var repeats = 0;
var k_repeats = 0; // number of repeats
var k_rotations = 0;
var animating0;
var animating_1st_obj_3rd_index;
var animating1;
var animating2_pt_1;
var animating2_anchor;
var animating2_cntrl_1;
var animating3_0;
var animating3_1;
var animating3_2;
var animating4_0;
var animating4_1;
var animating4_2;
var anim2_anchor_is_animating;
var anim2_anchor_loop_count;
var anim2_cntrl_1_is_animating;
var anim2_cntrl_1_loop_count;
var bilateral_1;
var bilateral_2;
var bilateral_3;
var bilateral_4;
var show_shape_1;
var show_shape_2;
var show_shape_3;
var show_shape_4;
var handle_viz;
var outline_viz;
var handle_outline_viz;
var draw_grid;
var lines1;
var lines2;
var lines3;
var lines4;
var laser_light_show;
var laser_strength;
var i_feel_love_checkbox;
var i_feel_love_song;

// HOWLER WORKS BETTER WITH MP3s THAT HAVE A CONSTANT BITRATE
// temporarily deactivated for public hosting
// function preload() {
//   i_feel_love_song = new Howl({
//   src: ['assets/i_feel_love-looper.mp3']
// });
//     console.log('song pre loaded');
//     i_feel_love_song.loop(true);
// }

// BEZIER VARIABLES     
var bez_elmnts_Shape_1 = [];

var bez_elmnts_Shape_2 = []; // using an Object for Shape 2 was a nightmare, so, trying to refactor this entire program just so Shape 2 is an Array instead of an Object. Wow, that experiment really bit me in the ass

function set_drawing_status(){
	if(!drawing_status){
		drawing_status = true;
		background(0, 0, 0);
		
	} else {
		drawing_status = false;
	}
}

var canvas_w; // original was 1080, 1600 is for laptop, 2500 is for home computer
var canvas_h; // original was 1080, 850 is for laptop, 1200 is for home computer
var canvas_c_x; // WILL BE HALF CANVAS WIDTH
var canvas_c_y; // WILL BE HALF CANVAS HEIGHT

var j_pro_to_canvas_w; // used to make Shape 1
var j_incr_pro_to_canvas_w; // used to make Shape 1

var fill_r = 186; // PURPLE
var fill_g = 0; // PURPLE
var fill_b = 255; // PURPLE
var fill_a = 255;

var transparency_1 = 63;
var transparency_2 = 63;
var transparency_3 = 63;
var transparency_4 = 63;
var transparency_background = 255;

var color_1_rgb;
var red_1 = 255;  // originally 255
var grn_1 =   3;  // originally 98 
var blu_1 = 123;  // originally 0  

var color_2_rgb;
var red_2 = 77 ;  // originally 77   together = teal
var grn_2 = 235;  // originally 235  together = teal
var blu_2 = 255;  // originally 255  together = teal

var color_3_rgb;
var red_1_square = 241;  // originally 139
var grn_1_square = 255;  // originally 255
var blu_1_square =  48;  // originally 173

var color_4_rgb;
var red_4 = 154;  // originally 186
var grn_4 = 0;  // originally 0  
var blu_4 = 255;  // originally 255

var bkgrnd_color;
var bkgrnd_luminance;
var red_bkgrnd = 0;
var grn_bkgrnd = 0;
var blu_bkgrnd = 0;

var test_counter = 0;

var x_rotation;
var y_rotation;
var angle_R1;
var angle_1st_3rd;
var angle_R2;

var osscilator_1 = 0;
var osscilator_3 = 0;

var r_spiro = 130;   //  SMALL CIRCLE RADIUS  //  NORMAL ALGORITHM  USE 13 or 130

var point_on_small_r = 70;

var x6;
var y6;
var x1st3rd;
var y1st3rd;
var tBs2_x6;
var tBs2_y6;

var dx;
var dy;
var dx1st3rd;
var dy1st3rd;
var tBs2_dx;
var tBs2_dy;

// ------------------------
// BSPLINE VARIABLES
// ------------------------
var bspline_weight_0 = 1;
var bspline_weight_1 = 1;
var bspline_weight_2 = 1;
var bspline_weight_3 = 1;
var bspline_weight_4 = 1;
var bspline_weight_5 = 1;
var bspline_weight_6 = 10;
var bspline_weight_7 = 10;
var bspline_weight_8 = 10;

var bspline_x_0 = 266; // ORIGINAL (uniform Bspline) was 266
var bspline_y_0 = 0; // ORIGINAL (uniform Bspline) was 0

var theta_bspline = 0;
var bspline_x_1 = 133; // ORIGINAL (uniform Bspline) was 133
var bspline_y_1 = 230; // ORIGINAL (uniform Bspline) was 230
var bspline_r_1 = Math.sqrt((bspline_x_1 * bspline_x_1) + (bspline_y_1 * bspline_y_1));

var bspline_x_2 = -134; // ORIGINAL (uniform Bspline) was -134
var bspline_y_2 = 230 ; // ORIGINAL (uniform Bspline) was 230

var gamma_bspline = 0;
var bspline_x_3 = -267; // ORIGINAL (uniform Bspline) was -267
var bspline_y_3 = 0; // ORIGINAL (uniform Bspline) was 0
var bspline_r_3 = Math.sqrt((bspline_x_3 * bspline_x_3) + (bspline_y_3 * bspline_y_3));

var bspline_x_4 = -134; // ORIGINAL (uniform Bspline) was -134
var bspline_y_4 = -231; // ORIGINAL (uniform Bspline) was -231

var petri_bspline = 0;
var bspline_x_5 = 133; // ORIGINAL (uniform Bspline) was 133
var bspline_y_5 = -231; // ORIGINAL (uniform Bspline) was -231
var bspline_r_5 = Math.sqrt((bspline_x_5 * bspline_x_5) + (bspline_y_5 * bspline_y_5));

let bspline_points=[], bspline_weights;

bspline_weights = [bspline_weight_0,bspline_weight_1,bspline_weight_2,bspline_weight_3,bspline_weight_4,bspline_weight_5,bspline_weight_6,bspline_weight_7,bspline_weight_8];

let bspline_handles=[];

// ------------------------
// END of BSPLINE VARIABLES
// ------------------------



var radius_R1;
var radius_1st_3rd;
var radius_R2;

var start_angle1;
var start_angle1st3rd;
var start_angle2;

var incrementer_base = 2880; // in multiples of 360. Lower numbers = faster. 720 is a good speed.
var incrementer1 = 720;
var incrementer2 = 360;

var startx0_0;
var startx3_0;
var need_anim1_params = true;
var scaler = 0.9;

var square_points = []; // was testing the spirograph idea, but also to see if an array of points is easier than an array of segments (it is)

var speed_spiro = 540; // original is 540, which = speed_spiro_normalized value of 24
var speed_spiro_max = 32; // increments are 60, so, max is really 1920
// and spiro speed is actually opposite, lower value means faster
// so, 300 is really the fastest, 1920 the slowest, but we'll normalize that for the user
var speed_spiro_normalized;

var speed1 = 10;
var speed2 = 10;

var spiro_option;
var spiro_shape;
var epitro_radio;
var hypotro_radio;

let shape_1_original_points_x_coordinates = [];
let shape_1_original_points_y_coordinates = [];
let shape_2_original_points_x_coordinates = [];
let shape_2_original_points_y_coordinates = [];
let shape_3_original_points_x_coordinates = [];
let shape_3_original_points_y_coordinates = [];

let shape_2_1_original_points_x_coordinates = []; // for refactoring Shape 2.1
let shape_2_1_original_points_y_coordinates = [];



var default_canvas;

window.onload = function(){
    speed_spiro_normalized = speed_spiro_max - (speed_spiro / 60) + 1;
    document.getElementById('readout_spiro_speed').innerHTML = speed_spiro_normalized;
    // preload(); // related to Howler and i_feel_love
    document.addEventListener('keydown',evaluate_key);
};

var current_transparency_1;
var current_transparency_2;
var current_transparency_3;
var current_transparency_4;
var fade_out_time = 1600; // in milliseconds
var fade_out_loops = 100;
var fade_in_time = 800; // in milliseconds
var fade_in_loops = 100;
var fade_out_interval; // for entire process, will equal fadeout_time divided by # of loops
var fade_out_transparency_interval_1; // NO LONGER USED. Used when each transparency fade out had it's own setInterval call. They weren't synced though.
var fade_out_transparency_interval_2; // NO LONGER USED. Used when each transparency fade out had it's own setInterval call. They weren't synced though.
var fade_out_transparency_interval_3; // NO LONGER USED. Used when each transparency fade out had it's own setInterval call. They weren't synced though.
var fade_out_1_deincrementer; // will equal current_transparency_1 divided by # of fade_out_loops
var fade_out_2_deincrementer; // will equal current_transparency_2 divided by # of fade_out_loops
var fade_out_3_deincrementer; // will equal current_transparency_3 divided by # of fade_out_loops
var fade_out_4_deincrementer; // will equal current_transparency_4 divided by # of fade_out_loops
var fade_in_1_incrementer; // will equal (255 - current_transparency_1) divided by # of fade_in_loops
var fade_in_2_incrementer; // will equal (255 - current_transparency_2) divided by # of fade_in_loops
var fade_in_3_incrementer; // will equal (255 - current_transparency_3) divided by # of fade_in_loops
var fade_in_4_incrementer; // will equal (255 - current_transparency_4) divided by # of fade_in_loops

function evaluate_key(event){
//    console.log('you pressed a key');
    var tocheck = event;
//    console.log('KeyCode = ' + tocheck.keyCode);
    
    if (tocheck.keyCode == 69){
    // 69 = e key
        document.getElementById('epitro_radio').checked = true;
    }
    
    if (tocheck.keyCode == 82){
    // 82 = r key
        document.getElementById('hypotro_radio').checked = true;
    }
    
    if (tocheck.keyCode == 32){
    // 32 = space bar
        pause_toggle();
    }
    
    if (tocheck.keyCode == 80){
    // 80 = lowercase p
    // credit: https://keycode.info/
        if(show_shape_4 == true){
            document.getElementById('shape4').checked = false;
            show_shape_4 = false;
        } else {
            document.getElementById('shape4').checked = true;
            show_shape_4 = true;
        } // HAD TO USE ELSE, OTHER WISE THE FIRST ONE WOULD SET IT TO FALSE, WHICH WOULD THEN TRIGGER THE SECOND ONE, WHICH WOULD SET IT RIGHT BACK TO TRUE
    }
    
    if (tocheck.keyCode == 219){
    // 219 = left-bracket
        if(show_shape_3 == true){
            document.getElementById('shape3').checked = false;
            show_shape_3 = false;
        } else {
            document.getElementById('shape3').checked = true;
            show_shape_3 = true;
        } // HAD TO USE ELSE, OTHER WISE THE FIRST ONE WOULD SET IT TO FALSE, WHICH WOULD THEN TRIGGER THE SECOND ONE, WHICH WOULD SET IT RIGHT BACK TO TRUE
    }
    
    if (tocheck.keyCode == 221){
    // 221 = right-bracket
        if(show_shape_2 == true){
            document.getElementById('shape2').checked = false;
            show_shape_2 = false;
        } else {
            document.getElementById('shape2').checked = true;
            show_shape_2 = true;
        } // HAD TO USE ELSE, OTHER WISE THE FIRST ONE WOULD SET IT TO FALSE, WHICH WOULD THEN TRIGGER THE SECOND ONE, WHICH WOULD SET IT RIGHT BACK TO TRUE
    }
    
    if (tocheck.keyCode == 220){
    // 220 = backwards slash
        if(show_shape_1 == true){
            document.getElementById('shape1').checked = false;
            show_shape_1 = false;
        } else {
            document.getElementById('shape1').checked = true;
            show_shape_1 = true;
        } // HAD TO USE ELSE, OTHER WISE THE FIRST ONE WOULD SET IT TO FALSE, WHICH WOULD THEN TRIGGER THE SECOND ONE, WHICH WOULD SET IT RIGHT BACK TO TRUE
    }
    
    if (tocheck.keyCode == 84){
    // 84 = t key
//        auto_lower_transparency();
//        setTimeout(auto_lower_transparency3(),2000);
        current_transparency_1 = parseInt(document.getElementById('transparency_range_1').value);
        current_transparency_2 = parseInt(document.getElementById('transparency_range_2').value);
        current_transparency_3 = parseInt(document.getElementById('transparency_range_3').value);
        current_transparency_4 = parseInt(document.getElementById('transparency_range_4').value);
//        fade_out_transparency_interval_1 = fade_out_time / current_transparency_1; // this ensures that no matter what the current transparency is, the total time to fade it out will be 1600 milliseconds DIDN'T WORK
//        fade_out_transparency_interval_2 = fade_out_time / current_transparency_2;
//        fade_out_transparency_interval_3 = fade_out_time / current_transparency_3;
//        auto_lower_transparency4();
        fade_out_1_deincrementer = current_transparency_1 / fade_out_loops;
        fade_out_2_deincrementer = current_transparency_2 / fade_out_loops;
        fade_out_3_deincrementer = current_transparency_3 / fade_out_loops;
        fade_out_4_deincrementer = current_transparency_4 / fade_out_loops;

        auto_lower_transparency5();
    }
    // 89 = y key
    if (tocheck.keyCode == 89){
        current_transparency_1 = parseInt(document.getElementById('transparency_range_1').value);
        current_transparency_2 = parseInt(document.getElementById('transparency_range_2').value);
        current_transparency_3 = parseInt(document.getElementById('transparency_range_3').value);
        current_transparency_4 = parseInt(document.getElementById('transparency_range_4').value);
        fade_in_1_incrementer = ( 255 - current_transparency_1 ) / fade_in_loops;
        fade_in_2_incrementer = ( 255 - current_transparency_2 ) / fade_in_loops;
        fade_in_3_incrementer = ( 255 - current_transparency_3 ) / fade_in_loops;
        fade_in_4_incrementer = ( 255 - current_transparency_4 ) / fade_in_loops;
        
        auto_raise_transparency();
    }
    
    // 65 = a key
    if (tocheck.keyCode == 65){
        if(k_repeats > 1){
//            k_repeats -= 1;
            --k_repeats;
            document.getElementById('slider_shape_repeats').value = k_repeats;
            document.getElementById('readout_shape_repeats').innerHTML = k_repeats;
        }
    }
    
    // 83 = s key
    if (tocheck.keyCode == 83){
        if(k_repeats < 22){
//            k_repeats += 1;
            ++k_repeats; // weird. += works okay for increasing k_repeats, but -= converts it to a string
            document.getElementById('slider_shape_repeats').value = k_repeats;
            document.getElementById('readout_shape_repeats').innerHTML = k_repeats;
        }
    }
    
} // END   of function evaluate_key(event)    END

function auto_lower_transparency(){
    var current_transparency_1 = parseInt(document.getElementById('transparency_range_1').value);
    for(i = current_transparency_1; i > 0; i -= 1){
        
        setTimeout(function(){
            transparency_1 -= 1;
        }, 2000);
    }
}

function auto_lower_transparency2(){
    current_transparency_1 -= 1;
    if(current_transparency_1 == 0){
        return;
    }
}

function auto_lower_transparency3(){
//    for(i=0; i< 3; i+=1){
        setTimeout(function(){
            current_transparency_1 -= 1;
        }, 2000);
        setTimeout(function(){
            current_transparency_1 -= 1;
        }, 2000);
}

function auto_lower_transparency4(){
    fade_t_1 = setInterval(lowerTransparency,fade_out_transparency_interval_1);
    fade_t_2 = setInterval(lowerTransparency,fade_out_transparency_interval_2);
    fade_t_3 = setInterval(lowerTransparency,fade_out_transparency_interval_3);
}

function auto_lower_transparency5(){
    fade_out_interval = fade_out_time / fade_out_loops;
    fade_out_all = setInterval(lowerTransparency2,fade_out_interval);
}

function auto_raise_transparency(){
    fade_in_interval = fade_in_time / fade_in_loops;
    fade_in_all = setInterval(raiseTransparency,fade_in_interval);
}

function lowerTransparency(){
    current_transparency_1 -= 1;
    current_transparency_2 -= 1;
    current_transparency_3 -= 1;
    current_transparency_4 -= 1;
//    console.log('current_transparency_1 = ' + current_transparency_1);
    transparency_1 = current_transparency_1;
    transparency_2 = current_transparency_2;
    transparency_3 = current_transparency_3;
    transparency_4 = current_transparency_4;
    document.getElementById('transparency_range_1').value = current_transparency_1;
    document.getElementById('transparency_range_2').value = current_transparency_2;
    document.getElementById('transparency_range_3').value = current_transparency_3;
    document.getElementById('transparency_range_4').value = current_transparency_4;
    if(current_transparency_1 <= 0){
        clearInterval(fade_t_1);
    }
    if(current_transparency_2 <= 0){
        clearInterval(fade_t_2);
    }
    if(current_transparency_3 <= 0){
        clearInterval(fade_t_3);
    }
    if(current_transparency_4 <= 0){
        clearInterval(fade_t_4);
    }
}

function lowerTransparency2(){
    transparency_1 -= fade_out_1_deincrementer;
    transparency_2 -= fade_out_2_deincrementer;
    transparency_3 -= fade_out_3_deincrementer;
    transparency_4 -= fade_out_4_deincrementer;

    document.getElementById('transparency_range_1').value = transparency_1;
    document.getElementById('transparency_range_2').value = transparency_2;
    document.getElementById('transparency_range_3').value = transparency_3;
    document.getElementById('transparency_range_4').value = transparency_4;
    
    if(transparency_1 <= 0){
        clearInterval(fade_out_all);
    }
}

function raiseTransparency(){
    transparency_1 += fade_in_1_incrementer;
    transparency_2 += fade_in_2_incrementer;
    transparency_3 += fade_in_3_incrementer;
    transparency_4 += fade_in_4_incrementer;

    document.getElementById('transparency_range_1').value = transparency_1;
    document.getElementById('transparency_range_2').value = transparency_2;
    document.getElementById('transparency_range_3').value = transparency_3;
    document.getElementById('transparency_range_4').value = transparency_4;
    
    if(transparency_1 >= 255){
        clearInterval(fade_in_all);
    }    
}

function normalize_spiro_speed (){
    speed_spiro_normalized = speed_spiro_max - (speed_spiro / 60) + 1;
    document.getElementById('readout_spiro_speed').innerHTML = speed_spiro_normalized;    
}

// function below taken from
// https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
// author: Chris Ferdinandi

document.addEventListener('input', function (event){

    if (event.target.matches('#slider_spiro_speed')) {
        speed_spiro = ( speed_spiro_max - event.target.value + 1 ) * 60;
        normalize_spiro_speed();
    }
    if (event.target.matches('#slider_nonspiro_speed')) {
        speed1 = event.target.value;
        speed2 = event.target.value;
        document.getElementById('readout_nonspiro_speed').innerHTML = event.target.value;    
    }
    
    if (event.target.matches('#slider_rot_rad')) {
        r_spiro = event.target.value;
        document.getElementById('readout_rot_rad').innerHTML = event.target.value;    
    }
    
    if (event.target.matches('#slider_point_rad')) {
        point_on_small_r = event.target.value;
        document.getElementById('readout_point_rad').innerHTML = event.target.value;    
    }
    
    if (event.target.matches('#slider_shape_repeats')) {
        half_grid_unit = event.target.value/2;
        document.getElementById('readout_shape_repeats').innerHTML = event.target.value;    
    }
    
    if (event.target.matches('#slider_bspline_weight_1')) {
        bspline_weight_0 = event.target.value;
        bspline_weight_1 = event.target.value;
        bspline_weight_2 = event.target.value;
        document.getElementById('readout_slider_bspline_weight_1').innerHTML = event.target.value;
    }
    
    if (event.target.matches('#slider_bspline_weight_2')) {
        bspline_weight_3 = event.target.value;
        bspline_weight_4 = event.target.value;
        bspline_weight_5 = event.target.value;
        document.getElementById('readout_slider_bspline_weight_2').innerHTML = event.target.value;
    }
    
    if (event.target.matches('#slider_bspline_weight_3')) {
        bspline_weight_6 = event.target.value;
        bspline_weight_7 = event.target.value;
        bspline_weight_8 = event.target.value;
        document.getElementById('readout_slider_bspline_weight_3').innerHTML = event.target.value;
    }
    
    if (event.target.matches('#slider_laser_strength')) {
        laser_strength = event.target.value;
        document.getElementById('readout_laser_strength').innerHTML = event.target.value;    
    }
    
}, false);

document.addEventListener('click', function (event) {

	if (event.target.matches('#arrow_up_spiro_speed')) {
        speed_spiro -= 60;
        if (speed_spiro <= 300) {
            speed_spiro = 300;
        }
        speed_spiro_normalized = speed_spiro_max - (speed_spiro / 60) + 1;
        document.getElementById('spiro_speed_readout').innerHTML = speed_spiro_normalized;
	}

	if (event.target.matches('#arrow_down_spiro_speed')) {
        speed_spiro += 60;
        if (speed_spiro >= 1920) {
            speed_spiro = 1920;
        }
        speed_spiro_normalized = speed_spiro_max - (speed_spiro / 60) + 1;

        document.getElementById('spiro_speed_readout').innerHTML = speed_spiro_normalized;
	}
    
}, false);

// document.getElementById('laser_light_show').addEventListener('change', function(){
//     laser_light_show = document.getElementById('laser_light_show').checked;
    
//     if(laser_light_show){
//         background(0,0,0,255);
//         document.getElementById('vis_hide_1').classList.remove('hidden');
//         document.getElementById('i_feel_love_checkbox').classList.remove('hidden');
//     }

//     if(!laser_light_show){
//         document.getElementById('vis_hide_1').classList.add('hidden');        
//         document.getElementById('i_feel_love_checkbox').classList.add('hidden');        
//     }
    
//     if(!laser_light_show && i_feel_love_song.playing()){
//         i_feel_love_song.pause();
//     }
    
//     if(laser_light_show && i_feel_love_checkbox && !i_feel_love_song.playing()){
//         i_feel_love_song.play();
//     }    
// }, false);

// document.getElementById('i_feel_love_checkbox').addEventListener('change', function(){
//     i_feel_love_checkbox = document.getElementById('i_feel_love_checkbox').checked;

//     if(i_feel_love_checkbox && laser_light_show){
//         i_feel_love_song.play();
//     }
//     if(!i_feel_love_checkbox) {
//         i_feel_love_song.pause();
//     }
// }, false);

function erase_background(){
        background(0,0,0,255);    
}

// **********************************************************//
// code & comments taken from trochoids-multicolor-script.js //
// **********************************************************//

//  HYPOTROCHOID EQUATIONS ADAPTED FROM DANIEL FISHMAN'S VIDEO "Spirograph Mathematics" on YouTube:
//  https://youtu.be/n7T91LDJ--E
// Mr. Fishman's original demo used R = 24, r = 13 which produced the epitrochoid that you see in his video.

//  EPITROCHOID EQUATIONS ADAPTED FROM Franziska von Herrath web page "The Epitrochoid":
//  http://msemac.redwoods.edu/~darnold/math50c/CalcProj/Sp99/Fran/epitrochoid.htm

// R = radius of the fixed circle    // Fishman uses M
// r = radius of the moving circle   // Fishman uses N
// theata = fixed circle's angle from 0  // Fishman uses actual theta symbol 
// t = theta (angle of fixed circle) / r   
// f = fraction of moving circle's radius where the pen is   //   IN OTHER WORDS, THE SPEED OF THE ROTATING CIRCLE

var R_spiro = 240;   //  BIG CIRCLE RADIUS  //  NORMAL ALGORITHM  USE 24 or 240
//var r_spiro = 130;   //  SMALL CIRCLE RADIUS  //  NORMAL ALGORITHM  USE 13 or 130
var f_spiro = .8;   // increase f for longer "petals", decrease f for shorter "petals"
                    // f looks best when between 0.2 and 0.8
var theta = 0; // for spiro, clockwise
var gamma = 0; // for spiro, counter clockwise

var theta_1_1 = 0; // for spiro, clockwise SHAPE 1, POINT 1

var delta_2_1 = 0; // for spiro, clockwise SHAPE 2, NEW Point 1 ( or inner most point that starts at 0,0)
var gamma_2_1 = 0; // for spiro, counter clock SHAPE 2, POINT 1
var theta_2_2 = 0; // for spiro, clockwise SHAPE 2, POINT 2

var theta_3_1 = 0; // for spiro, clockwise SHAPE 3, POINT 1
var gamma_3_3 = 0; // for spiro, counter clock SHAPE 3, POINT 3

//var point_on_small_r = 70;
//
//  FOR EPITROCHOID
var m_spiro = R_spiro + r_spiro;
//  var x = (m * Math.cos(theta)) - (f * Math.cos((m * theta) / r));  //  EPITROCHOID EQUATION see above for citation
//  var y = (m * Math.sin(theta)) - (f * Math.sin((m * theta) / r));  //  EPITROCHOID EQUATION
var x_spiro = (m_spiro * Math.cos(theta)) - (f_spiro * Math.cos((m_spiro * theta) / r_spiro));
var y_spiro = (m_spiro * Math.sin(theta)) - (f_spiro * Math.sin((m_spiro * theta) / r_spiro));

var p1x;
var p1y;
//
//    p1x = (x*5) + centerX;  //  "REGULAR" EPITROCHOID 
//    p1y = (y*5) + centerY;  //  "REGULAR" EPITROCHOID
//
//        ctx.rect(p1x,p1y,pen_thickness * 2,pen_thickness * 2);
//        ctx.fill();
//
//        theta += (2*Math.PI)/2880;   //    NORMAL DRAWING ALGORITHM   MUST BE 180/360 FOR SMOOTH BEZIER
//        revolutions += 1;
//        angle_outer += speed; // i don't think this actually does anything

// *********************************************************************//
// END    code & comments taken from trochoids-multicolor-script.js    END
// *********************************************************************//


var handle_point_color = fill_r + ',' + fill_g + ',' + fill_b; // THIS WORKS
var first_pt;
var tBs2;
// END    tBs2 x,y values, as percentages of canvas w and h    END

var canvas;

var first_use_of_spiro = true;
// for p5js
function setup(){
    
    // var canvas = createCanvas(windowWidth, windowHeight);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    background(0, 0, 0);
    canvas_w = windowWidth;
    canvas_h = windowHeight;
    canvas_c_x = canvas_w/2;
    canvas_c_y = canvas_h/2;
    
    default_canvas = document.getElementById("defaultCanvas0");

    // console.log(default_canvas);
// the following event listeners borrowed from:
// http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html

    // Set up touch events for mobile, etc
    // default_canvas.addEventListener("touchstart", function (e) {
    //     mousePos = getTouchPos(default_canvas, e);
    //     var touch = e.touches[0];
    //     var mouseEvent = new MouseEvent("mousedown", {
    //     clientX: touch.clientX,
    //     clientY: touch.clientY
    //     });
    //     default_canvas.dispatchEvent(mouseEvent);
    //     console.log('omg it worked');
    // }, false);


//    R_spiro = (canvas_c_y/2); // EPITROCHOID  no longer, cause now it's based on the point's own radius
//    r_spiro = (R_spiro/2);
    r_spiro = 250; // EPITROCHOID  radius of rotating circle
//    point_on_small_r = r_spiro;
    point_on_small_r = r_spiro/2; // EPITROCHOID  smoother
//    LEFT OVER FROM WHEN IT WAS JUST GOING TO DRAW IN A CIRCLE
//	draw_btn = createButton("draw_it");
//    draw_btn.class('btn');
//    draw_btn.parent('ui-holder');
//	draw_btn.mousePressed(set_drawing_status);
    	frameRate(60);

    translate(canvas_c_x,canvas_c_y);
    
// CREATE SHAPE 1
    j_pro_to_canvas_w = canvas_w * 0.03125; // used to make first shape
    j_incr_pro_to_canvas_w = canvas_w * 0.046875; // used to make first shape
    
//	for (var i = 0, j = 50; i < 7; i+=1, j += 50) { // NICE SHAPE WHEN CANVAS WAS 1080 x 1080
//	for (var i = 0, j = 50; i < 7; i+=1, j += 75) { // NEW NUMBERS FOR 1600 x 850 CANVAS; using scaler for y
	for (var i = 0, j = 50; i < 7; i+=1, j += j_incr_pro_to_canvas_w) { // NOW, TRYING TO BASE IT ON CANVAS WIDTH
        
        // reddish-orange
        fill_r = 255;
        fill_g = 98;
        fill_b = 0;
        
        if(i % 3 == 0){
            // THIS RESULTS IN NEGATIVE NUMBERS
//			bez_elmnts_Shape_1.push(new Bez_point('anchor_'+(i/3+1),j-canvas_c_x,j-canvas_c_y,fill_r,fill_g,fill_b, fill_a));
			bez_elmnts_Shape_1.push(new Bez_point('anchor_'+(i/3+1),j-canvas_c_x,((j-canvas_c_y)*scaler),red_1,grn_1,blu_1, fill_a));
            // THIS RESULTS IN POSITIVE NUMBERS
//			bez_elmnts_Shape_1.push(new Bez_point('anchor_'+(i/3+1),j,j,fill_r,fill_g,fill_b, fill_a));
            
        } else {
            // THIS RESULTS IN NEGATIVE NUMBERS
//			bez_elmnts_Shape_1.push(new Bez_point('control_'+i,j-canvas_c_x,j-canvas_c_y,fill_r,fill_g,fill_b, fill_a));
			bez_elmnts_Shape_1.push(new Bez_point('control_'+i,j-canvas_c_x,((j-canvas_c_y)*scaler),red_1,grn_1,blu_1, fill_a));
            // THIS RESULTS IN POSITIVE NUMBERS
//			bez_elmnts_Shape_1.push(new Bez_point('control_'+i,j,j,fill_r,fill_g,fill_b, fill_a));
		}

        // MAKES THE LAST POINT SO THE SHAPE CAN BE CLOSED
        if(i == 6){
            // THIS RESULTS IN NEGATIVE NUMBERS
//            bez_elmnts_Shape_1.push(new Bez_point('last_'+i,j-250-canvas_c_x,j-100-canvas_c_y,fill_r,fill_g,fill_b, fill_a));
            bez_elmnts_Shape_1.push(new Bez_point('last_'+i,j-250-canvas_c_x,j-100-canvas_c_y,red_1,grn_1,blu_1, fill_a));
            // THIS RESULTS IN POSITIVE NUMBERS
//            bez_elmnts_Shape_1.push(new Bez_point('last_'+i,j-250,j-100,fill_r,fill_g,fill_b, fill_a));
            
            // GET STARTING VALUES TO ROTATE THIS POINT
            x6 = bez_elmnts_Shape_1[6].xpos;
            y6 = bez_elmnts_Shape_1[6].ypos;
            dx = x6 ** 2;
            dy = y6 ** 2;
            radius_R1 = Math.sqrt(dx + dy);
            start_angle1 = Math.atan2(y6 - 0, x6 - 0) * 180 / Math.PI;
//            angle_R1 = start_angle1;
            angle_R1 = Math.abs(start_angle1); // THIS MATTERS FOR SOME REASON
        }
        
        if(i == 3){
            x1st3rd = bez_elmnts_Shape_1[3].xpos;
            y1st3rd = bez_elmnts_Shape_1[3].ypos;
            dx1st3rd = x1st3rd ** 2;
            dy1st3rd = y1st3rd ** 2;
            radius_1st_3rd = Math.sqrt(dx1st3rd + dy1st3rd);
            start_angle1st3rd = Math.atan2(dy1st3rd - 0, dx1st3rd - 0) * 180 / Math.PI;
            angle_1st_3rd = Math.abs(start_angle1st3rd);
        }
    }  // END    CREATE SHAPE 1 for loop   END

    // STORE THE X and Y COORDINATES FOR SHAPE 1, SO USER CAN RESET THEM
    for(i = 0; i < bez_elmnts_Shape_1.length; i += 1){
        shape_1_original_points_x_coordinates.push(bez_elmnts_Shape_1[i].xpos);
        shape_1_original_points_y_coordinates.push(bez_elmnts_Shape_1[i].ypos);
    }
    
    start_angle1 = Math.atan2(y6 - 0, x6 - 0) * 180 / Math.PI; // FOR SHAPE 1
    angle_R1 = Math.abs(start_angle1); // THIS MATTERS FOR SOME REASON     FOR SHAPE 1    
    
    
// CREATE SHAPE 2    x,y values, as percentages of canvas w and h
//    first_pt = new Point("first",new Bez_point("first",0,0,red_2,grn_2,blu_2, fill_a)); // orginal way of creating first point in Shape 2. The Point class does not have all the functions of the Bez point class... so couldn't easily be animated
    first_pt = new Bez_point("first_pt_shape_2",20,40,red_2,grn_2,blu_2, fill_a);
    tBs2 = new Bez_seg2("test",new Bez_point("control1",canvas_w * 0.056,canvas_h * 0.106,red_2,grn_2,blu_2, fill_a),new Bez_point("control2",canvas_w * 0.163,canvas_h * 0.306,red_2,grn_2,blu_2, fill_a),new Bez_point("anchor1",canvas_w * 0.131,canvas_h * 0.424,red_2,grn_2,blu_2, fill_a),new Bez_point("last", canvas_w * -0.022, canvas_h * 0.488,red_2,grn_2,blu_2, fill_a));

    
    // STORE THE X and Y COORDINATES FOR SHAPE 2, SO USER CAN RESET THEM
    // do you see how much of a pain in the butt Bezier "segments" are? YES, YES I DO
    shape_2_original_points_x_coordinates.push(0);
    shape_2_original_points_x_coordinates.push(tBs2.cntrl1.xpos);
    shape_2_original_points_x_coordinates.push(tBs2.cntrl2.xpos);
    shape_2_original_points_x_coordinates.push(tBs2.anchor.xpos);
    shape_2_original_points_x_coordinates.push(tBs2.last.xpos);
    
    shape_2_original_points_y_coordinates.push(0);
    shape_2_original_points_y_coordinates.push(tBs2.cntrl1.ypos);
    shape_2_original_points_y_coordinates.push(tBs2.cntrl2.ypos);
    shape_2_original_points_y_coordinates.push(tBs2.anchor.ypos);
    shape_2_original_points_y_coordinates.push(tBs2.last.ypos);
    
    tBs2_x6 = tBs2.anchor['xpos'];
    tBs2_y6 = tBs2.anchor['ypos'];

    tBs2_dx = tBs2_x6 ** 2;
    tBs2_dy = tBs2_y6 ** 2;
    radius_R2 = Math.sqrt(tBs2_dx + tBs2_dy);
    start_angle2 = Math.atan2(0 - tBs2_y6, 0 - tBs2_x6) * 180 / Math.PI; // ZERO PLACEMENT MATTERS
    angle_R2 = Math.abs(start_angle2); // LESS JUMPY THIS WAY

// END    CREATE SHAPE 2     END

// CREATE SHAPE 2.1  Uses an array instead of an Object (which provided no benefits I could see, but Javascript is still a mysterious animal to me)
// STILL USING x,y values, as percentages of canvas w and h

    bez_elmnts_Shape_2.push(new Bez_point("first",20,40,red_2,grn_2,blu_2, fill_a));
    bez_elmnts_Shape_2.push(new Bez_point("control1",canvas_w * 0.056,canvas_h * 0.106,red_2,grn_2,blu_2, fill_a));
    bez_elmnts_Shape_2.push(new Bez_point("control2",canvas_w * 0.163,canvas_h * 0.306,red_2,grn_2,blu_2, fill_a));
    bez_elmnts_Shape_2.push(new Bez_point("anchor1",canvas_w * 0.131,canvas_h * 0.424,red_2,grn_2,blu_2, fill_a));
    // bez_elmnts_Shape_2.push(new Bez_point("last", canvas_w * -0.022, canvas_h * 0.488,red_2,grn_2,blu_2, fill_a)); // fine on Desktop, but on iPad, too close to bottom edge, would acidentally invoke the Dock
    bez_elmnts_Shape_2.push(new Bez_point("last", canvas_w * -0.022, canvas_h * 0.424,red_2,grn_2,blu_2, fill_a));

    // STORE THE X and Y COORDINATES FOR SHAPE 2.1, SO USER CAN RESET THEM
    for(i = 0; i < bez_elmnts_Shape_2.length; i += 1){
        shape_2_1_original_points_x_coordinates.push(bez_elmnts_Shape_2[i].xpos);
        shape_2_1_original_points_y_coordinates.push(bez_elmnts_Shape_2[i].ypos);
        // console.log('storing xy coordinates for Shape 2_1');
    }

// END    CREATE SHAPE 2.1     END
    
// CREATE SHAPE 3 THAT'S 'SQUARISH'
    square_points.push(new Bez_point("square_0",(canvas_c_x/2),(canvas_c_y/2),red_1_square,grn_1_square,blu_1_square, fill_a));
    square_points.push(new Bez_point("square_1",(-canvas_c_x/2),(-canvas_c_y/2),red_1_square,grn_1_square,blu_1_square, fill_a));
    square_points.push(new Bez_point("square_2",(canvas_c_x/4),(-canvas_c_y/4),red_1_square,grn_1_square,blu_1_square, fill_a));

    // STORE THE X and Y COORDINATES FOR SHAPE 3, SO USER CAN RESET THEM
    for(i = 0; i < square_points.length; i += 1){
        shape_3_original_points_x_coordinates.push(square_points[i].xpos);
        shape_3_original_points_y_coordinates.push(square_points[i].ypos);
    }
    
//    calculate_bspline_radii();
//    console.log('setup says bspline_r_3 = ' + bspline_r_3);
    calculate_bspline_points();
//    console.log('setup says bspline_r_3 = ' + bspline_r_3);
//    calculate_bspline_angle_incrementers();
//    console.log('setup says bspline_r_3 = ' + bspline_r_3);
    
//    // Create Shape 4 Handles   NOTE: i = 2, not 0, because we don't need 0 and 1; they will
//    // be the same as the last point; when length-3 = 6, the last point = index 5
//    for(i = 2; i < bspline_points.length-3; i += 1){
//        bspline_handles.push(new Bspline_Handle(bspline_points[i].x,bspline_points[i].y,red_4,grn_4,blu_4,i));
//    }
    
//    // Create Shape 4 Handles, v2
//    for(i = 1; i < bspline_points.length-3; i += 2){
//        bspline_handles.push(new Bspline_Handle(bspline_points[i].x,bspline_points[i].y,red_4,grn_4,blu_4,i));
//        console.log('I made a handle with indx = ' + i);
//    }
    
    // Create Shape 4 Handles, v3
    for(i = 0; i < bs_o_p.length; i += 1){
        bspline_handles.push(new Bspline_Handle(bs_o_p[i].x,bs_o_p[i].y,red_4,grn_4,blu_4,i));
//        console.log('I made a handle with indx = ' + i);
    }
    fix_bspline_points_that_overlap();
}  // END OF setup

// FUNCTION TO GET VALUES TO ROTATE A POINT. MIGHT NOT USE THIS FUNCITON
function get_animate_1_params() {
//    x6 = bez_elmnts_Shape_1[6].xpos; // calculate correct radius for shape 1 inner point
//    y6 = bez_elmnts_Shape_1[6].ypos;
    x6 = bez_elmnts_Shape_1[3].xpos; // doesn't calculate correct radius, even for point at index 3
    y6 = bez_elmnts_Shape_1[3].ypos;
    dx = x6 ** 2;
    dy = y6 ** 2;
    radius_R1 = Math.sqrt(dx + dy);
    
    // LETS TRY AGAIN

    // FOR Shape 1
    start_angle1 = Math.atan2(y6 - 0, x6 - 0) * 180 / Math.PI;
    angle_R1 = Math.abs(start_angle1); // THIS MATTERS FOR SOME REASON

    // FOR Shape 2
    tBs2_x6 = tBs2.anchor['xpos'];
    tBs2_y6 = tBs2.anchor['ypos'];

    tBs2_dx = tBs2_x6 ** 2;
    tBs2_dy = tBs2_y6 ** 2;

    radius_R2 = Math.sqrt(tBs2_dx + tBs2_dy);

    // BY NOT DOING THE 3 LINES BELOW, IT JUMPS LESS
    start_angle2 = Math.atan2(0 - tBs2_y6, 0 - tBs2_x6) * 180 / Math.PI; // ZERO PLACEMENT MATTERS
//    start_angle2 = Math.atan2(0 - tBs2_dy, 0 - tBs2_dx) * 180 / Math.PI; // WRONG VARIABLES?
    angle_R2 = Math.abs(start_angle2); // LESS JUMPY THIS WAY

// END     LETS TRY AGAIN     END    

} // END OF   get_animate_1_params FUNCTION    END

function set_transparency(){
    transparency_1 = parseInt(document.getElementById('transparency_range_1').value);
    transparency_2 = parseInt(document.getElementById('transparency_range_2').value);
    transparency_3 = parseInt(document.getElementById('transparency_range_3').value);
    transparency_4 = parseInt(document.getElementById('transparency_range_4').value);
//    transparency_background = parseInt(document.getElementById('transparency_background').value);
}

var fingerX;
var fingerY;

document.getElementById("transparency_range_1").addEventListener("input", set_transparency);
document.getElementById("transparency_range_2").addEventListener("input", set_transparency);
document.getElementById("transparency_range_3").addEventListener("input", set_transparency);
document.getElementById("transparency_range_4").addEventListener("input", set_transparency);
//document.getElementById("transparency_background").addEventListener("input", set_transparency);

function touchStarted(event) {
    // var fingerX = touches[0].x - canvas_c_x;
    // var fingerY = touches[0].y - canvas_c_y;
    fingerX = touches[0].x;
    fingerY = touches[0].y;
    // console.log(fingerX);

    // check to see which point in Shape 1 was tapped, and set it to selected
    for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
        var bez_elmnts_Shape_1_current = bez_elmnts_Shape_1[i];
        if (fingerX - canvas_c_x > bez_elmnts_Shape_1_current.xpos - bez_elmnts_Shape_1_current.elmt_size && fingerX - canvas_c_x < bez_elmnts_Shape_1_current.xpos + bez_elmnts_Shape_1_current.elmt_size &&
            fingerY - canvas_c_y > bez_elmnts_Shape_1_current.ypos - bez_elmnts_Shape_1_current.elmt_size && fingerY - canvas_c_y < bez_elmnts_Shape_1_current.ypos + bez_elmnts_Shape_1_current.elmt_size){
                console.log(bez_elmnts_Shape_1[i]);
                bez_elmnts_Shape_1[i].selected = true;
            }
        
        bez_elmnts_Shape_1[i].xoffset = fingerX - bez_elmnts_Shape_1[i].xpos;
        bez_elmnts_Shape_1[i].yoffset = fingerY - bez_elmnts_Shape_1[i].ypos;
    }

    // // check to see which point in Shape 2.1 was tapped, and set it to selected. Part of the refactoring of Shape 2.1
    for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
        var bez_elmnts_Shape_2_current = bez_elmnts_Shape_2[i];
        if (fingerX - canvas_c_x > bez_elmnts_Shape_2_current.xpos - bez_elmnts_Shape_2_current.elmt_size && fingerX - canvas_c_x < bez_elmnts_Shape_2_current.xpos + bez_elmnts_Shape_2_current.elmt_size &&
            fingerY - canvas_c_y > bez_elmnts_Shape_2_current.ypos - bez_elmnts_Shape_2_current.elmt_size && fingerY - canvas_c_y < bez_elmnts_Shape_2_current.ypos + bez_elmnts_Shape_2_current.elmt_size){
                bez_elmnts_Shape_2[i].selected = true;
            }
        
        bez_elmnts_Shape_2[i].xoffset = fingerX - bez_elmnts_Shape_2[i].xpos;
        bez_elmnts_Shape_2[i].yoffset = fingerY - bez_elmnts_Shape_2[i].ypos;
    }
    // END OF LOOP HANDLES ALL POINTS IN Shape 2.1. Part of the refactoring of Shape 2.1
    
    // // check to see which point in Shape 3 was tapped, and set it to selected
    for (var i = 0; i < square_points.length; i++) {
        var square_points_current = square_points[i];
        if (fingerX - canvas_c_x > square_points_current.xpos - square_points_current.elmt_size && fingerX - canvas_c_x < square_points_current.xpos + square_points_current.elmt_size &&
            fingerY - canvas_c_y > square_points_current.ypos - square_points_current.elmt_size && fingerY - canvas_c_y < square_points_current.ypos + square_points_current.elmt_size){
                square_points[i].selected = true;
            }
        
        square_points[i].xoffset = fingerX - square_points[i].xpos;
        square_points[i].yoffset = fingerY - square_points[i].ypos;
    }
    // END OF LOOP HANDLES ALL POINTS IN Shape 3

    // check to see which point in Shape 4 was tapped, and set it to selected
    for (var i = 0; i < bspline_handles.length; i++) {
        var bspline_handles_current = bspline_handles[i];
        if (fingerX - canvas_c_x > bspline_handles_current.xpos - bspline_handles_current.elmt_size && fingerX - canvas_c_x < bspline_handles_current.xpos + bspline_handles_current.elmt_size &&
            fingerY - canvas_c_y > bspline_handles_current.ypos - bspline_handles_current.elmt_size && fingerY - canvas_c_y < bspline_handles_current.ypos + bspline_handles_current.elmt_size){
                bspline_handles[i].selected = true;
            }
        
        bspline_handles[i].xoffset = fingerX - bspline_handles[i].xpos;
        bspline_handles[i].yoffset = fingerY - bspline_handles[i].ypos;
    }
    // END OF LOOP HANDLES ALL POINTS IN Shape 4
  } // END of touchStarted function


function mousePressed() {

    // THIS FOR LOOP HANDLES ALL POINTS IN Shape 1. MAYBE WE DON'T NEED AN OBJECT CONTAINING SEGMENTS? (like shape 2)
    for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
        //checking to see if the mouse is over the 'element' (rendered as a circle) and turning it red if it is
        if (bez_elmnts_Shape_1[i].mouse_over == true) {
            bez_elmnts_Shape_1[i].selected = true;
//            console.log("we just selected");
//			console.log('element # ' + bez_elmnts_Shape_1[i].name);
//            console.log('index # = ' + i);
        } else {
 
            bez_elmnts_Shape_1[i].selected = false;
        }
        
        if(bez_elmnts_Shape_1[7].mouse_over == true){
//            console.log('we are over bez_elmnts_Shape_1[7]');
        }
        
        bez_elmnts_Shape_1[i].xoffset = mouseX - bez_elmnts_Shape_1[i].xpos;
        bez_elmnts_Shape_1[i].yoffset = mouseY - bez_elmnts_Shape_1[i].ypos;
    }
//    return false;    COULDN'T USE THIS BECAUSE IT PREVENTED USER INPUT INTO THE NUMBER INPUT FIELD
// END of LOOP HANDLES ALL POINTS IN Shape 1. 

    // CHECK IF MOUSE IS OVER cntrl1, cntrl2, anchor, or last in tBs2 (Shape 2)
    // THE PROBLEM WITH an OBJECT CONTAINING segments IS THAT YOU CAN'T EASILY ITERATE THROUGH THEM because it has mixed data types in it (the first one is "name" and the other 3 are Bez_point objects)
    if (first_pt.mouse_over == true) {
        first_pt.selected = true;
    //    console.log("we just selected")
    //    console.log('first_pt ')
        } else {
    
        first_pt.selected = false;
        }
        first_pt.xoffset = mouseX - tBs2.cntrl1.xpos;
        first_pt.yoffset = mouseY - tBs2.cntrl1.ypos;
    
        if (tBs2.cntrl1.mouse_over == true) {
        tBs2.cntrl1.selected = true;
    //    console.log("we just selected")
    //    console.log('tBs2.cntrl1 ')        
        } else {
    
        tBs2.cntrl1.selected = false;
        }
        tBs2.cntrl1.xoffset = mouseX - tBs2.cntrl1.xpos;
        tBs2.cntrl1.yoffset = mouseY - tBs2.cntrl1.ypos;
    
        if (tBs2.cntrl2.mouse_over == true) {
        tBs2.cntrl2.selected = true;
    //    console.log("we just selected")
    //    console.log('tBs2.cntrl2 ')
        } else {
    
        tBs2.cntrl2.selected = false;
        }
        tBs2.cntrl2.xoffset = mouseX - tBs2.cntrl1.xpos;
        tBs2.cntrl2.yoffset = mouseY - tBs2.cntrl1.ypos;
        
        if (tBs2.anchor.mouse_over == true) {
        tBs2.anchor.selected = true;
    //    console.log("we just selected");
    //    console.log('tBs2.anchor ');
    //    console.log('mousePressed says anchor.angle = ' + tBs2.anchor.angle);
        } else {
    
        tBs2.anchor.selected = false;
        }
        tBs2.anchor.xoffset = mouseX - tBs2.cntrl1.xpos;
        tBs2.anchor.yoffset = mouseY - tBs2.cntrl1.ypos;
    
        if (tBs2.last.mouse_over == true) {
        tBs2.last.selected = true;
    //    console.log("we just selected")
    //    console.log('tBs2.last ')
    //        console.log( 'x = ' +  tBs2.last.xpos);
    //        console.log( 'y = ' +  tBs2.last.ypos);
        } else {
    
        tBs2.last.selected = false;
        }
        tBs2.last.xoffset = mouseX - tBs2.last.xpos;
        tBs2.last.yoffset = mouseY - tBs2.last.ypos;
        // CHECK IF MOUSE IS OVER cntrl1, cntrl2, anchor, or last in tBs2 (Shape 2) - END

    // THIS FOR LOOP HANDLES ALL POINTS IN Shape 2.1. Part of refactoring Shape 2.1
    for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
        //checking to see if the mouse is over the 'element' (rendered as a circle) and turning it red if it is
        if (bez_elmnts_Shape_2[i].mouse_over == true) {
            bez_elmnts_Shape_2[i].selected = true;
        } else {
 
            bez_elmnts_Shape_2[i].selected = false;
        }
                
        bez_elmnts_Shape_2[i].xoffset = mouseX - bez_elmnts_Shape_2[i].xpos;
        bez_elmnts_Shape_2[i].yoffset = mouseY - bez_elmnts_Shape_2[i].ypos;
    }
    
    // THIS FOR LOOP HANDLES ALL POINTS IN Shape 3. MAYBE WE DON'T NEED AN OBJECT CONTAINING SEGMENTS? (like Shape 2)
    for (var i = 0; i < square_points.length; i++) {
        //checking to see if the mouse is over the 'element' (rendered as a circle) and turning it red if it is
        if (square_points[i].mouse_over == true) {
            square_points[i].selected = true;
//            console.log("we just selected");
//			console.log('element # ' + square_points[i].name);
//            console.log('index # = ' + i);
        } else {
 
            square_points[i].selected = false;
//            console.log("mouse isn't pressed")
        }
                
        square_points[i].xoffset = mouseX - square_points[i].xpos;
        square_points[i].yoffset = mouseY - square_points[i].ypos;
//        console.log(bez_elmnts_Shape_1[i].selected);
    }
    
    // THIS FOR LOOP HANDLES ALL the HANDLES for Shape 4, which is made up of Bsplines
    for (var i = 0; i < bspline_handles.length; i++) {
        //checking to see if the mouse is over the 'element' (rendered as a circle) and turning it red if it is
        if (bspline_handles[i].mouse_over == true) {
            bspline_handles[i].selected = true;
        } else {
 
            bspline_handles[i].selected = false;
        }
                
        bspline_handles[i].xoffset = mouseX - bspline_handles[i].xpos; // turning this off doesn't fix it
        bspline_handles[i].yoffset = mouseY - bspline_handles[i].ypos;
//        console.log(bez_elmnts_Shape_1[i].selected);
    }
}

var future_mouseX; // handling touch events is tricky
var future_mouseY;

function touchMoved(){
    // console.log('touch move detected');
    // console.log(touches[0].x - canvas_c_x);

    future_mouseX = touches[0].x - canvas_c_x; // attempt at getting the handles to have a white fill when touchEnded function is called
    future_mouseY = touches[0].y - canvas_c_y;

    // this for loop is related to Shape 1
    for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
        if (bez_elmnts_Shape_1[i].selected) {
            bez_elmnts_Shape_1[i].xpos = touches[0].x - canvas_c_x;
            bez_elmnts_Shape_1[i].ypos = touches[0].y - canvas_c_y;
            bez_elmnts_Shape_1[i].update_radius_angle(bez_elmnts_Shape_1[i].xpos,bez_elmnts_Shape_1[i].ypos);
        }
    }
    // END     for loop related to Shape 1     END

    // for Shape 2 (tBs2) may not need if refactoring of Shape 2.1 goes well
    if(first_pt.selected) {
        first_pt.xpos = touches[0].x - canvas_c_x;
        first_pt.ypos = touches[0].y - canvas_c_y;
        first_pt.update_radius_angle(first_pt.xpos,first_pt.ypos);
    }
    
    if(tBs2.cntrl1.selected) {
        tBs2.cntrl1.xpos = touches[0].x - canvas_c_x;
        tBs2.cntrl1.ypos = touches[0].y - canvas_c_y;
        tBs2.cntrl1.update_radius_angle(tBs2.cntrl1.xpos,tBs2.cntrl1.ypos);
        
    }
    
    if(tBs2.cntrl2.selected) {
        tBs2.cntrl2.xpos = touches[0].x - canvas_c_x;
        tBs2.cntrl2.ypos = touches[0].y - canvas_c_y;
        tBs2.cntrl2.update_radius_angle(tBs2.cntrl2.xpos,tBs2.cntrl2.ypos);
    }
    
    if(tBs2.anchor.selected) {
        tBs2.anchor.xpos = touches[0].x - canvas_c_x;
        tBs2.anchor.ypos = touches[0].y - canvas_c_y;
        tBs2.anchor.update_radius_angle(tBs2.anchor.xpos,tBs2.anchor.ypos);
    }
    
    if(tBs2.last.selected) {
        tBs2.last.xpos = touches[0].x - canvas_c_x;
        tBs2.last.ypos = touches[0].y - canvas_c_y;
        tBs2.last.update_radius_angle(tBs2.last.xpos,tBs2.last.ypos);
    }
    // END: for Shape 2 (tBs2) - END   may not need if refactoring of Shape 2.1 goes well   END
    
    // this for loop is related to Shape 2.1 refactoring
    for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
        if (bez_elmnts_Shape_2[i].selected) {
            bez_elmnts_Shape_2[i].xpos = touches[0].x - canvas_c_x;
            bez_elmnts_Shape_2[i].ypos = touches[0].y - canvas_c_y;
            bez_elmnts_Shape_2[i].update_radius_angle(bez_elmnts_Shape_2[i].xpos,bez_elmnts_Shape_2[i].ypos);
        }
    }
    // END     for loop related to Shape 2.1 refactoring     END    
    
    // this for loop is related to Shape 3
    for (var i = 0; i < square_points.length; i++) {
        if (square_points[i].selected) {
            square_points[i].xpos = touches[0].x - canvas_c_x;
            square_points[i].ypos = touches[0].y - canvas_c_y;
            square_points[i].update_radius_angle(square_points[i].xpos,square_points[i].ypos);
        }
    }
    // END     for loop related to Shape 3     END    
    
    // this for loop is related to the HANDLES Shape 4
    for (var i = 0; i < bspline_handles.length; i++) {
        if (bspline_handles[i].selected) {
            bspline_handles[i].xpos = touches[0].x - canvas_c_x;
            bspline_handles[i].ypos = touches[0].y - canvas_c_y;
            bspline_handles[i].update_radius_angle(bspline_handles[i].xpos,bspline_handles[i].ypos);

            bs_o_p[i].x = touches[0].x - canvas_c_x;
            bs_o_p[i].y = touches[0].y - canvas_c_y;
            
//            calculate_bspline_points();   // no need here; the draw loop continuously calls this function
            // but what if loop_status = false?
//            if(!loop_status){
//                console.log('loop_status is false, calling calculate_bspline_points')
                calculate_bspline_radii(); // this fixes the jumping spiro problem
                calculate_bspline_points();
                calculate_bspline_angle_incrementers(); // 
                
//            }
        }
    }
    // END     for loop related to Shape 4     END        
}
// END    of touchMoved function    END

function mouseDragged() {
    // this for loop is related to Shape 1
    for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
        if (bez_elmnts_Shape_1[i].selected) {
            bez_elmnts_Shape_1[i].xpos = mouseX - canvas_c_x;
            bez_elmnts_Shape_1[i].ypos = mouseY - canvas_c_y;
            bez_elmnts_Shape_1[i].update_radius_angle(bez_elmnts_Shape_1[i].xpos,bez_elmnts_Shape_1[i].ypos);
        }
    }
    // END     for loop related to Shape 1     END
    
    // for Shape 2 (tBs2) which may not be need if refactoring of Shape 2.1 goes well
    if(first_pt.selected) {
        first_pt.xpos = mouseX - canvas_c_x;
        first_pt.ypos = mouseY - canvas_c_y;
        first_pt.update_radius_angle(first_pt.xpos,first_pt.ypos);
    }
    
    if(tBs2.cntrl1.selected) {
        tBs2.cntrl1.xpos = mouseX - canvas_c_x;
        tBs2.cntrl1.ypos = mouseY - canvas_c_y;
        tBs2.cntrl1.update_radius_angle(tBs2.cntrl1.xpos,tBs2.cntrl1.ypos);
        
    }
    
    if(tBs2.cntrl2.selected) {
        tBs2.cntrl2.xpos = mouseX - canvas_c_x;
        tBs2.cntrl2.ypos = mouseY - canvas_c_y;
        tBs2.cntrl2.update_radius_angle(tBs2.cntrl2.xpos,tBs2.cntrl2.ypos);
    }
    
    if(tBs2.anchor.selected) {
        tBs2.anchor.xpos = mouseX - canvas_c_x;
        tBs2.anchor.ypos = mouseY - canvas_c_y;
        tBs2.anchor.update_radius_angle(tBs2.anchor.xpos,tBs2.anchor.ypos);
    }
    
    if(tBs2.last.selected) {
        tBs2.last.xpos = mouseX - canvas_c_x;
        tBs2.last.ypos = mouseY - canvas_c_y;
        tBs2.last.update_radius_angle(tBs2.last.xpos,tBs2.last.ypos);
    }
    // END: for Shape 2 (tBs2) - END
    
    // this for loop is related to Shape 3
    for (var i = 0; i < square_points.length; i++) {
        if (square_points[i].selected) {
            square_points[i].xpos = mouseX - canvas_c_x;
            square_points[i].ypos = mouseY - canvas_c_y;
            square_points[i].update_radius_angle(square_points[i].xpos,square_points[i].ypos);
        }
    }
    // END     for loop related to Shape 3     END    
    
    // this for loop is related to Shape 2.1 part of refactoring Shape 2.1
    for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
        if (bez_elmnts_Shape_2[i].selected) {
            bez_elmnts_Shape_2[i].xpos = mouseX - canvas_c_x;
            bez_elmnts_Shape_2[i].ypos = mouseY - canvas_c_y;
            bez_elmnts_Shape_2[i].update_radius_angle(bez_elmnts_Shape_2[i].xpos,bez_elmnts_Shape_2[i].ypos);
        }
    }
    // END     for loop related to Shape 2.1     END    
    
    // this for loop is related to the HANDLES Shape 4
    for (var i = 0; i < bspline_handles.length; i++) {
        if (bspline_handles[i].selected) {
            bspline_handles[i].xpos = mouseX - canvas_c_x;
            bspline_handles[i].ypos = mouseY - canvas_c_y;
            bspline_handles[i].update_radius_angle(bspline_handles[i].xpos,bspline_handles[i].ypos);

            bs_o_p[i].x = mouseX - canvas_c_x;
            bs_o_p[i].y = mouseY - canvas_c_y;
            
//            calculate_bspline_points();   // no need here; the draw loop continuously calls this function
            // but what if loop_status = false?
//            if(!loop_status){
//                console.log('loop_status is false, calling calculate_bspline_points')
                calculate_bspline_radii(); // this fixes the jumping spiro problem
                calculate_bspline_points();
                calculate_bspline_angle_incrementers(); // 
                
//            }
        }
    }
    // END     for loop related to Shape 4     END    
}
function touchEnded() {

    mouseX = future_mouseX; // so the handle has a solid white fill when user lifts finger
    mouseY = future_mouseY;

    // unselect all points in Shape 1
    for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
        bez_elmnts_Shape_1[i].selected = false;
    }

    //  unselect all points in SHAPE 2, which, if Shape 2.1 refactor goes well, is not needed
    first_pt.selected = false;
    first_pt.mouse_over = false;
    tBs2.cntrl1.selected = false;
    tBs2.cntrl1.mouse_over = false;
    tBs2.cntrl2.selected = false;
    tBs2.cntrl2.mouse_over = false;
    tBs2.anchor.selected = false;
    tBs2.anchor.mouse_over = false;
    radius_R2 = tBs2.anchor.radius; // BUT... NO LONGER USING radius_R2
    angle_R2 = tBs2.anchor.angle + k_rotations - (incrementer_base / incrementer1); // BUT... NO LONGER USING angle_R2
    
    tBs2.last.selected = false;
    tBs2.last.mouse_over = false;
    // END    unselect all points in SHAPE 2, which, if Shape 2.1 refactor goes well, is not needed   END

    // unselect all points in Shape 3
    for (var i = 0; i < square_points.length; i++) {
        square_points[i].selected = false;
    }

    // unselect all points in Shape 2.1
    for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
        bez_elmnts_Shape_2[i].selected = false;
    }

    // unselect all points in Shape 4
    for (var i = 0; i < bspline_handles.length; i++) {
        bspline_handles[i].selected = false;
    }
}
// END   of touchended function   END

function mouseReleased() {
    // deslected points in Shape 1
    for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
        bez_elmnts_Shape_1[i].selected = false;
    }

    // related to Shape 2, which, if refactoring of Shape 2.1 goes well, may not be needed
    first_pt.selected = false;
    tBs2.cntrl1.selected = false;
    tBs2.cntrl2.selected = false;
    tBs2.anchor.selected = false;
    radius_R2 = tBs2.anchor.radius; // BUT... NO LONGER USING radius_R2
    angle_R2 = tBs2.anchor.angle + k_rotations - (incrementer_base / incrementer1); // BUT... NO LONGER USING angle_R2
    
    tBs2.last.selected = false;
    // END   related to Shape 2, which, if refactoring of Shape 2.1 goes well, may not be needed  END
    
    // deslected points in Shape 2.1
    for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
        bez_elmnts_Shape_2[i].selected = false;
    }

    // deslected points in Shape 3
    for (var i = 0; i < square_points.length; i++) {
        square_points[i].selected = false;
    }

    // deselect HANDLES for Shape 4
    for (var i = 0; i < bspline_handles.length; i++) {
        bspline_handles[i].selected = false;
    }
//    calculate_bspline_points();   // no need here; the draw loop continuously calls this function
}

function report_on_things(){
    console.log("theta_bspline");
    console.log(theta_bspline);
}

function pause_toggle(){
    document.getElementById('pause_resume_btn').blur();
	if(loop_status){
		loop_status = false;
        document.getElementById('pause_resume_btn').innerHTML="resume";
        // if(i_feel_love_song.playing){
        //     i_feel_love_song.pause();
        // }
        return false;
	}
    
    if(!loop_status) {
		loop_status = true;
        document.getElementById('pause_resume_btn').innerHTML="pause";
        // var is_song_playing = i_feel_love_song.playing();
        // if(i_feel_love_checkbox && laser_light_show && !is_song_playing){
        //     i_feel_love_song.play();
        // }
        return false;
	}
}

//  FOR LEARNING HOW OBJECTS WORK    
//    var keys = Object.keys(tBs2);
//    var values = Object.values(tBs2);
//    console.log('the keys in tBs2: ' + keys);
//    console.log('the values in tBs2: ' + values);
//    dashedLine();
//    var specifickey1 = Object.keys(tBs2.cntrl1);
//    var specificvalue1 = Object.values(tBs2.cntrl1);
//    console.log('the keys in tBs2.cntrl1: ' + specifickey1);
//    console.log('the values in tBs2.cntrl1: ' + specificvalue1);
//    dashedLine();
//    console.log('typeOf tBs2.cntrl1: ' + typeof tBs2.cntrl1);
//    dashedLine();
//    var specifickey2 = Object.keys(tBs2.cntrl1['xpos']);
//    var specificvalue2 = tBs2.cntrl1['xpos'];
//    console.log('the keys in tBs2.cntrl1.xpos: ' + specifickey2);
//    console.log('the values in tBs2.cntrl1.xpos: ' + specificvalue2);

//var tBs2size = Object.keys(tBs2).length;
//console.log('the number of keys in tBs2 = ' + tBs2size);
//console.log('here are the properties in tBs2.cntrl1');
//for (var property in tBs2.cntrl1) {
//    if (tBs2.cntrl1.hasOwnProperty(property)) {
//        console.log(property + ': ' + tBs2.cntrl1[property]);
//    }        
//}
//  END     FOR LEARNING HOW OBJECTS WORK    END

// angle = atan2(y2 - y1, x2 - x1) * 180 / PI
// x = radius *  cos(angle)
// y = radius *  sin(angle)

function draw(){

    r_spiro = parseInt(r_spiro);
    point_on_small_r = parseInt(point_on_small_r);

//    console.log(tBs2.cntrl1.radius);
    // IF NOT DRAWING, SHOW THE BEZIER CONTROL POINTS AND OUTLINE
    translate(canvas_c_x,canvas_c_y);  // if we DON'T translate here, mouse over works, but everything is off canvas up and to the left by 540 pixels

//      HYPNOTIC ROTATATION
    
    incrementer1 = speed1;
    incrementer2 = speed2;
    animating0 = document.getElementById('anim0').checked;
    animating_1st_obj_3rd_index = document.getElementById('anim1st_3rd').checked;
    animating1 = document.getElementById('anim1').checked;
    animating2_pt_1 = document.getElementById('anim2_pt_1').checked;
    animating2_anchor = document.getElementById('anim2_anchor').checked;
    animating2_cntrl_1 = document.getElementById('anim2_cntrl_1').checked;
    animating3_0 = document.getElementById('anim3_0').checked;
    animating3_1 = document.getElementById('anim3_1').checked;
    animating3_2 = document.getElementById('anim3_2').checked;
    animating4_0 = document.getElementById('anim4_0').checked;
    animating4_1 = document.getElementById('anim4_1').checked;
    animating4_2 = document.getElementById('anim4_2').checked;
    laser_light_show = document.getElementById('laser_light_show').checked;
    laser_strength = parseInt(41 - document.getElementById('slider_laser_strength').value);
    // i_feel_love_checkbox = document.getElementById('i_feel_love_checkbox').checked;
    if(!animating2_anchor){
        anim2_anchor_is_animating = false;
        anim2_anchor_loop_count = 0;
    };
    show_shape_1 = document.getElementById('shape1').checked;
    show_shape_2 = document.getElementById('shape2').checked;
    show_shape_3 = document.getElementById('shape3').checked;
    show_shape_4 = document.getElementById('shape4').checked;
//    handle_viz = document.getElementById('handle_vis').checked;
//    outline_viz = document.getElementById('outline_viz').checked;
    handle_outline_viz = document.getElementById('handle_outline_viz').checked;
    draw_grid = document.getElementById('draw_grid').checked;
    
    lines1 = document.getElementById('lines1').checked;
    lines2 = document.getElementById('lines2').checked;
    lines3 = document.getElementById('lines3').checked;
    lines4 = document.getElementById('lines4').checked;
    
    bilateral_1 = document.getElementById('bilateral_1').checked;
    bilateral_2 = document.getElementById('bilateral_2').checked;
    bilateral_3 = document.getElementById('bilateral_3').checked;
    bilateral_4 = document.getElementById('bilateral_4').checked;
    
    half_grid_unit = document.getElementById('slider_shape_repeats').value/2;
    
//    speed_spiro = document.getElementById('speed_spiro').value;
    r_spiro = document.getElementById('slider_rot_rad').value;
    point_on_small_r = document.getElementById('slider_point_rad').value;
    
    spiro_option = document.getElementById('spiro_option').checked;  // allow user to make that choice
//    spiro_option = true;  // if you don't want the user to have that choice
    epitro_radio = document.getElementById('epitro_radio').checked;
    hypotro_radio = document.getElementById('hypotro_radio').checked;    
    
    grid_a = Math.PI/half_grid_unit;

//    bez_elmnts_Shape_1[0].xpos = bez_elmnts_Shape_1[0].xpos + Math.cos(osscilator_1); // oscillates from current position

    if(need_anim1_params){
//        console.log('inside draw(), need_anim1_params was true, so I got them')
        get_animate_1_params(); // RIGHT NOW REALLY ONLY AFFECTING shape 1, shape 2 UPDATES IN THE OBJECT
        tBs2.anchor.update_radius_angle(tBs2.anchor.xpos,tBs2.anchor.ypos);
        need_anim1_params = false;
//        console.log('need_anim1_params is now false');
//        dashedLine();
    }

// ANIMATING THE POINTS

    if(animating0 && loop_status){ // Shape 1 first point animation

        if(osscilator_1 == 0){
            startx0_0 = bez_elmnts_Shape_1[0].xpos;
        }        
        
        if(spiro_option){
            if(epitro_radio){
                // NOW LET'S TRY IT WITH A FUNCTION
//                [bez_elmnts_Shape_1[0].xpos, bez_elmnts_Shape_1[0].ypos] = epiTrochoid(bez_elmnts_Shape_1[0].radius);
                // OMFG IT WORKED AND THIS IS THE FIRST TIME I'VE USED ES6 ('destructured array')
                // the function idea was lovely, but multiple points were calling the same function, and it sped up the spiro too much. Each point needs its own calculations (I think).
                bez_elmnts_Shape_1[0].xpos = (bez_elmnts_Shape_1[0].radius + r_spiro) * Math.cos(theta_1_1) - (point_on_small_r * Math.cos(((bez_elmnts_Shape_1[0].radius + r_spiro)/r_spiro) * theta_1_1));
                bez_elmnts_Shape_1[0].ypos = (bez_elmnts_Shape_1[0].radius + r_spiro) * Math.sin(theta_1_1) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_1[0].radius + r_spiro)/r_spiro) * theta_1_1));
                theta_1_1 += (2*Math.PI)/speed_spiro;
            } else {
                // hypotrochoid
                bez_elmnts_Shape_1[0].xpos = (bez_elmnts_Shape_1[0].radius - r_spiro) * Math.cos(theta_1_1) + (point_on_small_r * Math.cos(((bez_elmnts_Shape_1[0].radius - r_spiro)/r_spiro) * theta_1_1));
                bez_elmnts_Shape_1[0].ypos = (bez_elmnts_Shape_1[0].radius - r_spiro) * Math.sin(theta_1_1) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_1[0].radius - r_spiro)/r_spiro) * theta_1_1));
                theta_1_1 += (2*Math.PI)/speed_spiro;
            }
        } else {
            // ***************************
            // "NORMAL" animation equation
            bez_elmnts_Shape_1[0].xpos = startx0_0 * Math.cos(osscilator_1); // IT WORKS!
            // ***************************
        }
        osscilator_1 += ((2 * Math.PI) / (incrementer_base / incrementer1) );
    } else {
        startx0_0 = bez_elmnts_Shape_1[0].xpos;
        osscilator_1 = 0;
    } //  END  Shape 1 first point animation  END

    if(animating_1st_obj_3rd_index && loop_status){ // Shape 1 midpoint
        
        bez_elmnts_Shape_1[3].xpos = bez_elmnts_Shape_1[3].radius * Math.cos(bez_elmnts_Shape_1[3].angle); // based on self updating
        bez_elmnts_Shape_1[3].ypos = bez_elmnts_Shape_1[3].radius * Math.sin(bez_elmnts_Shape_1[3].angle); // 
        bez_elmnts_Shape_1[3].angle -= ((2 * Math.PI) / (incrementer_base / incrementer2)); //
    } //  END  shape 1 midpoint animation  END
    
    if(animating1 && loop_status){ // Shape 1 inner point

        bez_elmnts_Shape_1[6].xpos = bez_elmnts_Shape_1[6].radius * Math.cos(bez_elmnts_Shape_1[6].angle); // based on self updating
        bez_elmnts_Shape_1[6].ypos = bez_elmnts_Shape_1[6].radius * Math.sin(bez_elmnts_Shape_1[6].angle); // 
        bez_elmnts_Shape_1[6].angle += ((2 * Math.PI) / (incrementer_base / incrementer1)); // based on self updating
    } //  END  Shape 1 inner point animation  END
    
    // Animating some points on Shape 2, which, if refactor of Shape 2.1 goes well, won't be needed
    // animating2_pt_1 IS THE FIRST POINT ON Shape 2, called 'Point 1' in the UI
//     if(animating2_pt_1 && loop_status){
//         first_pt.angle += ((2 * Math.PI) / (incrementer_base / incrementer1)); // when radius & angle are retrieved from the object
        
//         if(spiro_option){
//             if(epitro_radio){
//                 first_pt.xpos = (first_pt.radius + r_spiro) * Math.cos(delta_2_1) - (point_on_small_r * Math.cos(((first_pt.radius + r_spiro)/r_spiro) * delta_2_1));
//                 first_pt.ypos = (first_pt.radius + r_spiro) * Math.sin(delta_2_1) - (point_on_small_r * Math.sin(((first_pt.radius + r_spiro)/r_spiro) * delta_2_1));
//                 delta_2_1 += (2*Math.PI)/speed_spiro; // +=, for clockwise direction
//             } else {
//                 // hypotrochoid
//                 first_pt.xpos = (first_pt.radius - r_spiro) * Math.cos(delta_2_1) + (point_on_small_r * Math.cos(((first_pt.radius - r_spiro)/r_spiro) * delta_2_1));
//                 first_pt.ypos = (first_pt.radius - r_spiro) * Math.sin(delta_2_1) - (point_on_small_r * Math.sin(((first_pt.radius - r_spiro)/r_spiro) * delta_2_1));
//                 delta_2_1 += (2*Math.PI)/speed_spiro; // +=, for clockwise direction
//             }
//         } else {
//             // ***************************
//             // "NORMAL" animation equation
//             first_pt['xpos'] = first_pt.radius * Math.cos(first_pt.angle); // when radius & angle are retrieved from the object
//             first_pt['ypos'] = first_pt.radius * Math.sin(first_pt.angle);
//             // ***************************
//         }
                
//     }  // END     if(animating2_first_pt && loop_status)     END
    
//     // animating2_cntrl_1 IS THE FIRST CONTROL POINT ON Shape 2, called 'Handle 1' in the UI
//     if(animating2_cntrl_1 && loop_status){
//         tBs2.cntrl1.angle += ((2 * Math.PI) / (incrementer_base / incrementer1)); // when radius & angle are retrieved from the object
        
//         if(spiro_option){
//             if(epitro_radio){
//                 tBs2.cntrl1.xpos = (tBs2.cntrl1.radius + r_spiro) * Math.cos(gamma_2_1) - (point_on_small_r * Math.cos(((tBs2.cntrl1.radius + r_spiro)/r_spiro) * gamma_2_1));
//                 tBs2.cntrl1.ypos = (tBs2.cntrl1.radius + r_spiro) * Math.sin(gamma_2_1) - (point_on_small_r * Math.sin(((tBs2.cntrl1.radius + r_spiro)/r_spiro) * gamma_2_1));
//                 gamma_2_1 -= (2*Math.PI)/speed_spiro; // -=, for counter clockwise direction
//             } else {
//                 // hypotrochoid function call goes here
// //                [square_points[0].xpos, square_points[0].ypos] = hypoTrochoid(square_points[0].radius);
//                 tBs2.cntrl1.xpos = (tBs2.cntrl1.radius - r_spiro) * Math.cos(gamma_2_1) + (point_on_small_r * Math.cos(((tBs2.cntrl1.radius - r_spiro)/r_spiro) * gamma_2_1));
//                 tBs2.cntrl1.ypos = (tBs2.cntrl1.radius - r_spiro) * Math.sin(gamma_2_1) - (point_on_small_r * Math.sin(((tBs2.cntrl1.radius - r_spiro)/r_spiro) * gamma_2_1));
//                 gamma_2_1 -= (2*Math.PI)/speed_spiro; // -=, for counter clockwise direction
//             }
//         } else {
//             // ***************************
//             // "NORMAL" animation equation
//             tBs2.cntrl1['xpos'] = tBs2.cntrl1.radius * Math.cos(tBs2.cntrl1.angle); // when radius & angle are retrieved from the object
//             tBs2.cntrl1['ypos'] = tBs2.cntrl1.radius * Math.sin(tBs2.cntrl1.angle); // 
//             // ***************************
//         }
                
//     }  // END     if(animating2_cntrl_1 && loop_status)     END
    
//     // animating2_anchor IS THE OUTER MOST POINT on Shape 2
//     if(animating2_anchor && loop_status){
//         if(anim2_anchor_loop_count == 0){
// //            console.log('anim2_anchor loop started');
// //            console.log('anchor.angle = ' + tBs2.anchor.angle);
//             anim2_anchor_loop_count = 1;
//         }
// //        tBs2.anchor['xpos'] = radius_R2 * Math.cos(angle_R2); // when radius & angle are calculated ahead of time
// //        tBs2.anchor['ypos'] = radius_R2 * Math.sin(angle_R2); // tried to use get_animate_1_params to update, but the x & y coordinates always jumped
//     tBs2.anchor.angle -= ((2 * Math.PI) / (incrementer_base / incrementer2)); // when radius & angle are retrieved from the object
                
//         if(spiro_option){
//             if(epitro_radio){
//                 tBs2.anchor.xpos = (tBs2.anchor.radius + r_spiro) * Math.cos(theta_2_2) - (point_on_small_r * Math.cos(((tBs2.anchor.radius + r_spiro)/r_spiro) * theta_2_2));
//                 tBs2.anchor.ypos = (tBs2.anchor.radius + r_spiro) * Math.sin(theta_2_2) - (point_on_small_r * Math.sin(((tBs2.anchor.radius + r_spiro)/r_spiro) * theta_2_2));
//                 theta_2_2 += (2*Math.PI)/speed_spiro;
//             } else {
//                 tBs2.anchor.xpos = (tBs2.anchor.radius - r_spiro) * Math.cos(theta_2_2) + (point_on_small_r * Math.cos(((tBs2.anchor.radius - r_spiro)/r_spiro) * theta_2_2));
//                 tBs2.anchor.ypos = (tBs2.anchor.radius - r_spiro) * Math.sin(theta_2_2) - (point_on_small_r * Math.sin(((tBs2.anchor.radius - r_spiro)/r_spiro) * theta_2_2));
//                 theta_2_2 += (2*Math.PI)/speed_spiro;
//             }
//         } else {
//             // ***************************
//             // "NORMAL" animation equation
//             tBs2.anchor['xpos'] = tBs2.anchor.radius * Math.cos(tBs2.anchor.angle); // when radius & angle are retrieved from the object
//             tBs2.anchor['ypos'] = tBs2.anchor.radius * Math.sin(tBs2.anchor.angle); // 
//             // ***************************
//         }
                
//         if(anim2_anchor_loop_count == 1){
// //            console.log('anim2_anchor loop went once');
// //            console.log('now anchor.angle = ' + tBs2.anchor.angle);
//             anim2_anchor_loop_count = 2;
//         }
//     }  // END     if(animating2_anchor && loop_status)     END
    //   END   Animating some points on Shape 2, which, if refactor of Shape 2.1 goes well, won't be needed

    // **************************
    // **  Refactor Shape 2.1  **
    // **************************
    // animating2_pt_1 IS THE FIRST POINT ON Shape 2.1, called 'Point 1' in the UI
    if(animating2_pt_1 && loop_status){
        bez_elmnts_Shape_2[0].angle += ((2 * Math.PI) / (incrementer_base / incrementer1)); // when radius & angle are retrieved from the object
        
        if(spiro_option){
            if(epitro_radio){
                bez_elmnts_Shape_2[0].xpos = (bez_elmnts_Shape_2[0].radius + r_spiro) * Math.cos(delta_2_1) - (point_on_small_r * Math.cos(((bez_elmnts_Shape_2[0].radius + r_spiro)/r_spiro) * delta_2_1));
                bez_elmnts_Shape_2[0].ypos = (bez_elmnts_Shape_2[0].radius + r_spiro) * Math.sin(delta_2_1) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_2[0].radius + r_spiro)/r_spiro) * delta_2_1));
                delta_2_1 += (2*Math.PI)/speed_spiro; // +=, for clockwise direction
            } else {
                // hypotrochoid
                bez_elmnts_Shape_2[0].xpos = (bez_elmnts_Shape_2[0].radius - r_spiro) * Math.cos(delta_2_1) + (point_on_small_r * Math.cos(((bez_elmnts_Shape_2[0].radius - r_spiro)/r_spiro) * delta_2_1));
                bez_elmnts_Shape_2[0].ypos = (bez_elmnts_Shape_2[0].radius - r_spiro) * Math.sin(delta_2_1) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_2[0].radius - r_spiro)/r_spiro) * delta_2_1));
                delta_2_1 += (2*Math.PI)/speed_spiro; // +=, for clockwise direction
            }
        } else {
            // ***************************
            // "NORMAL" animation equation
            bez_elmnts_Shape_2[0]['xpos'] = bez_elmnts_Shape_2[0].radius * Math.cos(bez_elmnts_Shape_2[0].angle); // when radius & angle are retrieved from the object
            bez_elmnts_Shape_2[0]['ypos'] = bez_elmnts_Shape_2[0].radius * Math.sin(bez_elmnts_Shape_2[0].angle);
            // ***************************
        }
                
    }  // END     if(animating2_first_pt && loop_status)     END
    
    // animating2_cntrl_1 IS THE FIRST CONTROL POINT ON Shape 2.1, called 'Handle 1' in the UI
    if(animating2_cntrl_1 && loop_status){
        bez_elmnts_Shape_2[1].angle += ((2 * Math.PI) / (incrementer_base / incrementer1)); // when radius & angle are retrieved from the object
        
        if(spiro_option){
            if(epitro_radio){
                bez_elmnts_Shape_2[1].xpos = (bez_elmnts_Shape_2[1].radius + r_spiro) * Math.cos(gamma_2_1) - (point_on_small_r * Math.cos(((bez_elmnts_Shape_2[1].radius + r_spiro)/r_spiro) * gamma_2_1));
                bez_elmnts_Shape_2[1].ypos = (bez_elmnts_Shape_2[1].radius + r_spiro) * Math.sin(gamma_2_1) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_2[1].radius + r_spiro)/r_spiro) * gamma_2_1));
                gamma_2_1 -= (2*Math.PI)/speed_spiro; // -=, for counter clockwise direction
            } else {
                // hypotrochoid function call goes here
//                [square_points[0].xpos, square_points[0].ypos] = hypoTrochoid(square_points[0].radius);
                bez_elmnts_Shape_2[1].xpos = (bez_elmnts_Shape_2[1].radius - r_spiro) * Math.cos(gamma_2_1) + (point_on_small_r * Math.cos(((bez_elmnts_Shape_2[1].radius - r_spiro)/r_spiro) * gamma_2_1));
                bez_elmnts_Shape_2[1].ypos = (bez_elmnts_Shape_2[1].radius - r_spiro) * Math.sin(gamma_2_1) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_2[1].radius - r_spiro)/r_spiro) * gamma_2_1));
                gamma_2_1 -= (2*Math.PI)/speed_spiro; // -=, for counter clockwise direction
            }
        } else {
            // ***************************
            // "NORMAL" animation equation
            bez_elmnts_Shape_2[1].xpos = bez_elmnts_Shape_2[1].radius * Math.cos(bez_elmnts_Shape_2[1].angle); // when radius & angle are retrieved from the object
            bez_elmnts_Shape_2[1].ypos = bez_elmnts_Shape_2[1].radius * Math.sin(bez_elmnts_Shape_2[1].angle); // 
            // ***************************
        }
                
    }  // END     if(animating2_cntrl_1 && loop_status)     END
    
    // animating2_anchor IS THE OUTER MOST POINT on Shape 2.1
    if(animating2_anchor && loop_status){
        if(anim2_anchor_loop_count == 0){
            anim2_anchor_loop_count = 1;
        }
    bez_elmnts_Shape_2[3].angle -= ((2 * Math.PI) / (incrementer_base / incrementer2)); // when radius & angle are retrieved from the object
                
        if(spiro_option){
            if(epitro_radio){
                bez_elmnts_Shape_2[3].xpos = (bez_elmnts_Shape_2[3].radius + r_spiro) * Math.cos(theta_2_2) - (point_on_small_r * Math.cos(((bez_elmnts_Shape_2[3].radius + r_spiro)/r_spiro) * theta_2_2));
                bez_elmnts_Shape_2[3].ypos = (bez_elmnts_Shape_2[3].radius + r_spiro) * Math.sin(theta_2_2) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_2[3].radius + r_spiro)/r_spiro) * theta_2_2));
                theta_2_2 += (2*Math.PI)/speed_spiro;
            } else {
                bez_elmnts_Shape_2[3].xpos = (bez_elmnts_Shape_2[3].radius - r_spiro) * Math.cos(theta_2_2) + (point_on_small_r * Math.cos(((bez_elmnts_Shape_2[3].radius - r_spiro)/r_spiro) * theta_2_2));
                bez_elmnts_Shape_2[3].ypos = (bez_elmnts_Shape_2[3].radius - r_spiro) * Math.sin(theta_2_2) - (point_on_small_r * Math.sin(((bez_elmnts_Shape_2[3].radius - r_spiro)/r_spiro) * theta_2_2));
                theta_2_2 += (2*Math.PI)/speed_spiro;
            }
        } else {
            // ***************************
            // "NORMAL" animation equation
            bez_elmnts_Shape_2[3].xpos = bez_elmnts_Shape_2[3].radius * Math.cos(bez_elmnts_Shape_2[3].angle); // when radius & angle are retrieved from the object
            bez_elmnts_Shape_2[3].ypos = bez_elmnts_Shape_2[3].radius * Math.sin(bez_elmnts_Shape_2[3].angle); // 
            // ***************************
        }
                
        if(anim2_anchor_loop_count == 1){
//            console.log('anim2_anchor loop went once');
//            console.log('now anchor.angle = ' + bez_elmnts_Shape_2[3].angle);
            anim2_anchor_loop_count = 2;
        }
    }  // END     if(animating2_anchor && loop_status)     END
    // ********************************
    // **  END   Refactor Shape 2.1  **
    // ********************************

    if(animating3_0 && loop_status){ // Shape 3, 1st point

        if(osscilator_3 == 0){
            startx3_0 = square_points[0].xpos;
        }

        if(spiro_option){
            if(epitro_radio){
                square_points[0].xpos = (square_points[0].radius + r_spiro) * Math.cos(theta_3_1) - (point_on_small_r * Math.cos(((square_points[0].radius + r_spiro)/r_spiro) * theta_3_1));
                square_points[0].ypos = (square_points[0].radius + r_spiro) * Math.sin(theta_3_1) - (point_on_small_r * Math.sin(((square_points[0].radius + r_spiro)/r_spiro) * theta_3_1));
                theta_3_1 += (2*Math.PI)/speed_spiro;
            } else {
                square_points[0].xpos = (square_points[0].radius - r_spiro) * Math.cos(theta_3_1) + (point_on_small_r * Math.cos(((square_points[0].radius - r_spiro)/r_spiro) * theta_3_1));
                square_points[0].ypos = (square_points[0].radius - r_spiro) * Math.sin(theta_3_1) - (point_on_small_r * Math.sin(((square_points[0].radius - r_spiro)/r_spiro) * theta_3_1));
                theta_3_1 += (2*Math.PI)/speed_spiro;
            }
        } else {
            // ***************************
            // "NORMAL" animation equation
            square_points[0].xpos = startx3_0 * Math.cos(osscilator_3); // IT WORKS!
            // ***************************
        }
        osscilator_3 += ((2 * Math.PI) / (incrementer_base / incrementer2) );
    } else {
        startx3_0 = square_points[0].xpos;
        osscilator_3 = 0;
    } //  END   if(animating3_0 && loop_status)    END

    
    if(animating3_1 && loop_status){ // Shape 3 point with index = 1 (2nd point)
        square_points[1].xpos = square_points[1].radius * Math.cos(square_points[1].angle);
        square_points[1].ypos = square_points[1].radius * Math.sin(square_points[1].angle);
        square_points[1].angle -= ((2 * Math.PI) / (incrementer_base / incrementer1));
    }
    
    if(animating3_2 && loop_status){ // Shape 3 point with index = 2 (3rd point)
        
        if(spiro_option){
            if(epitro_radio){
                square_points[2].xpos = (square_points[2].radius + r_spiro) * Math.cos(gamma_3_3) - (point_on_small_r * Math.cos(((square_points[2].radius + r_spiro)/r_spiro) * gamma_3_3));
                square_points[2].ypos = (square_points[2].radius + r_spiro) * Math.sin(gamma_3_3) - (point_on_small_r * Math.sin(((square_points[2].radius + r_spiro)/r_spiro) * gamma_3_3));
                gamma_3_3 -= (2*Math.PI)/speed_spiro; // -=, for counter clockwise direction
            } else {
                // hypotrochoid function call goes here
                square_points[2].xpos = (square_points[2].radius - r_spiro) * Math.cos(gamma_3_3) + (point_on_small_r * Math.cos(((square_points[2].radius - r_spiro)/r_spiro) * gamma_3_3));
                square_points[2].ypos = (square_points[2].radius - r_spiro) * Math.sin(gamma_3_3) - (point_on_small_r * Math.sin(((square_points[2].radius - r_spiro)/r_spiro) * gamma_3_3));
                gamma_3_3 -= (2*Math.PI)/speed_spiro; // -=, for counter clockwise direction
            }
        } else {
            // ***************************
            // "NORMAL" animation equations
            square_points[2].xpos = square_points[2].radius * Math.cos(square_points[2].angle); // based on self updating
            square_points[2].ypos = square_points[2].radius * Math.sin(square_points[2].angle); // 
            square_points[2].angle -= ((2 * Math.PI) / (incrementer_base / incrementer1)); //
            // ***************************
        }
    } // END   Shape 3 point with index = 2 (3rd point) animation   END

    // if statements that animate points in Shape 4, indexes of 1,3,5
    // Points, index of 1 and 5 are not affected by the Spiro option; if you want them to be, see the if(spiro_option) inside if(animating4_1 && loop_status)
    
    if(animating4_0 && loop_status){
        theta_bspline += ((2 * Math.PI) / (incrementer_base / incrementer1));            
    }

    if(animating4_1 && loop_status){
        if(spiro_option){
            gamma_bspline += (2*Math.PI)/speed_spiro;  // 
        } else {
            gamma_bspline += ((2 * Math.PI) / (incrementer_base / incrementer1));
        }
    }

    if(animating4_2 && loop_status){
        petri_bspline -= ((2 * Math.PI) / (incrementer_base / incrementer2));
    }

    // because the Handles for Shape 4 are copies of the points, we need to update the Handles AND Original Points x,y
    if(loop_status){
        for(i=0;i<bspline_handles.length;i++){
            bspline_handles[i].xpos = bspline_points[i].x;
            bs_o_p[i].x = bspline_points[i].x;
            bspline_handles[i].ypos = bspline_points[i].y;
            bs_o_p[i].y = bspline_points[i].y;
        }
    }
//    
//    // because the Handles for Shape 4 are copies of the points, we need to update the Handles AND Original Points x,y, BUT only for the points that animate, otherwise, Handles can only be moved after clicking the Pause button. To achieve this, i=1;..;i+=2 because only points at index 1,3,5 animate
//    if(loop_status && animating4_0 || animating4_1 || animating4_2){
//        for(i=1;i<bspline_handles.length;i+=2){
//            bspline_handles[i].xpos = bspline_points[i].x;
//            bs_o_p[i].x = bspline_points[i].x;
//            bspline_handles[i].ypos = bspline_points[i].y;
//            bs_o_p[i].y = bspline_points[i].y;
//        }
//    }
//    // sort of worked, but brought back the 'diagonal only' problem
    
//    // actually, this is making the original points match the handles, not the other way around
//    if(loop_status){
//        for(i=0;i<bspline_handles.length;i++){
//            bs_o_p[i].x = bspline_handles[i].xpos;
//            bs_o_p[i].y = bspline_handles[i].ypos;
//        }
//    }
//    // NOPE    
    
// END  ANIMATING THE POINTS   
    
    // END      HYPNOTIC ROTATATION     END

// This is the Main Drawing Code

    k_repeats = document.getElementById('slider_shape_repeats').value;
        
        if(laser_light_show){
//            background(0,0,0,15); // forces background to be solid black, cause that's best for a laser light show!
//            background(red_bkgrnd, grn_bkgrnd, blu_bkgrnd,15); // uses background color, but 'ghosted' so you get laser light trails
            background(red_bkgrnd, grn_bkgrnd, blu_bkgrnd,laser_strength); // uses background color, but 'ghosted' so you get laser light trails
        } else {
            background(red_bkgrnd, grn_bkgrnd, blu_bkgrnd);
        }
        // testing touch event detection. Relies on p5js
        // textSize(32);
        // fill(150, 150, 153);
        // noStroke();
        // let display = touches.length + ' touches';
        // text(display, canvas_c_x - 200, -canvas_c_y + 50);
        // if(touches.length > 0){
            // console.log(touches[0].x - canvas_c_x);
        // }
    
    
    if(draw_grid){
        
        // ORIGIN_TEST
        // draw circle at canvas origin
        fill('rgb(61, 83, 255)');
        noStroke();
        circle(0,0,10);
        // draw a grid over canvas
        stroke('rgba(61, 83, 255, 0.66)');
        strokeWeight(1);
        var grid_spacing = 100;
        for(i=0;i<8;i+=1){
            line(-grid_spacing * i,-canvas_c_y, -grid_spacing * i,canvas_c_y); // vertical lines, L of center
            line(grid_spacing * i,-canvas_c_y, grid_spacing * i,canvas_c_y); // vertical lines, R of center
            line(-canvas_c_x,-grid_spacing * i,canvas_c_x, -grid_spacing * i); // horizontal lines, above center
            line(-canvas_c_x, grid_spacing * i,canvas_c_x,  grid_spacing * i); // horizontal lines, below center
        }
    }
    

////// HANDLES_TEST    
//////    THIS CODE PRINTS VALUES TO THE CANVAS
//    fill('white');
//    noStroke();
//    textSize(16);
//    var text_offset_v = 70;
//    var text_x = 400;
//    var text_x_col_offset = 100;
//    
//    text('HANDLE',text_x,-canvas_c_y+(text_offset_v*.35));
//    text('BS_O_P',text_x + text_x_col_offset,-canvas_c_y+(text_offset_v*.35));
//    text('BSPLINE',text_x + (text_x_col_offset * 2),-canvas_c_y+(text_offset_v*.35));
//    text('RADIUS',text_x + (text_x_col_offset * 2),-canvas_c_y+(text_offset_v*.35));
//    
//    for(i=0;i<bspline_handles.length;i++){
//        text('bspline_handle index ' + i, 200,-canvas_c_y+text_offset_v+(i*60));
//        text('x  =  ' + Math.round(bspline_handles[i].xpos), text_x,-canvas_c_y+text_offset_v+(i*60));
//        text('y  =  ' + Math.round(bspline_handles[i].ypos), text_x,-canvas_c_y+text_offset_v+(i*60)+20);
//    }
//    for(i=0;i<bs_o_p.length;i++){
//        text('x  =  ' + Math.round(bs_o_p[i].x), text_x + text_x_col_offset,-canvas_c_y+text_offset_v+(i*60));
//        text('y  =  ' + Math.round(bs_o_p[i].y), text_x + text_x_col_offset,-canvas_c_y+text_offset_v+(i*60)+20);
//    }
//    for(i=0;i<bs_o_p.length;i++){
//        text('x  =  ' + Math.round(bspline_points[i].x), text_x + (text_x_col_offset * 2),-canvas_c_y+text_offset_v+(i*60));
//        text('y  =  ' + Math.round(bspline_points[i].y), text_x + (text_x_col_offset * 2),-canvas_c_y+text_offset_v+(i*60)+20);
//    }
//        text('speed_spiro  =  ' + Math.round(speed_spiro), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (1*60));
//        text('r_spiro  =  ' + Math.round(r_spiro), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (3*60));
//        text('point_on_small_r  =  ' + Math.round(point_on_small_r), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (5*60));
//        text('tBs2.cntrl1.radius  =  ' + Math.round(tBs2.cntrl1.radius), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (6*60));
//        text('tBs2.cntrl1.radius + r_spiro =  ' + Math.round(tBs2.cntrl1.radius + r_spiro), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (6.5*60));
//        text('bspline_r_3  =  ' + Math.round(bspline_r_3), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (7*60));
//        text('bspline_r_3 + r_spiro  =  ' + Math.round(bspline_r_3 + r_spiro), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (7.5*60));
////        text('bspline_r_5  =  ' + Math.round(bspline_r_5), text_x + (text_x_col_offset * 3),-canvas_c_y+text_offset_v + (7*60));
////// end   HANDLES_TEST    

    
        x_spiro = (R_spiro + r_spiro) * Math.cos(theta) - (point_on_small_r * Math.cos(((R_spiro + r_spiro)/r_spiro)*theta));  // IT WORKS! FROM https://en.wikipedia.org/wiki/Epitrochoid
        y_spiro = (R_spiro + r_spiro) * Math.sin(theta) - (point_on_small_r * Math.sin(((R_spiro + r_spiro)/r_spiro)*theta));  // but now, I don't think I'm using them
        
        
        if(show_shape_1){
            // KALIEDOSCOPE
            for(var k = 0; k < k_repeats; k++){
                if(k==0 && handle_outline_viz){
                    if(bkgrnd_luminance >= 12){
                        stroke(color('rgba(0, 0, 0, 0.76)'));
                    } else {
                        stroke(color('rgba(255, 255, 255, 0.76)'));
                    }
                    strokeWeight(1);
                    } else {
                        noStroke();
                }

                if(lines1 || laser_light_show){
                    stroke(red_1, grn_1, blu_1, transparency_1);
                    strokeWeight(3);
                    noFill();

                    } else {
                        fill(red_1, grn_1, blu_1, transparency_1);
                }

                // DRAWS Shape 1
                beginShape();
                vertex(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos);
                bezierVertex(bez_elmnts_Shape_1[1].xpos,bez_elmnts_Shape_1[1].ypos,bez_elmnts_Shape_1[2].xpos,bez_elmnts_Shape_1[2].ypos,bez_elmnts_Shape_1[3].xpos,bez_elmnts_Shape_1[3].ypos);	bezierVertex(bez_elmnts_Shape_1[4].xpos,bez_elmnts_Shape_1[4].ypos,bez_elmnts_Shape_1[5].xpos,bez_elmnts_Shape_1[5].ypos,bez_elmnts_Shape_1[6].xpos,bez_elmnts_Shape_1[6].ypos);  
                quadraticVertex(bez_elmnts_Shape_1[6].xpos,bez_elmnts_Shape_1[6].ypos,bez_elmnts_Shape_1[7].xpos,bez_elmnts_Shape_1[7].ypos,bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos);
                endShape();


                // TEST ELLIPSE AS I WORKED OUT THE BUGS FOR BILLATERAL DRAWING
    //            ellipse(bilat_x(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos),bilat_y(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos),50,50);
    //            ellipse(calc_bilat_x(bez_elmnts_Shape_1[0].xpos),calc_bilat_y(bez_elmnts_Shape_1[0].ypos),50,50);
                
                // DRAWS THE BILATERAL EQUIVALENT OF Shape 1
                if(bilateral_1){
                    beginShape();
                    vertex(bilat_x(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos),bilat_y(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos));
                    bezierVertex(bilat_x(bez_elmnts_Shape_1[1].xpos,bez_elmnts_Shape_1[1].ypos),bilat_y(bez_elmnts_Shape_1[1].xpos,bez_elmnts_Shape_1[1].ypos),bilat_x(bez_elmnts_Shape_1[2].xpos,bez_elmnts_Shape_1[2].ypos),bilat_y(bez_elmnts_Shape_1[2].xpos,bez_elmnts_Shape_1[2].ypos),
                    bilat_x(bez_elmnts_Shape_1[3].xpos,bez_elmnts_Shape_1[3].ypos),bilat_y(bez_elmnts_Shape_1[3].xpos,bez_elmnts_Shape_1[3].ypos));
                    bezierVertex(bilat_x(bez_elmnts_Shape_1[4].xpos,bez_elmnts_Shape_1[4].ypos),bilat_y(bez_elmnts_Shape_1[4].xpos,bez_elmnts_Shape_1[4].ypos),bilat_x(bez_elmnts_Shape_1[5].xpos,bez_elmnts_Shape_1[5].ypos),bilat_y(bez_elmnts_Shape_1[5].xpos,bez_elmnts_Shape_1[5].ypos),
                    bilat_x(bez_elmnts_Shape_1[6].xpos,bez_elmnts_Shape_1[6].ypos),bilat_y(bez_elmnts_Shape_1[6].xpos,bez_elmnts_Shape_1[6].ypos));
                    quadraticVertex(bilat_x(bez_elmnts_Shape_1[6].xpos,bez_elmnts_Shape_1[6].ypos),bilat_y(bez_elmnts_Shape_1[6].xpos,bez_elmnts_Shape_1[6].ypos),bilat_x(bez_elmnts_Shape_1[7].xpos,bez_elmnts_Shape_1[7].ypos),bilat_y(bez_elmnts_Shape_1[7].xpos,bez_elmnts_Shape_1[7].ypos),
                    bilat_x(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos),bilat_y(bez_elmnts_Shape_1[0].xpos,bez_elmnts_Shape_1[0].ypos));
                    endShape();                    
                }
                // END    DRAWS THE BILATERAL EQUIVALENT OF Shape 1

                rotate(PI * 2/k_repeats);
            } // END   DRAWS Shape 1    END
        } // END   if(show_shape_1)    END

        
        // code below uses the BEZIER segment CLASS v2

        // DRAWS Shape 2, which, if refactoring of Shape 2.1 goes well, is not needed
        // if(show_shape_2){        
        //     for(var k = 0; k < k_repeats; k++){
        //         if(k==0 && handle_outline_viz){
        //             if(bkgrnd_luminance >= 12){
        //                 stroke(color('rgba(0, 0, 0, 0.76)'));
        //             } else {
        //                 stroke(color('rgba(255, 255, 255, 0.76)'));
        //             }
        //             strokeWeight(1);
        //         } else {
        //             noStroke();
        //         }
        //         if(lines2 || laser_light_show){
        //             stroke(red_2, grn_2, blu_2, transparency_2); 
        //             strokeWeight(3);
        //             noFill();

        //             } else {
        //                 fill(red_2, grn_2, blu_2, transparency_2);
        //         }
        //     // draws 'normal' version
        //         beginShape();
        //         vertex(first_pt['xpos'],first_pt['ypos']);
        //         bezierVertex(tBs2.cntrl1['xpos'],tBs2.cntrl1['ypos'], tBs2.cntrl2['xpos'], tBs2.cntrl2['ypos'], tBs2.anchor['xpos'],tBs2.anchor['ypos']);
        //         bezierVertex(0,85,tBs2.last['xpos'],tBs2.last['ypos'],first_pt['xpos'],first_pt['ypos']);
        //         endShape();
                
        //         // draws bilateral version
        //         if(bilateral_2){
        //             beginShape();
        //             vertex(bilat_x(first_pt['xpos'],first_pt['ypos']),bilat_y(first_pt['xpos'],first_pt['ypos']));
        //             bezierVertex(bilat_x(tBs2.cntrl1['xpos'],tBs2.cntrl1['ypos']),bilat_y(tBs2.cntrl1['xpos'],tBs2.cntrl1['ypos']), bilat_x(tBs2.cntrl2['xpos'],tBs2.cntrl2['ypos']), bilat_y(tBs2.cntrl2['xpos'],tBs2.cntrl2['ypos']), bilat_x(tBs2.anchor['xpos'],tBs2.anchor['ypos']),bilat_y(tBs2.anchor['xpos'],tBs2.anchor['ypos']));
        //             bezierVertex(bilat_x(0,85),bilat_y(0,85),bilat_x(tBs2.last['xpos'],tBs2.last['ypos']),bilat_y(tBs2.last['xpos'],tBs2.last['ypos']),bilat_x(first_pt['xpos'],first_pt['ypos']),bilat_y(first_pt['xpos'],first_pt['ypos']));
        //             endShape();                    
        //         }
                
        //         rotate(PI * 2/k_repeats);
        //     } // END OF for loop THAT REPEATS Shape 2 based on # of repeats
        // } // END OF  DRAWS Shape 2, which, if refactoring of Shape 2.1 goes well, is not needed

        
        
        
        // code below DOES NOT use the BEZIER segment CLASS v2, but instead uses an Array; part of the Refactoring of Shape 2.1

        // DRAWS Shape 2.1
        if(show_shape_2){        
            for(var k = 0; k < k_repeats; k++){
                if(k==0 && handle_outline_viz){
                    if(bkgrnd_luminance >= 12){
                        stroke(color('rgba(0, 0, 0, 0.76)'));
                    } else {
                        stroke(color('rgba(255, 255, 255, 0.76)'));
                    }
                    strokeWeight(1);
                } else {
                    noStroke();
                }
                if(lines2 || laser_light_show){
                    stroke(red_2, grn_2, blu_2, transparency_2); 
                    strokeWeight(3);
                    noFill();

                    } else {
                        fill(red_2, grn_2, blu_2, transparency_2); // production code, uncomment when refactor of Shape 2.1 is done
                        // fill(255, 0, 0, transparency_2); // test code, comment out when refactor of Shape 2.1 is done
                }
            // draws 'normal' version
                beginShape();
                // vertex(first_pt['xpos'],first_pt['ypos']);  // from Shape 2
                vertex(bez_elmnts_Shape_2[0].xpos,bez_elmnts_Shape_2[0].ypos); // refactor Shape 2.1
                // bezierVertex(tBs2.cntrl1['xpos'],tBs2.cntrl1['ypos'], tBs2.cntrl2['xpos'], tBs2.cntrl2['ypos'], tBs2.anchor['xpos'],tBs2.anchor['ypos']);  // from Shape 2
                bezierVertex(bez_elmnts_Shape_2[1].xpos,bez_elmnts_Shape_2[1].ypos, bez_elmnts_Shape_2[2].xpos,bez_elmnts_Shape_2[2].ypos, bez_elmnts_Shape_2[3].xpos,bez_elmnts_Shape_2[3].ypos);  // refactor Shape 2.1
                // bezierVertex(0,85,tBs2.last['xpos'],tBs2.last['ypos'],first_pt['xpos'],first_pt['ypos']);  // from Shape 2
                bezierVertex(0,85,bez_elmnts_Shape_2[4].xpos,bez_elmnts_Shape_2[4].ypos,bez_elmnts_Shape_2[0].xpos,bez_elmnts_Shape_2[0].ypos);  //  refactor Shape 2.1
                endShape();
                
                // draws bilateral version
                if(bilateral_2){
                    beginShape();
                    // vertex(bilat_x(first_pt['xpos'],first_pt['ypos']),bilat_y(first_pt['xpos'],first_pt['ypos']));  // from Shape 2
                    vertex(bilat_x(bez_elmnts_Shape_2[0].xpos,bez_elmnts_Shape_2[0].ypos),bilat_y(bez_elmnts_Shape_2[0].xpos,bez_elmnts_Shape_2[0].ypos));  // refactor Shape 2.1
                    // bezierVertex(bilat_x(tBs2.cntrl1['xpos'],tBs2.cntrl1['ypos']),bilat_y(tBs2.cntrl1['xpos'],tBs2.cntrl1['ypos']), bilat_x(tBs2.cntrl2['xpos'],tBs2.cntrl2['ypos']), bilat_y(tBs2.cntrl2['xpos'],tBs2.cntrl2['ypos']), bilat_x(tBs2.anchor['xpos'],tBs2.anchor['ypos']),bilat_y(tBs2.anchor['xpos'],tBs2.anchor['ypos']));  // from Shape 2
                    bezierVertex(bilat_x(bez_elmnts_Shape_2[1].xpos,bez_elmnts_Shape_2[1].ypos),bilat_y(bez_elmnts_Shape_2[1].xpos,bez_elmnts_Shape_2[1].ypos), bilat_x(bez_elmnts_Shape_2[2].xpos,bez_elmnts_Shape_2[2].ypos), bilat_y(bez_elmnts_Shape_2[2].xpos,bez_elmnts_Shape_2[2].ypos), bilat_x(bez_elmnts_Shape_2[3].xpos,bez_elmnts_Shape_2[3].ypos),bilat_y(bez_elmnts_Shape_2[3].xpos,bez_elmnts_Shape_2[3].ypos));  // refactor Shape 2.1
                    // bezierVertex(bilat_x(0,85),bilat_y(0,85),bilat_x(tBs2.last['xpos'],tBs2.last['ypos']),bilat_y(tBs2.last['xpos'],tBs2.last['ypos']),bilat_x(first_pt['xpos'],first_pt['ypos']),bilat_y(first_pt['xpos'],first_pt['ypos'])); // from Shape 2
                    bezierVertex(bilat_x(0,85),bilat_y(0,85),bilat_x(bez_elmnts_Shape_2[4].xpos,bez_elmnts_Shape_2[4].ypos),bilat_y(bez_elmnts_Shape_2[4].xpos,bez_elmnts_Shape_2[4].ypos),bilat_x(bez_elmnts_Shape_2[0].xpos,bez_elmnts_Shape_2[0].ypos),bilat_y(bez_elmnts_Shape_2[0].xpos,bez_elmnts_Shape_2[0].ypos)); // refactor Shape 2.1
                    endShape();                    
                }
                
                rotate(PI * 2/k_repeats);
            } // END OF for loop THAT REPEATS Shape 2.1 based on # of repeats
        } // END OF if THAT DRAWS Shape 2.1
        
        
        
        if(show_shape_3){
        // DRAWS SHAPE 3
            for(var l = 0; l < k_repeats; l++){
                if(l==0 && handle_outline_viz){
                    if(bkgrnd_luminance >= 12){
                        stroke(color('rgba(0, 0, 0, 0.76)'));
                    } else {
                        stroke(color('rgba(255, 255, 255, 0.76)'));
                    }
                    strokeWeight(1);
                    } else {
                        noStroke();
                }

                if(lines3 || laser_light_show){
                    stroke(red_1_square, grn_1_square, blu_1_square, transparency_3);
                    strokeWeight(3);
                    noFill();

                    } else {
                        fill(red_1_square, grn_1_square, blu_1_square, transparency_3);
                }

                beginShape();

                for(s = 0; s < square_points.length; s += 1){
                    vertex(square_points[s].xpos,square_points[s].ypos);    
                }
                endShape(CLOSE);
                
                // draws bilateral version
                if(bilateral_3){
                    beginShape();

                    for(s = 0; s < square_points.length; s += 1){
                        vertex();    
                        vertex(bilat_x(square_points[s].xpos,square_points[s].ypos), bilat_y(square_points[s].xpos,square_points[s].ypos));
                    }
                    endShape(CLOSE);
                }
                                
                rotate(PI * 2/k_repeats);
            }
        } // END of IF that draws Shape 3
        
        if(show_shape_4){
            for(var k = 0; k < k_repeats; k++){
                if(k==0 && handle_outline_viz){
                    if(bkgrnd_luminance >= 12){
                        stroke(color('rgba(0, 0, 0, 0.76)'));
                    } else {
                        stroke(color('rgba(255, 255, 255, 0.76)'));
                    }
                    strokeWeight(1);
                    } else {
                        noStroke();
                }

                if(lines4 || laser_light_show){
                    stroke(red_4, grn_4, blu_4, transparency_4);
                    strokeWeight(3);
                    noFill();

                    } else {
                        fill(red_4, grn_4, blu_4, transparency_4);
                }

                // DRAWS Shape 4
                
                calculate_bspline_points();
//                console.log('triggered calculate_bspline_points, from draw loop');
                const spline = new BSpline(bspline_points);
                spline.bspline_weights = bspline_weights;

                beginShape();
                
                spline.getLUT((bspline_points.length - 3) * 20).forEach(p => vertex(p.x, p.y));
                
                endShape();

                
                // DRAWS THE BILATERAL EQUIVALENT OF Shape 1
                if(bilateral_4){
                    beginShape();
                   
                    spline.getLUT((bspline_points.length - 3) * 20).forEach(p => vertex(bilat_x(p.x,p.y),bilat_y(p.x,p.y)));

                    endShape();                    
                }
                // END    DRAWS THE BILATERAL EQUIVALENT OF Shape 4

                rotate(PI * 2/k_repeats);
            } // END   DRAWS Shape 4    END
        } // END   if(show_shape_4)    END

        
        var reverse_x = radius_R1 * Math.cos(start_angle1 + 0.695);
        var reverse_y = radius_R1 * Math.sin(start_angle1 + 0.698);
        var reverse_angle = Math.atan2(y6 - reverse_y, x6 - reverse_x) * 180 / Math.PI; // correct
//        var reverse_angle = Math.atan2(reverse_y - y6, reverse_x - x6) * 180 / Math.PI; // incorrect
        
        if(handle_outline_viz){
            // SHAPE 1 HANDLES
            if(show_shape_1){
                
                for (var i = 0; i < bez_elmnts_Shape_1.length; i++) {
                    bez_elmnts_Shape_1[i].show_handle(red_1,grn_1,blu_1);
                }        
            }
            // SHAPE 2 HANDLES
            // if(show_shape_2){
            //     first_pt.show_handle(red_2,grn_2,blu_2);
            //     tBs2.cntrl1.show_handle(red_2,grn_2,blu_2);
            //     tBs2.cntrl2.show_handle(red_2,grn_2,blu_2);
            //     tBs2.anchor.show_handle(red_2,grn_2,blu_2);
            //     tBs2.last.show_handle(red_2,grn_2,blu_2);
            // }
            
            // SHAPE 2.1 HANDLES
            if(show_shape_2){
                for (var i = 0; i < bez_elmnts_Shape_2.length; i++) {
                    bez_elmnts_Shape_2[i].show_handle(red_2,grn_2,blu_2); // production code
                    // bez_elmnts_Shape_2[i].show_handle(255,0,0); // test code
                    // textSize(20);
                    // noStroke();
                    // text(i,bez_elmnts_Shape_2[i].xpos+20,bez_elmnts_Shape_2[i].ypos+5); // HANDLES_TEST, but kind of nice so I kept it
                }
            }
            
            // SHAPE 3 HANDLES
            if(show_shape_3){
                for (var i = 0; i < square_points.length; i++) {
                    square_points[i].show_handle(red_1_square,grn_1_square,blu_1_square);
                }
            }
            
            // SHAPE 4 HANDLES
            if(show_shape_4){
                for (var i = 0; i < bspline_handles.length; i++){
                    bspline_handles[i].show_handle(red_4,grn_4,blu_4);
                    // textSize(20);
                    // noStroke();
                    // text(i,bspline_handles[i].xpos+20,bspline_handles[i].ypos+5); // HANDLES_TEST, but kind of nice so I kept it
                }
            }
            
// ATEMPT AT SHOWING THE SPIRO PATH. NOT QUITE ACCURATE
//            if(spiro_option){
//                noFill();
//                circle(0,0,epiT_x * 2);
//                circle(0,0,epiT_y * 2);
//            }
            
        }
// END OF "This is the Main Drawing Code"
}
//  END OF draw FUNCTION


// -----------------------
// BSPLINE FUNCTIONS
// -----------------------

// https://github.com/thibauts/b-spline
function interpolate(t, bspline_degree, bspline_points, bspline_knots, bspline_weights, result, scaled) {
  var i, j, s, l; // function-scoped iteration variables
  var n = bspline_points.length; // bspline_points count
  var d = bspline_points[0].length; // point dimensionality

  if (bspline_degree < 1) throw new Error("bspline_degree must be at least 1 (linear)");
  if (bspline_degree > n - 1) throw new Error("bspline_degree must be less than or equal to point count - 1");

  if (!bspline_weights) {
    // build weight vector of length [n]
    bspline_weights = [];
    for (i = 0; i < n; i++) {
      bspline_weights[i] = 1;
    }
  }

  // closed curve?
  if (bspline_weights.length < bspline_points.length) {
    bspline_weights = bspline_weights.concat(bspline_weights.slice(0, bspline_degree));
  }

  if (!bspline_knots) {
    // build knot vector of length [n + bspline_degree + 1]
    var bspline_knots = [];
    for (i = 0; i < n + bspline_degree + 1; i++) {
      bspline_knots[i] = i;
    }
  } else {
    if (bspline_knots.length !== n + bspline_degree + 1) throw new Error("bad knot vector length");
  }

  // closed curve?
  if (bspline_knots.length === bspline_points.length) {
    bspline_knots = bspline_knots.concat(bspline_knots.slice(0, bspline_degree));
  }

  var domain = [bspline_degree, bspline_knots.length - 1 - bspline_degree];

  var low = bspline_knots[domain[0]];
  var high = bspline_knots[domain[1]];

  // remap t to the domain where the spline is defined
  if (!scaled) {
    t = t * (high - low) + low;
  }

  if (t < low || t > high) throw new Error("out of bounds");

  // find s (the spline segment) for the [t] value provided
  for (s = domain[0]; s < domain[1]; s++) {
    if (t >= bspline_knots[s] && t <= bspline_knots[s + 1]) {
      break;
    }
  }

  // convert points to homogeneous coordinates
  var v = [];
  for (i = 0; i < n; i++) {
    v[i] = [];
    for (j = 0; j < d; j++) {
      v[i][j] = bspline_points[i][j] * bspline_weights[i];
    }
    v[i][d] = bspline_weights[i];
  }

  // l (level) goes from 1 to the curve bspline_degree + 1
  var alpha;
  for (l = 1; l <= bspline_degree + 1; l++) {
    // build level l of the pyramid
    for (i = s; i > s - bspline_degree - 1 + l; i--) {
      alpha = (t - bspline_knots[i]) / (bspline_knots[i + bspline_degree + 1 - l] - bspline_knots[i]);

      // interpolate each component
      for (j = 0; j < d + 1; j++) {
        v[i][j] = (1 - alpha) * v[i - 1][j] + alpha * v[i][j];
      }
    }
  }

  // convert back to cartesian and return
  var result = result || [];
  for (i = 0; i < d; i++) {
    result[i] = v[s][i] / v[s][d];
  }

  return result;
}
// END interpolate function

//BEGIN code from js/graphics-element/api/types/bspline author = Pomax
// cubic B-Spline
const BSPLINE_DEGREE = 3;

//class BSpline {
//  constructor(apiInstance, bspline_points) {
//    this.api = apiInstance;
//    this.ctx = apiInstance.ctx;
//
//    // the spline library needs points in array format [x,y] rather than object format {x:..., y:...}
//    this.bspline_points = bspline_points.map((v) => {
//      if (v instanceof Array) return v;
//      return [v.x, v.y];
//    });
//  }

class BSpline {
  constructor(bspline_points) {

    // the spline library needs points in array format [x,y] rather than object format {x:..., y:...}
    this.bspline_points = bspline_points.map((v) => {
      if (v instanceof Array) return v;
      return [v.x, v.y];
    });
  }

  getLUT(count) {
    let c = count - 1;
    return [...new Array(count)].map((_, i) => {
      let p = interpolate(i / c, BSPLINE_DEGREE, this.bspline_points, this.bspline_knots, this.bspline_weights);
      return { x: p[0], y: p[1] };
    });
  }

  formKnots(open = false) {
    if (!open) return this.formUniformKnots();

    let bspline_knots = [],
      l = this.bspline_points.length,
      m = l - BSPLINE_DEGREE;

    // form the open-uniform knot vector
    for (let i = 1; i < l - BSPLINE_DEGREE; i++) {
      bspline_knots.push(i + BSPLINE_DEGREE);
    }
    // add [degree] zeroes at the front
    for (let i = 0; i <= BSPLINE_DEGREE; i++) {
      bspline_knots = [BSPLINE_DEGREE].concat(bspline_knots);
    }
    // add [degree] max-values to the back
    for (let i = 0; i <= BSPLINE_DEGREE; i++) {
      bspline_knots.push(m + BSPLINE_DEGREE);
    }

    return (this.bspline_knots = bspline_knots);
  }

  formUniformKnots() {
    return (this.bspline_knots = [...new Array(this.bspline_points.length + BSPLINE_DEGREE + 1)].map((_, i) => i));
  }

  formWeights() {
    return (this.bspline_weights = this.bspline_points.map((p) => 1));
  }
}
// END cubic B-Spline

//END, code from js/graphics-element/api/types/bspline

    bspline_x_0 = 266;
    bspline_y_0 = 0;
    bspline_x_1 = 133; // ANIMATES
    bspline_y_1 = 230; // ANIMATES

    bspline_x_2 = -13;
    bspline_y_2 = 230;

    bspline_x_3 = -26; // ANIMATES
    bspline_y_3 = 0;   // ANIMATES

    bspline_x_4 = -134;
    bspline_y_4 = -231;
//    
    bspline_x_5 = 133;  // ANIMATES
    bspline_y_5 = -231; // ANIMATES

// bs_o_p = bspline original points
var bs_o_p = [
    {x:bspline_x_0, y:bspline_y_0},
    {x:bspline_x_1, y:bspline_y_1},
    {x:bspline_x_2, y:bspline_y_2},
    {x:bspline_x_3, y:bspline_y_3},
    {x:bspline_x_4, y:bspline_y_4},
    {x:bspline_x_5, y:bspline_y_5},
]
function fix_bspline_points_that_overlap(){
            bs_o_p[1].x = 200;
            bs_o_p[1].y = 150;
            bspline_handles[1].xpos = 200;
            bspline_handles[1].ypos = 150;
            bspline_handles[1].update_radius_angle(bspline_handles[1].xpos,bspline_handles[1].ypos);
    
            calculate_bspline_radii(); // this fixes the jumping spiro problem
            calculate_bspline_points();
            calculate_bspline_angle_incrementers(); // 

}

function calculate_bspline_points(){
    
    // copy original points into the bspline points array
    bspline_points = 
         [{x:bs_o_p[0].x, y:bs_o_p[0].y},
          {x:bs_o_p[1].x, y:bs_o_p[1].y},
          {x:bs_o_p[2].x, y:bs_o_p[2].y},
          {x:bs_o_p[3].x, y:bs_o_p[3].y},
          {x:bs_o_p[4].x, y:bs_o_p[4].y},
          {x:bs_o_p[5].x, y:bs_o_p[5].y},
         ];
    
// calculate the radius of points at indexes 1, 3, 5 based on original points (bs_o_p)
//    bspline_r_1 = Math.sqrt((bs_o_p[1].x * bs_o_p[1].x) + (bs_o_p[1].y * bs_o_p[1].y));  // COMMENTED OUT; GOING TO MAKE A FUNCTION THAT UPDATES THE RADII    
//    bspline_r_3 = Math.sqrt((bs_o_p[3].x * bs_o_p[3].x) + (bs_o_p[3].y * bs_o_p[3].y));  // COMMENTED OUT; GOING TO MAKE A FUNCTION THAT UPDATES THE RADII
//    bspline_r_5 = Math.sqrt((bs_o_p[5].x * bs_o_p[5].x) + (bs_o_p[5].y * bs_o_p[5].y));  // COMMENTED OUT; GOING TO MAKE A FUNCTION THAT UPDATES THE RADII 

// *****************************************************************************************************************************************************************
// COPY 1 OF IF LOOP STATUS, WHERE I TRIED TO APPLY SPIRO MOVEMENT TO POINT INDEX 5; GOT 3 COPIES OF THAT POINT, WITH SPIRO MOVEMENT. LOOKED LIKE AN ELECTRIC MIXER. UNPLEASANT.
// *****************************************************************************************************************************************************************
    
//    // only points of index 1, 3 and 5 can animate, so here we're setting their x y values based on polar coordinates (radius * angle)
//    if(loop_status){
//        bspline_x_1 = bspline_r_1 * Math.cos(theta_bspline);
//        bspline_y_1 = bspline_r_1 * Math.sin(theta_bspline);
//    //    theta_bspline += ((2 * Math.PI) / (incrementer_base / incrementer1));  NOT HERE, BUT IN THE DRAW LOOP
//
//        bspline_x_3 = bspline_r_3 * Math.cos(gamma_bspline);
//        bspline_y_3 = bspline_r_3 * Math.sin(gamma_bspline);
//    //    gamma_bspline -= ((2 * Math.PI) / (incrementer_base / incrementer1));  NOT HERE, BUT IN THE DRAW LOOP
//    
//        
//    // COPIED FROM DRAW LOOP, MODIFIED SO THAT BSPLINE POINT 5 CAN USE SPIROGRAPH MOVEMENT
//        spiro_option = false; // TEMP, TURN OFF SPIRO
//        if(spiro_option){
//            if(epitro_radio){
//                bspline_x_5 = (bspline_r_5 = + r_spiro) * Math.cos(petri_bspline) - (point_on_small_r * Math.cos(((bspline_r_5 + r_spiro)/r_spiro) * petri_bspline));
//                bspline_y_5 = (bspline_r_5 = + r_spiro) * Math.sin(petri_bspline) - (point_on_small_r * Math.sin(((bspline_r_5 + r_spiro)/r_spiro) * petri_bspline));
//            } else {
//                bspline_x_5 = (bspline_r_5 = - r_spiro) * Math.cos(petri_bspline) + (point_on_small_r * Math.cos(((bspline_r_5 - r_spiro)/r_spiro) * petri_bspline));
//                bspline_y_5 = (bspline_r_5 = - r_spiro) * Math.sin(petri_bspline) - (point_on_small_r * Math.sin(((bspline_r_5 - r_spiro)/r_spiro) * petri_bspline));
//            }
//        } else {
//        // ***************************
//        // "NORMAL" animation equations
//        // ***************************
//            bspline_x_5 = bspline_r_5 * Math.cos(petri_bspline);
//            bspline_y_5 = bspline_r_5 * Math.sin(petri_bspline);
//    //        petri_bspline -= ((2 * Math.PI) / (incrementer_base / incrementer2));  NOT HERE, BUT IN THE DRAW LOOP
//        }
//    // END    COPIED FROM DRAW LOOP, MODIFIED SO THAT BSPLINE POINT 5 CAN USE SPIROGRAPH MOVEMENT
//        
//        // bspline_points is an array that gets converted into actual Bsplines
//        // here, I set points at indexes 1,3,5 to the values calculated above
//        // efficient? probably not, but it's the only way I could make sense of Bsplines
//        bspline_points[1].x = bspline_x_1;
//        bspline_points[1].y = bspline_y_1;
//
//        bspline_points[3].x = bspline_x_3;
//        bspline_points[3].y = bspline_y_3;
//
//        bspline_points[5].x = bspline_x_5;
//        bspline_points[5].y = bspline_y_5;
//    }

// *****************************************************************************************************************************************************************
// end of COPY 1
// *****************************************************************************************************************************************************************

// *****************************************************************************************************************************************************************
// COPY 2 OF IF LOOP STATUS, WHERE I APPLY SPIRO MOVEMENT TO POINT INDEX 3, TO SEE IF THE ELECTRIC MIXER PROBLEM HAPPENS TO ANY BSPLINE POINT, OR JUST INDEX 5.
// *****************************************************************************************************************************************************************
    
    // only points of index 1, 3 and 5 can animate, so here we're setting their x y values based on polar coordinates (radius * angle)
    if(loop_status){
        
        r_spiro = parseInt(r_spiro); // because the universe hates me
        point_on_small_r = parseInt(point_on_small_r); // because the universe hates me

        bspline_x_1 = bspline_r_1 * Math.cos(theta_bspline);
        bspline_y_1 = bspline_r_1 * Math.sin(theta_bspline);
    //    theta_bspline += ((2 * Math.PI) / (incrementer_base / incrementer1));  NOT HERE, BUT IN THE DRAW LOOP

//        bspline_x_3 = bspline_r_3 * Math.cos(gamma_bspline);  // COMMENT OUT IF ATTEMPTING SPIRO MOVEMENT ON POINT INDEX 3
//        bspline_y_3 = bspline_r_3 * Math.sin(gamma_bspline);  // COMMENT OUT IF ATTEMPTING SPIRO MOVEMENT ON POINT INDEX 3
        //    gamma_bspline -= ((2 * Math.PI) / (incrementer_base / incrementer1));  NOT HERE, BUT IN THE DRAW LOOP
        
        bspline_x_5 = bspline_r_5 * Math.cos(petri_bspline);  // COMMENT OUT IF ATTEMPTING SPIRO MOVEMENT ON POINT INDEX 5
        bspline_y_5 = bspline_r_5 * Math.sin(petri_bspline);  // COMMENT OUT IF ATTEMPTING SPIRO MOVEMENT ON POINT INDEX 5
//        petri_bspline -= ((2 * Math.PI) / (incrementer_base / incrementer2));  NOT HERE, BUT IN THE DRAW LOOP
        
    // COPIED FROM DRAW LOOP, MODIFIED SO THAT BSPLINE POINT 5 CAN USE SPIROGRAPH MOVEMENT    COULDN'T GET IT TO WORK
//        spiro_option = false; // TEMP, TURN OFF SPIRO

        if(spiro_option){
            if(epitro_radio){
                
//      i'm not insane... r_spiro and point_on_small_r were typeof string!!!! see a few lines above for the fix
                bspline_x_3 = (bspline_r_3 + r_spiro) * Math.cos(gamma_bspline) - (point_on_small_r * Math.cos(((bspline_r_3 + r_spiro)/r_spiro) * gamma_bspline));
                bspline_y_3 = (bspline_r_3 + r_spiro) * Math.sin(gamma_bspline) - (point_on_small_r * Math.sin(((bspline_r_3 + r_spiro)/r_spiro) * gamma_bspline));
            } else {
                bspline_x_3 = (bspline_r_3 - r_spiro) * Math.cos(gamma_bspline) + (point_on_small_r * Math.cos(((bspline_r_3 - r_spiro)/r_spiro) * gamma_bspline));
                bspline_y_3 = (bspline_r_3 - r_spiro) * Math.sin(gamma_bspline) - (point_on_small_r * Math.sin(((bspline_r_3 - r_spiro)/r_spiro) * gamma_bspline));
            }
        } else {
        // ***************************
        // "NORMAL" animation equations
        // ***************************
            bspline_x_3 = bspline_r_3 * Math.cos(gamma_bspline);
            bspline_y_3 = bspline_r_3 * Math.sin(gamma_bspline);
        //    gamma_bspline -= ((2 * Math.PI) / (incrementer_base / incrementer1));  NOT HERE, BUT IN THE DRAW LOOP
    
        }
    // END    COPIED FROM DRAW LOOP, MODIFIED SO THAT BSPLINE POINT 5 CAN USE SPIROGRAPH MOVEMENT
        
        
        // bspline_points is an array that gets converted into actual Bsplines
        // here, I set points at indexes 1,3,5 to the values calculated above
        // efficient? probably not, but it's the only way I could make sense of Bsplines
        bspline_points[1].x = bspline_x_1;
        bspline_points[1].y = bspline_y_1;

        bspline_points[3].x = bspline_x_3;
        bspline_points[3].y = bspline_y_3;

        bspline_points[5].x = bspline_x_5;
        bspline_points[5].y = bspline_y_5;
    }

// *****************************************************************************************************************************************************************
// end of COPY 2
// *****************************************************************************************************************************************************************
    
// I THINK THIS SETS BSPLINE_WEIGHTS TO A DEFAULT OF 1, IF NO VALUES ARE PROVIDED
// bspline_weights = new BSpline(bspline_points).formWeights();
// BUT THE CODE STILL WORKS EVEN WITH THAT STATEMENT COMMENTED OUT    

// IN POMAX'S DEMO, HE DREW SLIDERS BELOW THE DEMO WINDOW
//  bspline_points.forEach((_,i) => {
//    addSlider(`slide-control`, `!weight ${i+1}`, 0, 10, 0.1, i%2===1? 2 : 8, v => this.setWeight(i, v));
//  });
    
    // ADDS INDEX 0,1,2 TO THE END OF THE BSPLINE_POINTS ARRAY, SO WE GET A 'CLOSED' SHAPE
    bspline_points = bspline_points.concat(bspline_points.slice(0,3));

//  FROM POMAX. I WONDER IF I CAN USE HIS FUNCTION TO MOVE THE BSPLINE POINTS? MY SOLUTION IS QUITE CONVOLUTED
//  setMovable(bspline_points);

//  FROM POMAX. NO IDEA WHAT THIS DOES
//  bspline_points.forEach(function(item, index, array) {
//      console.log(item, index);
//  })
//  FROM POMAX. PROBABLY SOME CRAFTY WAY OF SETTING WEIGHTS, BUT MY BRAIN MELTED, AND I PREFER THE 'HAMMER IT IN' METHOD BELOW    
//  setWeight(i, v) {
//  bspline_weights[i] = v;
//  }
//  MY SLOPPY 'HAMMER IT IN' METHOD FOR SETTING THE WEIGHTS    
    bspline_weights = [bspline_weight_0,bspline_weight_1,bspline_weight_2,bspline_weight_3,bspline_weight_4,bspline_weight_5,bspline_weight_6,bspline_weight_7,bspline_weight_8];

}
// END of calculate_bspline_points()

//function update_bspline_handles(){
//    for (i=0,j=1; i<bspline_handles.length; i++,j+=2){
//        bspline_points[j].x = bspline_handles[i].xpos;
//        bspline_points[j].y = bspline_handles[i].ypos;
//    }
//}

// ------------------------
// END of BSPLINE FUNCTIONS
// ------------------------


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Point CLASS to create the first point (first_pt)
function Point(name,point,r,g,b,a){
	this.name = name;
    this.point = point;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
	
} // END of CLASS to create the first point (first_pt)


// Bezier anchor or control handle CLASS
function Bez_point(name,bx,by,r,g,b,a){
	this.name = name;
    this.xpos = bx;
    this.ypos = by;
    this.elmt_size = 20; // was 10 when ellipse worked
    this.mouse_over = false;
    this.selected = false;
    this.xoffset = 0;
    this.yoffset = 0;
    this.radius = Math.sqrt((bx ** 2) + (by ** 2));
    this.angle = Math.atan2(by,bx) * 180 / Math.PI;
//    console.log('at object creation, angle = ' + this.angle);
    if(this.name == 'anchor'){
//        console.log('that was the anchor');
    }
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    // show HAS TO DO WITH THE HANDLES
	this.show_handle = function(r,g,b) {
             strokeWeight(3);
            stroke(r,g,b,a);
        // if the mouse is over this handle, change its fill to black
        if (mouseX - canvas_c_x > this.xpos - this.elmt_size && mouseX - canvas_c_x < this.xpos + this.elmt_size &&
            mouseY - canvas_c_y > this.ypos - this.elmt_size && mouseY - canvas_c_y < this.ypos + this.elmt_size) {
            this.mouse_over = true;
            fill(0,0,0);
            // if the mouse is over this handled and is pressed, change the stroke color to pale red
            if (mouseIsPressed && this.mouse_over == true) {
                stroke(200, 79, 100);
            } else {
            }
 
        } else {
            this.mouse_over = false;
            fill(255,255,255,a);            
        }
        // making the handle touch aware
        // if (p5js.touches[0].x - canvas_c_x > this.xpos - this.elmt_size && p5js.touches[0].x - canvas_c_x < this.xpos + this.elmt_size &&
        //     p5js.touches[0].y - canvas_c_y > this.ypos - this.elmt_size && p5js.touches[0].y - canvas_c_y < this.ypos + this.elmt_size) {
        //     this.mouse_over = true;
        //     fill(0,0,0);
 
        //     if (p5js.mouseIsPressed && this.mouse_over == true) {
        //         stroke(200, 79, 100);
        //     } else {
        //     }
 
        // } else {
        //     this.mouse_over = false;
        //     fill(255,255,255,a);            
        // }
        ellipse(this.xpos, this.ypos, this.elmt_size, this.elmt_size);
    };

    this.update_radius_angle = function (xx,yy){
        this.radius = Math.sqrt((xx ** 2) + (yy ** 2));
        this.angle = Math.atan2(yy,xx) * 180 / Math.PI;
    }
} // END of Bezier anchor or control handle CLASS

// Bezier segment CLASS v1, where all the points are in the segment
function Bez_seg(name,c1x,c1y,c2x,c2y,ax,ay){
	this.name = name;
    this.cntrl1 = {"x":c1x, "y":c1y};
    this.cntrl2 = {"x":c2x, "y":c2y};
    this.anchor = {"x":ax, "y":ay};
    this.elmt_size = 20; // was 10 when ellipse worked
    this.mouse_over = false;
    this.selected = false;
    this.xoffset = 0;
    this.yoffset = 0;
	ellipseMode(RADIUS);
	
	this.show_handle = function() {
 
        if (mouseX > this.cntrl1.x - this.elmt_size && mouseX < this.cntrl1.x + this.elmt_size &&
            mouseY > this.cntrl1.y - this.elmt_size && mouseY < this.cntrl1.y + this.elmt_size) {
            this.mouse_over = true;
            fill(100,0,0);
 
            if (mouseIsPressed && this.mouse_over == true) {
                stroke(200, 79, 100);
                strokeWeight(3);
            } else {
                noStroke();
            }
 
        } else {
            this.mouse_over = false;
            noStroke();
            fill(100);
        }
        ctx.arc(this.cntrl1.x, this.cntrl1.y, this.elmt_size,0,Math.PI*2);
//        ellipse(this.cntrl1.x, this.cntrl1.y, this.elmt_size, this.elmt_size);
    };	
} // END of Bezier segment CLASS v1


// Bezier segment CLASS v2, where all the points come from Bez_point
function Bez_seg2(name,cntrl1,cntrl2,anchor,last){
	this.name = name;
    this.cntrl1 = cntrl1;
    this.cntrl2 = cntrl2;
    this.anchor = anchor;
    this.last = last;
	
} // END of Bezier segment CLASS v2

// Bspline Handle CLASS
class Bspline_Handle{
    constructor(bsx,bsy,r,g,b,indx){
        this.xpos = bsx;
        this.ypos = bsy;
        this.elmt_size = 20; // was 10 when ellipse worked
        this.mouse_over = false;
        this.selected = false;
        this.xoffset = 0;
        this.yoffset = 0;
        this.radius = Math.sqrt((bsx ** 2) + (bsy ** 2));
        this.angle = Math.atan2(bsy,bsx) * 180 / Math.PI;
    //    console.log('at object creation, angle = ' + this.angle);
        this.r = r;
        this.g = g;
        this.b = b;
        this.indx = indx;

        // show HAS TO DO WITH THE HANDLES
        this.show_handle = function(r,g,b) {
                 strokeWeight(3);
                stroke(r,g,b);

            if (mouseX - canvas_c_x > this.xpos - this.elmt_size && mouseX - canvas_c_x < this.xpos + this.elmt_size &&
                mouseY - canvas_c_y > this.ypos - this.elmt_size && mouseY - canvas_c_y < this.ypos + this.elmt_size) {
                this.mouse_over = true;
                fill(0,0,0);

                if (mouseIsPressed && this.mouse_over == true) {
                    stroke(200, 79, 100);
//                    console.log('clicked on index = ' + indx);
                } else {
                }

            } else {
                this.mouse_over = false;
                fill(255,255,255);

            }
            ellipse(this.xpos, this.ypos, this.elmt_size, this.elmt_size);
        };
        this.update_radius_angle = function (xx,yy){
            this.radius = Math.sqrt((xx ** 2) + (yy ** 2));
            this.angle = Math.atan2(yy,xx) * 180 / Math.PI;
        }
    }
} // END of Bspline Handle CLASS


// HAD TO BREAK OUT THESE FUNCTIONS WHEN I ADDED BSPLINES
// AS THOSE POINTS DON'T HAVE A CLASS WITH THEIR OWN METHODS
// COPIED FROM Bez_point 'class' (really, a function)
// DIDN'T END UP USING THIS
function show_bspline_handle(r,g,b,a,x,y,indx) {
             strokeWeight(3);
            stroke(r,g,b,a);

        if (mouseX - canvas_c_x > x - 20 && mouseX - canvas_c_x < x + 20 &&
            mouseY - canvas_c_y > y - 20 && mouseY - canvas_c_y < y + 20) {
            this.mouse_over = true;
            handle_x = x;
//            console.log('this.mouse_over = ' + this.mouse_over);
//            console.log('handle_x = ' + x);
            console.log('index = ' + indx);
//            if(indx == 1){
//                console.log('index = ' + indx);   
//            }
//            
//            if(indx == 3){
//                console.log('index = ' + indx);   
//            }
//            
//            if(indx == 5){
//                console.log('index = ' + indx);   
//            }
            
            fill(0,0,0);
 
            if (mouseIsPressed && this.mouse_over == true) {
                stroke(200, 79, 100);
            } else {
            }
 
        } else {
            this.mouse_over = false;
            fill(255,255,255,a);
            
        }
        ellipse(x, y, 20, 20);
    }
// DIDN'T END UP USING THIS AS A SEPARATE FUNCTION
function update_radius_angle(xx,yy){
        this.radius = Math.sqrt((xx ** 2) + (yy ** 2));
        this.angle = Math.atan2(yy,xx) * 180 / Math.PI;
    }
// END       BREAK OUT THESE FUNCTIONS WHEN I ADDED BSPLINES

function calculate_bspline_radii(){

    // THESE WORK. QUITE WHILE YOU'RE AHEAD!
    bspline_r_1 = Math.sqrt((bs_o_p[1].x * bs_o_p[1].x) + (bs_o_p[1].y * bs_o_p[1].y));
    bspline_r_3 = Math.round(Math.sqrt((bs_o_p[3].x * bs_o_p[3].x) + (bs_o_p[3].y * bs_o_p[3].y)));
    bspline_r_5 = Math.sqrt((bs_o_p[5].x * bs_o_p[5].x) + (bs_o_p[5].y * bs_o_p[5].y));            
    // end, THESE WORK. QUITE WHILE YOU'RE AHEAD!

}

function calculate_bspline_angle_incrementers() {
    theta_bspline =  Math.atan2(bs_o_p[1].y, bs_o_p[1].x);
    gamma_bspline =  Math.atan2(bs_o_p[3].y, bs_o_p[3].x);
    petri_bspline =  Math.atan2(bs_o_p[5].y, bs_o_p[5].x);
}

var grid_a;
var half_grid_unit;
var base_a;
var base_r;
var base_a_rmdr;
var base_a_rmdr_bilat;
var bilat_x;
var bilat_y;

// calculate_angles comes from kaleidascope-3-6-script, line 388
function calculate_angles(ang_x,ang_y){
    base_a = Math.atan2(ang_y,ang_x);
    base_r = Math.sqrt(Math.pow(ang_x,2) + Math.pow(ang_y,2));
    base_a_rmdr = base_a % grid_a;
//    base_a_prev = Math.atan2(prev_mouse_click.y,prev_mouse_click.x);
//    base_r_prev = Math.sqrt(Math.pow(prev_mouse_click.x,2) + Math.pow(prev_mouse_click.y,2));
//    base_a_rmdr_prev = base_a_prev % grid_a;

    base_a_rmdr_bilat = grid_a - base_a_rmdr;
//    base_a_rmdr_bilat_prev = grid_a - base_a_rmdr_prev;

//    zones_apart = Math.ceil((base_a - base_a_prev)/base_a);
//    difference_angle = base_a_prev + base_a;
}
// THESE WORK, BUT CAN WE COMBINE THEM WITH calculate angles() ?
function calc_bilat_x(x){
    x = base_r * Math.cos(grid_a - base_a_rmdr);
    return x;
}

function calc_bilat_y(y){
    y = base_r * Math.sin(grid_a - base_a_rmdr);
    return y;
}
// THE TWO FUNCTIONS BELOW COMBINE calculate angles AND calc_bilat_x / calc_bilat_y
function bilat_x(x,y){
    base_a = Math.atan2(y,x); // from kaleidascope-3-6-script, line 388
    base_r = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)); // from kaleidascope-3-6-script, line 388
    base_a_rmdr = base_a % grid_a; // from kaleidascope-3-6-script, line 388
    x = base_r * Math.cos(base_a + grid_a); // from kaleidascope-3-6-script, function draw_circle_on_target, line 663
    x = -x; // WORKS! (prevents flipping) from kaleidascope-3-6-script, function draw_circle_on_target, line 668
    return x;
}

function bilat_y(x,y){
    base_a = Math.atan2(y,x); // from kaleidascope-3-6-script, line 388
    base_r = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)); // from kaleidascope-3-6-script, line 388
    base_a_rmdr = base_a % grid_a; // from kaleidascope-3-6-script, line 388
    y = base_r * Math.sin(base_a + grid_a); // from kaleidascope-3-6-script, function draw_circle_on_target, line 663
    // BUT UNLIKE X, NO NEED TO FLIP Y
    return y;
}

var color_1_hue;
var color_1_sat;
var color_1_val;

var color_2_hue;
var color_2_sat;
var color_2_val;

var color_3_hue;
var color_3_sat;
var color_3_val;

function update_color_1(picker) {
    // 'jscolor' instance can be used as a string (whatever that means)
    color_1_rgb = document.getElementById('color_1').jscolor.toRGBString();
    red_1 = Math.round(picker.rgb[0]);
    grn_1 = Math.round(picker.rgb[1]);
    blu_1 = Math.round(picker.rgb[2]);

// IN PREVIOUS VERSION OF PROGRAM, WOULD PRINT THE RGB VALUES IN THE COLOR PICKER BUTTON
//    document.getElementById('color_1').innerHTML =
//    red_1 + ', ' +
//    grn_1 + ', ' +
//    blu_1;
    
    color_1_hue = Math.round(picker.hsv[0]);
    color_1_sat = Math.round(picker.hsv[1]);
    color_1_val = Math.round(50 * ((picker.hsv[2]/2) / 100) + 25);  // remapping to values between 50 - 25
        
    var elems1 = document.getElementsByClassName('text_color_1');
    var index = 0,
    length = elems1.length;
    for (; index < length; index++) {
        elems1[index].style.color = "hsl(" + color_1_hue + "," + color_1_sat + "%," + color_1_val + "%)";
    }
}

function update_color_2(picker) {
    // 'jscolor' instance can be used as a string (whatever that means)
    color_2_rgb = document.getElementById('color_2').jscolor.toRGBString();
    
    red_2 = Math.round(picker.rgb[0]);
    grn_2 = Math.round(picker.rgb[1]);
    blu_2 = Math.round(picker.rgb[2]);
    
// IN PREVIOUS VERSION OF PROGRAM, WOULD PRINT THE RGB VALUES IN THE COLOR PICKER BUTTON
//    document.getElementById('color_2').innerHTML =
//    red_2 + ', ' +
//    grn_2 + ', ' +
//    blu_2;
    

    color_2_hue = Math.round(picker.hsv[0]);
    color_2_sat = Math.round(picker.hsv[1]);
    color_2_val = Math.round(50 * ((picker.hsv[2]/2) / 100) + 25);  // remapping to values between 50 - 25
        
    var elems2 = document.getElementsByClassName('text_color_2');
    var index = 0,
    length = elems2.length;
    for (; index < length; index++) {
        elems2[index].style.color = "hsl(" + color_2_hue + "," + color_2_sat + "%," + color_2_val + "%)";
    }
}

function update_color_3(picker) {
    // 'jscolor' instance can be used as a string (whatever that means)
    color_3_rgb = document.getElementById('color_3').jscolor.toRGBString();
    
    red_1_square = Math.round(picker.rgb[0]);
    grn_1_square = Math.round(picker.rgb[1]);
    blu_1_square = Math.round(picker.rgb[2]);
    
// IN PREVIOUS VERSION OF PROGRAM, WOULD PRINT THE RGB VALUES IN THE COLOR PICKER BUTTON
//    document.getElementById('color_3').innerHTML =
//    red_1_square + ', ' +
//    grn_1_square + ', ' +
//    blu_1_square;
    

    color_3_hue = Math.round(picker.hsv[0]);
    color_3_sat = Math.round(picker.hsv[1]);
    color_3_val = Math.round(50 * ((picker.hsv[2]/2) / 100) + 25);  // remapping to values between 50 - 25
        
    var elems3 = document.getElementsByClassName('text_color_3');
    var index = 0,
    length = elems3.length;
    for (; index < length; index++) {
        elems3[index].style.color = "hsl(" + color_3_hue + "," + color_3_sat + "%," + color_3_val + "%)";
    }
}

function update_color_4(picker) {
    // 'jscolor' instance can be used as a string (whatever that means)
    color_4_rgb = document.getElementById('color_4').jscolor.toRGBString();
    
    red_4 = Math.round(picker.rgb[0]);
    grn_4 = Math.round(picker.rgb[1]);
    blu_4 = Math.round(picker.rgb[2]);
    
    color_4_hue = Math.round(picker.hsv[0]);
    color_4_sat = Math.round(picker.hsv[1]);
    color_4_val = Math.round(50 * ((picker.hsv[2]/2) / 100) + 25);  // remapping to values between 50 - 25
        
    var elems4 = document.getElementsByClassName('text_color_4');
    var index = 0,
    length = elems4.length;
    for (; index < length; index++) {
        elems4[index].style.color = "hsl(" + color_4_hue + "," + color_4_sat + "%," + color_4_val + "%)";
    }
}

function update_color_bkgd(picker) {
    // 'jscolor' instance can be used as a string (whatever that means)
    bkgrnd_color = document.getElementById('background_color').jscolor.toRGBString();
    red_bkgrnd = Math.round(picker.rgb[0]);
    grn_bkgrnd = Math.round(picker.rgb[1]);
    blu_bkgrnd = Math.round(picker.rgb[2]);
    
    if(laser_light_show){
        clear();
//        fill(red_bkgrnd,grn_bkgrnd,blu_bkgrnd);
        fill('rgba('+ red_bkgrnd +','+ grn_bkgrnd +','+ blu_bkgrnd +', 1)');
        rect(-canvas_c_x,-canvas_c_y,canvas_w,canvas_h);
    }
    
    // LUNINANCE FORMULA found at
    // https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
    // AUTHOR: Anonymous
    bkgrnd_luminance = sqrt( 0.299 * (red_bkgrnd^2) + 0.587 * (grn_bkgrnd^2) + 0.114 * (blu_bkgrnd^2) );
    
    if(bkgrnd_luminance >= 12){
        var holder = document.getElementById("ui-holder-fixed");
        holder.classList.add("on_light_background");
        holder.classList.remove("on_dark_background");
        
        var pause_resume_btn = document.getElementById("pause_resume_btn");
        pause_resume_btn.classList.add("on_light_background");
        pause_resume_btn.classList.remove("on_dark_background");        

        var menuicon = document.getElementById("menuicon");
        menuicon.classList.add("menuicon_on_light_background");

        var menubars = document.getElementsByClassName("menubars");
            for(i = 0; i < menubars.length; i += 1){
//                console.log('menubars length = ' + menubars.length);
                menubars[i].classList.add("menubars_on_light_background");
            }

        var element = document.getElementById("handle_outline_viz_lbl");
        element.classList.add("on_light_background");
        element.classList.remove("on_dark_background");        
    }
    
    if(bkgrnd_luminance < 12){
        var holder = document.getElementById("ui-holder-fixed");
        holder.classList.remove("on_light_background");
        holder.classList.add("on_dark_background");
        
        var pause_resume_btn = document.getElementById("pause_resume_btn");
        pause_resume_btn.classList.remove("on_light_background");
        pause_resume_btn.classList.add("on_dark_background");        

        var menuicon = document.getElementById("menuicon");
        menuicon.classList.remove("menuicon_on_light_background");

        var menubars = document.getElementsByClassName("menubars");
            for(i = 0; i < menubars.length; i += 1){
                menubars[i].classList.remove("menubars_on_light_background");
            }

        var element = document.getElementById("handle_outline_viz_lbl");
        element.classList.remove("on_light_background");
        element.classList.add("on_dark_background");        
    }
    
}


function openNav() {
    document.getElementById("ui-holder").style.marginLeft = "0px";
    document.getElementById("menuicon").classList.add('displaynone');
}

function closeNav() {
    document.getElementById("ui-holder").style.marginLeft = "-600px";        
    document.getElementById("menuicon").classList.remove('displaynone');
}

function openShortcuts() {
    document.getElementById("ui-shortcuts-holder").style.zIndex = "99";
    document.getElementById("ui-shortcuts-holder").style.opacity = 1;
}

function closeShortcuts() {
    document.getElementById("ui-shortcuts-holder").style.zIndex = "-1"; 
    document.getElementById("ui-shortcuts-holder").style.opacity = 0;
}

// following function based on advice from "Return Multiple Values in Javascript?" https://stackoverflow.com/questions/2917175/return-multiple-values-in-javascript
// AND https://dev.to/sarah_chima/destructuring-assignment---arrays-16f
//var newCodes = function() {
//    var dCodes = fg.codecsCodes.rs;
//    var dCodes2 = fg.codecsCodes2.rs;
//    return {
//        dCodes: dCodes,
//        dCodes2: dCodes2
//    };    or, with ES6, 'destructuring' object: ({dCodes, dCodes2} = newCodes());
//          or a 'destructructing'"' array: [dCodes, dCodes2] = newCodes();
//};

var epiTrochoid = function(radius_in,direction) {
    if(direction == 'counter'){
        epiT_x = (radius_in + r_spiro) * Math.cos(gamma) - (point_on_small_r * Math.cos(((radius_in + r_spiro)/r_spiro) * gamma));  // EPITROCHOID   What if 'R' is based on Radius of the Point?
        epiT_y = (radius_in + r_spiro) * Math.sin(gamma) - (point_on_small_r * Math.sin(((radius_in + r_spiro)/r_spiro) * gamma));
        gamma -= (2*Math.PI)/speed_spiro;   //    used by the spiro equations
    } else {
        epiT_x = (radius_in + r_spiro) * Math.cos(theta) - (point_on_small_r * Math.cos(((radius_in + r_spiro)/r_spiro) * theta));  // EPITROCHOID   What if 'R' is based on Radius of the Point?
        epiT_y = (radius_in + r_spiro) * Math.sin(theta) - (point_on_small_r * Math.sin(((radius_in + r_spiro)/r_spiro) * theta));
        theta += (2*Math.PI)/speed_spiro;   //    used by the spiro equations

    }
    return [epiT_x, epiT_y];
};

var hypoTrochoid = function(radius_in,direction) {
    if(direction == 'counter'){
        hypoT_x = (radius_in - r_spiro) * Math.cos(gamma) + (point_on_small_r * Math.cos(((radius_in - r_spiro)/r_spiro) * gamma));  // HYPOTROCHOID   'R' is based on Radius of the Point, MINUS spiro radius
        hypoT_y = (radius_in - r_spiro) * Math.sin(gamma) - (point_on_small_r * Math.sin(((radius_in - r_spiro)/r_spiro) * gamma));
        gamma -= (2*Math.PI)/speed_spiro;   //    used by the spiro equations        
    } else {
        hypoT_x = (radius_in - r_spiro) * Math.cos(theta) + (point_on_small_r * Math.cos(((radius_in - r_spiro)/r_spiro) * theta));  // HYPOTROCHOID   'R' is based on Radius of the Point, MINUS spiro radius
        hypoT_y = (radius_in - r_spiro) * Math.sin(theta) - (point_on_small_r * Math.sin(((radius_in - r_spiro)/r_spiro) * theta));
        theta += (2*Math.PI)/speed_spiro;   //    used by the spiro equations
    }
    return [hypoT_x, hypoT_y];
};

function reset_shape_1_points() {
    for(i = 0; i < bez_elmnts_Shape_1.length; i += 1){
        bez_elmnts_Shape_1[i].xpos = shape_1_original_points_x_coordinates[i];
        bez_elmnts_Shape_1[i].ypos = shape_1_original_points_y_coordinates[i];
        bez_elmnts_Shape_1[i].update_radius_angle(bez_elmnts_Shape_1[i].xpos,bez_elmnts_Shape_1[i].ypos);
    }
}

function reset_shape_2_points() {
    
    // for Shape 2, which, if Shape 2.1 refactor goes well, these won't be needed
    first_pt.xpos = 0;
    first_pt.ypos = 0;
    first_pt.update_radius_angle(0,0);
    
    tBs2.cntrl1.xpos = canvas_w * 0.056;
    tBs2.cntrl1.ypos = canvas_h * 0.106;
    tBs2.cntrl1.update_radius_angle(canvas_w * 0.056, canvas_h * 0.106);
    
    tBs2.cntrl2.xpos = canvas_w * 0.163;
    tBs2.cntrl2.ypos = canvas_h * 0.306;
    tBs2.cntrl2.update_radius_angle(canvas_w * 0.163, canvas_h * 0.306);

    tBs2.anchor.xpos = canvas_w * 0.131;
    tBs2.anchor.ypos = canvas_h * 0.424;
    tBs2.anchor.update_radius_angle(canvas_w * 0.131, canvas_h * 0.424);

    tBs2.last.xpos = canvas_w * -0.022;
    tBs2.last.ypos = canvas_h * 0.488;
    tBs2.last.update_radius_angle(canvas_w * -0.022, canvas_h * 0.488);

    // for Shape 2.1 refactor
    for(i = 0; i < bez_elmnts_Shape_2.length; i += 1){
        bez_elmnts_Shape_2[i].xpos = shape_2_1_original_points_x_coordinates[i];
        bez_elmnts_Shape_2[i].ypos = shape_2_1_original_points_y_coordinates[i];
        bez_elmnts_Shape_2[i].update_radius_angle(bez_elmnts_Shape_2[i].xpos,bez_elmnts_Shape_2[i].ypos);
    }
}

function reset_shape_3_points() {
    for(i = 0; i < square_points.length; i += 1){
        square_points[i].xpos = shape_3_original_points_x_coordinates[i];
        square_points[i].ypos = shape_3_original_points_y_coordinates[i];
        square_points[i].update_radius_angle(square_points[i].xpos,square_points[i].ypos);
    }
}

function reset_shape_4_points() {
    
    bspline_x_0 = 266;
    bspline_y_0 = 0;
    
    bspline_x_1 = 200; // ANIMATES
    bspline_y_1 = 150; // ANIMATES

    bspline_x_2 = -13;
    bspline_y_2 = 230;

    bspline_x_3 = -26; // ANIMATES
    bspline_y_3 = 0;   // ANIMATES

    bspline_x_4 = -134;
    bspline_y_4 = -231;
//    
    bspline_x_5 = 133;  // ANIMATES
    bspline_y_5 = -231; // ANIMATES

// bs_o_p = bspline original points
bs_o_p = [
    {x:bspline_x_0, y:bspline_y_0},
    {x:bspline_x_1, y:bspline_y_1},
    {x:bspline_x_2, y:bspline_y_2},
    {x:bspline_x_3, y:bspline_y_3},
    {x:bspline_x_4, y:bspline_y_4},
    {x:bspline_x_5, y:bspline_y_5},
]

bspline_points = 
     [{x:bs_o_p[0].x, y:bs_o_p[0].y},
      {x:bs_o_p[1].x, y:bs_o_p[1].y},
      {x:bs_o_p[2].x, y:bs_o_p[2].y},
      {x:bs_o_p[3].x, y:bs_o_p[3].y},
      {x:bs_o_p[4].x, y:bs_o_p[4].y},
      {x:bs_o_p[5].x, y:bs_o_p[5].y},
     ];
    
    petri_bspline = 0;  // these did the trick. Doesn't matter if they're after or before calculate_bspline_points() 
    gamma_bspline = 0;  // these did the trick. Doesn't matter if they're after or before calculate_bspline_points()
    theta_bspline = 0;  // these did the trick. Doesn't matter if they're after or before calculate_bspline_points()
    
    for (var i = 0; i < bspline_handles.length; i++) {
        bspline_handles[i].xpos = bs_o_p[i].x;
        bspline_handles[i].ypos = bs_o_p[i].y;
        bspline_handles[i].update_radius_angle(bspline_handles[i].xpos,bspline_handles[i].ypos);
    }
    
        calculate_bspline_radii(); // added this second, works okay
//    calculate_bspline_points(); // added this first, does nothing by itself
    calculate_bspline_angle_incrementers(); // added this third, works okay

}

