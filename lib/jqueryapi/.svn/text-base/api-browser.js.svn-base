// globals
if (!window.runtime) {
    airapp = false;
} else {
    airapp = true;
}

lastRoot = 'api';
title = document.title;
blank_iframe = 'index-blank.html';


$.fn.textDropShadow = function() {
    return this.each(function () {
        var $text = $(this);
        $text.html('<span class="jq-shadow">'+$text.html()+'</span><span>'+$text.html()+'</span>');
        return $text;        
    });
};

function apiBrowserMain() {    
    $('#navigation a').textDropShadow();
    $('#navigation label').prepend('<span class="jq-shadow">Filter</span>');
    
    // handle external links
    window.favs = {};

    if (airapp) {
        $('body').addClass('air');
        $('#credit a').click(function () {
            window.runtime.flash.net.navigateToURL(new window.runtime.flash.net.URLRequest(this.href));
            return false;            
        });
    }
    
    $(window).click(function (event) {
        var $elm = $(event.target);
        if (event.target.nodeName == 'SPAN' && $elm.is('.fav')) {
            $elm.toggleClass('on');

            // silly hack for last minute bug
            var key = $elm.attr('id').toLowerCase().replace(/^\$\./, '');
            
            if ($elm.is('.on')) {
                // bit dopy, and hacky, but will do for now
                jquerydocs.data[key].fav = 'true';
                favs[key] = 1;
            } else {
                jquerydocs.data[key].fav = 'false';
                delete favs[key];
            }
            
            if (!airapp) {
                // commit fav to cookie
                createCookie('favs', $.toJSON(favs), 365);
            } else {
                var FileSystem = window.runtime.flash.filesystem;

                var file = FileSystem.File.applicationStorageDirectory.resolvePath('favs.json');
                var fileStream = new FileSystem.FileStream();
                fileStream.open(file, FileSystem.FileMode.WRITE);
                fileStream.writeUTFBytes($.toJSON(favs));
                fileStream.close();
            }
            
            return false;
        }
    });
    
    var timer = null;
    var last = '';
    $('#query').keyup(function () {
        if (this.value != last) {
            if (timer) {
                clearTimeout(timer);
            }
            last = this.value;
            if (jquerydocs.find) {
                timer = setTimeout(queryDocs, 250);                
            }
        } 
    }).focus(function () {
        $(this).parent().addClass('selected');
    }).blur(function () {
        $(this).parent().removeClass('selected');
    });
    
    function queryDocs() {
        if (jquerydocs == null) {
            return;
        }
        jquerydocs = _jquerydocs; // reset
        
        // the query trimmed
        var q = $('#query').val().toLowerCase().replace( /^\s+|\s+$/g,"");

        if (q == '') {
            loadCategories();
            return;
        }
        
        var $wrapper = $('#browser > div');
        $wrapper.empty();
        
        var items = [];
        
        if (q.indexOf('=') !== -1) {
            q = q.split('=');
            items = jquerydocs.find(q[1], q[0]); // hidden feature to search by a specific field, i.e. added=1.3
        } else {
            items = jquerydocs.find(q);
        }
        
        showFunctions(items, $wrapper);
        if (items.length) {
            $('#functions').show();
        } else {
            $('#browser > div').html('<p class="loading">No functions found.</p>');
        }
    }
    
    if (window.jquerydocs && !window.jquerydocs.initialised) {
    	var l = $('#categories a').click(function(e) {
    	    var $link = $(this);

            window.location.hash = this.pathname;
            $.history.load(this.pathname);
            return false;
    	}).parents('li:not(.active)').find('ul').hide().length;
    	
        loadDocs('/lib/docs/api-docs.xml'); // from api-loader.js and triggers api-load-complete
    } else {
        init();
    }
}

