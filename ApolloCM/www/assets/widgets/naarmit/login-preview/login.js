if (window.jQuery) {
  var $ = jQuery;
  var apiUrl = zc.config.apiUrl;
  $(document).ready(function () {
    function getImageOnPageLoad() {
      var incorPreviewImage = document.getElementById("loginPreview");
      var randomIndex = Math.floor(Math.random() * 1);
      console.log('randomIndex', randomIndex);
      incorPreviewImage.src = `assets/themes/naarmit/images/login-bg-${randomIndex}.jpg`;
    }
    window.onload = getImageOnPageLoad();
  });
}
