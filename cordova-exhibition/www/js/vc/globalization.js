(function() {
    
    $(document).on("pageinit", "#globalization", function(e) {
        e.preventDefault();
        
        $("#getLocaleName").on("tap", function(e) {
            e.preventDefault();

            // Check if the ECMA Internalization API is supported by the browser
            if (window.Intl && typeof window.Intl === 'object') {

                // Get the location using the API
                var locale = Intl.getCanonicalLocales('EN-US');
                
                if (locale) {
                    $("#globInfo").html("Locale Name: " + locale + "<br/>");
                }
            }
            else {
                $("#globInfo").html("Unable to get Locale name<br/>");
            }
        }); 
        
        $("#getPreferredLanguage").on("tap", function(e) {
            e.preventDefault();
        
            // Get preferred language tag from the browser using navigator object
            if (navigator.language) {
                $("#globInfo").html("Preferred language name: " + navigator.language + "<br/");
            }
            else {
                $("#globInfo").html("Unable to get preferred language name<br/>");
            }
        });
    }); 
})();