function loadPath(path) {
    var $link = $('#categories a[href=' + path + ']'), link;
    
    if ($link.length) {
        link = $link.get(0);

        if ($link.parents('ul.functions:first').length) {
            $('#categories ul.functions').find('a').removeClass('active');
            $link.addClass('active');
            showFunction(link.pathname.split('/').pop(), $link.text(), link);
        } else {
    	    var $cats = $link.closest('li').find('> ul');
    	    if ($cats.length) {
    	        $cats.slideToggle('fast');
    	        $link.closest('li').toggleClass('active');
    	    }    	        
        }        
    }
}

$(document).bind('api-load-complete', function () {
    // cache the original
    window._jquerydocs = jquerydocs;
    
    // version notices
    $('#version').html(jquerydocs.version);
    document.title += ' v' + jquerydocs.version; // note - I have to manually insert the version since it's lacking :-(
    
    // now manually load the plugins API - I'm avoiding using loadDocs because it triggers a callback to api-load-complete
    // which causes our infinite loop :-(
    $.ajax({
        url: '/lib/docs/plugins.xml', // generated from jquery source: /tools/wikiapi2xml/createjQueryXMLDocs.py
        dataType: 'xml',
        async : false,
        success: parse
    });
    
    attachFind(jquerydocs);
    
    if (window.location.search) {
        $('#query').val(window.location.search.substr(1)).keyup();
    }
    
    init();
});

function loadFavs() {
    if (!airapp) {
        // read favs from cookie
        eval('favs = ' + readCookie('favs'));// need to change to Crockford's json parser
    } else {
        var FileSystem = window.runtime.flash.filesystem;

        var file = FileSystem.File.applicationStorageDirectory.resolvePath('favs.json');
        if (file.exists) {
            var fileStream = new FileSystem.FileStream();
    	    fileStream.open( file, FileSystem.FileMode.READ );
    	    var data = fileStream.readMultiByte( file.size, FileSystem.File.systemCharset );
    	    fileStream.close();

    	    favs = JSON.parse(data);
        }
    }
    
    if (favs == null) {
        favs = {}; 
    } else {
        for (var k in favs) {
            if (jquerydocs.data[k]) { // protection against corruption
                jquerydocs.data[k].fav = 'true';
            }
        }
    }
}

function loadCategories(root) {
    return;
    
    var html = [];
    var categories = jquerydocs.categories;
    root = (root || "").toLowerCase();
    
    if (root) {
        lastRoot = root;
    } else {
        root = lastRoot;
    }
    
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].root == root) {
            html.push('<dt id="' + i + '">' + categories[i].name.replace(/^UI\//, '') + '</dt>');
        }
    }
    
    if (html.length) {
        $('#browser > div').html('<dl id="categories">' + html.join('') + '</dl>');
    } else {
        $('#browser > div').html('<p class="loading">No functions found.</p>');
    }
}
        
// TODO find out why it's not in id order
function showFunctions(items, $wrapper) {
    var argsA = [],
        args,
        html = [],
        i, j;

    $wrapper.find('> #functions, dd').remove();
    
    for (i = 0; i < items.length; i++) {
        argsA = [];
        args = '';

        if (items[i].params.length) {
            for (j = 0; j < items[i].params.length; j++) {
                argsA.push(items[i].params[j].name);
            }
            args = '(' + argsA.join(', ') + ')';
        } else if (items[i].type == 'function') {
            args = '()';
        }
        
        html.push('<dt id="' + items[i].searchname + items[i].id + '" class="direct">' + items[i].name + args + '</dt>');
    }

    step = (200 * $wrapper.find('dl').length) + 10;
    var $html = $('<dl id="functions" class="absolute" style="left: ' + step + 'px;">' + html.join('') + '</dl>').css('display', 'none');
    $wrapper.append($html);
}

