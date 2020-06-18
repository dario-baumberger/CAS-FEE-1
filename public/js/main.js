'use strict'
Handlebars.registerHelper( 'select', function(value, options){
    return options.fn()
        .split('\n')
        .map(function (v) {
            let t = 'value="' + value + '"';
            return RegExp(t).test(v) ? v.replace(t, t + ' selected="selected"') : v;
        })
        .join('\n');
})

Handlebars.registerHelper( 'times', function(n, block){
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
})

