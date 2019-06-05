// create the module
var PosApp = angular.module('PosApp', [
    'ngCookies',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate'
])
        .config(function ($compileProvider){
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})        .config(['$routeProvider',function($routeProvider) {
        $routeProvider
                .when("/login", {
                    templateUrl : "Pages/login.html",
            controller  : 'loginCtrl',
            css: 'css/login.css'
        })
                .when("/", {
            templateUrl : "Pages/Betaling.html",
            controller : 'paymentCtrl'
        })
                .when("/betaling", {
                    templateUrl : "Pages/Betaling.html",
            controller  : 'paymentCtrl'
        })
                .when("/Settings", {
                    templateUrl: "Pages/Settings.html",
            controller : "settingsCtrl"
        })
                .otherwise({ 
                    redirectTo: '/' 
        });
    }])
        .config(function($translateProvider) {
            $translateProvider.translations('en', {
                ENTER_USERNAME: 'Yourpay username',
        ENTER_PASSWORD: 'Password',
        USERNAME: 'Username',
        PASSWORD: 'Password',
        PAYMENT: 'Payment',
        PAYMENTHISTORY: 'Paymenthistory',
        STATISTICS: 'Statistics',
        PRODUCTCATALOG: 'Productcatalog',
        PRODUCTS: 'Products',
        STARTPAYMENT: 'Pay',
        STARTWEBPAYMENT: 'Web Payment',
        NAME: 'Name',
        PRICE: 'Price',
        NUMBER: 'Number',
        TIPS: 'Tips:',
        DISCOUNT: 'Discount:',
        PAYWITHCARD: 'Pay with card',
        PAYWITHCASH: 'Pay with cash',
        NUMBERBLOCK: 'Number block',
        PRODUCTTYPE: 'Product type',
        DELETE: 'Delete',
        PRODUCTSPECFICATIONS: 'Product specifications',
        CREATEPRODUCT: 'Create product',
        CLEARCATEGORIES: 'Clear all producttypes',
        CREATETYPE: 'Create producttype',
        PRODUCTNAME: 'Type name',
        PRODUCTTYPESPECIFICATIONS: 'Product category',
        PRODUCTSPECIFICATIONS: 'Product specifications',
        PAYMENTMETHOD: 'Payment method',
        REFUND: 'Refund',
        DETAILS: 'Details',
        NOPRODUCTSSELECTED: 'No products selected or amount entered in the number block',
        TRANSACTIONACCEPT: 'Transaction succesful',
        INVALIDSYMBOLS: 'Invalid amount for tips or discount, transaction unsuccessful', 
        IMAGE: 'Image',
        CREATEERROR: 'Product not created, remember to select name, price, productype and image',
        MANUAL:'Amount entered in numberblock',
        DATE: 'Date',
        FAILURE: 'Error at login',
        FILE: "choose file",
        SETTINGS: "Settings",
        SUPPORT: "Support",
        PROFILE: "Profile",
        LOGOUT: "Log out",
        LANGUAGE:"Language",
        CURRENCY:"Currency",
        LOGINERROR:'Invalid email or password',
        NYI: 'This part of the app is not yet implemented',
        CARD: 'Card',
        CASH:'Cash',
        SEARCH:'Search',
        DONE: 'Save',
        WEBPAY: 'WebPay',
        WEBPAY_PENDING: 'WebPay Pending Orders',
        CURRENCY: 'Currency',
        PROCESS_PAYMENT: 'Complete payment',
        WEBPAY_ORDERID: 'Order ID',
        WEBPAY_AMOUNT: 'Amount in full (no digits)',
        WEBPAY_FULL_CARD: 'Card number (16 digits)',
        WEBPAY_CARD_EXPIRY_MONTH: "Expiry month",
        WEBPAY_CARD_EXPIRY_YEAR: "Expiry year",
        WEBPAY_CARD_EXPIRY_CVV: "CVC / CVV",
        SHOW_PENDING: "Show overview",
        SHOW_PENDING_LIST: "View orders that is not successfully captured",
        DELETE_PENDING_LIST : "Delete list",
        CONNECT_PRINTER : "Connect ITP Printer",
        ORDER_ID: "Order ID"
    })
            .translations('da', {
        ENTER_USERNAME: 'Indtast brugernavn',
        ENTER_PASSWORD: 'Indtast password',
        USERNAME: 'Brugernavn',
        PASSWORD: 'Kodeord',
        PAYMENT: 'Betaling',
        PAYMENTHISTORY: 'Betalingshistorik',
        STATISTICS: 'Statistik',
        PRODUCTCATALOG: 'Produktkatalog',
        PRODUCTS: 'Produkter',
        STARTPAYMENT: 'Start betaling',
        STARTWEBPAYMENT: 'Betaling via. InAppBrowser',
        NAME: 'Navn',
        PRICE: 'Pris',
        NUMBER: 'Antal',
        TIPS: 'Drikkepenge:',
        DISCOUNT: 'Rabat:',
        PAYWITHCARD: 'Kortbetaling',
        PAYWITHCASH: 'Kontantbetaling',
        NUMBERBLOCK: 'Nummerblok',
        PRODUCTTYPE: 'Produkttype',
        DELETE: 'Slet',
        PRODUCTSPECFICATIONS: 'Produktspecifikationer',
        CREATEPRODUCT: 'Opret produkt',
        CLEARCATEGORIES: 'Slet alle kategorier',
        CREATETYPE: 'Opret produktkategori',
        PRODUCTNAME: 'Produktnavn',
        PRODUCTTYPESPECIFICATIONS: 'Produktkategori',
        PRODUCTSPECIFICATIONS: 'Produktspecifikationer',
        PAYMENTMETHOD: 'Betalingsmetode',
        REFUND: 'Refunder',
        DETAILS: 'Detaljer',
        NOPRODUCTSSELECTED: 'Ingen valgte produkter eller beløb indtastet i nummberblok',
        TRANSACTIONACCEPT: 'Transaktion gennemført',
        INVALIDSYMBOLS: 'Ikke godkendt tal som drikkepenge eller rabat, transaktion ikke gennemført',
        IMAGE: 'Billede',
        CREATEERROR: 'Produkt ikke oprettet, husk at sætte navn, pris, produkttype og billede for produktet',
        MANUAL:'Beløb indtastet i nummerblokken',
        DATE: 'Dato',
        FAILURE: 'Fejl ved login',
        FILE: 'Vælg fil',
        SETTINGS: "Indstillinger",
        SUPPORT: "Support",
        PROFILE: "Profil",
        LOGOUT: "Logud",
        LANGUAGE:"Sprog",
        CURRENCY:"Valuta",
        LOGINERROR:'Forkert email eller kodeord',
        NYI: 'Denne del af applikationen er stadig under opbygning',
        CARD: 'Kort',
        CASH:'Kontanter',
        SEARCH:'Søg',
        DONE: 'Gem',
        WEBPAY: 'WebPay',
        WEBPAY_PENDING: 'WebPay afventende ordrer',
        CURRENCY: 'Valuta',
        PROCESS_PAYMENT: 'Gennemfør betaling',
        WEBPAY_ORDERID: 'Ordre ID',
        WEBPAY_AMOUNT: 'Beløb i hele kroner',
        WEBPAY_FULL_CARD: 'Hele kortnummeret',
        WEBPAY_CARD_EXPIRY_MONTH: "Udløbsmåned",
        WEBPAY_CARD_EXPIRY_YEAR: "Udløbsår",
        WEBPAY_CARD_EXPIRY_CVV: "CVC / CVV",
        SHOW_PENDING: "Åbn oversigten",
        SHOW_PENDING_LIST: "Vis ordre som ikke kan opkræves",
        DELETE_PENDING_LIST : "Slet listen",
        CONNECT_PRINTER : "Forbind til ITP printer",
        ORDER_ID: "Betalingsidentifikation"
    })
            .translations('pl', {
        ENTER_USERNAME: 'Wprowadź nazwę użytkownika',
        ENTER_PASSWORD: 'Wprowadź hasło',
        USERNAME: 'Nazwa użytkownika',
        PASSWORD: 'Hasło',
        PAYMENT: 'Płatność',
        PAYMENTHISTORY: 'Historia płatności',
        STATISTICS: 'Statystyka',
        PRODUCTCATALOG: 'Katalog produktów',
        PRODUCTS: 'Produkty',
        STARTPAYMENT: 'Rozpocznij płatność',
        STARTWEBPAYMENT: 'InAppBrowser płatność',
        NAME: 'Nazwa',
        PRICE: 'Koszt',
        NUMBER: 'Liczba',
        DISCOUNT: 'Zniżka:',
        TIPS: 'Napiwki:',
        PAYWITHCARD: 'Zapłać kartą kredytową',
        PAYWITHCASH: 'Zapłać gotówką',
        NUMBERBLOCK: 'Numer Pad',
        PRODUCTTYPE: 'Rodzaj produktu',
        DELETE: 'Kasować',
        PRODUCTSPECFICATIONS: 'Specyfikacja produktu',
        CREATEPRODUCT: 'Utwórz produkt',
        CLEARCATEGORIES: 'Wyczyść wszystkie typy produktów',
        CREATETYPE: 'Utwórz typ produktu',
        PRODUCTNAME: 'Wpisz imię',
        PRODUCTTYPESPECIFICATIONS: 'Kategoria produktu',
        PRODUCTSPECIFICATIONS: 'Specyfikacja produktu',
        PAYMENTMETHOD: 'Metoda płatności',
        REFUND: 'Zwrot',
        DETAILS: 'Detale',
        NOPRODUCTSSELECTED: 'Nie wybrano produktu lub kwoty wpisanej do tabliczki numerycznej',
        TRANSACTIONACCEPT: 'Transakcja sukcesu',
        INVALIDSYMBOLS: 'Nieprawidłowa kwota na napiwki lub dyskonta, transakcja nieudana', 
        IMAGE: 'Obraz',
        CREATEERROR: 'Produkt nie został utworzony, należy pamiętać, aby wybrać nazwę, cenę, rodzaj produktu i wizerunku',
        MANUAL:'Kwota wpisana w numerze',
        DATE: 'Data',
        FAILURE: 'Logowanie nie powiodło się',
        FILE: "Wybierz plik",
        SETTINGS: "Ustawienia",
        SUPPORT: "Wsparcie",
        PROFILE: "Profil",
        LOGOUT: "Wyloguj",
        LANGUAGE:"Język",
        CURRENCY:"Waluta",
        LOGINERROR:'Nieprawidłowy e-mail lub hasło',
        NYI: 'Ta część aplikacji nie jest jeszcze zaimplementowana',
        CARD: 'Karta',
        CASH:'Gotówka',
        SEARCH:'Szukanie',
        DONE: 'Zapisać',
        WEBPAY: 'WebPay',
        WEBPAY_PENDING: 'Zamówienia oczekujące na WebPay',
        CURRENCY: 'Waluta',
        PROCESS_PAYMENT: 'Pełna płatność',
        WEBPAY_ORDERID: 'Identyfikator zamówienia',
        WEBPAY_AMOUNT: 'Kwota w całości (bez cyfr)',
        WEBPAY_FULL_CARD: 'Numer karty (16 cyfr)',
        WEBPAY_CARD_EXPIRY_MONTH: "Mmiesiac wygaszenia",
        WEBPAY_CARD_EXPIRY_YEAR: "Rok wygaśnięcie",
        WEBPAY_CARD_EXPIRY_CVV: "CVC / CVV",
        SHOW_PENDING: "Pokaż przegląd",
        SHOW_PENDING_LIST: "Zobacz zamówień, które nie są z powodzeniem złapanych",
        DELETE_PENDING_LIST : "Usuń listę",
        CONNECT_PRINTER : "Podłącz drukarkę",
        ORDER_ID: "Identyfikator zamówienia"
    });
    
    var langcode = navigator.language.substr(0, 2);
    $translateProvider.preferredLanguage(langcode);
    $translateProvider.fallbackLanguage(['en']);
})
        .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
