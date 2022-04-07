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

    DM_CORE.apiForm('orderlist_received_last',form,function(res){
      ++pageNum;
      console.log(res);
      // var alllist = res.resdata;
      var a = res.resdata;
      var htm = "";
      var delstat = "";
      var statColor = "";
      let finalObj = {}

      if(a!=""){
        a.forEach((consignment) => {
          const date = consignment.assie
          if (finalObj[date]) {
            finalObj[date].push(consignment);
          } else {
            finalObj[date] = [consignment];
          }
        })
        
        Object.keys(finalObj).forEach(function(key) {
          htm +=`<div class="items">
            <center>
            <h3 style="color:#99211d;">${key}</h3></center>
        </div>`;
        const alllist = finalObj[key],
        result = Object.values(alllist.reduce((r, { company,address,phone}) => {
          r[company] ??= { company, count: 0, address: address, phone: phone};
          r[company].count++;
          return r;
      }, {}));
  
  console.log(result);
  for(var i =0;i<result.length;i++){
          statColor = "black";
          htm +=`
      <div class="items">
        <h3 style="color:${statColor}">${result[i].company}</h3>
        <p>Address: ${result[i].address}</p>
        <p>Phone: ${result[i].phone}<a style ="float:right;color:green;"><b style="color:green;font-size: 25px;">${result[i].count}</b></a></p>
    </div>`;
      }
        
        });
      }else{
        htm +=`<div class="items">
        <center>
        <h3 style="color:#99211d;">NO RECEIVE ASSIGNMENT</h3></center>
    </div>`;
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

    DM_CORE.apiForm('orderlist_received_last',form,function(res){
      ++pageNum;
      // console.log(res);
      var alllist = res.resdata;
      var htm = "";
      var delstat = "";
      var statColor = "";
      for(var i =0;i<alllist.length;i++){
          statColor = "black";
          htm +=`<div class="items">
          <center>
          <h3 style="color:#99211d;">${alllist[i].assigned_date}</h3></center>
      </div>
      <div class="items">
        <h3 style="color:${statColor}">${alllist[i].company}</h3>
        <p>Address: ${alllist[i].address}</p>
        <p>Phone: ${alllist[i].phone}<a style ="float:right;color:green;"><b style="color:green;font-size: 25px;">${alllist[i].totalreceived}</b></a></p>
    </div>`;
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