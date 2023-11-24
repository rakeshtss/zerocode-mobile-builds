if (!$) {
    var $ = jQuery;
}
$(document).ready(function () {
    $.ajax({
        url: "https://apis.v35.dev.zeroco.de/zc-v3.1-user-svc/2.0/docs/api/project/list/knowledge-menu",
        type: "GET",
        dataType: "json",
        success: function (res) {
            if (res.data && res.data.listData && res.data.listData.rows) {
                var menuData = res.data.listData.rows;
                var menuList = '';
                menuList += '<div><ul class="zc-menu main-menu-list">';
                $(menuData).each(function (inx, o) {
                    menuList += '<li class="nav-item nav-dropdown">' +
                        '<a class="nav-link nav-dropdown-toggle" href="/app/knowledge/list?project=' + o.code + ' ">' +
                        '<i class="' + o.icon + '"></i>' +
                        '<span class="nav-link-text">' + o.name + '</span>' +
                        '</a>';
                    menuList += '<ul class="nav-dropdown-items">';
                    $(o.project_categories).each(function (indx, e) {
                        menuList += '<li class="nav-item sub-menu">' +
                            '<a class="nav-link" href="/app/knowledge/list?project=' + o.code + '&category=' + e.code + ' ">' +
                            '<i class="' + e.icon + '"></i>' +
                            '<span>' + e.name + '</span>' +
                            '</a>' +
                            '</li>'
                    });
                    menuList += '</ul>' +
                        '</li>';
                });
                menuList += '</div></ul>';
                $('.zc-icons-menu .side-menu').append(menuList);
                var path = window.location.href;
                $('.nav-item .nav-link').each(function () {
                    if (this.href === path) {
                        $(this).addClass('active');
                        $(this).closest(".nav-item.nav-dropdown").addClass("open");
                        // if($('.nav-item.nav-dropdown').hasClass("active")){                         
                        //     $(this).closest(".nav-link").addClass("active");
                        // }
                    }
                });

                // var path = window.location.href; 
                // $('.nav-item.nav-dropdown.open').each(function() {
                //   if ($('.nav-item.nav-dropdown').hasClass("open")) {                  
                //     $(this).find(".nav-dropdown-toggle").addClass("active");
                //   }
                //   else{
                //     $(".nav-dropdown-toggle").removeClass("active");
                //   }
                // });

            }
        }
    })
});