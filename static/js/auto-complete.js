( function( window ) {
    'use strict';
    var matches = [];
    function auto () {
        var a =  new autoComplete({
            selector: '#searchTxt',
            minChars: 2,
            source: function(term, suggest){
                term = term.toLowerCase();

                var choices = [];
                data.forEach(function(d) {
                    choices.push(d['name']);
                });

                matches = [];
                for (var i=0; i<choices.length; i++)
                    if (~choices[i].toLowerCase().indexOf(term)) {
                        matches.push(choices[i]);
                        // data.forEach(function(ele) {
                        //     if(ele['name'] == choices[i])
                        //         matches.push([ele['name'], ele['picture']['thumbnail'], ele['tier_name']]);
                        // })
                        // matches.push(choices[i]);
                    }
                // suggest(matches);
                console.log(matches);
                window.matches = matches;
            }
        });
        // console.log(matches);
        // return matches;
    }
    window.auto = auto;

})( window );
