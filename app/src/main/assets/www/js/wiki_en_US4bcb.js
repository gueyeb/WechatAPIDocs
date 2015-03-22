(function(){
  var $ = jQuery;
  $(function(){
    var 
      $ = jQuery,
      current,
      contentHeight = Math.max(
        $('#mw-head').outerHeight(), 
        $('#bodyContent').outerHeight(),
        $('#content').outerHeight()
      ),
      $mwPanel = $('#mw-panel'),
      $mainwrapper = $('.mainwrapper'),
      $pbody = $('.portal .body');

    $('.portal').each(function(index,dom){
      $('h5', dom).click(function(){
        if(! (index === current) ){
          $pbody.slideUp().eq(index).slideDown(function(){
            $mainwrapper.height(
              $mwPanel.height() > contentHeight 
                ? $mwPanel.height()
                : contentHeight
            );
          });
          current = index;
        }
      });
    });

    var 
      isSeedingFirst = 1,
      currentpath = location.pathname + location.search;
    $('a', $pbody).each(function(index, dom){
      if( isSeedingFirst && dom.href.indexOf(currentpath) > -1){
        isSeedingFirst = 0;
        var $dom = $(dom);
        $dom.addClass('active')
          .parents('.portal').find('h5').trigger('click');
      }
    });

    $.getScript('js/ping_raw_tcss_v1.3.js', function(){
      window.pgvMain && pgvMain();
      window.pgvWatchClick && $('body').bind('click', function(){
        pgvWatchClick({coordinateId:'wrap'});
      });
    });
  });
})();
