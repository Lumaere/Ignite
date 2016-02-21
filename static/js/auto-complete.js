( function( window ) {
    'use strict';

    function auto () {
        var a =  new autoComplete({
            selector: 'morphsearch-input',
            minChars: 2,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = [];
                data.forEach(function(d) {
                    choices.push(d['name']);
                });

                var matches = [];
                for (i=0; i<choices.length; i++)
                    if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
                suggest(matches);
                console.log(matches);
            }
        });
        return a;
    }

    window.auto = auto;

})( window );
