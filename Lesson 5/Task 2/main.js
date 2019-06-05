'use strict';
var review = new Review('#reviews-wrapper');
  $('.add-review').on('click', function () {
      review.add(review.reviews.length, $('#text-review').val());
  });
  $(document).on('click', '.btnConfirm',function () {
      review.reviewConfirm(parseInt($(this).attr('data-review')));
  });
  $(document).on('click', '.btnDel',function () {
      review.removeItem(parseInt($(this).attr('data-review')));
  });
