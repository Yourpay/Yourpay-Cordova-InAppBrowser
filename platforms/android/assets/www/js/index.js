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
var battery_level = {};
var device_data = {}
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        device_data = device;
        
        console.log(device);
        var checkConnectionTimer = setInterval(checkConnection, 21600000);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var inputuser = $('#username');inputuser.val(localStorage.getItem('uname')); inputuser.trigger('input'); inputuser.trigger('change');
        var inputpass = $('#password');inputpass.val(localStorage.getItem('pwd')); inputpass.trigger('input'); inputpass.trigger('change');
        angular.element('#btnlogin').trigger('click');
    }
};
document.addEventListener("backbutton", onBackKeyDown, false);
window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
    battery_level = status;
}
function checkConnection() {
    var networkState = navigator.connection.type;
    $.ajax({
        url: "https://webservice.yourpay.dk/v4.3/terminals_settings?serial=" + device_data.serial + "&uuid=" + device_data.uuid + "&setting_key=network&setting_value=" + networkState,
        jsonp: "YPRequest",
        dataType: "json"
    });    
    
}



function onBackKeyDown() {
    // Lock so you don't go back to the log in screen
}
function GetBatteryLife() {
    $.ajax({
        url: "https://webservice.yourpay.dk/v4.3/terminals_settings?serial=" + device.serial + "&uuid=" + device.uuid + "&setting_key=battery&setting_value=".battery_level.level,
        jsonp: "YPRequest",
        dataType: "json"
    });    
}
function GenerateTransID() {
    $.ajax({
        url: "http://webservice.yourpay.dk/v4/generate_trans_id",
        jsonp: "YPRequest",
        dataType: "json",
        success: function( response ) {
            localStorage.setItem("NextTransID", response["transid"]);
            return true;
        }
    });
}
function GetMerchantData() {
    $.ajax({
        url: "http://webservice.yourpay.dk/v4/customer_data",
        jsonp: "YPRequest",
        dataType: "json",
        data: {
            token: localStorage.getItem('merchant_token')
        },
        success: function( response ) {
            localStorage.setItem("prod_merchantid", response.prod_merchantid);
        }
    });
}
function printCard() {
}
function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}



app.initialize();