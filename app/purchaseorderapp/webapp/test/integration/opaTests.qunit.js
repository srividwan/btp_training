sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ust/srividwan/purchaseorderapp/test/integration/FirstJourney',
		'ust/srividwan/purchaseorderapp/test/integration/pages/POsList',
		'ust/srividwan/purchaseorderapp/test/integration/pages/POsObjectPage',
		'ust/srividwan/purchaseorderapp/test/integration/pages/POItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsList, POsObjectPage, POItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ust/srividwan/purchaseorderapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsList: POsList,
					onThePOsObjectPage: POsObjectPage,
					onThePOItemsObjectPage: POItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);