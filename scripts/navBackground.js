element = document.querySelector("#alwaysOnTop");

var setBackgroundColor = function() {
    var y = window.scrollY;

    element.style.backgroundColor =
        (y > window.innerHeight - element.offsetHeight ? "rgb(22, 22, 22)" : "rgba(0, 0, 0, 0)");
    
}

window.addEventListener("scroll", setBackgroundColor);