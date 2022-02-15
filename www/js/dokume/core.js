
class DM_CORE_CLS {

  constructor() {
    this.initDefault();
  }

  initDefault(){
    this.getLoginData();
  }

  getLoginData(){
    userConfig = localStorage.getItem('userConfig');
    if (userConfig) {
        try {
            userConfig = JSON.parse(atob(userConfig));
        } catch (e) {
            try {
                userConfig = JSON.parse(userConfig);
            } catch (e2) {
                alert('Error');
            }
        }
    }
  }

  shuffleArray(array) {
    var currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  notification(type, text){
    $.bootstrapGrowl(`<p>${text}</p>`, {
        type: type,
        delay: 3000,
        allow_dismiss: true,
        align: 'center',
        offset: {from: 'top', amount: 20}
    });
  }

  findValueKey(data, key,id) {
    var field = data.find(function (value) {
        return value[key] == id;
    });
    if (!field) {
        field = null;
    }
    return field;
  }

  initDataTable(){
    $('.data-table').dataTable({
      pageLength: 10,
      lengthMenu: [[5, 10, 20], [5, 10, 20]]
    });
    $('.dataTables_filter input').attr('placeholder', 'Search');
    console.log($('.data-table'))
    $('.data-table').on('page.dt search.dt draw.dt', function () {
      console.log(11)
      DM_CORE.fixUrl();
    });
  }

  timeLoading(){
    $('.dm-timeline-loading').html(`<div class="dm-timeline-wrapper">
        <div class="dm-timeline-item">
            <div class="animated-background">
                <div class="background-masker header-top"></div>
                <div class="background-masker header-left"></div>
                <div class="background-masker header-right"></div>
                <div class="background-masker header-bottom"></div>
                <div class="background-masker subheader-left"></div>
                <div class="background-masker subheader-right"></div>
                <div class="background-masker subheader-bottom"></div>
                <div class="background-masker content-top"></div>
                <div class="background-masker content-first-end"></div>
                <div class="background-masker content-second-line"></div>
                <div class="background-masker content-second-end"></div>
                <div class="background-masker content-third-line"></div>
                <div class="background-masker content-third-end"></div>
            </div>
        </div>
    </div>`);
  }

  api(url,json,cb){
    var head = {
      "x-api-key": DM_CORE_CONFIG.API_KEY,
      'Content-Type': 'application/json',
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    };
    if(userConfig && typeof userConfig.token != 'undefined'){
      head.Authorization = "Bearer "+userConfig.token;
    }
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": DM_CORE_CONFIG.API_URL +url,
      "method": "POST",
      "type": "POST",
      dataType: "json",
      "headers": head,
      "data": JSON.stringify(json)
    };
    $.ajax(settings).done(function (response) {
      cb(response);
    });
  }

  apiForm(url,json,cb){
    var head = { };
    // var head = {
    //   "x-api-key": DM_CORE_CONFIG.API_KEY
    // };
    // if(userConfig && typeof userConfig.token != 'undefined'){
    //   head.Authorization = "Bearer "+userConfig.token;
    // }
    var settings = {
      "url": DM_CORE_CONFIG.API_URL +url,
      "method": "POST",
      "timeout": 0,
      "headers": head,
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": json
    };

    $.ajax(settings).done(function (response) {
      cb(JSON.parse(response));
    });
  }
};

DM_CORE = new DM_CORE_CLS();
