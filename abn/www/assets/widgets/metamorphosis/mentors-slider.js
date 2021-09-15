if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }
    $(document).ready(function () {
        var mentorsList = [];
        var url = zc.config.apiUrl
        var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
        function getMentorsList() {
            //getting question list
            $.ajax({
                url: url + 'metamorphosis/api/user/list/user-mentors-list',
                type: 'POST',
                dataType: 'json',
                headers: header,
                data: JSON.stringify({ page: 1, rows: 500, sort: [], dependents: {} }),
                success: function (res) {
                    if (res && res.data && res.data.listData) {
                        allMentorsList = res.data.listData.rows;
                        var mentorsList = [];
                        allMentorsList.forEach(function (obj, ind) {
                            if (obj.display_in_homepage.name == 'Yes') {
                                // console.log('obj.display_in_homepage.name', obj);
                                mentorsList.push(obj);
                                // console.log('mentorsListF', mentorsList);
                            }
                        })
                        console.log('mentorsListF12', mentorsList);
                        var mentor = "";
                                mentorsList.forEach(function (item) {

                                    mentor += '<div class="card">' +
                                        '<img  alt="" src="' + zc.config.fileServer + 'get/' + item.pic[0].path + '" />' +
                                        '<div class="card-body text-center">' +
                                        '<h5 class="card-title">' + (item.first_name != null ? item.first_name : ' ') + '</h5>' +
                                        '<p>' + (item.title != null ? item.title : ' ') + '</p>' +
                                        '</div>' +
                                        '</div>'
                                });
                        if ($('div').hasClass('allMentors')) {
                            $(".allMentors").append(mentor);
                            $('.allMentors')[0].slick.refresh();
                        }
                        // mentorsList = res.data.listData.rows;
                        // console.log('mentors', mentorsList);

                    }
                }

            })
        }
        getMentorsList();
// console.log('mentorsListOut', mentorsList);
        $('.allMentors').slick({
            dots: true,
            infinite: true,
            speed: 900,
            autoplay: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: false,
            draggable: true,
            centerMode: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 340,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    })
}