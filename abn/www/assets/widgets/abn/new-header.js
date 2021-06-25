if (!$) {
    var $ = jQuery;
}
var zc;
$(document).ready(function () {

    closeMenu();
    $("#nav-toggle").click(function () {
        $("body").removeClass("hide-menu")
        $("body").addClass("show-menu")
    })
    $("#nav-close").click(function () {
        $("body").removeClass("show-menu")
        $("body").addClass("hide-menu")
    })
    $(".menu-overlay").click(function () {
        $("body").removeClass("show-menu")
        $("body").addClass("hide-menu")
    })
})
function goHome() {
    zc.actionService.navigateByUrl('/');
    closeMenu();
}
function closeMenu() {
    $("body").removeClass("show-menu")
    $("body").addClass("hide-menu")
}
function navigatePrevious() {
    var navigationLink = '';
    if (zc.queryParams.districtId) {
        navigationLink = '/epaper/news/telugunews/' + zc.queryParams.districtId + '?categoryId=' + zc.queryParams.categoryId + '&type=districts';
    } else if (zc.queryParams.categoryId) {
        navigationLink = '/epaper/news/telugunews/' + zc.queryParams.categoryId;
    } else {
        navigationLink = '/epaper/news/news-home';
    }
    zc.actionService.navigateByUrl(navigationLink);
}