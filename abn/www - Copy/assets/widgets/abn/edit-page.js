if (!$) {
    var $ = jQuery;
}
var sections = [];
var sectionData = [];
var headers = { 'Content-Type': 'application/json' };
var pages = [];
var sectionPages = [];
var sortedPages = [];
var editionDetails = {};
var pagesAvailableSections = [];
var selectedSection = {};
$(document).ready(function () {
    // getSections();
    if (zc && zc.user && zc.user.token) {
        headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
    }
    getEditionDetails();
    // $('.loader-wrap').fadeOut();
})

function getEditionDetails() {
    $('.loader-wrap').fadeIn();
    var payload = {};
    payload.uid = zc.params.uid;
    $.ajax({
        url: `${zc.config.apiUrl}abn/api/edition/select/issue-info`,
        type: "POST",
        dataType: "json",
        headers: headers,
        data: JSON.stringify(payload),
        success: function (res) {
            // console.log('res -->', res);
            editionDetails = res.data;
            if (editionDetails.edition_meta && editionDetails.edition_meta.edition_full_info && editionDetails.edition_meta.edition_full_info.pages) {
                pages = editionDetails.edition_meta.edition_full_info.pages;
                if (!editionDetails.edition_meta.edition_full_info.sections) {
                    editionDetails.edition_meta.edition_full_info.sections = [];
                }
            }
            // generatePages();
            getSections();
            // $('.loader-wrap').fadeOut();
        }
    })
}

function getSections() {
    // $('.loader-wrap').fadeIn();
    var payload = {};
    payload.category = editionDetails.category.code;
    payload.sub_category = editionDetails.sub_category.code;
    payload.sub_sub_category = editionDetails.sub_sub_category.code;
    $.ajax({
        url: `${zc.config.apiUrl}abn/api/section/list/`,
        type: "POST",
        dataType: "json",
        headers: headers,
        data: JSON.stringify(payload),
        success: function (res) {
            if (res.data && res.data.listData && res.data.listData.rows) {
                sections = res.data.listData.rows;
            }
            // editionDetails = res.data;
            // if (editionDetails.edition_meta && editionDetails.edition_meta.edition_full_info && editionDetails.edition_meta.edition_full_info.pages) {
            //     pages = editionDetails.edition_meta.edition_full_info.pages;
            //     if(!editionDetails.edition_meta.edition_full_info.sections) {
            //         editionDetails.edition_meta.edition_full_info.sections = [];
            //     }
            // }
            generateSections();
            // generatePages();
            //  $('.loader-wrap').fadeOut();
        }
    })
}

