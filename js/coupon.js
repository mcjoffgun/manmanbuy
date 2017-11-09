$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail = "getcoupon";
  $.ajax({
    type:"get",
    url:address(detail),
    dataType:"jsonp",
    success:function (data) {
      console.log(data);
      $(".mmb_coupon ul").html(template("tpl",data));
    }
  })
$(".gotop").on("click",function () {
 //  console.log(11);
 // $("html,body").animate({
 //   screenTop:'0px'
 // },1000);
  location.href="coupon.html";
})
})
