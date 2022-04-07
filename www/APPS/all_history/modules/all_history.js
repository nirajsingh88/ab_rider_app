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

    DM_CORE.apiForm('orderlist',form,function(res){
      ++pageNum;
      console.log(res);
      var a = res.deldata;
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
          var amountPaid = numberWithCommas(alllist[i].amount_paid);
          statColor = "black";
          htm +=`
      <div class="items">
        <h3 style="color:${statColor}">${alllist[i].consignment_id}</h3>
        <p>Merchant: ${alllist[i].company}</p>
        <p>Customer: ${alllist[i].recipient_name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].recipient_number}</p>
        <p><b>CC: ${cashCollection} | CA: ${amountPaid}</b></p>
    </div>`;
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

    DM_CORE.apiForm('orderlist',form,function(res){
      ++pageNum;
      // console.log(res);
      // var alllist = res.deldata;
      var a = res.deldata;
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
          var amountPaid = numberWithCommas(alllist[i].amount_paid);
          statColor = "black";
          htm +=`
      <div class="items">
        <h3 style="color:${statColor}">${alllist[i].consignment_id}</h3>
        <p>Merchant: ${alllist[i].company}</p>
        <p>Customer: ${alllist[i].recipient_name}</p>
        <p>Address: ${alllist[i].recipient_address}</p>
        <p>Phone: ${alllist[i].recipient_number}</p>
        <p><b>CC: ${cashCollection} | CA: ${amountPaid}</b></p>
    </div>`;
      }
      
      });
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

    Object.size = function(obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }