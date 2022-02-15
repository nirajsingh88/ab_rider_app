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
  }

  function setEvents(){
        addTogetFinanceList();
  }

  function getFinanceList(){
    if(localStorage.getItem("userConfig") != null){
      // console.log(userConfig.id);
      var userid = userConfig.id;
      pageNum = 1;

    var form = new FormData();
    form.append("userid", userid);
    form.append("offset", (pageNum-1)*10);

    DM_CORE.apiForm('financiallist',form,function(res){
      ++pageNum;
      console.log(res);
      var alllist = res.findata;
      var htm = "";
      var delstat = "";
      var statColor = "";
      for(var i =0;i<alllist.length;i++){
        if(alllist[i].cusotp != 0){
          statColor = "green";
          delstat = "DELIVERED";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Customer Name: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}</p>
    </div>`;
        }else{
          statColor = "red";
          delstat = "PENDING";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Customer Name: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}<a style ="float:right;color:blue;" onclick="getfindetail(${alllist[i].id})"><i class="fa fa-key" style="font-size:28px;color:green"></i></a><a style ="float:right;color:blue;" href="tel:${alllist[i].contact}"><i class="fa fa-phone" style="font-size:28px;color:green"></i></a></p>
    </div>`;
        }
      }
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
      var alllist = res.findata;
      var htm = "";
      var delstat = "";
      var statColor = "";
      for(var i =0;i<alllist.length;i++){

        if(alllist[i].cusotp != 0){
          statColor = "green";
          delstat = "DELIVERED";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Customer Name: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}</p>
    </div>`;
        }else{
          statColor = "red";
          delstat = "PENDING";
          htm +=`<div class="items">
        <h3 style="color:${statColor}">${delstat}</h3>
        <p>Customer Name: ${alllist[i].name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].contact}<a style ="float:right;color:blue;" onclick="getfindetail(${alllist[i].id})"><i class="fa fa-key" style="font-size:28px;color:green"></i></a><a style ="float:right;color:blue;" href="tel:${alllist[i].contact}"><i class="fa fa-phone" style="font-size:28px;color:green"></i></a></p>
    </div>`;
        }
      }
      $("#fin-item").append(htm);
    })
    }
  }


})();

function getfindetail(ccid){
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