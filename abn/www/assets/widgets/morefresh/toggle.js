if(!$){
    var $ = jQuery;
  }
  
  $(document).ready(function () {
    var listLength = zc.list_9329.table.rows.length;
    console.log('listLength', listLength);
    $('.expand-collapse').css({
        'fontSize':'32px',
        'color':'#999'
    })
    if(window.innerWidth <= 575) {
      if(listLength < 4) {
        $('.expand-collapse').hide();
      }
    } else {
      if(listLength < 5) {
        $('.expand-collapse').hide();
      }
    }
      var toggleIcon = document.getElementById('block_7654');
      $('.expand-collapse').click(function(){
        // alert('123');
        $(this).toggleClass('icon-angle-up-1');
        $('.zc-category-list .ui-table-tbody').toggleClass('expand');
      })
  });