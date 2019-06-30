module.exports={
    '@tags': ['google'],
    '@disbaled': true,
    'Google Advanced Search: Elon Musk'(browser){
        const mainQuery = 'Elon Musk';

        const page = browser.page.googleAdvancedSearch();
        
        const resultsPageQuerySelector = `#searchform input[name="q"][value="${mainQuery}"]`
        const resultsPageLanguageSelector = `[aria-label="Search Italian pages"]`
        const resultsPageLastUpdateSelector = `[aria-label="Past month"]`

        // const mainQueryInputSelector = 'input[name="as_q"]';
        // const langugageDropDownOpenerSelector = '#lr_button';
        // const langugageDropDownValueSelector = '.goog-menuitem[value="lang_it"]';
        // const lastUpdateDropDownOpenerSelector = '#as_qdr_button';
        // const lastUpdateDropDownValueSelector = '.goog-menuitem[value="m"]';
        // const submitButtonSelector = '.jfk-button[type="submit"]'

        // browser
        //      .url('https://www.google.com/advanced_search')
        //      .setValue(mainQueryInputSelector, mainQuery)
        //      .click(langugageDropDownOpenerSelector)
        //      .click(langugageDropDownValueSelector)
        //      .click(lastUpdateDropDownOpenerSelector)
        //      .click(lastUpdateDropDownValueSelector)
        //      .perform(()=> { debugger; } )   //perform dubugging at the mid of event queue of nightwatch
        // .click(submitButtonSelector)

        page
            .navigate()   //by default page objects's url
            .setQuery(mainQuery)  //@is used to get that value from page objecvt
            .selectFilter('@langugageDropDownOpener', 'lang_it')
            .selectFilter('@lastUpdateDropDownOpener', 'm')
            .search()
            
        browser
            .assert.urlContains('as_q=Elon+Musk', 'Query is Elon Musk')
            .assert.urlContains('as_qdr=m', 'Lsst Updated 1 month ago')
            .assert.urlContains('lr=lang_it', 'Language is Italian')
            
        browser.assert.visible(resultsPageQuerySelector, 'UI : Elon Musk is visible');
        browser.assert.containsText(resultsPageLanguageSelector, 'Search Italian pages' ,'UI : LANGUAGE IS SET TO ITALIAN');
        browser.assert.containsText(resultsPageLastUpdateSelector, 'Past month' ,'UI : LLast Update is set to 1 month ago');
        browser.saveScreenshot('tests_output/google.png')
    }
}