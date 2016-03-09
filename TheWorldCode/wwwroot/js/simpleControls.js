(function () {
    "use-strict";
    
    angular.module("simpleControls", [])
        .directive("waitCursor", waitCursor);
        
    function waitCursor() {
        return {
            scope: {
                showWhen: "=displayWhen"
            },
            restrict: "E",
            templateUrl: "/views/waitCursor.html"   
        };       
    }
})();