function showFunction(id, q, link) {
    var item = jquerydocs.data[id],
        html = [],
        $detail = $('#detail > div'),
        i, j,
        linkParts = link.pathname.substr(1).split('/');
    
    $detail.empty();
    
    document.title = q + ' :: ' + title;
                        
    html.push('<h1><a href="' + link.href + '">' + q + '</a> <span class="type">' + item.type + '</span> <span class="fav' + (item.fav ? ' on' : '') + '" id="' + item.name + item.id + '"></span></h1>');
    html.push('<p class="meta">Category: <a href="/' + linkParts[0] + '">' + item.category + '</a>/<a href="/' + linkParts[0] + '/' + linkParts[1] + '">' + item.subcategory + '</a>' + (item.added ? ' (added ' + item.added + ')' : '') + '</p>');
    html.push(item.longdesc || '<p>' + item.desc + '</p>'); // longdesc is usally HTML
    html.push('<h2>Returns</h2>');
    html.push('<p>' + (item['return'] || 'Nothing') + '</p>');
    
    if (item.params.length) {
        html.push('<h2>Parameters</h2>');
        html.push('<ul class="options">');
        for (i = 0; i < item.params.length; i++) {
            html.push('<li><strong>' + item.params[i].name + '</strong> ');
            if (item.params[i].type) {
                html.push('(' + item.params[i].type + ')');
            }
            html.push(': ' + item.params[i].desc + '</li>');
        }
        html.push('</ul>');
    }
    
    // detailed options
    if (item.options && item.options.length) {
      html.push('<h2>Options</h2>');
      html.push('<ul class="options">');
      for (i = 0; i < item.options.length; i++) {
          html.push('<li><strong>' + item.options[i].name + '</strong> ');
          if (item.options[i].type) {
              html.push('(' + item.options[i].type + ')');
          }
          html.push(': ' + item.options[i].desc + '</li>');
      }
      html.push('</ul>');
      
    }

    for (i = 0; i < item.examples.length; i++) {
        html.push('<h2>Example</h2>');
        if (item.examples[i].desc) {
            html.push('<p>' + item.examples[i].desc + '</p>');
        }
        html.push('<h3>jQuery Code</h3>');
        html.push('<pre>' + item.examples[i].htmlCode + '</pre>');
        
        // this is special code that will convert in to a real running example once run through 'runExample(item)'
        if (item.examples[i].html) {
            
            // prepare for a JSBin link - currently point to live
            j = item.examples[i].runCode.replace("<script>\n" + item.examples[i].code + "\n</script>", function () {
                return "<script type=\"text/javascript\">\n%code%\n</script>";
            });
            
            html.push('<div class="liveExample" style="position: relative;"><a class="edit external" target="_blank" href="http://jsbin.com/?html=' + encodeURIComponent(j.replace(apiloader.example_jquery.offline, apiloader.example_jquery.offline)) + '&js=' + encodeURIComponent(item.examples[i].code) + '" title="Edit and run this code">edit</a><iframe sandboxRoot="http://localhost/" documentRoot="app:/" id="' + item.examples[i].id + '" class="example" src="' + blank_iframe + '"></iframe></div>');
        }
    }
    
    // step = (200 * $wrapper.find('dl').length) + 10;
    $detail.append(html.join(''));
    $detail.parent().get(0).scrollTop = 0; // reset the overflow position
    fixLinks($detail.find('dd')); // makes links to more docs absolute rather than relative (should do in the api-docs.js)
    
    // in place of runExamples to allow AIR to run the iframe's contents
    if (airapp) {
        $('div.liveExample a.external').click(function () {
            window.runtime.flash.net.navigateToURL(new window.runtime.flash.net.URLRequest(this.href));
            return false;
        });

        for (i = 0; i < item.examples.length; i++) {
            win = document.getElementById(item.examples[i].id);
            if (win) { // some examples don't have code
                $(win).bind('load', { example: item.examples[i] }, function (event) {
                    var example = event.data.example;
                    this.contentWindow.childSandboxBridge.write(
                        example.runCode.replace("</head>", '<base href="http://docs.jquery.com" /><style>html,body{border:0; margin:0; padding:0;}</style></head>'));
                });
            }
        }
    } else {
        runExample(item);
    }
    
    // code highlight
    prettyPrint($detail.get(0));
}

