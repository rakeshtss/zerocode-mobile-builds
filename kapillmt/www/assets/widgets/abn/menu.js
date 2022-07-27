if(!$){
    var $ = jQuery;
}
var menuClass = "";
$(document).ready(function () {
    $.ajax({
        // url: "https://jsonblob.com/api/19fcfc2e-3539-11eb-9567-6d1c924f1845",
        url: "https://dev-apis.zeroco.de/zc-v3.1-user-svc/2.0/abn/api/category/list/categories",
        type: "GET",
        dataType: "json",
        success: function (res) {
        //  console.log('menu', res);
           if(res.data && res.data.listData && res.data.listData.rows){  
            var menuData= res.data.listData.rows;
             var menuList = '';
            
                menuList += '<ul class="main-menu-list">';
             $(menuData).each(function(inx, o){
                menuList += '<li><a href="javascript:;">'+ o.name;
               // console.log('list',o.sub_category.length);
                            if(o.sub_category.length > 0 && o.sub_category.length != 0){
                                menuClass = "zc-sub-menu";
                                if(o.sub_category.length > 10){
                                    menuClass = "zc-sub-menu zc-subchild-menu";
                                }
                                if(o.sub_category.length > 20){
                                    menuClass = "zc-sub-menu zc-submega-menu";
                                }
                                menuList += '<span class="icon icon-angle-down"></span></a><ul class="'+menuClass+'">';
                                $(o.sub_category).each(function(indx, e){
                                    // /t/11227/'+e.code+'
                                    menuList += `<li class="li-menu"><a href="javascript:;" onClick='getSelectedCatogory(${JSON.stringify(e.name)}, ${JSON.stringify(e.code)})'>`+ e.name;
                                    if(e.sub_sub_category.length > 0 && e.sub_sub_category.length != 0){
                                        menuList += '</a><span class="icon icon-angle-right"></span><ul class="zc-nested-menu">';
                                        $(e.sub_sub_category).each(function(inx, s){
                                            // console.log('s', s);
                                            menuList += '<li><a href="javascript:;">'+ s.name +'</a></li>'
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
                        if ($(window).width() < 992) {
                            $(".main-menu-list>li>a").on("click", function() {
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
                            
                            $(".zc-sub-menu>li>span.icon-angle-right").on("click", function() {
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
                        }
                        
                    }
                }
            });
            $("#nav-toggle").click(function(){
                $("body").removeClass("hide-menu")
                $("body").addClass("show-menu")
            })
            $("#nav-close").click(function(){
                $("body").removeClass("show-menu")
                $("body").addClass("hide-menu")
            })
        });
        function getSelectedCatogory(name, code) {
            console.log('json', name, code);
            localStorage.setItem('categoryName', name);
            window.location.href = "/t/11227/"+code;
        }