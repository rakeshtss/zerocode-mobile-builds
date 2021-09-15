if (window.jQuery) {
  var $ = jQuery;
  var apiUrl = zc.config.apiUrl;
  if (!$) {
    var $ = jQuery;
  }
  $(document).ready(function () {
    var startIndex = 0;
    var endIndex = 1;
    var quizStartID = '';
    var url = zc.config.apiUrl
    var questionsList = [];
    var student_quiz_response = [];
    var interval;

    var header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + zc.user.token };
    $('.quiz-results').hide();
    $('.quiz-widget-list').hide();

    // contador();
    function getQuizList() {
      //getting question list
      $.ajax({
        url: url + 'tems/api/quiz_question/list/student-quiz-questions-list',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify({ page: 1, rows: 10, sort: [], dependents: { quiz: { uid: zc.selectedRow.quiz.uid } } }),
        success: function (res) {
          if (res && res.data && res.data.listData && res.data.listData.rows && res.data.listData.rows.length) {
            //method call to identify quiz is started
            onStartQuiz();
            //questions answer
            clearInterval(interval);
            questionsList = res.data.listData.rows;
            var totalQuestions = questionsList.length;
            var questionNumber = 0;
            var width = (questionNumber / totalQuestions) * 100;
            var questionCount = 1;
            var quizWidget = $('.quiz-widget-list');
            var progressBar = `<div class="total-questions"><span class="question-sequence"><span id="questionCount">${questionCount}</span> of ${totalQuestions}</span><span class="time-duration" id="contador"></span></div><div class="progress">
            <div id="myBar" class="progress-bar bg-success" role="progressbar" style="width:  ${width}%"></div>
            </div>`;

            var quizUl = $('<ul/>', { class: 'quiz-ul' });
            $.each(questionsList, function (i, o) {
              var quizLi = $('<li/>', { id: o.uid, class: 'quiz-li' });
              var quizQues = $('<p/>', { text: (i + 1) + '. ' + o.question })
              var quizAns = $('<ul/>', { class: 'course-duration-list' });
              var rName = o.question.split(' ').join('');
              $.each(o.quiz_answer, function (ansIndex, ansObj) {
                var quizAnsLi = `<li class="course-duration-card">
                                  <div class="course-duration-card-info">
                                     <div class="custom-control custom-radio custom-control-inline">
                                         <input type="radio" class="custom-control-input" value="${i}/${o.uid}/${ansObj.uid}"
                                         id="${ansObj.answer}${i}" name="ans${i}">
                                         <label class="custom-control-label" for="${ansObj.answer}${i}">${ansObj.answer}</label>
                                       </div>
                                 </div>
                               </li>`;
                quizAns.append(quizAnsLi);
              })

              quizLi.append(quizQues);
              quizLi.append(quizAns);
              quizUl.append(quizLi);
            })
            quizWidget.append(progressBar);
            contador();
            quizWidget.append(quizUl);
            $('.quiz-li:first-child').addClass('active');
            var nextDiv = $('<div/>', { class: 'next-action text-right' });

            $(`li.active .custom-control-input`).change(function () {
              let response = this.value.split('/');
              if (student_quiz_response.length && student_quiz_response[response[0]] && student_quiz_response[response[0]]['quiz_question'].uid == response[1]) {
                student_quiz_response[response[0]]['quiz_answer'].uid = response[2];
              } else {
                student_quiz_response.push({
                  "is_correct": {
                    "uid": "Yes"
                  },
                  "quiz_answer": {
                    "uid": response[2]
                  },
                  "quiz_question": {
                    "uid": response[1]
                  },
                  "student_quiz": {
                    "uid": quizStartID
                  }
                });
              }
              if ($(`li.active .custom-control-input`).val().length) {
                $('#next').prop('disabled', false);
              }
              else {
                alert("Please select answer!!");
              }
            });

            var prevBtn = $("<button/>", {
              id: 'prev', disabled: true, class: "btn btn-primary", text: 'Prev', click: function () {
                var $qList = $('.quiz-li'),
                  $selected = $qList.filter('.active').removeClass('active'),
                  $next;
                $('#next').text('Next');

                // first time only when no selected exists, remove if you automatically select first one
                if ($selected.is($qList.first().next())) {
                  $(this).prop('disabled', true);
                }
                if (!$selected.length) {
                  $next = $qList.last();
                  $next.addClass('active');
                } else {
                  $next = $selected.prev();
                  $next.addClass('active');
                  if (!$selected.is($qList.last())) {
                    $next = $selected.prev();
                    $next.addClass('active');
                  }
                  if (!$selected.is($qList.last())) {
                    $next.addClass('active');
                  }
                }
                if ($("li.active .custom-control-input").is(":checked")) {
                  $('#next').prop('disabled', false);
                }
                var myBar = document.getElementById("myBar");
                var qCount = document.getElementById("questionCount");
                if (width < 100) {
                  questionNumber = 1;
                  width -= (questionNumber / totalQuestions) * 100;
                  myBar.style.width = width + '%';
                  questionCount -= 1;
                  qCount.innerHTML = questionCount;
                }
              }
            });

            var nextBtn = $("<button/>", {
              id: 'next', disabled: true, class: "btn btn-primary", text: 'Next', click: function () {
                var $qList = $('.quiz-li'),
                  $selected = $qList.filter('.active').removeClass('active'),
                  $next;
                $('#prev').prop('disabled', false);

                // first time only when no selected exists, remove if you automatically select first one
                if (!$selected.length) {
                  $next = $qList.first();
                } else {
                  if (!$selected.is($qList.last())) {
                    // $next= $qList.first();
                    $next = $selected.next();
                  } else {
                    submitQuizAnswer();
                    $('.quiz-results').show();
                    // $('#spent_time').text($("#contador").text());
                    $('.quiz-widget-list').hide();
                    // $('#total_que').text(totalQuestions);
                    // $('#correct_ans').text('3' + '/' + totalQuestions);
                  }
                  // $next = $selected.is($qList.last()) ? break : e;
                }
                if ($selected.is($qList.last().prev())) {
                  $(this).text('Submit');
                }
                if (!$selected.is($qList.last())) {
                  $next.addClass('active');
                }

                $(`li.active .custom-control-input`).change(function () {
                  let response = this.value.split('/');
                  if (student_quiz_response.length && student_quiz_response[response[0]] && student_quiz_response[response[0]]['quiz_question'].uid == response[1]) {
                    student_quiz_response[response[0]]['quiz_answer'].uid = response[2];
                  } else {
                    student_quiz_response.push({
                      "is_correct": {
                        "uid": "Yes"
                      },
                      "quiz_answer": {
                        "uid": response[2]
                      },
                      "quiz_question": {
                        "uid": response[1]
                      },
                      "student_quiz": {
                        "uid": quizStartID
                      }
                    });
                  }

                  if ($(`li.active .custom-control-input`).val().length) {
                    $('#next').prop('disabled', false);
                  }
                  else {
                    alert("Please select answer!!");
                  }
                });
                if ($("li.active .custom-control-input").is(":checked")) {
                  $('#next').prop('disabled', false);
                } else {
                  $(this).prop('disabled', true);
                }
                var myBar = document.getElementById("myBar");
                var qCount = document.getElementById("questionCount");
                if (width < 100) {
                  questionNumber = 1;
                  // questionNumber++;
                  width += (questionNumber / totalQuestions) * 100;
                  // width += 10;
                  myBar.style.width = width + '%';
                  // myBar.innerHTML = width * 1 + '%';
                  questionCount += 1;
                  qCount.innerHTML = questionCount;
                }
              }
            });

            nextDiv.append(prevBtn)
            nextDiv.append(nextBtn)
            quizWidget.append(nextDiv);
            // $.each($('.quiz-widget').find('.quiz-ul').find('.quiz-li'), function(ind, obj){
            //     $(this).hide();
            //     if(ind == 0) {
            //         $(this).show();
            //     }

            //  })
            $('.quiz-widget-list').show();
          }
        }
      })
    }
    // onQTick();

    /**
     * @description Mothod to show preview if already submitted.
     * @author Virendra Pandey
     * @date 2020-07-24
     * @param {*} previewList
     */
    function showPreview(previewList) {
      $.ajax({
        url: url + 'tems/api/quiz_question/list/student-quiz-questions-list',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify({ page: 1, rows: 10, sort: [], dependents: { quiz: { uid: zc.selectedRow.quiz.uid } } }),
        success: function (res) {
          questionsList = res.data.listData.rows;
          if (res.data.listData.rows && res.data.listData.rows.length) {
            //method call to identify quiz is started
            //questions answer
            questionsList = res.data.listData.rows;
            let ctrlDiv;
            var quizWidget = $('.quiz-widget-list');
            var quizUl = $('<ul/>', { class: 'quiz-ul' });
            $.each(questionsList, function (i, o) {
              var quizLi = $('<li/>', { id: o.uid, class: 'quiz-li' });
              var quizQues = $('<p/>', { text: (i + 1) + '. ' + o.question })
              var quizAns = $('<ul/>', { class: 'course-duration-list' });
              var rName = o.question.split(' ').join('');
              $.each(o.quiz_answer, function (ansIndex, ansObj) {
                let preLi = $('<li>', { class: 'course-duration-card' });
                let pevDiv = $('<div>', { class: 'course-duration-card-info' });
                ctrlDiv = $('<div>', { class: 'custom-control custom-radio custom-control-inline', readonly: true, });
                let input = $('<input/>', { type: 'radio', disabled: true, class: 'custom-control-input', value: ansObj.answer, id: ansObj.answer + i, name: 'ans' + i });
                let label = $('<label>', { text: ansObj.answer, readonly: true, class: 'custom-control-label', for: ansObj.answer + i });
                $.each(previewList, function (inx, ans) {
                  if ((o.uid == ans.quiz_question.uid) && (ansObj.uid == ans.quiz_answer.uid) && (ans.is_correct.uid == "No")) {
                    ctrlDiv.addClass('wrong-ans');
                  } else if (((o.uid == ans.quiz_question.uid) && (ansObj.uid == ans.quiz_answer.uid) && (ans.is_correct.uid == "Yes")) || ((o.uid == ans.quiz_question.uid) && (ansObj.is_correct.uid == "Yes"))) {
                    ctrlDiv.addClass('right-ans');
                    // console.log('ansObj.answer == ans.quiz_answer.answer', ((ans.is_correct.uid == "No") && (ansObj.answer == ans.quiz_answer.answer)));
                  }
                })
                ctrlDiv.append(input);
                ctrlDiv.append(label);
                pevDiv.append(ctrlDiv);
                preLi.append(pevDiv);
                quizAns.append(preLi);
              })

              quizLi.append(quizQues);
              quizLi.append(quizAns);
              quizUl.append(quizLi);
            })

            quizWidget.append(quizUl);
            if (zc.user.role.code != 'Admin') {
              $('.quiz-li:first-child').addClass('active');
              var nextDiv = $('<div/>', { class: 'next-action text-right' });

              var prevBtn = $("<button/>", {
                id: 'prev', class: "btn btn-primary", disabled: true, text: 'Prev', click: function () {
                  var $qList = $('.quiz-li'),
                    $selected = $qList.filter('.active').removeClass('active'),
                    $next;
                  $('#next').text('Next');
                  $('#next').prop('disabled', false);
                  // first time only when no selected exists, remove if you automatically select first one
                  if ($selected.is($qList.first().next())) {
                    $(this).prop('disabled', true);
                  }
                  if (!$selected.length) {
                    $next = $qList.last();
                    $next.addClass('active');
                  } else {
                    $next = $selected.prev();
                    $next.addClass('active');
                    if (!$selected.is($qList.last())) {
                      $next = $selected.prev();
                      $next.addClass('active');
                    }
                    if (!$selected.is($qList.last())) {
                      $next.addClass('active');
                    }
                  }
                }
              });

              var nextBtn = $("<button/>", {
                id: 'next', class: "btn btn-primary", text: 'Next', click: function () {
                  var $qList = $('.quiz-li'),
                    $selected = $qList.filter('.active').removeClass('active'),
                    $next;
                  $('#prev').prop('disabled', false);

                  // first time only when no selected exists, remove if you automatically select first one
                  if (!$selected.length) {
                    $next = $qList.first();
                  } else {
                    if (!$selected.is($qList.last())) {
                      // $next= $qList.first();
                      $next = $selected.next();
                    } else {
                      $('.quiz-results').hide();
                    }
                    // $next = $selected.is($qList.last()) ? break : e;
                  }
                  if ($selected.is($qList.last().prev())) {
                    $('#next').prop('disabled', true);

                  }
                  if (!$selected.is($qList.last())) {
                    $next.addClass('active');
                  }
                }
              });
              nextDiv.append(prevBtn)
              nextDiv.append(nextBtn)
              quizWidget.append(nextDiv);
            } else {
              $('.quiz-li').addClass('active');
            }
            $('.quiz-widget-list').show();
          }
        }
      })
    }
    function onStartQuiz() {
      $.ajax({
        url: url + 'tems/api/student_quiz/save-update/student-quiz-save',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify({
          "start_time": getCurrentTime(),
          "quiz": {
            "uid": zc.selectedRow.quiz.uid
          }
        }),
        success: function (res) {
          if (res) {
            quizStartID = res.data.uid;
          }
        }
      });
    }

    /**
     * @description inserting quiz answer to db
     * @author Virendra Pandey
     * @param {payload} to getting quiz answer
     * @date 2020-07-22
     */
    function submitQuizAnswer() {
      let payload = {
        "uid": quizStartID,
        "end_time": getCurrentTime(),
        "student_quiz_response": student_quiz_response
      }
      $.ajax({
        url: url + 'tems/api/student_quiz/save-update/student-quiz-response-save',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify(payload),
        success: function (res) {
          if (res) {
            getQuizResult(quizStartID)
          }
        }
      });
    }

    /**
     * @description Method to get quiz result
     * @author Virendra Pandey
     * @date 2020-07-24
     */
    function getQuizResult(quizStartUID) {
      $.ajax({
        url: url + 'tems/api/student_quiz/select/student-quiz-select',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify({
          "uid": quizStartUID
        }),
        success: function (res) {
          if (res) {
            let resultData = res.data;
            /* let end_time = resultData.end_time.split(':');
            let start_time = resultData.start_time.split(':'); */
            $('#total_que').text(resultData.student_quiz_response.length);
            $('#correct_ans').text(resultData.obtained_marks + '/' + resultData.total_marks)
            let spendTime = getTime(resultData.start_time, resultData.end_time);
            $('#spent_time').text(spendTime);
          }
        }
      });
    }
    /**
     * @description Method to get start
     * @author Virendra Pandey
     * @date 2020-07-22
     * @returns
     */
    function getCurrentTime() {
      let currentTime = new Date();
      let currentOffset = currentTime.getTimezoneOffset();
      let ISTOffset = 330;   // IST offset UTC +5:30
      let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

      return ISTTime.getHours() + ":" + ISTTime.getMinutes() + ':' + ISTTime.getSeconds();
    }

    // $('#start_quiz').hide();
    var previewID = '';
    function onTestStart() {
      console.log('role', zc.user.role.code);
      let payload;
      if (zc.user.role.code == 'Admin') {
        payload = {
          "quiz": {
            "uid": zc.selectedRow.quiz.uid
          },
          "user": {
            "uid": zc.selectedRow.created_id.uid
          }
        };
      } else {
        payload = {
          "quiz": {
            "uid": zc.selectedRow.quiz.uid
          }
        };
      }
      // let payload = {
      //   "quiz": {
      //     "uid": zc.selectedRow.quiz.uid
      //   }
      // };
      let button = `<button class="btn btn-primary">Start Quiz</button>`;
      $('#start_quiz').hide();
      $.ajax({
        url: url + 'tems/api/student_quiz/select/student-quiz-details',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify(payload),
        success: function (res) {
          if (res) {
            if (res.data.end_time && res.data.end_time.toString().length) {
              previewID = res.data.uid;
              getQuizResult(previewID);
              let button = $('<button>', {
                text: 'Review Quiz', class: 'btn btn-primary', click: function () {
                  $('.quiz-results').hide();
                  showQuizResult();
                }
              })
              let div = $('<div>', { class: 'show-preview text-center pt-3', padding: '20px 0' }).append(button);
              $('#start_quiz').hide();
              if (zc.user.role.code != 'Admin') {
                $('.quiz-results').append(div);
              } else {
                showQuizResult();
              }
              $('.quiz-results').show();
            } else {
              $('#start_quiz').show();
              $('#start_quiz').css('height', '200px');
              $('#start_quiz').append(button);
            }
          }
        }
      });
    }

    function showQuizResult() {
      $.ajax({
        url: url + 'tems/api/student_quiz/select/student-quiz-select',
        type: 'POST',
        dataType: 'json',
        headers: header,
        data: JSON.stringify({
          "uid": previewID
        }),
        success: function (res) {
          if (res) {
            console.log('res', res);
            let student_quiz_response = res.data.student_quiz_response;
            if (student_quiz_response && student_quiz_response.length) {
              showPreview(student_quiz_response);
            }
          }
        }
      });
    }

    $("#contador").empty();

    /**
    * @description method to start timers
    * @author Virendra Pandey
    * @date 2020-07-22
    */
    function contador() {
      $("#contador").empty();
      var hr = 0;
      var mm = 0;
      var ss = 0;

      interval = setInterval(function () {
        if (hr == 59 && mm == 59 && ss == 59) clearInterval(interval);
        ss++;
        if (ss == 59) {
          ss = 0;
          mm++;
          if (mm == 59) {
            mm = 0;
            hr++;
          }
        }
        if (hr.toString().length < 2) hr = "0" + hr;
        if (mm.toString().length < 2) mm = "0" + mm;
        if (ss.toString().length < 2) ss = "0" + ss;

        $("#contador").html(`<span>${hr}:</span><span>${mm}:</span><span>${ss}</span>`);
      }, 1000)
    }

    $('.close').click(function () {
      $("#contador").empty();
      clearInterval(interval);
    })
    /**
     * @description
     * @author Virendra Pandey
     * @date 2020-07-24
     * @param {*} milliseconds
     * @returns time in hh:mm:ss format
     */
    function getTime(startTime, endTime) {
      //Get hours from milliseconds
      var time_start = new Date();
      var time_end = new Date();
      var value_start = startTime.split(':');
      var value_end = endTime.split(':');

      time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
      time_end.setHours(value_end[0], value_end[1], value_end[2], 0)

      var milliseconds = time_end - time_start

      var hours = milliseconds / (1000 * 60 * 60);
      var absoluteHours = Math.floor(hours);
      var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

      //Get remainder from hours and convert to minutes
      var minutes = (hours - absoluteHours) * 60;
      var absoluteMinutes = Math.floor(minutes);
      var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

      //Get remainder from minutes and convert to seconds
      var seconds = (minutes - absoluteMinutes) * 60;
      var absoluteSeconds = Math.floor(seconds);
      var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

      return h + ':' + m + ':' + s;
    }

    //start quiz
    $('#start_quiz').click(function () {
      $('.quiz-results').hide();
      getQuizList();
      $('#start_quiz').hide();
    });

    onTestStart();
  })
}