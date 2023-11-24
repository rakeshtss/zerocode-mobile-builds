// var curriculamMetaXList = [
//     {
//         "semister": "Semester I",
//         "topics": [
//             "Developing Emotional Intelligence",
//             "Business Presentation Skills",
//             "Ethics and Values"
//         ]
//     },
//     {
//         "semister": "Semester II",
//         "topics": [
//             "Building a profile",
//             "Leadership and Influencing Skills"
//         ]
//     },
//     {
//         "semister": "Semester III",
//         "topics": [
//             "Handling Failures",
//             "Writing Skills"
//         ]
//     }
// ]
var curriculamMetaXList = [
    {
        "semister": "Semester I",
        "topics": [
            "Developing Emotional Intelligence",
            "Business Presentation Skills",
            "Ethics and Values",
            "Building a profile",
            "Leadership and Influencing Skills",
            "Handling Failures",
            "Writing Skills"
        ]
    }
]
var metaList = $('#metaList3');

$.each(curriculamMetaXList, function(i, o){
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