function generateSections() {
    $("#sections").empty();
    var _ul = $("<ul/>", { class: 'sections-ul' });
    var _li = $("<li/>", { class: 'sections-li', section: 0 });
    var _div = $("<div/>", { class: 'sections-div' });
    $(_li).addClass('active');
    var _secName = $("<a/>", {
        class: 'sections-name', text: "All Sections", click: function () {
            $('.sections-li').removeClass('active');
            $(this).parent().parent().addClass('active');
            // pages = 
            selectedSection = { uid: '', pages: [] };
            generatePages(pages);
        }
    });
    var _secCount = $("<span/>", { class: 'sections-count', text: pages.length });
    _div.append(_secName);
    _div.append(_secCount);
    _li.append(_div);
    _ul.append(_li);

    pagesAvailableSections = [];
    if (editionDetails.edition_meta && editionDetails.edition_meta.edition_full_info && editionDetails.edition_meta.edition_full_info.sections) {
        pagesAvailableSections = editionDetails.edition_meta.edition_full_info.sections;
    }

    sections.forEach((sec, inx) => {
        sectionPages = [];
        if (pagesAvailableSections.length) {
            var sectionDetails = pagesAvailableSections.find((item) => { return item.sectionId == sec.uid; });
            if (sectionDetails && sectionDetails.pages) {
                sectionPages = sectionDetails.pages;
            }
        }
        sec.pages = sectionPages;
        _li = $("<li/>", { class: 'sections-li', section: sec.uid });
        _div = $("<div/>", { class: 'sections-div' });
        _secName = $("<a/>", {
            class: 'sections-name', text: sec.name, click: function () {
                // debugger;
                var selectedSecPages = [];
                $('.sections-li').removeClass('active');
                $(this).parent().parent().addClass('active');
                sectionPages = [];
                if (pagesAvailableSections.length) {
                    var sectionDetails = pagesAvailableSections.find((item) => { return item.sectionId == sec.uid; });
                    if (sectionDetails && sectionDetails.pages) {
                        sectionPages = sectionDetails.pages;
                    }
                }
                sectionPages.forEach((pId) => {
                    var pInfo = pages.find((item) => { return item.pageId == pId; });
                    selectedSecPages.push(pInfo);
                });
                selectedSection = { uid: sec.uid, pages: selectedSecPages };
                generatePages(selectedSecPages);
                //  getSectionData(); sectionPages
            }
        });
        var pagesCount = 0;

        _secCount = $("<span/>", { class: 'sections-count', id: sec.uid, text: sectionPages.length });
        _div.append(_secName);
        _div.append(_secCount);
        _li.append(_div);
        _ul.append(_li);
    });
    $("#sections").append(_ul);
    generatePages(pages);
    $('.loader-wrap').fadeOut();
    setTimeout(() => {
        $('#sections > ul >li').droppable({
            'hoverClass': 'droppable-highlight',
            'drop': function (event, ui) {
                //send an ajax call to save the selected pages into the section
                //var sectionId = $(event.target).attr('name');
                var sectionId = $(this).attr('section');
                if (sectionId == 0 || !sectionId) {
                    // event.stopPropagation();
                    console.log('sectionId undefined');
                    return false;
                }
                console.log('sectionId -->', sectionId);
                var section = $(event.target);
                console.log('section -->', section);
                var pageSections = [];
                var sectionInfo = {};
                // console.log('section count', $(this).find('span').html());
                // console.log('section', section);
                var selectedPages = $('.section-data-ul .ui-selected');
                var selectedPagesIds = [];
                selectedPages.each(function () {
                    selectedPagesIds.push($(this).attr('page'));
                    if ('' != '') $(this).remove();
                });
                console.log('selectedPages -->', selectedPagesIds);
                if (!editionDetails.edition_meta.edition_full_info.sections) {
                    editionDetails.edition_meta.edition_full_info.sections = [];
                } else {
                    pageSections = editionDetails.edition_meta.edition_full_info.sections;
                }
                sectionInfo = pageSections.find((item) => { return item.sectionId == sectionId; });
                console.log('sectionInfo', sectionInfo);
                if (!sectionInfo) {
                    sectionInfo = {};
                    sectionInfo.sectionId = sectionId;
                    sectionInfo.pages = selectedPagesIds;
                    editionDetails.edition_meta.edition_full_info.sections.push(sectionInfo);
                } else {
                    var currentSectionPages = sectionInfo.pages;
                    selectedPagesIds.forEach((pageId) => {
                        var seletedPageInfo = currentSectionPages.find((id) => { return id == pageId; });
                        if (!seletedPageInfo) {
                            sectionInfo.pages.push(pageId);
                        }
                    });
                    pageSections = pageSections.filter((item) => { return item.sectionId != sectionId });
                    pageSections.push(sectionInfo);
                    editionDetails.edition_meta.edition_full_info.sections = pageSections;
                }
                $(this).find('span').html(sectionInfo.pages.length);
                console.log('section pages', editionDetails.edition_meta.edition_full_info.sections);
                // editionDetails.edition_meta.edition_full_info.sections = []
                // editionDetails.edition_meta.edition_full_info.pages = pages;
                $(".selected-page-popup").remove();
                updateEditionInfo();
            }
        });

    }, 200);

}

