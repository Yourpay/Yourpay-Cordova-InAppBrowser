angular.module('PosApp').controller('paymentCtrl', ['$scope', 'payFactory','$window', '$translate', '$timeout',
    function($scope, payFactory, $window, $translate, $timeout) {
        $scope.title='img/Dollar.png';
        $scope.services = payFactory.pLibary;
        $scope.currencyChoice = payFactory.currency;
        $scope.currencyCode = payFactory.currencyCode;
        $scope.chosen = {};
        $scope.tips= 0;
        $scope.finalAmount = 0;
        $scope.amount = 0;
        $scope.discount = 0;
        $scope.ManualAmount = 0;
        $scope.manualAmountInt = 0;
        $scope.payMethod;
        $scope.limit = 0;
        $scope.content='numbers';
	$scope.toggleActive = function(s){
            s.active = !s.active;
            $scope.chosenElements(s);
	};
        $scope.chosenElements = function(s){
            var v = angular.copy(s);
            delete v.image;
            if(v.active){
                $scope.chosen[v.id] = v;
            }
            else if(!v.active){
                $scope.removeElement(v);
            }
        };
        $scope.removeElement = function(s){
            s.amount = 0;
            delete $scope.chosen[s.id];
        };
        $scope.CancelOnlineTransaction = function() {
            $.ajax({
                url: "http://webservice.yourpay.dk/v4.3/payment_pos_external?action=cancel&serial=" + device.serial + "&uuid=" + device.uuid,
                jsonp: "YPRequest",
                dataType: "json"
            });            
        }
        $scope.PaymentOnlineTransaction = function(){
            $.ajax({
                url: "http://webservice.yourpay.dk/v4.3/payment_pos_external?serial=" + device.serial + "&uuid=" + device.uuid,
                jsonp: "YPRequest",
                dataType: "json",
                success: function( response ) {
                    if(response.content.pending == "true") {

                        $scope.ManualAmount = (response.content.amount/100);
                        $scope.currencyCode = response.content.currency;
                        $scope.OrderIDValue = response.content.transid;
                        var payMethod = 'card';
                        $scope.pay(payMethod);
                    }
                }
            });
        };
        $timeout($scope.PaymentOnlineTransaction, 3000);
        $scope.numericFields = function(val) {
            var numericInput = $(".numericMaster");
            var amount = numericInput.val().replace(".","").replace(",","");
            if(amount.length < 4 && amount.charAt(0) === 0) {
                amount = amount.slice(1) + val;
            } else {
                amount = amount + val;
            }
            if(val === "c"){
                amount = "0";
            }
            $scope.ManualAmount = (parseFloat(amount)/100).toFixed(2);
            
            $(".numericShow").html($scope.ManualAmount + " " + $scope.currencyCode);
            
            if(parseFloat(amount) == 1111111)
                jQuery(".headWrapper").css("display","none");
            if(parseFloat(amount) == 3333333)
                $scope.PaymentOnlineTransaction();
            if(parseFloat(amount) == 9999999)
                $(".headWrapper").css("display","block");
            
            $scope.manualAmountInt = parseFloat($scope.ManualAmount);          
        };
	$scope.total = function(){
            $scope.amount = 0;
            angular.forEach($scope.chosen, function(s){
                if(s.amount === 0)
                {
                    $scope.amount+= s.price;
                    s.amount++;
                }
                if(s.amount !== 0){
                    $scope.amount+= s.price * s.amount;
                }
            });
            if($scope.discount > $scope.amount + $scope.tips + $scope.manualAmountInt)
            {
                $scope.finalAmount = $scope.amount + $scope.tips + $scope.manualAmountInt;
            }
            else{
                $scope.finalAmount = $scope.amount+ $scope.tips + $scope.manualAmountInt - $scope.discount;
            }
            return $scope.finalAmount;
	};
        $scope.startPay = function(){
            if(Object.keys($scope.chosen).length !== 0 || $scope.manualAmountInt !== 0){
                $scope.content = 'hidden'; 
            }
            else
                $translate('NOPRODUCTSSELECTED')
                    .then(function(translatedValue){
                        var tv = translatedValue; 
                window.alert(tv);
            });      
        };
        $scope.payCard = function(){
            var payMethod = 'card';
            $scope.pay(payMethod);
        };
        $scope.payWeb = function(){
            var payMethod = 'web';
            $scope.webpay(payMethod);
        };
        $scope.payCash = function(){
            var payMethod = 'cash';
            $scope.pay(payMethod);
        };
        $scope.webpay = function(method){
            $.ajax({
                url: "http://webservice.yourpay.dk/v4.3/"+ 
                        "generate_token?" +
                        "merchant_token=" + localStorage.getItem('merchant_token') + "&" + 
                        "MerchantNumber=" + localStorage.getItem('prod_merchantid') + "&" +
                        "ShopPlatform=InAppBrowser&" + 
                        "ccrg=1&" + 
                        "amount=" + ($scope.ManualAmount*100) + "&" + 
                        "currency=" + $scope.currencyCode + "&" +
                        "accepturl=https://www.yourpay.io/din-betaling-er-gennemfoert/&" + 
                        "callbackurl=https://www.yourpay.io/din-betaling-er-gennemfoert/",
                jsonp: "YPRequest",
                dataType: "json",
                success: function( response ) {
                    var weburl = response.content.full_url;
                    var ref = cordova.InAppBrowser.open(weburl, '_blank', 'location=no');
                    ref.addEventListener('loadstart', function(event) {
                        if(event.url.indexOf("uxtime") > -1) {
                            var url_two = new URL(event.url);

                            // The parameters you need to work with based on your app.
                            // The CCRG key contains the card details, that is to be used at a later point.
                            // There are several other details available, you can find all of them at api.yourpay.dk - after completing a (test) payment.

                            var uxtime = gup('uxtime', url_two);
                            alert(uxtime);

                            var tid = gup('tid', url_two);
                            alert("PaymentID: " + tid);

                            var ccrg = gup('ccrg', url_two);
                            alert("Card Registration Key: " + ccrg);

                            ref.close();
                            
                        }
                    });                    
                }
            });         
            
        }        
        $scope.pay = function(method){
            if($scope.tips === undefined || $scope.discount === undefined){
                $translate('INVALIDSYMBOLS')
                        .then(function(translatedValue){
                            var tv = translatedValue; 
                    window.alert(tv);
                    $scope.tips = 0;
                    $scope.discount = 0;
                });
            }
            else{
                if(method === "card") {
                    var success = function(message) {
                        $.ajax({
                            url: "http://webservice.yourpay.dk/v4.3/payment_pos_external?action=cancel&serial=" + device.serial + "&uuid=" + device.uuid,
                            jsonp: "YPRequest",
                            dataType: "json",
                            success: function( response ) {
                                $timeout($scope.PaymentOnlineTransaction, 3000);
                            }
                        });
                        
                        if(message === 'approved'){
                            GenerateTransID();
                            payFactory.saveTransaction($scope.total(), method);
                            $scope.content='numbers'; 
                            $scope.chosen = {};
                            $scope.finalAmount = 0;
                            $scope.tips= 0;
                            $scope.discount = 0;
                            $scope.ManualAmount = 0;
                            $scope.manualAmountInt = 0;
                            $scope.$digest();
                            $scope.CancelOnlineTransaction;
                            $timeout($scope.PaymentOnlineTransaction, 3000);
                            
                            var success = function() {
                                //alert("Success");
                            };
                            var failure = function() {
                                //alert("Error");
                            };                    
                            //cordova.exec(success, failure, "MposUIPlugin", "printer", "");
                        }
                        else{
                            GenerateTransID();
                            payFactory.saveTransaction($scope.total(), method);
                            $scope.content='numbers'; 
                            $scope.chosen = {};
                            $scope.$digest();
                            var success = function() {
                                
                            };
                            var failure = function() {
                                
                            };  
                            $scope.content = 'hidden';
                            $translate('TRANSERROR')
                                    .then(function(translatedValue){
                                        var tv = translatedValue; 
                                window.alert(tv);
                                $scope.$digest();
                            });
                        } 
                    };
                    var failure = function() {
                        alert("Internal Error!");
                        alert("Could not initialize Java-file.");
                        alert("Identiier: " + localStorage.getItem('term_identifier'));
                        
                    };
                    
                    var orderIDVal = localStorage.getItem('NextTransID');
                    if($scope.OrderIDValue != "" && $scope.OrderIDValue != undefined)
                        orderIDVal = $scope.OrderIDValue;
                    
                    var getRowData =
                            [{
                            "PaymentText":              "Yourpay",
                            "FullAmount":               $scope.ManualAmount,
                            "Currency":                 $scope.currencyCode, 
                            "MerchantID":               localStorage.getItem('prod_merchantid'),
                            "merchantIdentifier":       localStorage.getItem('term_identifier'),
                            "merchantSecretKey":        localStorage.getItem('term_key'),
                            "transactionidentifier" :   orderIDVal,
                            "production":               localStorage.getItem('debug'),
                            "printerMac":               localStorage.getItem('printerMac'),
                            "cashRegister":             localStorage.getItem("cashRegister") || 0,
                            // sæt currency til $scope.currencyChoice //
                        }];   
                    
                    //console.log(getRowData[0]);
                    
                    if(localStorage.getItem('debug') == 1) {
                            console.log(getRowData);
//                        alert(getRowData[0].PaymentText);
//                        alert(getRowData[0].FullAmount);
//                        alert(getRowData[0].Currency);
//                        alert(getRowData[0].MerchantID);
//                        alert(getRowData[0].merchantIdentifier);
//                        alert(getRowData[0].merchantSecretKey);
//                        alert(getRowData[0].transactionidentifier);
//                        alert(getRowData[0].production);
//                        alert(getRowData[0].printerMac);
//                        alert(getRowData[0].cashRegister);
                    }
                    
                    cordova.exec(success, failure, "MposUIPlugin", "transaction", getRowData);
                }; // til og med her //
                $scope.loadMore = function(){
                    $scope.limit += 10; 
                };
            }
        };
    }]);
