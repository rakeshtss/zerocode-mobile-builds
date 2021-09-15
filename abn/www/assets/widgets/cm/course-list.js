$(document).ready(function(){
    $(".zc-programmer-tables").hide();
    $(".zc-programmer-courses").show();
    $(".courses-toggle-btn").on("click", function () {
        $(".zc-programmer-courses").hide();
        $(".zc-programmer-tables").show();
    })
    $(".courses-windows-btn").on("click", function () {
        $(".zc-programmer-courses").show();
        $(".zc-programmer-tables").hide();
    })
});
