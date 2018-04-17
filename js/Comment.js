/**
 * Класс комментариев.
 * 
 * @property {string} idReviews - Идентификатор комментария
 */
function Comment(idReviews) {
    // папка, где расположен файл json добавления отзыва
    this.directoryOfAddReview = './responses/addReview.json';
    // папка, где расположен файл json одобрения отзыва
    this.pathOfApproveReview = './responses/approveReview.json';
    // папка, где расположен файл json удаления отзыва
    this.pathOfRemoveReview = './responses/removeReview.json';
    this.id = idReviews;  // Первая часть идентификатора тегов
    this.idDivForReviews = 'reviews'; // Идентификатор дива в который вставляются комментарии
    this.commentsArray = []; //Массив для хранения комментариев
}

/**
 * Метод добавляет textarea и другие теги добавления комментария на страницу, 
 * а также контейнер для отображения комментариев на страницу.
 *
 * @param $root Тег в который вставляется все теги с комментариями
 */
Comment.prototype.render = function ($root) {

  let $commentDiv = $('<div />', {
      id: this.id,
      text: 'Добавить отзыв:'
  });

          let $newReviewTextarea = $('<div />');
          $('<textarea />', {
            id: this.id + '_review',
            cols: 80,
            rows: 10,
            'user-id': '123'
          }).appendTo($newReviewTextarea);

  let $reviewButtonAdd = $('<button />', {
      class: 'add-comment',
      text: 'добавить'//,
      // 'data-id': this.id + '_add'
  });

      let $reviewsDiv = $('<div />', {
          id: this.idDivForReviews
      });

      $newReviewTextarea.appendTo($commentDiv);
      $reviewButtonAdd.appendTo($commentDiv);

    $commentDiv.appendTo($root);

  $root.append('<hr />');
  $root.append($('<div />', { class: 'reviews-h3' }).append('Отзывы:'));
  $reviewsDiv.appendTo($root);
};

/**
 * Метод формирует массив с комментариями из массива полученного из  
 * из json файла (с сервера)
 *
 * @param reviews Массив с комментариями уже добавленными в json
 */
Comment.prototype.reviewsArray = function (reviews) {
    for (let itemKey in reviews)
    {
        this.commentsArray.push(reviews[itemKey]);
    }
}

/**
 * Метод отображает на сайте комментарии из массива.
 *
 */
Comment.prototype.showReviews = function () {
    let appendId = `#${this.idDivForReviews}`;
    let $dataDiv = $('<div />', {
    });

    this.commentsArray.forEach(function(comment, index) {
      let $comentDiv = $('<div />', {
          class: 'review-div'
      });
      // если отзыв одобрен, добавляем класс (изменяем цвет отзыва)
      if (comment.result === 2) {
        $comentDiv.addClass('approve-review');
      }

        // кнопка удалить комментарий
        let $goodBtnDelete = $('<button />', {
            class: 'comment-delete',
            text: 'Удалить комментарий',
            'review-id-for-delete': comment.id_comment
        });

          // кнопка одобрить комментарий
          let $reviewApprove = $('<button />', {
              class: 'comment-approve',
              text: 'Одобрить комментарий',
              'review-id-for-approve': comment.id_comment
          });

      $comentDiv.append($('<p />').append('id comment: ' + comment.id_comment));
      $comentDiv.append($('<p />').append('result: ' + comment.result));
      $comentDiv.append($('<p />').append('id пользователя: ' + comment.id_user));
      $comentDiv.append($('<p />').append('текст комментария: ' + comment.text));
      $comentDiv.append($('<p />').append('состояние отзыва: ' + comment.error_message));
      $comentDiv.append($goodBtnDelete);
      $comentDiv.append($reviewApprove);
      $dataDiv.append($comentDiv);

    });
    $dataDiv.appendTo(appendId);
};

/**
 * Метод находит id последнего комментария в массиве, добавляет 
 * единицу к найденному и возвращает.
 *
 * @return Значение id комментария для добавления
 */
Comment.prototype.findIndComment = function () {
  if (this.commentsArray.length > 0) {
      let number = this.commentsArray[this.commentsArray.length - 1].id_comment;
      return ++number;
  }
  return 0;
};

/**
 * Метод добавляет комментарий в массив с комментариями и отображает. 
 *
 * @param idUser Идентификатор пользователя, который добавляет комментарий 
 * @param text Текст комментария 
 */
Comment.prototype.add = function (idUser, text) {
    let review = {
      "id_comment": this.findIndComment(),
      "result": 1,
      "id_user": idUser,
      "text": text,
      "error_message": ""
    };

    $.ajax({
        type: 'GET',
        url: this.directoryOfAddReview,
        dataType: 'json',
        // отправка данных на сервер
        data: { id: idUser, comment: text },
        context: this,
        success: function (data) {
          if (data.result === 1) {
            review.error_message = data.userMessage;
            this.commentsArray.push(review);
            // обновление страницы, после обновления будут видны новые комментарии
            this.refresh();
          }
        }
    });

};

/**
 * Метод обновляет тег div, содержащий комментарии на странице. 
 *
 */
Comment.prototype.refresh = function () {
    let $revDataDiv = $(`#${this.idDivForReviews}`);
    $revDataDiv.empty();
    this.showReviews();
};

/**
 * Метод удаляет комментарий из массива с комментариями и отображает. 
 *
 * @param id Идентификатор комментария 
 */
Comment.prototype.remove = function (id) {

    $.ajax({
        type: 'GET',
        url: this.pathOfRemoveReview,
        dataType: 'json',
        // отправка id отзыва на сервер
        data: { idReview: id },
        context: this,
        success: function (data) {
          if (data.result === 1) {
            let commentIdForDelete = this.find(id);
              if(commentIdForDelete !== false) {
                this.commentsArray.splice(commentIdForDelete, 1);
              }
            this.refresh();
          }
        }
    });
};

/**
 * Метод ищет комментарий в массиве с комментариями. 
 *
 * @param id Идентификатор комментария 
 */
Comment.prototype.find = function (id) {
  let number = false;

    this.commentsArray.forEach(function(review, index) {
      if(review.id_comment === id) {
        number = index;
      }
    });
  return number;
};

/**
 * Метод одобрения комментариев. 
 *
 * @param id Идентификатор комментария 
 */
Comment.prototype.approve = function (id) {

    $.ajax({
        type: 'GET',
        url: this.pathOfApproveReview,
        dataType: 'json',
        // отправка id отзыва на сервер
        data: { idReview: id },
        context: this,
        success: function (data) {
          if (data.result === 1) {
          let commentIdForApprove = this.find(id);
            if(commentIdForApprove !== false) {
              this.commentsArray[commentIdForApprove].result = 2;
              this.commentsArray[commentIdForApprove].error_message = 'Ваш отзыв одобрен';
            }
          this.refresh();
          }
        }
    });
};