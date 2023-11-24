// if (window.jQuery) {
//     var $ = jQuery;
//     var apiUrl = zc.config.apiUrl;
  
//     $(document).ready(function () {
//         var mentors = [
//             {
//               "imgUrl": "assets/themes/metamorphosis/images/prasannaLohar.png",
//               "name": "Prasanna Lohar",
//               "designation": "Head Innovation &",
//               "destination": "Architecture DCB Bank"
//             },
//             {
//               "imgUrl": "assets/themes/metamorphosis/images/best-3.jpg",
//               "name": "Pavan Allena",
//               "designation": "Founder & CEO",
//               "destination": "Metamorphosis Edu"
//             },
//             {
//               "imgUrl": "assets/themes/metamorphosis/images/best-4.jpg",
//               "name": "J A Chowdhary",
//               "designation": "Entrepreneur, Mentor",
//               "destination": "Influencer"
//             },
//             {
//               "imgUrl": "assets/themes/metamorphosis/images/best-5.jpg",
//               "name": "Sudhakar Rao",
//               "designation": "Director",
//               "destination": "Branding, ICFAI Group"
//             },
//             {
//               "imgUrl": "assets/themes/metamorphosis/images/best-6.jpg",
//               "name": "Samvit Durga",
//               "designation": "Co-founder & CEO",
//               "destination": "Metamorphosis Edu"
//             }
//         ];
//         var mentorsList = "";
//         mentors.forEach(function (item) {
//             mentorsList += '<div class="card">' +
//             '<img  alt="" src="' + item.imgUrl + '" />' +
//             '<div class="card-body text-center">' +
//             '<h5 class="card-title">' + item.name + '</h5>' +
//             '<p>' + item.designation + '</p>' +
//             '<p>' + item.destination + '</p>' +
//             '</div>' +
//             '</div>'
//         });
//         if ($('div').hasClass('mentors')) {
//           $(".mentors").append(mentorsList);
//         }
//     })
// }