$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="right_box__center__comments">
            <div class="right_box__center__comments__upper-info">
              <div class="right_box__center__comments__upper-info__tolker">
                ${message.user_name}
              </div>
              <div class="right_box__center__comment__upper-info__tolker__date">
                ${message.created_at}
              </div>
            </div>
            <div class="right_box__center__text">
              <div class="right_box__center__text__content">
                ${message.content}
            </div>
          </div>
      </div>`
      return html;
    } else {
      var html =
        `<div class="right_box__center__comments">
            <div class="right_box__center__comments__upper-info">
              <div class="right_box__center__comments__upper-info__tolker">
                ${message.user_name}
              </div>
              <div class="right_box__center__comment__upper-info__tolker__date">
                ${message.created_at}
              </div>
            </div>
            <div class="right_box__center__text">
              <div class="right_box__center__text__content">
                ${message.content}
            </div>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.right_box__center').append(html);
      // 「append()」は、指定した子要素の最後にテキスト文字やHTML要素を追加することができるメソッド
      $('.right_box__center').animate({ scrollTop: $('.right_box__center')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .always(function(){
      $(".right_box__footer__send").prop("disabled", false);
      // sendボタンを連続で押せる記述
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});

