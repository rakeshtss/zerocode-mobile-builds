if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    if (!$) {
        var $ = jQuery;
    }
    $(document).ready(function () {
        var more_images = [];
        var url = zc.config.apiUrl
        var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
        function getSliderList() {
            let payload = {};
            if(zc.ageOfFile?.length > 0){
                payload.age = zc.ageOfFile;
            }
            if(zc.fetchMode) {
                payload.fetchMode = zc.fetchMode;
            }
            
            if(zc.wdExperience?.selected?.length > 0){
                payload.experience = zc.wdExperience.selected.map(item => {return item.name});
            }
            if(zc.wdAge?.selected?.length > 0){
                payload.age = zc.wdAge.selected.map(item => {return item.name});
            }
            if(zc.wdTopIndustries?.selected?.length > 0){
                payload.industry = zc.wdTopIndustries.selected.map(item => {return item.name});
            }
            if(zc.wdLocations?.selected?.length > 0){
                payload.region = zc.wdLocations.selected.map(item => {return item.name.split('-')[1].toString().toUpperCase()});
            }
            if(zc.wdTechnologies?.selected?.length > 0){
                payload.technology = zc.wdTechnologies.selected.map(item => {return item.name});
            }
            if(zc.wdCloudTags?.selected?.length > 0 ){
                payload.skill = zc.wdCloudTags.selected.map(item => {return item.name});
            }
            if(zc.wdFilter?.model?.flResumeType) {
                payload.resume_group = { uid: zc.wdFilter.model.flResumeType.map(t => { return t.uid })};
            }
            if(zc.rgGlobalSearch) {
                payload.rgGlobalSearch = zc.rgGlobalSearch;
            }
            payload.page = 1;
            payload.rows = 500;

            console.log('company payload -->', payload);
            var apiUrl = (zc.fetchMode === 'history') ? 'api/resume_details/list/group-count-from-employment-history' : 'api/resume_details/list/company-group-count';
            $.ajax({
                url: url + '/recreuitergiene/' + apiUrl,
                type: 'POST',
                dataType: 'json',
                headers: header,
                data: JSON.stringify(payload),
                success: function (res) { 
                    if (res && res.data && res.data.listData) {
                        more_images = res.data.listData.rows;
                        var slide = "";
                        more_images.forEach(function (item) {
                            if(item?.data != null){
                            slide += '<div>'+
                                        // '<div>'  + item.data+ '</div>' +
                                       '<img  alt="" src="' + zc.config.fileServer + 'get/' + item?.logo[0]?.path + '" />' +    
                                     '</div>'
                            }
                        });
                        $(".company-images-slider").append(slide);
                        if ($('div').hasClass('company-images-slider')) {
                            $('.company-images-slider')[0].slick.refresh()
                        }
                    }
                }

            })
        }
        getSliderList();
        // $('.company-images-slider').slick({
        //     arrows: true,
        //     dots: true,
        //     infinite: true,
        //     speed: 900,
        //     autoplay: true,
        //     autoplaySpeed: 2000,
         
        //     slidesToShow: 8,
        //     slidesToScroll: 8
        // });
        $('.company-images-slider').slick({
            arrows: true,
            infinite: true,
            autoplay: false,
            speed: 900,
            slidesToShow: 8,
            slidesToScroll:8,
            centerMode: false
          });
    })
}