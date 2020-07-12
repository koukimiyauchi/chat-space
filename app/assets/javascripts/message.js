$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="right_box__center__comments" data-message-id=${message.id}>
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
        `<div class="right_box__center__comments" data-message-id=${message.id}>
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

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.right_box__center__comments:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.right_box__center').append(insertHTML);
          $('.right_box__center').animate({ scrollTop: $('.right_box__center')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 3000);
    }
  });

