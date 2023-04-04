
window.onload = function(){
    document.addEventListener('keydown',evaluate_key);
};

function showContactForm() {
    document.getElementById("form-background").style.zIndex = "99";
    document.getElementById("form-background").style.opacity = 1;
}

function hideContactForm() {
    document.getElementById("form-background").style.zIndex = "-1"; 
    document.getElementById("form-background").style.opacity = 0;
}

function evaluate_key(event){
    let tocheck = event;
    // console.log('KeyCode = ' + tocheck.keyCode);

    if (tocheck.keyCode == 27){
        // 27 = escape key
            hideContactForm();
        }
}