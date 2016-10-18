/* global createGridDriver, System, load */
/* eslint no-invalid-this: 0 */
'use strict';

/* Config for galen tests to use
 * Usage
 *  @@ import galen.sauce.config.test
 *  @@ Parameterized using browsers
 *  Open simple.html in ${browserName}
 *    ${browserFactory} ${endpoint} ${browserArgs}
 * System Properties
 * USERNAME          sauce username
 * ACCESS_KEY        sauce access key
 * TUNNEL_IDENTIFIER sauce connect tunnel_identifier
 * NAME              sauce test name
 * BUILD             sauce build number
 */

load(System.getProperty('CommonConfig') + '');

function factory(settings, url) {
	settings = settings || {};
	settings.desiredCapabilities = settings.desiredCapabilities || {};
	settings.desiredCapabilities.tunnelIdentifier = System.getProperty('TUNNEL_IDENTIFIER');
	settings.desiredCapabilities.name = System.getProperty('NAME');
	settings.desiredCapabilities.build = System.getProperty('BUILD');
	settings.desiredCapabilities.tags = 'galen';

	var USERNAME = System.getProperty('USERNAME');
	var ACCESS_KEY = System.getProperty('ACCESS_KEY');
	var driver = createGridDriver('http://' + USERNAME + ':' + ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub', settings);
	driver.get(url);
	return driver;
}

this.reportStatus = function reportStatus(driver, status) {
	driver.executeScript('sauce:job-result=' + (status ? 'passed' : 'failed'));
};

this.browsers = {
	chromeWindows: {
		browserName: 'chrome-windows',
		browserFactory: factory.bind(this, {
			browser: 'Chrome',
			platform: 'WIN10',
			size: '768x768'
		}),
		hasShadow: true
	},
	firefoxWindows: {
		browserName: 'firefox-windows',
		browserFactory: factory.bind(this, {
			browser: 'Firefox',
			platform: 'WIN10',
			size: '768x768'
		})
	},
	ie11Windows: {
		browserName: 'ie11-windows',
		browserFactory: factory.bind(this, {
			browser: 'internet explorer',
			version: '11',
			platform: 'WIN10',
			size: '768x768'
		})
	},
	ie10Windows: {
		browserName: 'ie10-windows',
		browserFactory: factory.bind(this, {
			browser: 'internet explorer',
			version: '10',
			platform: 'WIN8',
			size: '768x768'
		})
	},
	edgeWindows: {
		browserName: 'edge-windows',
		browserFactory: factory.bind(this, {
			browser: 'microsoftedge',
			platform: 'WIN10',
			size: '768x768'
		})
	},
	chromeMac: {
		browserName: 'chrome-mac',
		browserFactory: factory.bind(this, {
			browser: 'Chrome',
			platform: 'EL_CAPITAN',
			size: '768x768'
		}),
		hasShadow: true
	},
	safariMac: {
		browserName: 'safari-mac',
		browserFactory: factory.bind(this, {
			browser: 'Safari',
			platform: 'EL_CAPITAN',
			size: '768x768'
		})
	},
	firefoxMac: {
		browserName: 'firefox-mac',
		browserFactory: factory.bind(this, {
			browser: 'Firefox',
			platform: 'EL_CAPITAN',
			size: '768x768'
		})
	}
};