// CUSTOM DIRECTIVES

PosApp.directive(
        'imageLazySrc', function($document, $window, $filter) {
            return {
                restrict: 'A',
        link: function($scope, $element, $attributes) {
            console.log($element);
            console.log($attributes);
            function isInView() {
                var clientHeight = $document[0].documentElement.clientHeight,
                clientWidth = $document[0].documentElement.clientWidth,
                imageRect = $element[0].getBoundingClientRect();

                if (
                        (imageRect.top >= 0 && imageRect.bottom <= clientHeight)
                        &&
                        (imageRect.left >= 0 && imageRect.right <= clientWidth)
                        ) {
                    console.log($element[0].imageLazySrc);
                    console.log($attributes.imageLazySrc);
                    if($element[0].imageLazySrc === $attributes.imageLazySrc || $element[0].imageLazySrc === undefined){
                        console.log($element);
                        console.log($element[0]);
                        console.log($element[0].imageLazySrc);
                        console.log($attributes.imageLazySrc);
                        $element[0].src = $attributes.imageLazySrc;
                    }
                    removeEventListeners();
                }
            }

            function removeEventListeners() {
                $window.removeEventListener('scroll', isInView);
                $window.removeEventListener('resize', isInView);
            }
            $window.addEventListener('scroll', isInView);
            $window.addEventListener('resize', isInView);
            $element.on('$destroy', function() {
                removeEventListeners();
            });
            isInView();
        }
    };
});
//  CONTROLLERS //
PosApp.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$translate', function ($scope, $rootScope, $location, AuthenticationService, $translate) { 
        //        AuthenticationService.ClearCredentials(); 
        $scope.home = 'img/HomeButton.png';
        $scope.settings ='img/SettingsButton.png';
        $scope.logo = 'img/Logo forside2.png';
        $scope.profile = 'img/Profile.png';
        $scope.support = 'img/Support.png';
        $scope.logOUT = 'img/Log Ud.png';
        $scope.profile = 'img/Profile.png';
        $scope.settingsButton = 'img/Settings.png';
        $scope.settingsActive = 'img/Active button.png';
        $scope.settingsMenu= true;
        $scope.show = function(){
            if($scope.settingsMenu === true){
                $scope.settingsMenu = false;
            }
        }
        $scope.login = function () {
            console.log("YES");
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.uid !== 0) {
                    localStorage.setItem("uname", $("#username").val());
                    localStorage.setItem("pwd", $("#password").val());                    
                    localStorage.setItem("term_identifier", response.terminal.terminal_identifier);
                    localStorage.setItem("term_key", response.terminal.terminal_key);
                    localStorage.setItem("merchant_token", response.token);
                    GenerateTransID();
                    GetMerchantData();
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/Betaling');
                } else {
                    $translate('LOGINERROR')
                            .then(function(translatedValue){
                                var tv = translatedValue; 
                        alert(tv);
                    });
                    $scope.dataLoading = false;
                }
            });
        };
        $scope.logOut = function(){
            AuthenticationService.ClearCredentials();
        };
    }]);
PosApp.controller('menuCtrl',['$scope', function($scope){
        $scope.dollar='img/Dollar.png';
}]);