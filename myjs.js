$(".btn__section1").click(function() {
  $(".section-1").css("display", "block");
  $(".section-2").css("display", "none");
  $(".section-3").css("display", "none");
  $(".section-4").css("display", "none");
  $(".section-5").css("display", "none");
  $(".section-6").css("display", "none");
  $(this).addClass("on");
  $(this)
    .siblings()
    .removeClass("on");
});

$(".btn__section2").click(function() {
  $(".section-1").css("display", "none");
  $(".section-2").css("display", "block");
  $(".section-3").css("display", "none");
  $(".section-4").css("display", "none");
  $(".section-5").css("display", "none");
  $(".section-6").css("display", "none");
  $(this).addClass("on");
  $(this)
    .siblings()
    .removeClass("on");
});

$(".btn__section3").click(function() {
  $(".section-1").css("display", "none");
  $(".section-2").css("display", "none");
  $(".section-3").css("display", "block");
  $(".section-4").css("display", "none");
  $(".section-5").css("display", "none");
  $(".section-6").css("display", "none");
  $(this).addClass("on");
  $(this)
    .siblings()
    .removeClass("on");
});

$(".btn__section4").click(function() {
  $(".section-1").css("display", "none");
  $(".section-2").css("display", "none");
  $(".section-3").css("display", "none");
  $(".section-4").css("display", "block");
  $(".section-5").css("display", "none");
  $(".section-6").css("display", "none");
  $(this).addClass("on");
  $(this)
    .siblings()
    .removeClass("on");
});
$(".btn__section5").click(function() {
  $(".section-1").css("display", "none");
  $(".section-2").css("display", "none");
  $(".section-3").css("display", "none");
  $(".section-4").css("display", "none");
  $(".section-5").css("display", "block");
  $(".section-6").css("display", "none");
  $(this).addClass("on");
  $(this)
    .siblings()
    .removeClass("on");
});
