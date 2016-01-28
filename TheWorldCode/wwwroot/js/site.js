/// <reference path="../lib/jquery/dist/jquery.js"/>

(function () {
    
    // var ele = $("#username");
    // ele.text("Tore Tester JQuery");

    // var main = $("#main");
    // main.on("mouseenter", function() {
    //     main.css("background-color", "#888");    
    // });
    // main.onmouseleave = function() {
    //     main.toggleClass("background-color");
    // };
    
    // var menuItems = $("ul.menu li a");
    // menuItems.on("click", function() {
    //     var me = $(this);
        
    //     alert(me.text());
    // });
    
    var $sideBarAndWrapper = $("#sidebar,#wrapper");
    
    $("#sidebarToggle").on("click", function() {
        $sideBarAndWrapper.toggleClass("hide-sidebar");
        if($sideBarAndWrapper.hasClass("hide-sidebar")) {
            $(this).text("Show Sidebar");
        } else {
            $(this).text("Hide Sidebar");
        }
    });
})();
