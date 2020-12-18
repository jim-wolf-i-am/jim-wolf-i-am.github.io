// THIS MAKES IT ALL WORK. JUST ADD THIS CLASS TO ANY ELEMENT IN YOUR HTML,
// AND THE SCRIPT BELOW WILL TURN THAT ELEMENT INTO A COLLAPSEABLE ELEMENT
// IT WILL ALSO MAKE THE PREVIOUS SIBLING THE CLICKABLE TRIGGER BY ADDING THE 'jw_ui_controller' CLASS TO IT
var jw_ui_elements = document.getElementsByClassName('jw_ui');

    // ULTIMATELY THIS IDEA DIDN'T WORK
// window.onload = function(){
//     for(i=0;i<jw_ui_elements.length;i++){    
//        jw_ui_elements[i].firstElementChild.addEventListener('transitionend', toggle_display);
//        console.log('jw_ui_elements['+i+'].firstElementChild');
//        console.log(jw_ui_elements[i].firstElementChild);
//     }
// }

for(i=0;i<jw_ui_elements.length;i++){
    // HUH AT SOME POINT I THOUGHT IT NECESSARY TO STORE THE 'COMPUTED' HEIGHT IN A DATA- ATTRIBUTE. M'OKAY...
    jw_ui_elements[i].setAttribute('data-jwui-original-height',jw_ui_elements[i].offsetHeight);

    // YEAH, THIS IS ANOTHER 'HUH' KIND OF THING
    jw_ui_elements[i].setAttribute('data-jwui-index',i);

    // THIS GETS THE 'COMPUTED' HEIGHT OF THE ELEMENT,
    // AND SETS IT AS AN INLINE STYLE ON THE ELEMENT,
    // SO THAT THE SCRIPT & CSS CAN TRANSITION FROM THE COMPUTED HEIGHT TO ZERO HEIGHT (AND BACK AGAIN)
    jw_ui_elements[i].style.height = jw_ui_elements[i].offsetHeight+'px';

    // ADDS A CSS CLASS TO THE PREVIOUS ELEMENT'S SIBLING
    // THAT AMONG OTHER THINGS, ADDS AN ARROW TO THE LEFT OF THE ELEMENT, TO GIVE IT THAT 'ACCORDION' LOOK
    jw_ui_elements[i].previousElementSibling.classList.add('jw_ui_controller');

    // ADDS EVENT LISTENER TO THE ELEMENT WITH class='jw_ui_controller'
    // THE FUNCTION IT TRIGGERS WILL COLLAPSE OR EXPAND THE ELEMENT WITH class = 'jw-ui'
    jw_ui_elements[i].previousElementSibling.addEventListener("click", collapse_OR_expand);
    
    // ADDS A CSS STYLE THAT ADDS AN ARROW TO THE ELEMENT WITH class='jw_ui_controller'
    jw_ui_elements[i].previousElementSibling.insertAdjacentHTML('afterbegin', '<span class="arrow-right"></span>');
    
    // THIS WAS FOR TESTING AND LEARNING PURPOSES
    // jw_ui_elements[i].addEventListener("click", dothingstoParent);

    // THIS SETS ALL JW-UI ELEMENTS TO BE 'CLOSED' ON LOAD
    jw_ui_elements[i].classList.add('jw_ui_closed');

    // IDEA THAT DIDN'T GO ANYWHERE
//    jw_ui_elements[i].nextElementSibling.firstElementChild.addEventListener('transitionend', 
//     function( event ) { 
//         alert( "Finished transition!" ); 
//     }, false );

    // THIS WAS WHEN I WANTED A FEW ELEMENTS TO BE EXPANDED ON LOAD, AND A FEW TO BE COLLAPSED        
    // if(i%2 == 0){
    //     jw_ui_elements[i].classList.add('jw_ui_closed');
    // }
}

    // FOR TESTING AND LEARNING
// for(i=0;i<jw_ui_elements.length;i++){
//    console.log('jw_ui_elements[' + i + '].previousElementSibling');
//    console.log(jw_ui_elements[i].previousElementSibling); // these are the things you click on
//    console.log(jw_ui_elements[i].previousElementSibling.firstChild); // these have the arrow
//    console.log(jw_ui_elements[0].previousElementSibling.firstChild.attributes); // NamedNodeMap [ class="arrow-right" ]
    // if(jw_ui_elements[i].classList.contains('jw_ui_closed')){
