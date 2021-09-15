var curriculamMetaCoreList = [
    {
        "semister": "Semester I",
        "topics": [
            "Introduction about the course",
            "Introduction to Entrepreneurship",
            "Ideation",
            "Customer Demographics",
            "Idea Validation",
            "Value Proposition",
            "Industrial Internship - I"
        ]
    },
    {
        "semister": "Semester II",
        "topics": [
            "Market Research",
            "Competitor Analysis",
            "Willingness to Pay",
            "Market Sizing",
            "Business Modelling",
            "Industrial Internship - II"
        ]
    },
    {
        "semister": "Semester III",
        "topics": [
            "Financial Modelling",
            "Introduction to Legal Terms",
            "Wireframing and Prototyping",
            "Digital Transformation",
            "Industrial Internship"
        ]
    },
    {
        "semister": "Semester IV",
        "topics": [
            "New Venture Creation"
        ]
    },
]
var metaList = $('#metaList');

$.each(curriculamMetaCoreList, function(i, o){
    var metaBlock = $('<div/>',{class:'semister-blcok'});
    var metaSpan1 = $('<span />',{text: o.semister, class:'semister-span'});
    metaBlock.append(metaSpan1);
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