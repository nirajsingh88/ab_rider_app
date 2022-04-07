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
    // $('.modal').modal();
    $('#updatepass').on('click',doUpdate);
  }

  function doUpdate(){
    var userid = userConfig.id;
    var password = $('#oldpass').val();
    var newpass = $('#newpass').val();

    var form = new FormData();
    form.append("userid", userid);
    form.append("password", password);
    form.append("psw", newpass);

    DM_CORE.apiForm('changepass',form,function(res){
      console.log(res.success)
      if (res.success == true) {
        swal({
              title: "Success!",
              text: res.message,
              icon: "success",
              // button: "Aww yiss!",
            });
        window.setTimeout(function() {
          window.location.href = "#/login";
            }, 1000);
    } else {
      erroraudio.play();
        swal({
              title: "Failure!",
              text: res.message,
              icon: "error",
              button: "Try again",
            });
    }

    })


  }

})();
