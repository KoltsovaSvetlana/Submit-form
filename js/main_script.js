var ready = function() {

   var nameCamp = document.getElementById("nameCamp");
   var showLinks = document.getElementsByClassName("linkShow");
   var visibilityCList = document.getElementsByClassName("visibilityCList");
   var visibilityRList = document.getElementsByClassName("visibilityRList");
   var form = document.getElementById("form");

   if (nameCamp.addEventListener) {
      nameCamp.addEventListener("input", getCountSymbol);
      nameCamp.addEventListener("propertychange", function() {
         if (event.propertyName == "value") 
               getCountSymbol();
      }, false);
   }

   for (var i = 0; i < showLinks.length; i++) {
      showLinks[i].addEventListener("click", hideShowBlock);
   }

   for (var i = 0; i < visibilityCList.length; i++) {
      visibilityCList[i].addEventListener("click", hideShowListCountry);
   }

   for (var i = 0; i < visibilityRList.length; i++) {
      visibilityRList[i].addEventListener("click", hideShowListRegion);
   } 

   if (form.addEventListener) {
      form.addEventListener("submit", formSubmit);
   }
};

function getCountSymbol() {
   var countSymbol = this.maxLength - this.value.length;
   var countSymbols = document.getElementById("countSymbols");
   countSymbols.innerText = countSymbol;
}

function hideShowBlock() {
   var hideBlock = this.nextElementSibling;
   if (hideBlock.style.display != "block") {
      hideBlock.style.display = "block";
   } else {
      hideBlock.style.display = "none";
   }
}

function hideShowListCountry() {
   var countryList = document.getElementById("countryList");
   var arrowImg = document.getElementById("arrowCountry");
   var line = document.getElementById("line");
   if (countryList.style.display != "block") {
      countryList.style.display = "block";
      line.style.display = "inline-block";
      arrowImg.src = "img/arrow.png";
   } else {
      countryList.style.display = "none";
      line.style.display = "none";
      arrowImg.src = "img/arrow_right.png";
   }
}

function hideShowListRegion() {
   var clickedElement = this;
   var line = document.getElementById("line");
   var oldHeight = line.clientHeight;
   var regionList = this.parentNode.nextElementSibling;
   var arrowImg;
   if (this.tagName == "IMG") {
      arrowImg = this;
   } else {
      arrowImg = this.previousSibling.previousSibling.previousSibling.previousSibling;
   }
   var segment =  getLineHeight(clickedElement);
   changeStyles(line, regionList, arrowImg, oldHeight, segment);  
}

function getLineHeight(clickedElement) {
   if (clickedElement.classList.contains("ua")) {
      return 124;
   } else if (clickedElement.classList.contains("ru")) {
      return 99;
   } else {
      return 0;
   }
} 

function changeStyles(line, regionList, arrowImg, oldHeight, height) {
   if (regionList.style.display != "block") {
      regionList.style.display = "block";
      newHeight = oldHeight + height;
      line.style.height = newHeight +"px";
      arrowImg.src = "img/arrow.png";
   } else {
      regionList.style.display = "none";
      newHeight = oldHeight - height;
      line.style.height = newHeight +"px";
      arrowImg.src = "img/arrow_right.png";
   }
}

function formSubmit(event) {
   //console.log(event);
   var inputs = event.target;
   var index = 0;
   var length = inputs.length;
   var value;
   for (index; index < length; index++) {
      if (inputs[index].type == "checkbox"
      && inputs[index].name != "") {
         if (inputs[index].parentNode.className == "icheckbox_flat-orange") {
            value = "not-checked";
         } else {
            value = "checked";
         }
      } else if (inputs[index].type == "radio"
         && inputs[index].name != "") {
         if (inputs[index].parentNode.className == "iradio_flat checked") {
            value = "selected";
         } else {
            value = "not-selected";
         }
      } else if (inputs[index].value
         && inputs[index].value != "on") {
         value = inputs[index].value;
      } else if (inputs[index].text) {
         value = inputs[index].text;
      }

      if (inputs[index].name && value) {
         console.log("id: " + inputs[index].id + " name: " + inputs[index].name + " value: " + value);
      }
      value = "";
   }
   event.preventDefault();
}

