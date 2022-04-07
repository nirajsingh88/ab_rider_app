'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") != null){
    init();
    }else{
      window.location.href = "#/login";
    }
  var pageNum = 1;
  

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    // setEvents();
    getFinanceList();
    $('#showmore').on('click',setEvents);
    $('#searchcus').on('click',getFinanceList);
  }

  function setEvents(){
        addTogetFinanceList();
  }

  $('#example').submit(function (evt) {
    evt.preventDefault();
    window.history.back();
});

  function getFinanceList(){
    event.preventDefault()
    if(localStorage.getItem("userConfig") != null){
      // console.log(userConfig.id);
      var userid = userConfig.id;
      var cussname = $('#cussname').val();
      pageNum = 1;

    var form = new FormData();
    if(cussname != ''){
      form.append("recipientnum", cussname);
      }
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);

    DM_CORE.apiForm('financiallist',form,function(res){
      ++pageNum;
      console.log(res);
      // var alllist = res.findata;
      var a = res.findata;
      var htm = "";
      var delstat = "";
      var statColor = "";

      let finalObj = {}
      a.forEach((consignment) => {
        const date = consignment.assignedDate
        if (finalObj[date]) {
          finalObj[date].push(consignment);
        } else {
          finalObj[date] = [consignment];
        }
      })
      console.log(finalObj);

      Object.keys(finalObj).forEach(function(key) {
        htm +=`<div class="items">
          <center>
          <h3 style="color:#99211d;">${key}</h3></center>
      </div>`;
      var alllist = finalObj[key];
      for(var i =0;i<alllist.length;i++){
        var cashCollection = numberWithCommas(alllist[i].cash_collection);
        var cordinates = geocode(alllist[i].recipient_address);
        var addlat = cordinates.lat;
        var addlng = cordinates.lng;
        // console.log('cordinates'+cordinates.lat);
        if(alllist[i].cusotp != 0){
          statColor = "green";
          delstat = "DELIVERED";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Merchant: ${alllist[i].company}</p>
        <p>Customer: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}</p>
        <p><b>Cash Collection: ${cashCollection}</b></p>
    </div>`;
        }else{
          statColor = "red";
          delstat = "PENDING";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Merchant: ${alllist[i].company}</p>
        <p>Customer: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}<button class="btn-small" style ="float:right;color:blue;"><a onclick="getfindetail(${alllist[i].id})">OTP</a></button><button class="btn-small" style ="float:right;color:blue;"><a onclick="playAudioCall();" href="tel:${alllist[i].contact}"><i class="fa fa-phone"></i></a></button><button  class="btn-small" style ="float:right;color:blue;"><a onclick="playAudio();" target="_blank" href="http://maps.google.co.uk/maps?q=${addlat},${addlng}"><i class="fa fa-map-marker"></i></a></button></p>
        <p><b>Cash Collection: ${cashCollection}</b></p>
    </div>`;
        }
      }
      
      });
    
      $("#fin-item").html(htm);
    })
    }
  }

  function addTogetFinanceList(){
    if(localStorage.getItem("userConfig") != null){
      // console.log(userConfig.id);
      var userid = userConfig.id;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);

    DM_CORE.apiForm('financiallist',form,function(res){
      ++pageNum;
      // console.log(res);
      // var alllist = res.findata;
      var a = res.findata;
      var htm = "";
      var delstat = "";
      var statColor = "";
      let finalObj = {}
      a.forEach((consignment) => {
        const date = consignment.assignedDate
        if (finalObj[date]) {
          finalObj[date].push(consignment);
        } else {
          finalObj[date] = [consignment];
        }
      })
      console.log(finalObj);

      Object.keys(finalObj).forEach(function(key) {
        htm +=`<div class="items">
          <center>
          <h3 style="color:#99211d;">${key}</h3></center>
      </div>`;
      var alllist = finalObj[key];
      for(var i =0;i<alllist.length;i++){
        var cashCollection = numberWithCommas(alllist[i].cash_collection);
        var cordinates = geocode(alllist[i].recipient_address);
        var addlat = cordinates.lat;
        var addlng = cordinates.lng;
        if(alllist[i].cusotp != 0){
          statColor = "green";
          delstat = "DELIVERED";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Merchant: ${alllist[i].company}</p>
        <p>Customer: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}</p>
        <p><b>Cash Collection: ${cashCollection}</b></p>
    </div>`;
        }else{
          statColor = "red";
          delstat = "PENDING";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Merchant: ${alllist[i].company}</p>
        <p>Customer: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}<button class="btn-small" style ="float:right;color:blue;"><a onclick="getfindetail(${alllist[i].id})">OTP</a></button><button class="btn-small" style ="float:right;color:blue;"><a onclick="playAudioCall();" href="tel:${alllist[i].contact}"><i class="fa fa-phone"></i></a></button><button  class="btn-small" style ="float:right;color:blue;"><a onclick="playAudio();" target="_blank" href="http://maps.google.co.uk/maps?q=${addlat},${addlng}"><i class="fa fa-map-marker"></i></a></button></p>
        <p><b>Cash Collection: ${cashCollection}</b></p>
    </div>`;
        }
      }
      
      });
      $("#fin-item").append(htm);
    })
    }
  }

  function geocode(recipientAddress){
    console.log('recipientAddress'+recipientAddress);
    // var values = "";
    var cordLat;
    var settings = {
      "url": "https://maps.googleapis.com/maps/api/geocode/json?address="+recipientAddress+"&key=AIzaSyAm1_xprk0gyEsK7yJAZEqQEeQdKCxM0gc",
      "method": "GET",
      "timeout": 0,
      async: false
    };
    
  $.ajax(settings).done(function (response) {
      // console.log(response.results[0].geometry.location);
      if(response.results[0] != null || ""){
      cordLat = response.results[0].geometry.location;
      }
      else{
        cordLat = "";
      }
    });
    console.log('cordLat'+cordLat);
    return cordLat;
  }


})();

function getfindetail(ccid){
  audio.play(); 
  localStorage.setItem('considtoupdate', ccid);
  window.location.href = "#/del_otp";
}
function mysqlDatetoJs(mysqlTimeStamp){
  var t = mysqlTimeStamp.split(/[- :]/);
      return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  }

  function prettyDate(date) {
    var months =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return date.getUTCDate() + ', ' + months[date.getUTCMonth()] 
    + ' ' + date.getUTCFullYear();
    }

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  

  