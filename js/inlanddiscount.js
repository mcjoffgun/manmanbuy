$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail = "getinlanddiscount";
  $.ajax({
    type:"get",
    url:address(detail),
    dataType:"json",
    success:function (data) {
      console.log(data);
      $(".inland_dis ul").html(template("tpl",data));
    }
  })
})
