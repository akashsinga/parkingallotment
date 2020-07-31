$(document).ready(function(){
    var clicks = 0;
    $('.menu-toggle').click(function(){
        clicks++;
        if(clicks%2!=0)
        {
            $('.map-container').toggleClass('active');
            $('.user_dashboard').toggleClass('active');
            $('#overview').toggleClass('active');
            setTimeout(()=>{
                $('nav').toggleClass('active');
            },1000);
        }
        else
        {
            $('nav').toggleClass('active');
            setTimeout(()=>{
                $('.map-container').toggleClass('active');
                $('.user_dashboard').toggleClass('active');
                $('#overview').toggleClass('active');
            },1000);
        }   
    })
})
window.onload = function () {
$("#overlay").fadeOut(500);
};