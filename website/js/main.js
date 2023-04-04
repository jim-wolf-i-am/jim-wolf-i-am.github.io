
window.onload = function(){
    document.addEventListener('keydown',evaluate_key);
};

function showContactForm() {
    document.getElementById("form-container").style.zIndex = "99";
    document.getElementById("form-container").style.opacity = 1;
}

function hideContactForm() {
    document.getElementById("form-container").style.zIndex = "-1"; 
    document.getElementById("form-container").style.opacity = 0;
}

function evaluate_key(event){
    let tocheck = event;
    // console.log('KeyCode = ' + tocheck.keyCode);

    if (tocheck.keyCode == 27){
        // 27 = escape key
            hideContactForm();
        }
}