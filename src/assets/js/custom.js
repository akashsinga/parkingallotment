$(document).ready(function(){
    $('.menu-toggle').click(function(){
        $('nav').toggleClass('active')
        $('#overview').toggleClass('active');
    })
})
window.onload = function () {
$("#overlay").fadeOut(500);
};