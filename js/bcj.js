$(function () {
  var as= document.querySelectorAll(".mui-control-item a");
  // console.log($lis);
  $(as).each(function (index,ele) {
    $(this).on("click",function () {
    $(this).addClass("new").parent().siblings().find("a").removeClass("new");
})
    })
})
