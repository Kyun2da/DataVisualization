let section1 = false;
let section2 = false;
let section3 = false;
let section4 = false;
let section5 = false;
let section6 = false;

$(".btn__section1").click(function() {
  if (section1) {
    $(".section-1").css("display", "block");
    section1 = false;
  } else {
    $(".section-1").css("display", "none");
    section1 = true;
  }
});

$(".btn__section2").click(function() {
  if (section2) {
    $(".section-2").css("display", "block");
    section2 = false;
  } else {
    $(".section-2").css("display", "none");
    section2 = true;
  }
});

$(".btn__section3").click(function() {
  if (section3) {
    $(".section-3").css("display", "block");
    section3 = false;
  } else {
    $(".section-3").css("display", "none");
    section3 = true;
  }
});

$(".btn__section4").click(function() {
  if (section4) {
    $(".section-4").css("display", "block");
    section4 = false;
  } else {
    $(".section-4").css("display", "none");
    section4 = true;
  }
});
$(".btn__section5").click(function() {
  if (section5) {
    $(".section-5").css("display", "block");
    section5 = false;
  } else {
    $(".section-5").css("display", "none");
    section5 = true;
  }
});

$(".btn__section6").click(function() {
  if (section6) {
    $(".section-6").css("display", "block");
    section6 = false;
  } else {
    $(".section-6").css("display", "none");
    section6 = true;
  }
});

$(".chkbox__section1").change(function() {
  if ($(".chkbox__section1").is(":checked")) {
    $(".section-1").css("display", "block");
    section1 = false;
  } else {
    $(".section-1").css("display", "none");
    section1 = true;
  }
});
$(".chkbox__section2").change(function() {
  if ($(".chkbox__section2").is(":checked")) {
    $(".section-2").css("display", "block");
    section2 = true;
  } else {
    $(".section-2").css("display", "none");
    section2 = true;
  }
});
$(".chkbox__section3").change(function() {
  if ($(".chkbox__section3").is(":checked")) {
    $(".section-3").css("display", "block");
    section3 = true;
  } else {
    $(".section-3").css("display", "none");
    section3 = true;
  }
});
$(".chkbox__section4").change(function() {
  if ($(".chkbox__section4").is(":checked")) {
    $(".section-4").css("display", "block");
    section4 = true;
  } else {
    $(".section-4").css("display", "none");
    section4 = true;
  }
});
$(".chkbox__section5").change(function() {
  if ($(".chkbox__section5").is(":checked")) {
    $(".section-5").css("display", "block");
    section5 = true;
  } else {
    $(".section-5").css("display", "none");
    section5 = true;
  }
});
$(".chkbox__section6").change(function() {
  if ($(".chkbox__section6").is(":checked")) {
    $(".section-6").css("display", "block");
    section6 = true;
  } else {
    $(".section-6").css("display", "none");
    section6 = true;
  }
});
console.log($("input:radio[name=section6-rdo]:checked").val());
$("input:radio[name=section6-rdo]").click(function() {
  if ($("input:radio[name=section6-rdo]:checked").val() == "1") {
    condition = "";
  } else if ($("input:radio[name=section6-rdo]:checked").val() == "2") {
    condition = "안전운전 의무 불이행";
  } else if ($("input:radio[name=section6-rdo]:checked").val() == "3") {
    condition = "신호위반";
  } else if ($("input:radio[name=section6-rdo]:checked").val() == "4") {
    condition = "보행자 보호의무 위반";
  } else if ($("input:radio[name=section6-rdo]:checked").val() == "5") {
    condition = "안전거리 미확보";
  }
  $(".bubble").remove();
  readAndDraw($("input:radio[name=section6-rdo]:checked").val() * 1);
});
