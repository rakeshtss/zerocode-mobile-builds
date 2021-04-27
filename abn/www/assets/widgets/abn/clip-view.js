if(!$){
    var $ = jQuery;
}
var zc;
$(document).ready(function () {
    var apiUrl = zc.config.apiUrl+zc.config.client;
    let payload = {'uid': zc.params.module};
    // var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
    var clipUrl, clipData, clipImage,modalClipImage;
    var clipViewImage = $('#clipViewImage');
    var modalClipViewImage = $('#modalClipViewImage');
    var clipViewShareWidget = $('#clipViewShareWidget');
    $.ajax({
        url: `${apiUrl}/api/user_clip/select`,
        type: "POST",
        dataType: "json",
        data: payload,
        success: function (res) {
            clipData = res.data;
            zc.showclips = true;
            zc.clip = clipData;
            console.log('clip view', clipData);
            let baseClipUrl = zc.config.E_PAPER_S3_URL+clipData?.edition?.edition_info?.basePath;
            clipUrl = clipData.jpg_path;
            clipImage = $("<img />",{src: baseClipUrl+clipUrl, alt: 'Clip Image'});
            modalClipImage = $("<img />",{src: baseClipUrl+clipUrl, alt: 'Clip Image'});
            clipViewImage.append(clipImage);
            $('#exampleModal').on('show.bs.modal', function (event) {
                // console.log('clicked');
                modalClipViewImage.append(modalClipImage);
            })
            let shareLinks = `
            <a href="${baseClipUrl}${clipData.edition.edition_info.fullPdf}" download class="btn btn-outline-secondary btn-open"><i class="icon-cloud-download-1"></i> <span>Download</span></a>
            <a  class="btn btn-outline-secondary btn-open"><i class="icon-external-link"></i> <span>Full Page</span></a>
            <a onclick="shareClip('fb')" class="btn btn-primary btn-facebook"><i class="icon-facebook"></i> <span>Facebook</span></a>
            <a onclick="shareClip('twitter')" class="btn btn-primary btn-twitter"><i class="icon-twitter"></i> <span>Tweet</span></a>
            <a class="btn btn-primary btn-email" onclick="zc.zc_modal_683.open()"><i class="icon-envelope"></i> <span>Email</span></a>`;
            // clipViewShareWidget.append(shareLinks);
        }
    })
})
function shareClip(type) {
    const params = new URLSearchParams();
    if (type == 'fb') {
      params.set('u', window.location.href);
      const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?' + params;
      window.open(fbShareUrl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=400,width=650,height=450");
    } else if (type == 'twitter') {
      params.set('url', window.location.href);
      const twitterShareUrl = 'https://twitter.com/share?' + params;
      window.open(twitterShareUrl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=400,width=650,height=450");
    }
}