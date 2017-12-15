var app = {
// Application Constructor
initialize: function() {
    this.bindEvents();
},
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicity call 'app.receivedEvent(...);'

exitFunction : function(){
     if (navigator.notification.confirm("Vuoi chiudere l'app?", 
            function(index) {
                if (index == 1) { // OK button
                    navigator.app.exitApp(); // Close the app
                }
            },
            "AppModel",
            ["Ok","Annulla"]
        ));
},

onDeviceReady: function() {
    app.receivedEvent('deviceready');

    ons.setDefaultDeviceBackButtonListener(function() {
        if (navigator.notification.confirm("Vuoi chiudere l'app?", 
            function(index) {
                if (index == 1) { // OK button
                    navigator.app.exitApp(); // Close the app
                }
            },
            "AppModel",
            ["Ok","Annulla"]
        ));
    });

    /*
    // Open any external link with InAppBrowser Plugin
    $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

        e.preventDefault();
        var $this = $(this); 
        var target = $this.data('inAppBrowser') || '_blank';

        window.open($this.attr('href'), target);

    });
    */

    $(document).on('click', 'a', function(e){

        e.preventDefault();
        var $this = $(this); 
        //var target = $this.data('inAppBrowser') || '_blank';

        window.open($this.attr('href'), "_system");

    });


},
// Update DOM on a Received Event
receivedEvent: function(id) {
    //var parentElement = document.getElementById(id);
    //var listeningElement = parentElement.querySelector('.listening');
    //var receivedElement = parentElement.querySelector('.received');

    //listeningElement.setAttribute('style', 'display:none;');
    //receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
}

 };


  app.initialize(); //moved here this instruction