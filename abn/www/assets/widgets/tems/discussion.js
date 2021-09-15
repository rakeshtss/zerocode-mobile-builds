if(!$){
  var $ = jQuery;
}

$(document).ready(function () {
  var chat_list = [];
  var discussionTabsContainer = $('.question-container');
  var replyList = "";
  var chat_list = [];
  // var url = 'https://fc-test.zeroco.de/zc-v3.1-user-svc/2.0/metamorphosis/'
  var url = zc.config.apiUrl;
  var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };

  function getChatList() {

    //getting question list
    $.ajax({
      url: url + 'tems/api/discussion_questions/list/discussion-questions-list',
      type: 'POST',
      dataType: 'json', // added data type
      headers: header,
      data: JSON.stringify({page: 1, rows: 10, sort: [], dependents: {}, batch: {uid: zc.params.uid}}),
      success: function (res) {
        if (res && res.data && res.data.listData) {
          chat_list = res.data.listData.rows;
          if (chat_list && chat_list.length) {
            $.each(chat_list, function (i, o) {
             var activeStatus = moment(new Date(o.created_time)).fromNow();
              /* Main comment box */
              var discussionTabs = $('<div>', { 'class': 'tab-accords discussion-tabs' });
              var discussionTabsHeader = $('<div>', {
                class: 'tab-accords-header', click: function () {
                  $(this).toggleClass("active");
                  $(this).next().toggle();
                }
              });

              //Dynamic Element creation for questions and repply list
              let discussionTabsBody = $('<div>', { 'class': 'tab-accords-body' });
              let discussionTabsBodyList = $('<ul>', { class: 'reply_list' });
              let div = $('<div>', { 'class': 'tab-accords-body-left' }).append('<img src="assets/themes/tems/images/user.png">');
              let divRight = $('<div>', { 'class': 'comment-box w-100 tab-accords-body-right' });

              var discussionTabsReply = $('<li>');

              discussionTabsReply.append(div);
              discussionTabsReply.append(divRight);

              var discussionTabsBox = $('<textarea>', { id: 'chat_box_' + i, dataIndex: i, class: 'chat-box w-100 form-control mb-1', row: 6, placeholder: 'Leave a reply...' });

              //Inserting replies
              let btnSubmit = $('<button>', {
                text: 'Post', class: 'btn btn-sm btn-primary btn-submit', click: function () {
                  if($('#chat_box_' + i).val().length){
                    $.ajax({
                      // url: url+'/api/discussion_questions/list/discussion-questions-list',
                      url: url + 'tems/api/discussion_reply/save-update/discussion-reply-save',
                      type: 'POST',
                      dataType: 'json', // added data type
                      headers: header,
                      data: JSON.stringify({ "reply": $('#chat_box_' + i).val(), "discussions_question": { "uid": o.uid } }),
                      success: function (res) {
                        if (res) {
                          $('#chat_box_' + i).val("");
                          $('.question-container').empty();
                          getChatList();
                        }
                      }
                    })
                  }
                }
              });

              divRight.append(discussionTabsBox);
              divRight.append(btnSubmit);
              let commentCount = o.discussions_reply.length? o.discussions_reply.length: '';
              //question list
              chatListHeader = `<div class="tab-accords-header-left">
                <div class="tab-accords-header-left-img">
                  <img src="assets/themes/tems/images/user.png">
                </div>
              </div>
              <div class="tab-accords-header-right">
                <h3><span>${o.created_id.first_name}</span> <span class="accordian-arrow icon-caret-right-1"></span></h3>
                <p>${o.question}</p>
                <div class="post-actions">
                  <div class="post-actions-left user-actions" id="userAction${i}">
                    <!-- <a href="javscript:void(0)">Like</a>
                     <a href="javscript:void(0)">Unfollow Thread</a>-->
                     <a href="javscript:void(0)" class="reply">Reply</a>
                     <span class="active-time">${activeStatus}</span>
                  </div>
                  <div class="post-actions-right">
                    <!--<span><i class="icon-thumbs-up"></i><span class="thumbs-count">${o.thumbsCount}</span></span>-->
                    <span><i class="icon-comment"></i><span class="comments-count">${commentCount}
                    </span></span>
                  </div>
                </div>
              </div>`;

              discussionTabsHeader.append(chatListHeader);
              discussionTabs.append(discussionTabsHeader);
              discussionTabsBody.hide();
              if(i == 0) {
                discussionTabsBody.show();
              }
              //repply list
              if (o.discussions_reply && o.discussions_reply.length) {
                $.each(o.discussions_reply, function (ind, val) {
                  // if (o.uid === val.uid) {
                    var repliedTimeValue = moment(new Date(val.created_time)).fromNow();
                    // console.log('repliedTimeValue', repliedTimeValue, val.reply);
                  val.reply = val.reply !== null ? val.reply : 'No reply';
                  // var repliedTime = $("<span/>",{text: repliedTimeValue, class: 'active-time', id:`repliedTimeId${i}${ind}`})
                  replyList = `
                          <li>
                            <div class="tab-accords-body-left">
                              <img src="assets/themes/tems/images/user.png">
                            </div>
                            <div class="tab-accords-body-right">
                              <h3>${o.created_id.first_name}</h3>
                              <p>${val.reply}</p>
                              <div class="post-actions">
                                <div class="post-actions-left" id="postAction${i}${ind}">
                                  <a>Like</a>
                                  <span class="active-time">${repliedTimeValue}</span>
                                </div>
                              </div>
                            </div>
                          </li>`;
                          // if(repliedTime){
                          //   $(`#postAction${i}${ind}`).append(repliedTime);
                          // }
                  discussionTabsBodyList.append(replyList);
                  replyList = '';
                  // }
                });
              }

              discussionTabsBody.append(discussionTabsBodyList);
              discussionTabsBodyList.append(discussionTabsReply);

              discussionTabs.append(discussionTabsBody);
              discussionTabsContainer.append(discussionTabs);
              chatListHeader = "";
            });
          }
        }
      }
    });
  }

  //opning repply list
  $('.reply').click(function (event) {
    event.stopPropagation();
    $(this).parent().parent().parent().parent().next().toggle();
  });

  //Inserting the question
  $('#submitComment').click(function () {
    event.stopPropagation();
    event.preventDefault();
    if( $('#commentBox').val().length){
      $.ajax({
        // url: url+'/api/discussion_questions/list/discussion-questions-list',
        url: url + 'tems/api/discussion_questions/save-update/discussion-questions-save-update',
        type: 'POST',
        dataType: 'json', // added data type
        headers: header,
        data: JSON.stringify({ question: $('#commentBox').val(), batch: { uid: zc.params.uid } }),
        success: function (res) {
          if (res) {
            $('#commentBox').val("");
            $('.question-container').empty();
            getChatList();
          }
        }
      })
    }
  });
  //Method call
  getChatList();
});