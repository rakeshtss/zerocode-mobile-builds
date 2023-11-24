if (window.jQuery) {
    var $ = jQuery;
    var apiUrl = zc.config.apiUrl;
    $("#hide").click(function () {
        $("p").hide();
    });

    $("#show").click(function () {
        $("p").show();
    });
    $(document).ready(function () {
        $("#Ajaxbutton").click(function () {
            $("#div1").load("/assets/widgets/sample/demo_test.txt");
        });
        $(".descendants").children().css({ "color": "red", "border": "2px solid red" });
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

}