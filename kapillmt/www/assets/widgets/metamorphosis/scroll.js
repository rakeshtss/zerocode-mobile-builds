// document.getElementById('getStarted').addEventListener('click', () => {
//   document.getElementById('program_overview').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
// });
// document.getElementById('programLink').addEventListener('click', () => {
//   document.getElementById('program_overview').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
// })
// document.getElementById('conatctLink').addEventListener('click', () => {
//   document.getElementById('zc_footer').scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
// });
// document.getElementById('watchTrailer').addEventListener('click', () => {
//   console.log('watchTrailer');
//   var redirectWindow = window.open('http://google.com', '_blank');
//   redirectWindow.location;
// });

$("#programLink").click(function () {
  $('html, body').animate({
    scrollTop: $("#program_overview").offset().top - 30
  }, 1000, 'linear');
});
$("#getStarted").click(function () {
  $('html, body').animate({
    scrollTop: $("#program_overview").offset().top - 30
  }, 1000, 'linear');
});
$('#btnExplore').click(function () {
  setTimeout(function () {
    $('html, body').animate({
      scrollTop: $("#program_overview").offset().top - 30
    }, 1000);
  }, 1000)
});
$('[data-toggle="popover"]').popover();
// $('#popover_video').popover({
//   html: true, 
//   template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
// });
// $("#pop-video").popover({
//   html: true, 
//   content: function() {
//     return $('#popover-content').html();
//   }
// });
// $("#PopS").popover({
//   html: true,
//   trigger: 'hover',
// }).on('shown.bs.popover');