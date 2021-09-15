$('#btnExplore').click(function () {
    // console.log('location.hash', location.href.endsWith);
    // var url = $(location).attr('href');
    // var parts = url.split("/");
    // var last_part = parts[parts.length - 1];
    // if (last_part == "my-course") {
    // }
    // alert('1');
    setTimeout(function () {
        $('html, body').animate({
            scrollTop: $("#program_overview").offset().top - 30
        }, 1000);
    }, 1000)
});