function generatePages(secPages) {
    console.log('pages -->', secPages);
    $("#pages").empty();
    var _ul = $("<ul/>", { class: 'section-data-ul' });
    secPages.forEach((page, inx) => {
        var _li = $("<li/>", { class: 'section-data-li', page: page.pageId });
        var _div = $("<div/>", {
            class: 'section-data-div'
        })
        var _imgDiv = $("<div/>", { class: 'img-div' })
        var _img = $("<img/>", { class: 'section-data-img', src: zc.config.E_PAPER_S3_URL + editionDetails.edition_info.basePath + page.thumbnailSmallWebp });
        var _name = $("<span/>", { class: 'section-data-span', text: page.name });
        var _close = $("<a/>", {
            href: 'javascript:;', class: 'icon-close', click: function (e) {
                e.stopPropagation();
                deletePage(page);
            }
        });
        var _secCount = $("<span/>", { class: 'img-number', text: inx + 1 });

        _imgDiv.append(_img);
        _imgDiv.append(_name);
        _imgDiv.append(_close);
        _div.append(_imgDiv);
        _div.append(_secCount);
        _li.append(_div);
        _ul.append(_li);
    });
    $("#pages").append(_ul);
    setTimeout(() => {
        $('.section-data-ul').selectable({
            cancel: 'img',
            filter: 'li'
        });
        $('.section-data-ul li ').unbind('click').click(function (evt) {
            //show the page options here
            // if(evt.target.type == "text"){return;}
            if (evt.ctrlKey) {
                $(evt.currentTarget).toggleClass('ui-selected');
                return;
            } else {
                zc.actionService.navigateByUrl(`/epa/editions/manage-edition/${zc.params.uid}`);
            }
        });
        $(".section-data-ul").sortable({
            scroll: true,
            containment: '.edit-page',
            scrollSensitivity: 100,
            scrollSpeed: 40,
            update: function (evt, ui) {
                console.log('update');
                console.log('evt', evt);
                console.log('ui', ui);
                sortedPages = [];
                var pageId;
                var pageInfo;
                $('ul.section-data-ul li').each(function (index) {
                    pageInfo = {};
                    // console.log('li > ', $(this));
                    // console.log('li page> ', $(this).attr('page'));
                    pageId = $(this).attr('page');
                    if (selectedSection && selectedSection.uid) {
                        pageInfo = selectedSection.pages.find((item) => { return item.pageId == pageId; })
                    } else {
                        pageInfo = pages.find((item) => { return item.pageId == pageId; })
                    }
                    pageInfo.index = index;
                    pageInfo.pageNo = index + 1;
                    sortedPages.push(pageInfo);
                    //console.log('pageInfo -->', pageInfo);


                    // var index = $(this).index();
                    // var text = $(this).text();
                    // var value = $(this).attr('value');
                    // alert('Index is: ' + index + ' and text is ' + text + ' and Value ' + value);
                });
                if (selectedSection && selectedSection.uid) {
                    selectedSection.pages = sortedPages;
                    sectionInfo = {};
                    sectionInfo.sectionId = selectedSection.uid;
                    sectionInfo.pages = selectedSection.pages.map((item) => { return item.pageId });
                    pagesAvailableSections = pagesAvailableSections.filter((item) => { return item.sectionId != sectionInfo.sectionId; });
                    pagesAvailableSections.push(sectionInfo);
                    editionDetails.edition_meta.edition_full_info.sections = pagesAvailableSections;
                } else {
                    pages = sortedPages;
                    editionDetails.edition_meta.edition_full_info.pages = pages;
                }
                updateEditionInfo();
            }
        });
        $('.section-data-ul li').draggable({
            'cursorAt': { 'top': 30, 'left': 50 },
            'addClasses': false,
            'cancel': 'li:not(".ui-selected")',
            'helper': function (event) {
                var numSelected = $('.section-data-ul .ui-selected').length;
                return $('<div class="selected-page-popup">' +
                    '<span class="selected-page-popup-title">' +
                    numSelected + ((numSelected > 1) ? " pages" : " page") + ' selected</span><span ' +
                    'class="de-btn-arrow selected-page-popup-arrow"></span></div>');
            }
        });
    }, 200);
}

function updateEditionInfo() {
    $('.loader-wrap').fadeIn();
    var payload = {};
    payload.uid = zc.params.uid;
    payload.edition_meta = editionDetails.edition_meta;
    $.ajax({
        url: `${zc.config.apiUrl}abn/api/edition/save-update/update-edition-info`,
        type: "POST",
        dataType: "json",
        headers: headers,
        data: JSON.stringify(payload),
        success: function (res) {
            console.log('res -->', res);
            if (selectedSection && selectedSection.uid) {
                generatePages(selectedSection.pages);
            } else {
                generatePages(pages);
            }

            $('.loader-wrap').fadeOut();
        }
    });
}

function deletePage(page) {
    var isDelete = confirm("Do you want to delete current page?");
    if (isDelete) {
        if (selectedSection && selectedSection.uid) {
            selectedSection.pages = selectedSection.pages.filter((item) => { return item.pageId != page.pageId });
            pagesAvailableSections = pagesAvailableSections.filter((item) => { return item.sectionId != selectedSection.uid; });
            sectionInfo = {};
            sectionInfo.sectionId = selectedSection.uid;
            sectionInfo.pages = selectedSection.pages.map((item) => { return item.pageId });
            pagesAvailableSections.push(sectionInfo);
            editionDetails.edition_meta.edition_full_info.sections = pagesAvailableSections;
            $('span#' + selectedSection.uid).html(sectionInfo.pages.length);
        } else {
            pages = pages.filter((item) => { return item.pageId != page.pageId });
            editionDetails.edition_meta.edition_full_info.pages = pages;
            editionDetails.edition_meta.edition_full_info.deleted = [];
            editionDetails.edition_meta.edition_full_info.deleted.push(page);
        }
        updateEditionInfo();
    }
}