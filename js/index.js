
$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  //点击更多添加注册事件
  $(".more_click").on("click",function () {
    // $(".nav_hide").toggle();
    if($(".nav_hide").is(':hidden')){
      $(".nav_hide").show(1000);
    }else{
      $(".nav_hide").hide(1000);
    }});
  $.ajax({
    type:"get",
    url:"http://192.168.32.87:9090/api/getmoneyctrl",
    dataType:"json",
    success:function (data) {
      console.log(data);
      $(".mmb_banner").html(template("tpl",data));
    }
  })
  // $(".back-to-top").on("click",function () {
  //   console.log(11);
  //   document.body.scrollTop = document.documentElement.scrollTop=0;
  // })
})
