$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  var detail1 = "getbaicaijiatitle";
  var detail2 = "getbaicaijiaproduct";
  $.ajax({
    type:"get",
    url:address(detail1),
    dataType:"json",
    success:function (data) {
      // console.log(data);
      $(".tabs").html(template("tpl",data));
      //渲染默认二级分类的第一个
      secondRender(data.result[0].titleId);
    }
  })
  function secondRender(id) {
    //二级分类，封装成一个函数来调用，发送ajax请求
    $.ajax({
      type:"get",
      url:address(detail2),
      dataType:"json",
      data:{
        titleid:id
      },
      success:function (data) {
        // console.log(data);
        $(".banner_bcj").html(template("tpl1",data));
      }
    })
  }
//给所有li注册委托点击事件，
  $(".tabs").on("click","li",function () {
      $(this).find("a").addClass("new").parent().siblings().find("a").removeClass("new");
    var id = $(this).data("titleid");
    // console.log(id);
    secondRender(id);
  })

$(".gotop").on("click",function () {
 //  console.log(11);
 // $("html,body").animate({
 //   screenTop:'0px'
 // },1000);
  location.href="bcj.html";
})
})
