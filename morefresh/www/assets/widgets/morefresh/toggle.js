if(!$){
    var $ = jQuery;
  }
  
  $(document).ready(function () {
    $('.expand-collapse').css({
        'fontSize':'32px',
        'color':'#999'
    })
      var toggleIcon = document.getElementById('block_7654');
      $('.expand-collapse').click(function(){
        // alert('123');
        $(this).toggleClass('icon-angle-up-1');
        $('.zc-category-list .ui-table-tbody').toggleClass('expand');
      })
  });