function init() {
    $.history = new History(); // singleton instance
    $.history.init(loadPath);
    
    $.history.load(window.location.pathname);
    
    return;
    
    // TODO remove all of this!
    
    var $wrapper = $('#browser > div'),
        $categories = $('#categories'),
        $detail = $('#detail > div'),
        html = [],
        categories = jquerydocs.categories;

    loadFavs();
    loadCategories();
    
    var $nav = $('#navigation a').click(function () {
        $nav.removeClass('selected');
        $(this).addClass('selected');

        $('#query').val('');
        
        if (this.hash.substr(1) == 'favs') {
            $wrapper.empty();
            var items = jquerydocs.find('true', 'fav');
            showFunctions(items, $wrapper);
            if (items.length) {
                $('#functions').show();
            } else {
                $('#browser > div').html('<p class="loading">No functions found.</p>');
            }
        } else {
            loadCategories(this.hash.substr(1));
        }
        
        return false;
    });
    
    return;
    
    $wrapper.click(function (event) {
        categories = jquerydocs.categories;
        var dt = (event.target.nodeName == 'DT'),
            $selected = $(event.target),
            step = 210,
            i, j, // loop indices
            q = $selected.text(), // search term
            items, // matches
            item, // specific function
            argsA = [],
            args = '',
            html = [],
            deselect = false,
            category, 
            subcategory,
            fns = [];

        if (dt) {
            
            var inId = $selected.parent().attr('id');
            
            if ($selected.is('.active') && $selected.parent('#functions').length == 0) {
                // go up a level
                deselect = true;
                
                if ($selected.parent('#subcategories').length) {
                    $selected = $('#categories').find('.active');
                } else {
                    $('#functions, #subcategories').slideUp(function () {
                        $(this).remove();
                    });
                    $('#categories').find('dt').removeClass('active').css('padding', 5).animate({
                        opacity : 1,
                        height : '100%'
                    });
                    return;
                }
            } else {
                $selected.parent().find('dt').removeClass('active');
                $selected.addClass('active');
            }
            
            if ($selected.parents('#categories').length) { // category selected
                category = $selected.attr('id');
            
                $categories.find('dt').removeClass('active');
                $selected.addClass('active');
                $wrapper.find('> dl:not(#categories), dd').remove();
        
                if (jquerydocs.categories[category].subcategories && jquerydocs.categories[category].subcategories.length) {
                    for (i = 0; i < categories[category].subcategories.length; i++) {
                        html.push('<dt id="subcategory' + i + '">' + categories[category].subcategories[i].name + '</dt>');
                    }

                    var $html = $('<dl id="subcategories" class="absolute">' + html.join('') + '</dl>');
                    $html.css('display', 'none');

                    $wrapper.append($html);
                    $wrapper.find('#categories dt:not(.active)').hide();
                    // stackSelect(function () {
                        $wrapper.find('#subcategories').show();
                    // });
                }
            } else if ($selected.parents('#subcategories').length) { // subcategory selected
                category = $('#categories .active').attr('id');
                subcategory = $selected.attr('id').replace(/subcategory/, '');
                fns = [];
                for (i = 0; i < jquerydocs.categories[category].subcategories[subcategory].functions.length; i++) {
                    fns.push(jquerydocs.categories[category].subcategories[subcategory].functions[i]);
                }

                showFunctions(jquerydocs.find(fns), $wrapper); // function because we get reused.
                
                // $wrapper.find('#subcategories dt:not(.active)').stackSelect(function () {
                //     $wrapper.find('#functions').slideDown();
                // });
            } else if ($selected.parents('#functions').length) { // function selected
                showFunction($selected.attr('id'), $selected.text());
            }
        }
    });
}
