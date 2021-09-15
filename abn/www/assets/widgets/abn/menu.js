if (!$) {
    var $ = jQuery;
}
var zc;
var menuClass = "";
var staticLinks = `<div class="static-links">
<a onclick="zc.actionService.navigateByUrl('/zcbase/pages/about-us')">ABOUT US</a>
<a onclick="zc.actionService.navigateByUrl('/zcbase/pages/contact-us')">CONTACT US</a>
<a onclick="zc.actionService.navigateByUrl('/zcbase/pages/privacy-policy')">PRIVACY POLICY</a>
<a onclick="zc.actionService.navigateByUrl('/zcbase/pages/terms-and-conditions')">TERMS AND CONDITIONS</a>
</div>`;
$(document).ready(function () {
    if (localStorage.ZC_user) {
        let editionsElement = `<a class="editions-link" onclick="zc.actionService.navigateByUrl('/epa/editions/editions')">Editions</a>`
        $('#editionsLink').prepend(editionsElement);
    }
    var categoryApiUrl = "assets/static-jsons/categories.json";
    if (zc.config.platform == 'mobile') {
        categoryApiUrl = 'https://epaper.andhrajyothy.com/' + categoryApiUrl;
    }

    $.ajax({
        // url: "https://jsonblob.com/api/19fcfc2e-3539-11eb-9567-6d1c924f1845",
        url: `${categoryApiUrl}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            //  console.log('menu', res);
            if (res.data && res.data.listData && res.data.listData.rows) {
                var menuData = res.data.listData.rows;
                var menuList = '';
                zc.menuData = menuData;
                menuList += '<ul class="main-menu-list">' +
                    '<li class="home-icon"><a onclick="goHome()" class="icon-home" ></a></li>'
                $(menuData).each(function (inx, o) {
                    menuList += '<li><a href="javascript:;">' + o.name;
                    // console.log('list',o.sub_category.length);
                    if (o.sub_category.length > 0 && o.sub_category.length != 0) {
                        menuClass = "zc-sub-menu";
                        if (o.sub_category.length > 10) {
                            menuClass = "zc-sub-menu zc-subchild-menu";
                        }
                        if (o.sub_category.length > 20) {
                            menuClass = "zc-sub-menu zc-submega-menu";
                        }
                        menuList += '<span class="icon icon-angle-down"></span></a><ul class="' + menuClass + '">';
                        $(o.sub_category).each(function (indx, e) {
                            // /t/11227/'+e.code+'
                            // console.log('ee', e);
                            // menuList += `<li class="li-menu"><a href="javascript:;" onClick='getSelectedCatogory(${JSON.stringify(e.name)}, ${JSON.stringify(e.code)}, ${JSON.stringify(e.sub_sub_category.length)})'>`+ e.name;
                            menuList += `<li class="li-menu"><a onClick='getSelectedCatogory(${JSON.stringify(e.name)}, ${JSON.stringify(e.code)}, ${JSON.stringify(e.sub_sub_category.length)},${JSON.stringify(o.code)})'>` + e.name;
                            // menuList += `<li class="li-menu" ><a href="javascript:;" onClick="zc.actionService.navigateByUrl('/t/11227/${e.code}')">` + e.name;
                            //    menuList += `<li class="li-menu" ><a href="javascript:;" onClick="menuNavigate('/t/11227/${e.code}')">` + e.name;
                            if (e.sub_sub_category.length > 0 && e.sub_sub_category.length != 0) {
                                menuList += '</a><span class="icon icon-angle-right"></span><ul class="zc-nested-menu">';
                                $(e.sub_sub_category).each(function (inx, s) {
                                    menuList += `<li><a href="javascript:;" onClick='getSelectedSubSubCatogory(${JSON.stringify(s.name)}, ${JSON.stringify(s.code)}, ${JSON.stringify(e.code)}, ${JSON.stringify(o.code)})'>${s.name}</a></li>`;
                                });
                                menuList += '</ul>'
                            }
                            menuList += '</li>'
                        });
                        menuList += '</ul>'
                    }
                    menuList += '</li>'
                });
                menuList += '</ul>';
                $('.zc-main-menu').html(menuList);
                if (window.innerWidth <= 991) {
                    $('.zc-main-menu').append(staticLinks);
                }
                if (window.innerWidth > 991) {
                    $('.zc-main-menu .static-links').hide();
                }
                onSuccess();
            }
        }
    });   

    function onSuccess() {
        $(".main-menu-list>li>a").on('click', function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this)
                    .siblings(".zc-sub-menu")
                    .slideUp();
            } else {
                $(this)
                $(".main-menu-list>li>a").removeClass("active");
                $(".zc-sub-menu>li").removeClass("active");
                $(this).addClass("active");
                $(".main-menu-list>li .zc-sub-menu").slideUp();
                $(this)
                    .siblings(".zc-sub-menu")
                    .slideDown();
            }
        });

        $(".zc-sub-menu>li>span.icon-angle-right").on("click", function () {
            if ($(this).parent().hasClass("active")) {
                $(this).parent().removeClass("active");
                $(this)
                    .siblings(".zc-nested-menu")
                    .slideUp();
            } else {
                $(this)
                $(".zc-sub-menu>li").removeClass("active");
                $(this).parent().addClass("active");
                $(".zc-nested-menu").slideUp();
                $(this)
                    .siblings(".zc-nested-menu")
                    .slideDown();
            }
        });
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
        $(".static-links a").click(function () {
            closeMenu();
        })
    }
});
$(window).on('resize', function () {
    if (window.innerWidth > 991) {
        $('.zc-main-menu .static-links').hide();
    }
})

function getSelectedCatogory(name, code, childs, category) {
    localStorage.setItem('categoryName', name);
    if (childs) {
        // window.location.href = "/?s="+code;
        // window.location.href = "/t/11227/"+code;
        // zc.actionService.router.navigateByUrl("/?s=" + code);
        var navigateUrl = '/zcbase/account/home/' + code + '?s=' + code;
        if (zc.config && zc.config.platform == 'mobile') {
            // navigateUrl = '/zcbase/account/home/?s=';
            // zc.actionService.navigateByUrl(navigateUrl + code);
        } else {
            // zc.actionService.navigateByUrl(navigateUrl + code);
            // location.href = navigateUrl + code;
        }
        if (category) {
            navigateUrl += '&p=' + category;
        }
        zc.actionService.navigateByUrl(navigateUrl);
        closeMenu();
    } else {
        // window.location.href = "/t/11227/"+code;
        // zc.actionService.router.navigateByUrl('/t/11227/' + code);
        zc.actionService.navigateByUrl('/t/11227/' + code + '?p=' + category);
        closeMenu();
    }

}
function getSelectedSubSubCatogory(name, code, parent, category) {
    localStorage.setItem('categoryName', name);
    // window.location.href = "/t/11227/" + code + '/' + parent;
    zc.actionService.navigateByUrl("/t/11227/" + code + '/' + parent + '?p=' + category);
    closeMenu();
}

function closeMenu() {
    $("body").removeClass("show-menu")
    $("body").addClass("hide-menu")
}
function menuNavigate(url) {
    zc.actionService.navigateByUrl(url);
    closeMenu();
}
function goHome() {
    zc.actionService.navigateByUrl('/');
    closeMenu();
}
