$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
  });
  $.ajax({
    type:"get",
    url:"http://192.168.1.103:9090/api/getcategorytitle",
    dataType:"json",
    success:function (data) {
      console.log(data);
      $(".mmb_nav").html(template("tpl",data));
    }
  })
  $(".mmb_nav").on("click",".first_list",function () {
    var id = $(this).find("a").data("titleid");
    console.log(id);
    $this = $(this);
    // console.log(id);
    $.ajax({
      type:"get",
      url:"http://192.168.1.103:9090/api/getcategory",
      data:{
        titleid:id
      },
      dataType:"json",
      success:function (data) {
        console.log(data);
        $this.find("ul").html(template("second_tpl",data));
      }
    })
    $this.find("ul").toggleClass("hide");


  })
})
