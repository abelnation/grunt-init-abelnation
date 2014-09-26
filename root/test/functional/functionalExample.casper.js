
casper.test.setUp(function() {
    console.log("");
    console.log("SETUP");

    casper.start();
    casper.userAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53");
});

casper.test.begin("http://google.com", 1, function suite(test) {
    casper.thenOpen("http://google.com", function() {
        var toPassToBrowser = "hi from casper!";

        var msgFromBrowser = casper.evaluate(function(passedArg) {
            console.log("passedArg: " + passedArg);
            return "hi from browser!";
        }, toPassToBrowser);

        test.assert(/google\.com/.test(this.getCurrentUrl()));
    });
    // Always include this section
    casper.run(function() {
        test.done();
    });
});
