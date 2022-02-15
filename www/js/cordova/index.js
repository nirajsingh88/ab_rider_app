/// <reference path="../../plugins/cordova-plugin-bluetoothle/www/bluetoothle.js" />
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var SERVICE_UUID           ="6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
var RX_UUID                ="6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
var TX_UUID                ="6E400003-B5A3-F393-E0A9-E50E24DCCA9E";
var address = false;
var foundDevices = [];
var isScanning = false;

var bar = false;
var remainingTime = "";
var step = false;
var buttonFunction = false;
var boosterNumber = false;
var phase = false;
var phaseDone = false;
var programmFeedback = false;

document.addEventListener('deviceready', function () {
    // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
    bar = new ProgressBar.SemiCircle(container, {
        strokeWidth: 6,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
          value: '',
          alignToBottom: false
        },
        from: {
          color: '#20C99C'
        },
        to: {
          color: '#ED6A5A'
        },
        // Set default step function for all animate calls
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          var value = Math.round(bar.value() * 100);
          if (value === 0) {
            bar.setText('');
          } else {
            bar.setText(value);
          }
          bar.text.style.color = state.color;
        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.animate(0.0); // Number from 0.0 to 1.0#


    bluetoothle.initialize(initializeSuccess, handleError,
            { request: true, statusReceiver: false });

    document.getElementById("p1").disabled = true;
    document.getElementById("p2").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("command").disabled = true;
    document.getElementById("disconnect").disabled = true;
    document.getElementById("programm1").disabled = true;
    document.getElementById("programm2").disabled = true;

});

function initializeSuccess(result) {

    if (result.status === "enabled", "status") {

        log("Bluetooth is enabled.");
        log(result);
    }

    else {

        document.getElementById("start-scan").disabled = true;

        log("Bluetooth is not enabled:", "status");
        log(result, "status");
    }
}

function startScan() {
    if(isScanning) {
        stopScan();
        return;
    }
    isScanning = true;
    document.getElementById("start-scan").innerHTML = "Stop scan";

    log("Starting scan for devices...", "status");

    foundDevices = [];

    document.getElementById("devices").innerHTML = "";
    document.getElementById("services").innerHTML = "";
    document.getElementById("output").innerHTML = "";

    if (window.cordova.platformId === "windows") {

        bluetoothle.retrieveConnected(retrieveConnectedSuccess, handleError, {});
    }
    else {

        bluetoothle.startScan(startScanSuccess, handleError, { services: [] });
    }
}

function retrieveConnectedSuccess(result) {

    log("retrieveConnectedSuccess()");
    log(result);

    result.forEach(function (device) {

        addDevice(device.name, device.address);

    });
}

function startScanSuccess(result) {

    log("startScanSuccess(" + result.status + ")");

    if (result.status === "scanStarted") {

        log("Scanning for devices (will continue to scan until you select a device)...", "status");
    }
    else if (result.status === "scanResult") {

        if (!foundDevices.some(function (device) {

            return device.address === result.address;

        })) {

            log('FOUND DEVICE:');
            log(result);
            foundDevices.push(result);
            addDevice(result.name, result.address);
        }
    }
}

function addDevice(name, address) {

    var button = document.createElement("button");
    button.style.width = "100%";
    button.style.padding = "10px";
    button.style.fontSize = "16px";
    button.textContent = name + ": " + address;

    button.addEventListener("click", function () {

        document.getElementById("services").innerHTML = "";
        connect(address);
    });

    document.getElementById("devices").appendChild(button);
}

function connect(address) {

    log('Connecting to device: ' + address + "...", "status");

    if (cordova.platformId === "windows") {

        getDeviceServices(address);

    }
    else {

        stopScan();
        bluetoothle.connect(connectSuccess, handleError, { address: address });

    }
}

function connectSuccess(result) {
    log("- " + result.status);

    document.getElementById("command").disabled = false;
    document.getElementById("disconnect").disabled = false;
    document.getElementById("programm1").disabled = false;
    document.getElementById("programm2").disabled = false;

    if (result.status === "connected") {
        address = result.address;
        getDeviceServices(result.address);
    }
    else if (result.status === "disconnected") {

        log("Disconnected from device: " + result.address, "status");
    }
}

function getDeviceServices(address) {

    log("Getting device services...", "status");

    var platform = window.cordova.platformId;

    if (platform === "android") {

        bluetoothle.discover(discoverSuccess, handleError,
            { address: address });
    }
    else if (platform === "windows") {

        bluetoothle.services(servicesSuccess, handleError,
                { address: address });

    }
    else if (platform === "ios") {

       bluetoothle.services(servicesSuccess, handleError,
                { address: address });

    } else {

        log("Unsupported platform: '" + window.cordova.platformId + "'", "error");
    }
}

function servicesSuccess(result) {

    log("servicesSuccess()");
    log(result);

    if (result.status === "services") {

        var service = result.services.find(service => service == SERVICE_UUID);
        console.log(service);
        if(service){
            log("Connected to Booster", "status");
            bluetoothle.characteristics(characteristicsSuccess, handleError,
                { address: result.address, service: service });


        }else{
            log("Device is not a Booster", "status");
        }

    }
}

var percent = 0;
function subscribeSuccess(result){
    if (result.status === "subscribed") {
        log("Subscribed to message service", "status");
        log(result);
    }else if(result.status === "subscribedResult"){
        var val = bluetoothle.encodedStringToBytes(result.value);
        var string = bluetoothle.bytesToString(val);
        log(string);

        var splittedArray = string.split(",");

        var phaseTmp = splittedArray[0];
        var phaseDoneTmp = splittedArray[1];

        if(splittedArray[12] != boosterNumber){
            boosterNumber = splittedArray[12];
            log("Booster Number: " + boosterNumber, "status");
        }

        if(splittedArray[4] !== programmFeedback){
            programmFeedback = splittedArray[4];
            log("Program Feedback is: " + programmFeedback, "status");
        }

        if(splittedArray[2] !== buttonFunction){
            buttonFunction = splittedArray[2];
            switch(buttonFunction){
                case "0":
                    log("Button will start", "status");
                    break;
                case "1":
                    log("Button will stop", "status");
                    break;
                case "2":
                    log("Button will start", "status");
                    break;
                case "3":
                    log("Button will stop", "status");
                    break;
                case "4":
                    log("Button will stop", "status");
                    break;
                default:
                    log("Button will do nothing - no program chosen", "status");
            }
        }

        var stepTmp = splittedArray[3];
        if(stepTmp !== step){
            step = stepTmp;
            switch(step){
                case "0":
                    log("Choose Program", "status");
                    document.getElementById("programm2").disabled = false;
                    document.getElementById("programm1").disabled = false;
                    document.getElementById("p1").disabled = true;
                    document.getElementById("p2").disabled = true;
                    document.getElementById("stop").disabled = true;
                    break;
                case "1":
                    log("Ready", "status");
                    document.getElementById("p1").disabled = false;
                    document.getElementById("p2").disabled = true;
                    document.getElementById("stop").disabled = true;
                    break;
                case "2":
                    log("Heating", "status");
                    document.getElementById("p1").disabled = true;
                    document.getElementById("p2").disabled = true;
                    document.getElementById("stop").disabled = false;
                    break;
                case "3":
                    log("Hot", "status");
                    document.getElementById("p1").disabled = true;
                    document.getElementById("p2").disabled = false;
                    document.getElementById("stop").disabled = false;
                    break;
                case "4":
                    log("Wait", "status");
                    document.getElementById("p1").disabled = true;
                    document.getElementById("p2").disabled = true;
                    document.getElementById("stop").disabled = false;
                    break;
                case "5":
                    log("Paused", "status");
                    if(phaseTmp == 1){
                        document.getElementById("p1").disabled = false;
                        document.getElementById("p2").disabled = true;
                        document.getElementById("stop").disabled = true;
                    }
                    if(phaseTmp == 2){
                        document.getElementById("p1").disabled = true;
                        document.getElementById("p2").disabled = false;
                        document.getElementById("stop").disabled = true;
                    }
                    if(phaseTmp == 0){
                        document.getElementById("p1").disabled = false;
                        document.getElementById("p2").disabled = true;
                        document.getElementById("stop").disabled = true;
                    }
                    break;
                case "6":
                    log("Done", "status");
                    document.getElementById("p1").disabled = false;
                    document.getElementById("p2").disabled = true;
                    document.getElementById("stop").disabled = false;
                    break;
                case "7":
                    log("Cool Down", "status");
                    document.getElementById("p1").disabled = false;
                    document.getElementById("p2").disabled = true;
                    document.getElementById("stop").disabled = true;
                    break;

            }
        }

        if(phaseTmp >0){
            if(phaseTmp == 1 && phaseDoneTmp == 1 && phaseTmp !== phase && phaseDone !== phaseDoneTmp){
                phase = phaseTmp;
                phaseDone = phaseDoneTmp;

                log("Phase 1 done. Put in Aligners and Press Start!", "status");
            }

            if(splittedArray[9]/100 != percent){
                percent = splittedArray[9]/100;
                bar.animate(percent);
            }

            var units = splittedArray[7];
            var unit = splittedArray[8] == "M" ? " Minutes remaining" : " Seconds reamining";
            var string = units + unit;
            if(remainingTime !=  string){
                remainingTime = string;
                log(remainingTime, "status");
            }
        }

    }

}

function characteristicsSuccess(result) {

    log("characteristicsSuccess()");
    log(result);

    if (result.status === "characteristics") {

        console.log(result.address, result.service, result.characteristics);
        bluetoothle.subscribe(subscribeSuccess, handleError, {address:result.address, service:SERVICE_UUID, characteristic:TX_UUID});
        send("C1");
    }
}

function discoverSuccess(result) {

    log("Discover returned with status: " + result.status);

    if (result.status === "discovered") {
        result.services.forEach(function (service) {
            addService(result.address, service.uuid, service.characteristics);
        });
    }
}

function reportValue(serviceUuid, characteristicUuid, value) {

    document.getElementById(serviceUuid + "." + characteristicUuid).textContent = value;
}

// Stop scanning for bluetoothle devices.
function stopScan() {
    bluetoothle.stopScan(stopScanSuccess, handleError);
}

function stopScanSuccess() {
    isScanning = false;
    document.getElementById("start-scan").innerHTML = "Find booster";
    if (!foundDevices.length) {

        log("NO DEVICES FOUND");
    }
    else {

        log("Found " + foundDevices.length + " devices.", "status");
    }
}

function log(msg, level) {

    level = level || "log";

    if (typeof msg === "object") {

        msg = JSON.stringify(msg, null, "  ");
    }

    console.log(msg);

    if (level === "status" || level === "error") {

        var msgDiv = document.createElement("div");
        msgDiv.textContent = msg;

        if (level === "error") {

            msgDiv.style.color = "red";
        }

        msgDiv.style.padding = "5px 0";
        msgDiv.style.borderBottom = "rgb(192,192,192) solid 1px";
        document.getElementById("output").appendChild(msgDiv);
    }
}
// click event handler for start scan
document.getElementById("start-scan").addEventListener("click", function () {

    startScan();

});
// click event handler for start scan
document.getElementById("send").addEventListener("click", function () {

    var string = document.getElementById("command").value;
    send(string);

});
// click event handler for start scan
document.getElementById("p1").addEventListener("click", function () {

    startProgram1();
    document.getElementById("stop").disabled = false;
    document.getElementById("p2").disabled = true;
    document.getElementById("p1").disabled = true;
    document.getElementById("programm1").disabled = true;
    document.getElementById("programm2").disabled = true;

});

// click event handler for start scan
document.getElementById("p2").addEventListener("click", function () {

    startProgram2();
    document.getElementById("stop").disabled = false;
    document.getElementById("p1").disabled = true;
    document.getElementById("p2").disabled = true;
    document.getElementById("programm1").disabled = true;
    document.getElementById("programm2").disabled = true;

});

// click event handler for start scan
document.getElementById("stop").addEventListener("click", function () {

    stopProgram();
    document.getElementById("p1").disabled = true;
    document.getElementById("p2").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("programm1").disabled = false;
    document.getElementById("programm2").disabled = false;

});

// click event handler for start scan
document.getElementById("programm1").addEventListener("click", function () {

    chooseProgram1();
    document.getElementById("p1").disabled = false;
    document.getElementById("p2").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("programm2").disabled = false;
    document.getElementById("programm1").disabled = true;

});

// click event handler for start scan
document.getElementById("programm2").addEventListener("click", function () {

    chooseProgram2();
    document.getElementById("p1").disabled = false;
    document.getElementById("p2").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("programm1").disabled = false;
    document.getElementById("programm2").disabled = true;

});

document.getElementById("disconnect").addEventListener("click", function () {

    stopProgram();
    disconnect()

});

function chooseProgram1(){
    send("P1");
    send("T60");
    send("M8");
}

function chooseProgram2(){
    send("P2");
    send("T60");
    send("M8");
}

function stopProgram(){
    log("Program stopped", "status");
    send("S0");
}

function startProgram1(){
    log("Starting Phase 1", "status");
    send("S1");
}

function startProgram2(){
    log("Starting Phase 2", "status");
    send("S2");
}

function send(string){
    if(!address) return;

    var bytes = bluetoothle.stringToBytes(string);
    var encodedString = bluetoothle.bytesToEncodedString(bytes);

    bluetoothle.write(function(data){console.log("Write:", data);}, handleError,{"value":encodedString,"service":SERVICE_UUID,"characteristic":RX_UUID,"type":"noResponse","address":address});
}

function disconnect(){
    send("C0");
    bluetoothle.unsubscribe(function(data){console.log(data);}, handleError, {address:address, service:SERVICE_UUID, characteristic:TX_UUID});
    bluetoothle.disconnect(function(data){console.log(data);}, handleError, {address:address});
    bluetoothle.close(function(data){console.log(data);log("Closed connection", "status")}, handleError, {address:address});
}

function handleError(error) {

    var msg;

    if (error.error && error.message) {

        var errorItems = [];

        if (error.service) {

            errorItems.push("service: " + (uuids[error.service] || error.service));
        }

        if (error.characteristic) {

            errorItems.push("characteristic: " + (uuids[error.characteristic] || error.characteristic));
        }

        msg = "Error on " + error.error + ": " + error.message + (errorItems.length && (" (" + errorItems.join(", ") + ")"));
    }

    else {

        msg = error;
    }

    log(msg, "error");

    if (error.error === "read" && error.service && error.characteristic) {

        reportValue(error.service, error.characteristic, "Error: " + error.message);
    }
}
