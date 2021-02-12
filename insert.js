var inputs = $('input[type="text"]');
var googleSubmitBtn = $('#google-submit');
var snackbar = $('#snackbar');

var inputWorker = $('#Worker');
var inputProductivity = $('#Productivity');
var inputPrice = $('#Price');
var inputDeadline = $('#Deadline');

function isLoading(status){
  if(status){
    $('html, body').addClass('wait');
    googleSubmitBtn.attr('disabled', true).html('입력중...');
  } else {
    $('html, body').removeClass('wait');
    googleSubmitBtn.attr('disabled', false).html('입력');
  }
}

function checkInput(){
  var isEmpty = false;
  $.each(inputs, function (index, element) {
    if (element.value === '') {
      alert('빈 칸이 있어요.');
      isEmpty = true;
      return false;
    }
  });
  return isEmpty;
}

$('#google-submit').click(function () {

  //빈값 체크
  if (checkInput()) { return; }

  // 입력중..
  isLoading(true);

  $.ajax({
    type: "GET",
    url: "https://script.google.com/macros/s/AKfycbzw9dpRj9r7JotyEOSxZb2lW6vxQFh5HPILwX97B0jzn2aPSxDgf7IOgw/exec",
    data: {
      "Worker": inputWorker.val(),
      "Productivity": inputProductivity.val(),
      "Price": inputPrice.val(),
      "Deadline": inputDeadline.val()

    },
    success: function (response) {
      isLoading(false);

      snackbar.html('입력이 완료됐습니다.').addClass('show');
      setTimeout(function () {
        snackbar.removeClass('show');
      }, 3000);

      //값 비워주기
      inputWorker.val('');
      inputProductivity.val('');
      inputPrice.val('');
      inputDeadline.val('');

    },
    error: function (request, status, error) {
      isLoading(false);
      console.log("code:" + request.status + "\n" + "error:" + error);
      console.log(request.responseText);
    }
  });
});
