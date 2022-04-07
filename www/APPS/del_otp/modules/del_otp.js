'use strict';

(function() {
  
  if(localStorage.getItem("userConfig") != null){
    init();
    }else{
      window.location.href = "#/login";
    }

  function init() {
    $('.btm-mnu').show();
    $('.sidebar').show();
    $('.content-right').show();
    var consignId = localStorage.getItem("considtoupdate");
    console.log(consignId);
    document.getElementById("consignmenttt_id").value = consignId;
    $('#submitdelotp').on('click',updateOrder);
  }

  function updateOrder(){
    if(localStorage.getItem("userConfig") != null){
      console.log(userConfig.id);
    
    var userid = userConfig.id;
    var consid_toupdate = $('#consignmenttt_id').val();
    var cusotp = $('#otp').val();

    if(cusotp == ''){
      erroraudio.play();
      alert('Please enter the OTP first');
      return false; 
    }

    var form = new FormData();
    form.append("consid_toupdate", consid_toupdate);
    form.append("cusotp", cusotp);

    DM_CORE.apiForm('update_ord',form,function(res){
      console.log(res);
      
      if (res.success == true) {
          swal({
                title: "Success!",
                text: "Successfully updated order!",
                icon: "success",
                // button: "Aww yiss!",
              });
          window.setTimeout(function() {
            window.location.href = "#/current_order";
              }, 1000);
            // location.reload();
      } else {
          swal({
                title: "Failure!",
                text: "Order update failed!",
                icon: "error",
                button: "Try again",
              });
      }

      
    })
    }
  }




})();


    