//        console.log('jw_ui_elements ['+i+'] contains class of jw_ui_closed'); // these ARE the droids you're looking for
    // }
    // below, it works
//    if(jw_ui_elements[i].previousElementSibling.firstChild.classList.contains('arrow-right')){
//        console.log('i found a firstChild with class arrow-right');
//    }
// }

    // IF YOU USE THE CODE THAT MAKES SOME ELEMENTS BE EXPANDED AND SOME BE COLLAPSED ON LOAD,
    // THIS FOR LOOP WILL SET THE RIGHT KIND OF ARROW ON THE ELEMENT WITH class='jw_ui_controller'
for(i=0;i<jw_ui_elements.length;i++){
    if(!jw_ui_elements[i].classList.contains('jw_ui_closed')){
        jw_ui_elements[i].previousElementSibling.firstChild.classList.remove('arrow-right');
        jw_ui_elements[i].previousElementSibling.firstChild.classList.add('arrow-down');
    }
}

    // ULTIMATELY THIS IDEA DIDN'T WORK
// function toggle_display(evt){
//     console.log('toggle_display function triggered');
//    evt.classList.toggle('display_none'); // undefined
//     console.log(evt.target);
//     evt.target.classList.toggle('display_none');
// }

    // UM, I CAN'T REMEMBER WHY I WROTE THIS
// function heightChange(evt){
//    console.log('it worked');
    // console.log(evt); // this does work now
//    console.log(evt.relatedTarget.clientHeight); // null
//    console.log(evt.relatedTarget); // null
//    console.log(evt.clientHeight); // undefined
    // console.log(evt.target.clientHeight); // OMFG this works!
// }

function collapse_OR_expand(evt){

//    evt.target.nextElementSibling.classList.toggle('jw_ui_display_none'); // this works
    var next_sib = evt.target.nextElementSibling;
//    var next_sib = evt.target.firstElementChild;  // nope
    var original_height;
    original_height = parseInt(next_sib.getAttribute('data-jwui-original-height')); // this works
//    console.log(original_height);
//    console.log("original_height.typeof = " + typeof original_height);
    // console.log(evt.target.childNodes[0]);
    evt.target.childNodes[0].classList.toggle('arrow-right'); // the power of toggle compels you
    evt.target.childNodes[0].classList.toggle('arrow-down'); // THE POWER OF TOGGLE COMPELS YOU!

    // THIS WAS WHEN I TRIED TO CHANGE THE POSITION,
    // BUT I ABANDONDED THE IDEA
    // WAS 'INSPIRED' BY LOOKING AT HOW JQUERY UI'S ACCORDION WORKS
    // but no matter how small the incrementer, it goes super fast
//    for(i = 0; i > -original_height; i -= 0.01){
//        next_sib.firstElementChild.style.top = i+'px';
//    }
//    next_sib.firstElementChild.style = "top: -100px";  // doesn't honor transition
//    next_sib.firstElementChild.addEventListener( 
//     'transitionend', 
//     function( event ) { 
//         alert( "Finished transition!" ); 
//     }, false );
//    next_sib.firstElementChild.classList.toggle('jw_ui_closed'); // targets the wrapper
    next_sib.classList.toggle('jw_ui_closed'); // targets jw_ui <-- these ARE the droids you're looking for
//    next_sib.classList.toggle('jw_ui_closed'); // nope
}

    // OOH, IS THIS 'TEST DRIVEN' CODING AT WORK?
function test_alert(){
    alert('Finished!');
}

    // THIS WAS FOR TESTING AND LEARNING PURPOSES
    // function dothingstoParent(evt){
//    console.log('parentElement = '+ evt.target.parentElement); // must use target.parentElement, not just parentElement
//    console.log(evt.target.parentElement); // must use target.parentElement, not just parentElement
//    console.log(evt.target.parentNode);
//    console.log('here is the previousElementSibling');
//    console.log(evt.target.previousElementSibling); // previousElementSibling is the one you want; it gives you all the node properties (node properties is my own made up term)
//    console.log('here is the previousSibling');
//    console.log(evt.target.previousSibling);  // gives you some of what you want, but its weird
// }

