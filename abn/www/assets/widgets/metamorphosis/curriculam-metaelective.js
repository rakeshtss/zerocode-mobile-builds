// var curriculamMetaElectiveList = [
//     {
//         "semister": "Semester I",
//         "topics": [
//             "Policy Entrepreneurship",
//             "Sports Entrepreneurship",
//             "Film Entrepreneurship",
//             "Human Resources Management"
//         ]
//     },
//     {
//         "semister": "Semester II",
//         "topics": [
//             "Project Management"
//         ]
//     },
//     {
//         "semister": "Semester III",
//         "topics": [
//             "Mergers & Acquisitons",
//             "Sales & Marketing Skills",
//             "Financial Markets"
//         ]
//     }
// ]
var curriculamMetaElectiveList = [
    {
        "semister": "Semester I",
        "topics": [
            "Policy Entrepreneurship",
            "Sports Entrepreneurship",
            "Film Entrepreneurship",
            "Human Resources Management",
            "Project Management",
            "Mergers & Acquisitons",
            "Sales & Marketing Skills",
            "Financial Markets"
        ]
    }
]
var metaList = $('#metaList2');

$.each(curriculamMetaElectiveList, function(i, o){
    var metaBlock = $('<div/>',{class:'semister-blcok'});
    var metaSpan1 = $('<span />',{text: o.semister, class:'semister-span'});
    // metaBlock.append(metaSpan1);
    var metaUl = $('<ul/>');

    $.each(o.topics, function(inx, obj){
        var metaLi = $('<li />');
        var metaSpan2 = $('<span />', {text: obj});
        metaLi.append(metaSpan2);
        metaUl.append(metaLi);

        metaList.append(metaUl);
    })
    metaBlock.append(metaUl);
    metaList.append(metaBlock);
})