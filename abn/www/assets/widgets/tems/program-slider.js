if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if(!$){
      var $ = jQuery;
    }
    $(document).ready(function () {
  var programer_cards=[
      {
        "imgUrl": "assets/themes/tems/images/Rectangle.png",
        "pro_heading":"Training Programme on",
        "pro_description":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_icon_content":{
           "player_content":"",
           "pdf_content":"",
           "folder_file_content":""
        },
        "pro_defind":"for Faculty Members of BASU",
        "pro_tittle":"Training Programme on",
        "pro_sub":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_card_title_heading":" ",
        "pro_card_disconut":"₹1,75,000",
        "pro_card_title_price":"₹1,62,750",
        "pro_card_date":"27 Aug, 2020"

      },
    
    {
        "imgUrl": "assets/themes/tems/images/scientific.png",
        "pro_heading":"Training Programme on",
        "pro_description":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_icon_content":{
           "player_content":"",
           "pdf_content":"",
           "folder_file_content":""
        },
        "pro_defind":"for Faculty Members of BASU",
        "pro_tittle":"Training Programme on",
        "pro_sub":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_card_title_heading":" ",
        "pro_card_disconut":"₹1,75,000",
        "pro_card_title_price":"₹1,62,750",
        "pro_card_date":"27 Aug, 2020"
    },

    {
        "imgUrl": "assets/themes/tems/images/international.png",
        "pro_heading":"Training Programme on",
        "pro_description":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_icon_content":{
           "player_content":"",
           "pdf_content":"",
           "folder_file_content":""
        },
        "pro_defind":"for Faculty Members of BASU",
        "pro_tittle":"Training Programme on",
        "pro_sub":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_card_title_heading":" ",
        "pro_card_disconut":"₹1,75,000",
        "pro_card_title_price":"₹1,62,750",
        "pro_card_date":"27 Aug, 2020"
    },
      {
        "imgUrl": "assets/themes/tems/images/hr.png",
        "pro_heading":"Training Programme on",
        "pro_description":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_icon_content":{
           "player_content":"",
           "pdf_content":"",
           "folder_file_content":""
        },
        "pro_defind":"for Faculty Members of BASU",
        "pro_tittle":"Training Programme on",
        "pro_sub":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
        "pro_card_title_heading":" ",
        "pro_card_disconut":"₹1,75,000",
        "pro_card_title_price":"₹1,62,750",
        "pro_card_date":"27 Aug, 2020"
    },
    {
      "imgUrl": "assets/themes/tems/images/hr.png",
      "pro_heading":"Training Programme on",
      "pro_description":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
      "pro_icon_content":{
         "player_content":"",
         "pdf_content":"",
         "folder_file_content":""
      },
      "pro_defind":"for Faculty Members of BASU",
      "pro_tittle":"Training Programme on",
      "pro_sub":"Scientific Communication & Developing Winning Research Proposals (DWRP)",
      "pro_card_title_heading":" ",
      "pro_card_disconut":"₹1,75,000",
      "pro_card_title_price":"₹1,62,750",
      "pro_card_date":"27 Aug, 2020"
  }

  ];
  $('.programer-card-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    dots: false,
});
  var course_programer = "";
  programer_cards.forEach(function(items,index){
    course_programer += '<div class="card">'+
    '<div class="card-body">'+
        '<div class="programer-card-img">'+
           `<img id="userImg" alt="" src="${items.imgUrl}"/>` +
        '</div>'+
       '<div class="all-pro-content">'+
       '<div>'+
          '<p>'+ items.pro_heading+'</p>'+
          '<h3>' + items.pro_description + '</h3>'+
          '</div>'+
          '<div class="course_icons'+[index]+'">';
        //   if(items.pro_icon_content.player_content && items.pro_icon_content.pdf_content && items.pro_icon_content.folder_file_content){
        //     course_programer += '<div class="pro-icons d-flex">'+
        //          '<div class="pro-alignment">'+
        //              '<span class="icon-video-1-24">'+'</span>'+
        //              '<h2>'+ items.pro_icon_content.player_content +'</h2>'+   
        //          '</div>'+
        //          '<div class="pro-alignment">'+
        //              '<span class="icon-file-pdf">'+'</span>'+
        //              '<h2>'+ items.pro_icon_content.pdf_content +'</h2>'+   
        //          '</div>'+
        //          '<div class="pro-alignment">'+
        //             '<span class="icon-file-one">'+'</span>'+
        //             '<h2>'+ items.pro_icon_content.folder_file_content +'</h2>'+   
        //          '</div>'+
        //  '</div>' ;
        //   }
              if(items.pro_defind){
              course_programer += '<div class="card-body-content">'+
                                       '<span>'+items.pro_defind+'</span>'+
                                  '</div>';
              }
              course_programer+= '</div>'+
        '</div>'+
    '</div>'+
    '<div class="card-footer">'+
         '<div class="card-title">'+
            '<h4>'+items.pro_tittle+'</h4>'+
            '<h5>'+items.pro_sub+'</h5>'+
         '</div>';
         if(items.pro_card_title_heading){
          course_programer+= '<div class="card-prices">'+
              '<h3>'+ items.pro_card_title_heading +'</h3>'+
              '<h4>';
              if(items.pro_card_disconut){
                course_programer+=  '<span class="discount">'+'<del>'+items.pro_card_disconut+'</del>'+'</span>';
              }
              course_programer+= '<span class="offer">'+items.pro_card_title_price+'</span>'+ '</h4>'+
              '<h5>'+items.pro_card_date+'</h5>'+
         '</div>';
         }
         course_programer+=  '</div>'+
    '</div>'
  });

  if ($('div').hasClass('programer-card-slider')) {
    $('.programer-card-slider').append(course_programer);
    $('.programer-card-slider')[0].slick.refresh();
   }

    });
}