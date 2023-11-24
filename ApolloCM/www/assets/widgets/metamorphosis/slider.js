
if (window.jQuery) {
  var $ = jQuery;
  var apiUrl = zc.config.apiUrl;
  if(!$){
    var $ = jQuery;
  }
  $(document).ready(function () {

    var AboutSlider = [
      {
        "imgUrl": "assets/themes/metamorphosis/images/schoolBoy.png",
        "aboutUser": {
          "name": "Abhiram Vella",
          "board": "Grade XI, CBSE",
          "destination": "The Doon School, Dehradun"
        },
        "aboutInstitute": "“This is a platform that every budding entrepreneur desires and deserves”",
        "perception": "The team at Metamorphosis Edu not only helped in validating my idea but also helped me in finding the right industry mentors and build connections to scale up my venture."
      }, {
        "imgUrl": "assets/themes/metamorphosis/images/best-4.jpg",
        "aboutUser": {
          "name": "J A Chowdary",
          "board": "Entrepreneur,",
          "destination": "Mentor and Influencer"
      },
      "aboutInstitute": `"Introducing creativity as a culture is the exact thing that education ecosystem needs right now"`,
      "perception": `“Metamorphosis is doing a terrific job exposing students to an innovative and creative culture at a very young age. This helps in students unfurling their creativity instead of bottling it up and it is a great platform for them to think out of the box.”`
      }, {
        "imgUrl": "assets/themes/metamorphosis/images/parent.jpg",
        "aboutUser": {
          "name": "Parent",
          "board": "CHIREC International School,",
          "destination": "Hyderabad",
      },
      "aboutInstitute": `"Metamorphosis Edu is a vantage point that helps students see beyond the set horizons"`,
      "perception": `“The entrepreneurial skill set which students are gaining by being a part of Metamorphosis Edu gives them a 360 degree view of what’s happening around the world.”`
      }
    ];

    // var bestSchool = [
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Prasanna-Lohar.jpg",
    //     "name": "Prasanna Lohar",
    //     "designation": "Head Innovation &",
    //     "destination": "Architecture DCB Bank"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Pavan.jpg",
    //     "name": "Pavan Allena",
    //     "designation": "Founder & CEO",
    //     "destination": "Metamorphosis Edu"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/JA-Chowdhary.jpg",
    //     "name": "J A Chowdhary",
    //     "designation": "Entrepreneur, Mentor",
    //     "destination": "Influencer"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Samvit.jpg",
    //     "name": "Samvit Durga",
    //     "designation": "Co-founder & CEO",
    //     "destination": "Metamorphosis Edu"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Nitin-Jaiswal.jpg",
    //     "name": "Nitin Jaiswal",
    //     "designation": "Senior Executive - Financial",
    //     "destination": "Technology Industry"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Hitesh.jpg",
    //     "name": "Hitesh",
    //     "designation": "",
    //     "destination": ""
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Meenakshi.jpg",
    //     "name": "Meenakshi Uberoi",
    //     "designation": "Education Evangelist & CEO",
    //     "destination": "De Pedagogics"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Paul-Kitchen.jpg",
    //     "name": "Paul Kitchen",
    //     "designation": "",
    //     "destination": ""
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Raja-Pappu.jpg",
    //     "name": "Prof. Raja Pappu",
    //     "designation": "Educationalist, Entrepreneur &",
    //     "destination": "Enabler"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Shrutidhar-Pailwal.jpg",
    //     "name": "Shrutidhar Pailwal",
    //     "designation": "Chief Executive Officer",
    //     "destination": "Framtix Holdings AB"
    //   },
    //   {
    //     "imgUrl": "assets/themes/metamorphosis/images/Srinivas-Mantha.jpg",
    //     "name": "Srinivas Mantha",
    //     "designation": "Advisor, Edupreneur &",
    //     "destination": "COO at SPOTCHECK"
    //   }
    // ];

    // $('.allEnterpenurs').slick({
    //   dots: true,
    //   speed: 900,
    //   autoplay: true,
    //   slidesToShow: 6,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   draggable: true,
    //   centerMode: true,
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 1,
    //         infinite: true,
    //         dots: true
    //       }
    //     },
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1
    //       }
    //     },
    //     {
    //       breakpoint: 575,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1
    //       }
    //     },
    //     {
    //       breakpoint: 340,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //       }
    //     }
    //   ]
    // });
    // $('.allEnterpenurs').owlCarousel();
    // var bestForUs = "";
    // bestSchool.forEach(function (item) {
    //   bestForUs += '<div class="card">' +
    //     '<img  alt="" src="' + item.imgUrl + '" />' +
    //     '<div class="card-body text-center">' +
    //     '<h5 class="card-title">' + item.name + '</h5>' +
    //     '<p>' + item.designation + '</p>' +
    //     '<p>' + item.destination + '</p>' +
    //     '</div>' +
    //     '</div>'
    // });
    // if ($('div').hasClass('allEnterpenurs')) {
    //   $(".allEnterpenurs").append(bestForUs);
    //   $('.allEnterpenurs')[0].slick.refresh();
    // }

    $('.school-slider').slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000
    });

    var aboutUsUser = "";
    AboutSlider.forEach(function (item) {
      aboutUsUser += '<div class="school_program">' +
        '<div class="row school_member">' +
        '<div class="col-md-4 SeanNelson">' +
        `<img id="userImg" alt="" src="${item.imgUrl}" />` +
        '<div class="user-details_boy d-block d-md-none">' +
        '<h4>' + item.aboutUser.name + '</h4>' +
        '<p>' + item.aboutUser.board + '</p>' +
        '<p>' + item.aboutUser.destination + '</p>' +
        '</div>' +
        '</div>' +

        '<div class="col-md-8 finish_school">' +
        '<div class="user-description">' +
        '<h3>' + item.aboutInstitute + '</h3>' +
        '<p>' + item.perception + '</p>' +
        '</div>' +

        '<div class="user-details d-none d-md-block">' +
        '<h4>' + item.aboutUser.name + '</h4>' +
        '<p>' + item.aboutUser.board + '</p>' +
        '<p>' + item.aboutUser.destination + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    });
    if ($('div').hasClass('school-slider')) {
      $('.school-slider').append(aboutUsUser);
      $('.school-slider')[0].slick.refresh();
    }
  });
}
