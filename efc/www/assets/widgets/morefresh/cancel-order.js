if(!$){
    var $ = jQuery;
  }
  
  $(document).ready(function () {
    
    var url = zc.config.apiUrl;
    var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
    
    function getChatList() {
  
      //getting question list
      $.ajax({
        url: url + 'morefresh/api/user_cart/list/user-cart-list',
        type: 'POST',
        dataType: 'json', // added data type
        headers: header,
        data: JSON.stringify({page: 1, rows: 10, sort: [], dependents: {}, batch: {uid: zc.params.uid}}),
        success: function (res) {
          if (res && res.data && res.data.listData) {
            var cart_list = res.data.listData.rows;
            var cart_data= "";
            if (cart_list && cart_list.length) {
              $.each(cart_list, function (i, o) {
                var cart_product = o.product;
                console.log('0', o);
                // var img_path= "https://dev-apis.zeroco.de/zc-v3.1-fs-svc/2.0/morefresh/get/";
                cart_data+= '<li>'+
                    '<div class="zc-cart-card">'+
                    '<div class="zc-cart-card-body">'+
                        '<div class="confirm-check">'+
                            "<input type='checkbox' name='otderItem' value='"+ JSON.stringify(o) +"'>"+    
                        '</div>'+ 
                        '<div class="row-image">'+
                            '<img class="cart-product-img"  src="' + zc.config.fileServer + 'get/' + cart_product.image[0].path + '"  alt="Card image">'+
                        '</div>'+ 
                        '<div class="zc-cart-item-quantity">'+
                            '<h3>'+ cart_product.name +'</h3>'+
                            '<div class="order-qunatity-discount">'+
                                '<h4>'+ o.quantity +'<span class="qty-name">'+ cart_product.qty_type.name +'</span></h4>'+
                                '<p class="item-discount-percent">30% Off</p>'+
                            '</div>'+
                        '</div>'+
                        '<div class="item-price">'+
                            '<h4>₹<span>'+ cart_product.product_price.selling_price +'</span></h4>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                '</li>'
                
                
              });
              $('.cancel-orders-list').append(cart_data);
            }
          }
        }
      });
    }
    getChatList();
    var proceedCancelOrder = document.getElementById('proceedCancelBtn');
    var selectedItemsList = [];
    $(proceedCancelOrder).click(function(){
      selectedItemsList = [];
      $("input:checkbox[name=otderItem]:checked").each(function(){
        let obj = JSON.parse($(this).val());
        console.log('obj', obj);
        selectedItemsList.push(obj);

    });
    console.log('selectedItemsList', selectedItemsList);
    })
  });