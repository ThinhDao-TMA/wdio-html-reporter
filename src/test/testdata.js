"use strict";
exports.__esModule = true;
exports.SUITES_NESTED = exports.SUITES_NO_TESTS_WITH_HOOK_ERROR = exports.SUITES_NO_TESTS = exports.SUITES_MULTIPLE_ERRORS = exports.SUITES = exports.SUITE_UIDS = exports.RUNNER = void 0;
var reporter_1 = require("@wdio/reporter");
exports.RUNNER = new reporter_1.RunnerStats({
    "start": "2021-06-11T16:24:27.910Z",
    "_duration": 22079,
    cid: '0-0',
    "capabilities": {
        "acceptInsecureCerts": false,
        "browserName": "chrome",
        "browserVersion": "91.0.4472.101",
        //@ts-ignore
        "chrome": {
            "chromedriverVersion": "90.0.4430.24 (4c6d850f087da467d926e8eddb76550aed655991-refs/branch-heads/4430@{#429})",
            "userDataDir": "C:\\Users\\rpii\\AppData\\Local\\Temp\\scoped_dir3692_1178567250"
        },
        "logLevel": "warn",
        "outputDir": "./logs",
        "connectionRetryTimeout": 160000,
        "connectionRetryCount": 3,
        "logLevels": {},
        "strictSSL": true
    },
    specs: ['/foo/bar/baz.js']
});
exports.SUITE_UIDS = [
    'Foo test1',
    'Bar test2',
    'Baz test3',
];
exports.SUITES = [
    {
        uid: exports.SUITE_UIDS[0],
        title: exports.SUITE_UIDS[0].slice(0, -1),
        file: "dummy",
        type: "suite",
        hooks: [],
        start: new Date("2019-04-13T00:10:05.191Z"),
        end: new Date("2019-04-13T00:10:15.191Z"),
        tests: [
            //@ts-ignore
            {
                type: "test",
                uid: 'foo1',
                title: 'foo',
                state: 'passed',
                "start": new Date("2021-06-11T01:28:24.778Z"),
                "_duration": 9009,
                "cid": "0-0",
                "fullTitle": "full foo",
                "parent": "login test valid logins suite"
            },
            {
                uid: 'bar1',
                title: 'bar',
                state: 'failed',
                "start": new Date("2021-06-11T01:28:24.778Z"),
                "_duration": 15809,
                //@ts-ignore
                "events": [
                    {
                        "type": "log",
                        "value": "Show Login Screen"
                    },
                    {
                        "message": "Expected <xpath://p[@class='message red-gradient' and  contains(.,'Unable to login due to Bad credentials')]> to be displayed but it is not",
                        "stack": "Error: Expected <xpath://p[@class='message red-gradient' and  contains(.,'Unable to login due to Bad credentials')]> to be displayed but it is not\n    at timer.catch.e (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\webdriverio\\build\\commands\\browser\\waitUntil.js:69:15)\n    at Browser.runCommand (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@wdio\\sync\\build\\wrapCommand.js:31:24)\n    at Browser.<anonymous> (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@wdio\\sync\\build\\wrapCommand.js:53:31)\n    at Proxy.<anonymous> (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\chai-webdriverio\\dist\\assertions\\displayed.js:35:20)\n    at Proxy.methodWrapper (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\chai\\lib\\chai\\utils\\addMethod.js:57:25)\n    at LoginPage.displayed [as assertInvalidCredentials] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\pages/login.page.js:112:51)\n    at LoginPage.assertion [as login] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\pages/login.page.js:89:9)\n    at LoginPage.login [as loginFn] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\pages/login.page.js:98:14)\n    at module.exports.loginFn [as fn] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\specs/login2.spec.js:29:23)\n    at module.exports.runCase (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@rpii\\wdio-data-driven\\lib\\wdio-data-driven.js:92:22)\n    at module.exports.forCasesInSpreadsheet (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@rpii\\wdio-data-driven\\lib\\wdio-data-driven.js:71:18)",
                        "type": "Error"
                    },
                    {
                        "type": "screenshot",
                        "value": "test\\test.png"
                    },
                ]
            },
            //@ts-ignore
            {
                uid: 'three',
                state: 'skipped',
                title: 'skip'
            }
        ]
    },
    {
        uid: exports.SUITE_UIDS[1],
        title: exports.SUITE_UIDS[1].slice(0, -1),
        hooks: [],
        type: "suite",
        tests: [
            //@ts-ignore
            {
                uid: 'some test1',
                title: 'some test',
                state: 'passed'
            },
            //@ts-ignore
            {
                uid: 'a failed test2',
                title: 'a failed test',
                state: 'failed',
                error: {
                    name: "error",
                    message: 'expected foo to equal bar',
                    stack: 'Failed test stack trace'
                }
            }
        ]
    },
    {
        uid: exports.SUITE_UIDS[2],
        title: exports.SUITE_UIDS[2].slice(0, -1),
        type: "suite",
        hooks: [],
        tests: [
            //@ts-ignore
            {
                uid: 'foo bar baz1',
                title: 'foo bar baz',
                state: 'passed'
            },
            //@ts-ignore
            {
                uid: 'a skipped test2',
                title: 'a skipped test',
                state: 'skipped'
            }
        ]
    }
];
exports.SUITES_MULTIPLE_ERRORS = [
    {
        uid: exports.SUITE_UIDS[0],
        title: exports.SUITE_UIDS[0].slice(0, -1),
        type: "suite",
        file: "dummy",
        hooks: [],
        tests: [
            //@ts-ignore
            {
                uid: 'foo1',
                title: 'foo',
                state: 'passed'
            },
            //@ts-ignore
            {
                uid: 'bar1',
                title: 'bar',
                state: 'passed'
            }
        ]
    },
    {
        uid: exports.SUITE_UIDS[1],
        title: exports.SUITE_UIDS[1].slice(0, -1),
        type: "suite",
        file: "dummy",
        hooks: [],
        tests: [
            //@ts-ignore
            {
                uid: 'some test1',
                title: 'some test',
                state: 'passed'
            },
            {
                uid: 'a failed test',
                title: 'a test with two failures',
                state: 'failed',
                errors: [
                    {
                        "name": "Error",
                        "message": "expected the party on the first part to be the party on the first part",
                        "stack": "First failed stack trace",
                        //@ts-ignore
                        "type": "Error"
                    },
                    //@ts-ignore
                    {
                        name: "Error",
                        message: 'expected the party on the second part to be the party on the second part',
                        stack: 'Second failed stack trace',
                        //@ts-ignore
                        type: "Error"
                    }
                ]
            }
        ]
    },
];
exports.SUITES_NO_TESTS = [
    //@ts-ignore
    {
        uid: exports.SUITE_UIDS[0],
        title: exports.SUITE_UIDS[0].slice(0, -1),
        file: "dummy",
        tests: [],
        suites: [],
        hooks: []
    },
];
exports.SUITES_NO_TESTS_WITH_HOOK_ERROR = [
    {
        uid: exports.SUITE_UIDS[0],
        title: exports.SUITE_UIDS[0].slice(0, -1),
        file: "dummy",
        tests: [],
        suites: [],
        hooks: [
            //@ts-ignore
            {
                uid: 'a failed hook2',
                title: 'a failed hook',
                state: 'failed',
                error: {
                    name: "Error",
                    message: 'expected foo to equal bar',
                    stack: 'Failed test stack trace'
                }
            }
        ]
    },
];
exports.SUITES_NESTED = [
    {
        "uid": "Foo test1",
        "title": "Foo test",
        "type": "suite",
        "hooks": [],
        "start": "2019-04-13T00:10:05.191Z",
        "end": "2019-04-13T00:10:15.191Z",
        "tests": [
            {
                "type": "test",
                "uid": "foo1",
                "title": "foo",
                "state": "passed",
                "start": "2021-06-11T01:28:24.778Z",
                "_duration": 9009,
                "cid": "0-0",
                "fullTitle": "full foo",
                "parent": "login test valid logins suite"
            },
            {
                "uid": "bar1",
                "title": "bar",
                "state": "failed",
                "start": "2021-06-11T01:28:24.778Z",
                "_duration": 15809,
                "events": [
                    {
                        "type": "log",
                        "value": "Show Login Screen"
                    },
                    {
                        "message": "Expected <xpath://p[@class='message red-gradient' and  contains(.,'Unable to login due to Bad credentials')]> to be displayed but it is not",
                        "stack": "Error: Expected <xpath://p[@class='message red-gradient' and  contains(.,'Unable to login due to Bad credentials')]> to be displayed but it is not\n    at timer.catch.e (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\webdriverio\\build\\commands\\browser\\waitUntil.js:69:15)\n    at Browser.runCommand (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@wdio\\sync\\build\\wrapCommand.js:31:24)\n    at Browser.<anonymous> (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@wdio\\sync\\build\\wrapCommand.js:53:31)\n    at Proxy.<anonymous> (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\chai-webdriverio\\dist\\assertions\\displayed.js:35:20)\n    at Proxy.methodWrapper (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\chai\\lib\\chai\\utils\\addMethod.js:57:25)\n    at LoginPage.displayed [as assertInvalidCredentials] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\pages/login.page.js:112:51)\n    at LoginPage.assertion [as login] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\pages/login.page.js:89:9)\n    at LoginPage.login [as loginFn] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\pages/login.page.js:98:14)\n    at module.exports.loginFn [as fn] (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\test\\specs/login2.spec.js:29:23)\n    at module.exports.runCase (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@rpii\\wdio-data-driven\\lib\\wdio-data-driven.js:92:22)\n    at module.exports.forCasesInSpreadsheet (C:\\Users\\rpii\\Development\\micro-magic-web-e2e-test\\node_modules\\@rpii\\wdio-data-driven\\lib\\wdio-data-driven.js:71:18)",
                        "type": "Error"
                    },
                    {
                        "type": "screenshot",
                        "value": "test\\test.png"
                    }
                ]
            }
        ],
        "suites": [
            {
                "uid": "nested Foo test1",
                "title": "Nested Foo test1",
                "type": "suite",
                "hooks": [],
                "start": "2019-04-13T00:10:05.191Z",
                "end": "2019-04-13T00:10:15.191Z",
                "tests": [
                    {
                        "type": "test",
                        "uid": "foo1",
                        "title": "foo",
                        "state": "passed",
                        "start": "2021-06-11T01:28:24.778Z",
                        "_duration": 9009,
                        "cid": "0-0",
                        "fullTitle": "full foo",
                        "parent": "login test valid logins suite"
                    }
                ]
            },
            {
                "uid": "Nested Foo test2",
                "title": "Nested Foo test2",
                "type": "suite",
                "hooks": [],
                "start": "2019-04-13T00:10:05.191Z",
                "end": "2019-04-13T00:10:15.191Z",
                "tests": [],
                "suites": [
                    {
                        "uid": "Foo test2",
                        "title": "nested Foo test2",
                        "type": "suite",
                        "hooks": [],
                        "start": "2019-04-13T00:10:05.191Z",
                        "end": "2019-04-13T00:10:15.191Z",
                        "tests": [
                            {
                                "type": "test",
                                "uid": "foo1",
                                "title": "foo",
                                "state": "passed",
                                "start": "2021-06-11T01:28:24.778Z",
                                "_duration": 9009,
                                "cid": "0-0",
                                "fullTitle": "full foo",
                                "parent": "login test valid logins suite"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
