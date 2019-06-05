angular.module('PosApp').factory('payFactory',['$rootScope', function ($rootScope) {
        var fac = {};
        
        var expectedCurrencySymbol = "DKK ";
        var expectedCurrencyCode = "DKK";
        
        if(isNaN(parseFloat(localStorage.getItem("currency")))) { localStorage.setItem("currency", 208); }
        if(isNaN(parseFloat(localStorage.getItem("printerName")))) { localStorage.setItem("printerName", ""); localStorage.setItem("printerMac", ""); }
        
        if(JSON.parse(localStorage.getItem("currency")) == "208") {
            expectedCurrencySymbol = "DKK ";     
            expectedCurrencyCode = "DKK";
        }
        else if(JSON.parse(localStorage.getItem("currency")) == "578") {
            expectedCurrencySymbol = "NOK ";    
            expectedCurrencyCode = "NOK";
        }
        else if(JSON.parse(localStorage.getItem("currency")) == "758") {
            expectedCurrencySymbol = "SEK ";
            expectedCurrencyCode = "SEK";
        }
        else if(JSON.parse(localStorage.getItem("currency")) == "826") {
            expectedCurrencySymbol = "£ ";            
            expectedCurrencyCode = "GBP";
        }
        else if(JSON.parse(localStorage.getItem("currency")) == "840") {
            expectedCurrencySymbol = "$ ";            
            expectedCurrencyCode = "USD";
        }
        else if(JSON.parse(localStorage.getItem("currency")) == "978") {
            expectedCurrencySymbol = "€ ";
            expectedCurrencyCode = "EUR";
        }
        else if(JSON.parse(localStorage.getItem("currency")) == "616") {
            expectedCurrencySymbol = "PLN ";
            expectedCurrencyCode = "PLN";
        }
        fac.cashierNr = localStorage.getItem("cashierNr") || [];
        fac.cashRegister = JSON.parse(localStorage.getItem("cashRegister")) || 0;
        fac.pHistory= JSON.parse(localStorage.getItem("pHistory"));
        fac.categoryLib = JSON.parse(localStorage.getItem("categoryLib"));
        fac.currency = expectedCurrencySymbol;
        fac.currencyCode = expectedCurrencyCode;
        
        fac.save = function(p, o){
            localStorage.setItem(p, o);
            if(p === 'cashRegister'){
                 fac.cashRegister = o;
            }
            if(p === 'cashierNr'){
                fac.cashierNr.push(o);
            }
            console.log('fac', fac);
        };
        
        
        
        fac.changeCurrency = function(c){
            localStorage.setItem("currency", c);
            
            var expectedCurrencySymbol = "DKK ";
            var expectedCurrencyCode = "DKK";
            
            if(JSON.parse(localStorage.getItem("currency"))== "208") {
                expectedCurrencySymbol = "DKK ";     
                expectedCurrencyCode = "DKK";
            }
            else if(JSON.parse(localStorage.getItem("currency"))== "578") {
                expectedCurrencySymbol = "NOK ";    
                expectedCurrencyCode = "NOK";
            }
            else if(JSON.parse(localStorage.getItem("currency"))== "758") {
                expectedCurrencySymbol = "SEK ";
                expectedCurrencyCode = "SEK";
            }
            else if(JSON.parse(localStorage.getItem("currency"))== "826") {
                expectedCurrencySymbol = "£ ";            
                expectedCurrencyCode = "GBP";
            }
            else if(JSON.parse(localStorage.getItem("currency"))== "840") {
                expectedCurrencySymbol = "$ ";            
                expectedCurrencyCode = "USD";
            }
            else if(JSON.parse(localStorage.getItem("currency"))== "978") {
                expectedCurrencySymbol = "€ ";
                expectedCurrencyCode = "EUR";
            }
            else if(JSON.parse(localStorage.getItem("currency"))== "616") {
                expectedCurrencySymbol = "PLN ";
                expectedCurrencyCode = "PLN";
            }                  
            
            fac.currency = expectedCurrencySymbol;
            fac.currencyCode = expectedCurrencyCode;
            
        };
        fac.updateProducts = function(name, price, category, image){
            var i ={
                id: Math.random(), 
                name:name,
                price:price,
                category: category,
                amount: 0,
                image:image,
                active: false,
                editing: false
            };
            if(fac.pLibary === null){
                console.log(fac.pLibary);
                fac.pLibary = {};
                console.log(fac.pLibary);
            }
            fac.pLibary[i.id] = i;
            localStorage.setItem("pLibary", JSON.stringify(fac.pLibary));
        };
        fac.editProduct = function(p){
            fac.pLibary[p.id] = p; 
            localStorage.setItem("pLibary", JSON.stringify(fac.pLibary));
        };
        fac.deleteProduct = function(p){
            delete fac.pLibary[p.id]; 
            localStorage.setItem("pLibary", JSON.stringify(fac.pLibary));
        };
        fac.createCategory = function(c){
            if (fac.categoryLib !== null){
                fac.categoryLib.push(
                        {
                            type: c
                }
                        );      }
            else if(fac.categoryLib === null)
            {
                fac.categoryLib = [{type:c}];
            }
            
            localStorage.setItem("categoryLib", JSON.stringify(fac.categoryLib));
        };
        fac.setPrinter = function (name, mac, uuid) {
            localStorage.setItem("printerName", name);
            localStorage.setItem("printerMac", mac);
            localStorage.setItem("printerUuid", uuid);
        }
        fac.clearCategories = function(){
            fac.categoryLib = null;
            localStorage.removeItem("categoryLib");
        };
        
        fac.saveTransaction = function(amount, method){
            var i ={
                amount: amount,
                method: method,  
                date: new Date()
            };            
            if(fac.pHistory === null){
                fac.pHistory = [];
                fac.pHistory.push(i);
            }
            else{
                fac.pHistory.push(i);
            }
            localStorage.setItem("pHistory", JSON.stringify(fac.pHistory));
        };
        fac.refund = function(p){
            fac.pHistory.splice(p, 1);
            localStorage.setItem("pHistory", JSON.stringify(fac.pHistory));
        };
        return fac;
    }]);