var overviewList = [
    "Case Study Based Learning",
    "Exposure to the Entrepreneurial Ecosystem",
    "Entrepreneurship Olympiad",
    "Guest Talks and Webinars",
    "Virtual B-Plan Competition",
    "Internship",
    "Solving Problem Statements",
    "Proctor Guidance",
    "Mentoring from Subject Matter Experts",
    "Capstone Project",
    "Networking Events & Meetups",
    "Soft Skills Development"
];
var overviewDiv = $('#zc-program_overview');
$.each(overviewList, function(i, o){
    console.log('oo', o);
    var overviewListDiv = $('<div />',{class: 'zc-card'});
    var overviewListSpan = $('<span />',{text: o});
    overviewListDiv.append(overviewListSpan);
    overviewDiv.append(overviewListDiv);
})