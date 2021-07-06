if (!$) {
    var $ = jQuery;
}
var zc;
$(document).ready(function () {
    var apiUrl = zc.config.apiUrl + zc.config.client;
    let payload = { 'uid': zc.params.module };
    // var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
    var clipUrl, clipData, clipImage, modalClipImage;
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
            let baseClipUrl = zc.config.E_PAPER_S3_URL + clipData?.edition?.edition_info?.basePath;           
            clipUrl = (isWebpSupport()) ? clipData.webp_path : clipData.jpg_path;
            clipImage = $("<img />", { src: baseClipUrl + clipUrl, alt: 'Clip Image' });
            modalClipImage = $("<img />", { src: baseClipUrl + clipUrl, alt: 'Clip Image' });
            clipViewImage.append(clipImage);
            $('#exampleModal').on('show.bs.modal', function (event) {
                // console.log('clicked');
                modalClipViewImage.append(modalClipImage);
            })
            let shareLinks = `
            <a href="${baseClipUrl}${clipData.jpg_path}" class="btn btn-outline-secondary btn-open"><i class="icon-cloud-download-1"></i> <span>Download</span></a>
            <a href="/${clipData.edition.uid}/${clipData.edition.sub_category.code}/${clipData.edition.date.split('-').reverse().join('-')}" class="btn btn-outline-secondary btn-open"><i class="icon-external-link"></i> <span>Full Page</span></a>
            <a onclick="shareClip('whatsapp')" class="btn btn-primary btn-success"><i class="icon-whatsapp"></i> <span>WHATSAPP</span></a>
            <a onclick="shareClip('fb')" class="btn btn-primary btn-facebook"><i class="icon-facebook"></i> <span>Facebook</span></a>
            <a onclick="shareClip('twitter')" class="btn btn-primary btn-twitter"><i class="icon-twitter"></i> <span>Tweet</span></a>
            <a class="btn btn-primary btn-email" onclick="zc.zc_modal_683.open()"><i class="icon-envelope"></i> <span>Email</span></a>`;
            $('#shareButtons').html(shareLinks);
            // clipViewShareWidget.append(shareLinks);
        }
    })
})
function isWebpSupport() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    else {
        // very old browser like IE 8, canvas not supported
        return false;
    }
}
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
    } else if (type == 'whatsapp') {
        var whatShareUrl = "https://api.whatsapp.com/send?text=" + window.location.href;
        // var clipUrl = zc.config.application_url+"/c/"+zc.params.module;
        window.open(whatShareUrl);
    }
}