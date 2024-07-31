(function($) {
    $.fn.extend({

      
        click_toogle    : function () {
            
            return this.each(function(k,v) {
                
                if ( !$(v).hasClass('hs-toogle-trigger-listning') ) {
                    
                    $(v).addClass('hs-toogle-trigger-listning')

                    $(v).click(function(e) {

                        
                        
                        var w = $(window).width();


                        var elem                    = $(this);
                        var selector                = elem.attr("data-target");
                        var state                   = elem.attr("data-targetState");
                        var toogle_screen_sizes     = elem.attr("data-toogle_screen_sizes");

                        // console.log('toogle_screen_sizes',toogle_screen_sizes);

                        
                        state = ( typeof state != "undefined" ) ? state : "hidden";

                        var should_toogle_work_on_scrren = true;


                        if ( toogle_screen_sizes ) {
                            
                            try {
                                toogle_screen_sizes = JSON.parse(toogle_screen_sizes)
                            } catch (e) {
                                toogle_screen_sizes = null;
                            }
                            
                            if ( toogle_screen_sizes ) {

                               // inital value shoudl be the first value
                                should_toogle_work_on_scrren = Object.values(toogle_screen_sizes)[0];
                                console.log('should_toogle_work_on_scrren',should_toogle_work_on_scrren);

                                $.each(toogle_screen_sizes, function(scrren_ssize  , state) {

                                    
                                    
                                    should_toogle_work_on_scrren = state;

                                    if ( scrren_ssize > w ) return false;
                                    
                                    
                                })
                            }
                        }
                        

                        if ( typeof should_toogle_work_on_scrren == "string") {
                            should_toogle_work_on_scrren = should_toogle_work_on_scrren.toLowerCase().trim();    
                        }

                        if ( !should_toogle_work_on_scrren || ["0","false","null"].indexOf(should_toogle_work_on_scrren) != -1 ) {

                            return;
                        }

                        e.preventDefault();

                        if ( state == "hidden") {

                            $(selector).slideDown();
                            state = "visible";
                            
                        } else {

                            $(selector).slideUp();
                            state = "hidden";
                            
                        }
                        elem.attr("data-targetState",state).trigger("cx_click_toogle_update");
                        
                        



                    })
                    
                }
                
                
            });

        },
        value_toogle    : function () {

            return this.each(function(k,v) {

                if ( !$(v).hasClass('value_toogle-listning') ) {

                    $(v).addClass('value_toogle-listning');

                    $(v).change(function() {


                        

                        // a change event happened on a non selected elemnt
                        if ( ["radio" , "checkbox"].indexOf( $(this).attr("type") ) != -1 && !$(this).prop("checked") ) {
                            return;
                        }

                        

                        var value_to_filer = $(this).val();

                        var collection = [];

                        // hiding all elements
                        var selector = $(this).attr("data-target_group");
                        $(selector).css('display' , 'none');

                        
                        
            
                        var elems = $(selector).filter("[data-target_value]");

                        

                        elems.each(function(kkk,vvv) {

                            var val = $(vvv).attr("data-target_value");
                            val = val.split("|");
                            if ( val.indexOf( value_to_filer ) != -1 ) {
                               collection.push( $(vvv) ) 
                            }
                        })

                        

                        // sliding down elements
                        $.each(collection, function(kkkk,item) {

                            $(item).slideDown(100).trigger('value_toogle_visible');     
                            
                        })
                        
                    }); 


                    // if the element is radio, onlyy trigger on currnly highted elemnt


                    if ( ["radio" , "checkbox"].indexOf( $(this).attr("type") ) != -1 && $(this).prop("checked") ) {
                            
                        $(v).trigger('change');
                        
                    } else {

                        $(v).trigger('change');
                    }

                }
            });
        },

        /**
         * 
         * 
         * 
         * 
         * <div class=elem>

                <div>
                    <div class='myfilterselect' data-filter-name=red >red</div>
                    <div class='myfilterselect' data-filter-name=blue >blue</div>
                    <div class='myfilterselect' data-filter-name=green >green</div>
                </div>
                <div>
                    <div class='filter-elem' data-red></div>

                    <div class='filter-elem' data-blue></div>

                    <div class='filter-elem' data-green></div>

                </div>
                

            </div>


            $(".elem").hs_filterElems({
                filter_selector     :    ".myfilterselect",
                filter_element      :   ".filter-elem"
            })
         * 
         * */
        hs_filterElems  : function($pram) {

            var set = this;

            return set.each(function(k,v) {

                var ths = $(v);

                ths.find( $pram.filter_selector ).click(function(e) {

                    selector = $(this);

                    // adding active claess
                    ths.find( $pram.filter_selector ).filter(".active").removeClass("active");
                    selector.addClass("active");


                    $count = 0;

                    $total = 99999;
                    if ( typeof selector.attr("data-filter-result-count") != "undefined" ) {
                        $total = Number ( selector.attr("data-filter-result-count") );
                    }
                    $prefix = ( typeof $pram.prefix == "undefined" ) ? "" : $pram.prefix;

                    var slug = selector.attr("data-filter-name");

                    
                    ths.find( $pram.filter_element ).each(function(k,vv) {
                        if ( $count >= $total ) return false;

                        if (  !$(vv)[0].hasAttribute( "data-" + $prefix + "-"+ slug )  ) {
                            $(vv).css("display", "none")
                        } else {
                            $(vv).css("display", "inherit");
                            $count++;
                        }

                    })
                });

                ths.find( $pram.filter_selector ).first().trigger("click");
            })
        },

        


    });

})(jQuery);