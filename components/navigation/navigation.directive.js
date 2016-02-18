(function() {
   'use strict';
   
   angular.module('app').directive('navigation', navigation);
   
   navigation.$inject = ['$window'];
   
   function navigation($window) {
   
      return {
         scope: {},
         link: link,
         templateUrl: 'components/navigation/navigation.html'
      };

      function link(scope, element, attrs) {

         var $nav = $('.greedy-nav');
         var $btn = $('.greedy-nav button');
         var $vlinks = $('.greedy-nav .visible-links');
         var $hlinks = $('.greedy-nav .hidden-links');

         var breaks = [];

         function updateNav() {

            var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

            // The visible list is overflowing the nav
            if($vlinks.width() > availableSpace) {

               // Record the width of the list
               breaks.push($vlinks.width());

               // Move item to the hidden list
               $vlinks.children().last().prependTo($hlinks);

               // Show the dropdown btn
               if($btn.hasClass('hidden')) {
                  $btn.removeClass('hidden');
               }

               // The visible list is not overflowing
            } else {

               // There is space for another item in the nav
               if(availableSpace > breaks[breaks.length-1]) {

                  // Move the item to the visible list
                  $hlinks.children().first().appendTo($vlinks);
                  breaks.pop();
               }

               // Hide the dropdown btn if hidden list is empty
               if(breaks.length < 1) {
                  $btn.addClass('hidden');
                  $hlinks.addClass('hidden');
               }
            }

            // Keep counter updated
            $btn.attr("count", breaks.length);

            // Recur if the visible list is still overflowing the nav
            if($vlinks.width() > availableSpace) {
               updateNav();
            }

         }

// Window listeners

         $(window).resize(function() {
            updateNav();
         });

         $btn.on('click', function() {
            $hlinks.toggleClass('hidden');
         });

         updateNav();

      }
      
   }
   
}());