document.addEventListener ("DOMContentLoaded", ready, false);

var tableMax = 19;
var tableCount = 0;

var geographyMax = 15;
var geographyCount = 0;
var ukraineMax = 5;
var ukraineCount = 0;
var russiaMax = 4;
var russiaCount = 0;
var belarusMax = 3;
var belarusCount = 0;

// geography block
function geographyChecked(event) {
   $(".geography").each(function(index) {
      $(this).iCheck("check");
   });
}

function geographyUnChecked(event) {
   $(".geography").each(function(index) {
      $(this).iCheck("uncheck");
   });
}

function geographyCheck(event) {
   var id = this.id;
   if (id != "all") {
      ++geographyCount;
      if (id == "ukraine" || id == "russian" || id == "belarus") {
         countryCheckUncheck (id,"check");
      } else {
         regionCheck(id);
      }
   }  
   if (geographyCount == geographyMax) {
      $("#all").iCheck("check");
      $("#arrowCountry+div").addClass("checked"); 
   }
   //console.log("geographyCount: " + geographyCount);
}

function geographyUnCheck(event) {
   var id = this.id;
   if (id != "all") {
      --geographyCount;
      if (id == "ukraine" || id == "russian" || id == "belarus") {
         countryCheckUncheck(id,"uncheck");
      } else {
         regionUncheck(id);
      }
   }  
   if (geographyCount < geographyMax) {
      $("#arrowCountry+div").removeClass("checked");
   }
   //console.log("geographyCount: " + geographyCount);
}

function countryCheckUncheck(id, operation /* "check" or "uncheck"*/) { 
   var regionList = $(".geography").filter("."+id);
   regionList.each(function(index) {
      $(this).iCheck(operation);
   });
}

function regionCheck(id) { 
   if ($("#"+id).hasClass("ukraine")) {
      ++ukraineCount;
      if (ukraineCount == ukraineMax) {
         $("#ukraine").iCheck("check");
         $(".visibilityRList.ua+div").addClass("checked");
      }
   } else if ($("#"+id).hasClass("russian")) {
      ++russiaCount;
      if (russiaCount == russiaMax) {
         $("#russian").iCheck("check");
         $(".visibilityRList.ru+div").addClass("checked");
      }
   } else {
      ++belarusCount;
      if (belarusCount == belarusMax) {
         $("#belarus").iCheck("check");
         $(".visibilityRList.bl+div").addClass("checked");
      }
   }
}

function regionUncheck(id) { 
   if ($("#"+id).hasClass("ukraine")) {
      --ukraineCount;
      if (ukraineCount < ukraineMax) { 
        $(".visibilityRList.ua+div").removeClass("checked");
      }
   } else if ($("#"+id).hasClass("russian")) {
      --russiaCount;
      if (russiaCount < russiaMax) {
          $(".visibilityRList.ru+div").removeClass("checked");
      }
   } else {
      --belarusCount;
      if (belarusCount < belarusMax) {
         $(".visibilityRList.bl+div").removeClass("checked");
      }
   }
}

// table 
function tableChecked(event) {
   $(".table").each(function(index) {
      $(this).iCheck("check");
   });
}

function tableUnChecked(event) {
   $(".table").each(function(index) {
      $(this).iCheck("uncheck");
   });
}

function tableCheck(event) {
   ++tableCount;
   var rowTable = $(this).parents("tr").css("background-color", "#eff6f6");
   if (tableCount == tableMax) {
      $("#table").iCheck("check");
      $("thead>tr>th>div").addClass("checked");
   }
   //console.log("tableCount: " + tableCount);
}

function tableUnCheck(event) {
   --tableCount;
   var rowTable = $(this).parents("tr").css("background-color", "#ffffff");
   if (tableCount < tableMax) {
      $("thead>tr>th>div").removeClass("checked");
   }
   //console.log("tableCount: " + tableCount);
}