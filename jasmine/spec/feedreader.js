/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test a URL of each is defined and is not empty
        it('has a URL defined and that the URL is not empty', function(){
          allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });

         // Test a name of each feed is defined and is not empty
         it('has a name defined and that the name is not empty', function(){
           allFeeds.forEach(function(feed){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });

    // Test on the menu
    describe('The menu', function(){

        // Test the menu is hidden
         it('the menu element is hidden', function(){
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         // Test the menu is changed visibility when the menu icon is clicked
          it('the menu changes visibility when the menu icon is clicked', function(){
            // Menu show
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Menu hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    // Test the initial entries
    describe('Initial Entries', function(){

        // Test the loading feed at least a sigle feed when is called and completed
         beforeEach(function(done){
           loadFeed(0,done);
         });

         it('there is at least a single .entry element within the .feed container', function(){
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    // Test new feed selection
    describe('New Feed Selection', function(){

        // Test the content is changed actually when the new feed is loaded
         let oldFeed;
         beforeEach(function(done){
           loadFeed(0, function(){
             // Store old feed and fetch new feed
             oldFeed = $('.feed').html();
             loadFeed(1, done);
           });
         });

         it('a new feed is loaded', function(){
           expect($('.feed').html()).not.toBe(oldFeed);
         });
    });
}());
