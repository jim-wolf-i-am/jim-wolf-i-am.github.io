// jw-ui version 1.0 December 16, 2020
// jw-ui version 2.0 sometime after December 16, 2020
// jw-ui version 3.0 April 29, 2023

// THIS MAKES IT ALL WORK. JUST ADD THIS CLASS TO ANY ELEMENT IN YOUR HTML,
// AND THE SCRIPT BELOW WILL TURN THAT ELEMENT INTO A COLLAPSEABLE ELEMENT
// IT WILL ALSO MAKE THE PREVIOUS SIBLING THE CLICKABLE TRIGGER BY ADDING THE 'jw_ui_controller' CLASS TO IT
var jw_ui_elements = document.getElementsByClassName('jw_ui');


for(i=0;i<jw_ui_elements.length;i++){
    // STORES THE 'COMPUTED' HEIGHT IN A DATA- ATTRIBUTE
    // SO THAT THE FUNCTION THAT OPENS IT KNOWS HOW TALL TO MAKE IT
    jw_ui_elements[i].setAttribute('data-jwui-original-height',jw_ui_elements[i].offsetHeight);

    // DON'T REMEMBER EXACTLY WHY, BUT THOUGHT IT MIGHT BE USEFUL
    // TO ORDER THESE SOMEHOW
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

    // THIS SETS ALL JW-UI ELEMENTS TO BE 'CLOSED' ON LOAD
    jw_ui_elements[i].classList.add('jw_ui_closed');

    // IN CASE YOU WANT THE 2ND, 4TH, ETC ITEMS TO TO BE COLLAPSED ON LOAD
    // if(i%2 == 0){
    //     jw_ui_elements[i].classList.add('jw_ui_closed');
    // }
}

    // IF YOU USE THE CODE THAT MAKES THE 2ND, 4TH, ETC ITEMS BE COLLAPSED ON LOAD,
    // THIS FOR LOOP WILL SET THE RIGHT KIND OF ARROW ON THE ELEMENT WITH class='jw_ui_controller'
for(i=0;i<jw_ui_elements.length;i++){
    if(!jw_ui_elements[i].classList.contains('jw_ui_closed')){
        jw_ui_elements[i].previousElementSibling.firstChild.classList.remove('arrow-right');
        jw_ui_elements[i].previousElementSibling.firstChild.classList.add('arrow-down');
    }
}


// VERSION 2: OPENS nextElementSibling OF target (CLICKED ELEMENT) IF IT'S CLOSED. CLOSES ALL OTHERS.
// VERSION 2: Also makes the arrow next to the element with class jw_ui_controller a clickable trigger
// VERSION 3: the arrow next to element with class jw_ui_controller is now a pseudo before element and thus, is naturally clickable
// VERSION 3: we just add or remove the jw-ui-down-arrow class from the event target

function collapse_OR_expand(evt){

    for(i=0;i<jw_ui_elements.length;i++){
        // if the target is not closed, close it
        if(!jw_ui_elements[i].classList.contains('jw_ui_closed')){
            jw_ui_elements[i].classList.add('jw_ui_closed');
            jw_ui_elements[i].previousElementSibling.classList.remove('jw-ui-down-arrow');
        }    
    }
    // if the target is closed, open it
    // by removing the class that sets its height to zero
    if( evt.target.nextElementSibling.classList.contains('jw_ui_closed')){
        evt.target.nextElementSibling.classList.remove('jw_ui_closed');
        evt.target.classList.add('jw-ui-down-arrow');
    }
}

