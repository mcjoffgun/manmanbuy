$(function () {
  var search = location.search;
  search = search.slice(1);
  var searchArr = search.split("=");
  var couponid = searchArr[1];
  var detail = "getcouponproduct";
  $.ajax({
    type:"get",
    url:address(detail),
    data:{
      couponid:couponid
    },
    dataType:"json",
    success:function (data) {
      console.log(data);
      $(".coupon_details ul").html(template("tpl",data));
    }
  });
  //li动态生成，需要委托
  $(".coupon_details ").on("click","li", function () {
    // console.log(11);
    $(".mmb_mask").toggle(function () {
      // 轮播图
      var ul = document.querySelector(".mask_content ul");
      var lis = ul.children;
      var width = lis[0].offsetWidth;
      var index = 1;
      var timer = setInterval(function () {
        index++;
        setTransition();
        setTranform(index*width);
        // console.log(index);
      },1000);
      //给ul设置过渡结束事件
      ul.addEventListener("transitionend",function () {
        if(index >= lis.length - 1){
          index = 1;
        }
        if(index <= 0){
          index = lis.length - 2;
        }
        removeTransition();
        setTranform(index*width);
      });
      //给箭头设置点击事件
      $(".mask_content .left").on("click",function () {
            index--;
          setTransition();
          setTranform(index*width);

      });
      $(".mask_content .right").on("click",function () {
           index++;
        setTransition();
        setTranform(index*width);
      });
      //添加touch事件
      var startX = 0;
      var startTime = 0;
      ul.addEventListener("touchstart",function (e) {
          startX = e.changedTouches[0].clientX;
           startTime = new Date();
        clearInterval(timer);
      });
      ul.addEventListener("touchmove",function (e) {
       var distance = e.changedTouches[0].clientX - startX;
         removeTransition();
        setTranform(distance + index*width);
      });
      ul.addEventListener("touchend",function (e) {
        var distance = e.changedTouches[0].clientX - startX;
         var moveTime = new Date() - startTime;
           if(Math.abs(distance) >= width / 3 || moveTime <= 300 && Math.abs(distance) <= 30 ){
             if (distance > 0 ){
               index--;
             }
             if(distance < 0){
               index++;
             }
             setTransition();
             setTranform(index*width);
             timer = setInterval(function () {
                 index++;
               setTransition();
               setTranform(index*width);
             })
           }
      });


      function setTranform(value) {
        ul.style.transform = "translateX(-"+value+"px)";
      }
      function setTransition() {
        ul.style.transition = "all .5s";
      }
      function removeTransition() {
        ul.style.transition = "none";
      }
    });

  })

$(".gotop").on("click",function () {
 //  console.log(11);
 // $("html,body").animate({
 //   screenTop:'0px'
 // },1000);
  location.href="coupon.html";
})
})
