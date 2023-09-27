import HtmlGenerator from "./htmlGenerator.js";
import { HtmlReporterOptions, Metrics, ReportData } from "./types.js";
import { String } from 'typescript-string-operations';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
dayjs.extend(isSameOrBefore);
import copyFiles from "./copyFiles.js";
import open from 'open';
import fs from 'fs-extra';
import path from 'path';
import logger from '@wdio/logger';
import url from 'node:url';
import JsonGenerator from "./jsonGenerator.js";
const timeFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
function walk(dir, extensions, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(function (file) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            filelist = walk(filepath, extensions, filelist);
        }
        else {
            extensions.forEach(function (extension) {
                if (file.indexOf(extension) == file.length - extension.length) {
                    filelist.push(filepath);
                }
            });
        }
    });
    return filelist;
}
class ReportAggregator {
    constructor(opts) {
        this.LOG = logger('ReportAggregator');
        this.reportFile = "";
        this.options = Object.assign(new HtmlReporterOptions(), {
            outputDir: 'reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Test Master Report'
        }, opts);
        this.reports = [];
    }
    clean() {
        fs.emptyDirSync(this.options.outputDir);
    }
    readJsonFiles() {
        return walk(this.options.outputDir, [".json"]);
    }
    updateSuiteMetrics(metrics, suiteInfo) {
        let start = dayjs.utc(suiteInfo.start);
        if (metrics.start) {
            if (start.isBefore(metrics.start)) {
                metrics.start = start.utc().format(timeFormat);
            }
        }
        else {
            metrics.start = start.utc().format(timeFormat);
        }
        let end = dayjs.utc(suiteInfo.end);
        if (metrics.end) {
            if (end.isAfter(dayjs.utc(metrics.end))) {
                metrics.end = end.utc().format(timeFormat);
            }
        }
        else {
            metrics.end = end.utc().format(timeFormat);
        }
        this.LOG.info(String.format("Included metrics for suite: {0} {1}", suiteInfo.cid, suiteInfo.uid));
    }
    createReport() {
        return __awaiter(this, void 0, void 0, function* () {
            this.options.LOG.info("Report Aggregation started");
            let metrics = new types_1.Metrics();
            let suites = [];
            let specs = [];
            let files = this.readJsonFiles();
            for (let i = 0; i < files.length; i++) {
                try {
                    let filename = files[i];
                    let report = JSON.parse(fs.readFileSync(filename));
                    if (!report.info || !report.info.specs) {
                        this.options.LOG.error("report structure in question, no info or info.specs ", JSON.stringify(report));
                        this.options.LOG.debug("report content: ", JSON.stringify(report));
                    }
                    report.info.specs.forEach((spec) => {
                        specs.push(spec);
                    });
                    this.reports.push(report);
                }
                catch (ex) {
                    console.error(ex);
                }
            }
            this.reports.sort((report1, report2) => {
                let first = dayjs_1.default.utc(report1.info.start);
                let second = dayjs_1.default.utc(report2.info.start);
                if (first.isAfter(second)) {
                    return 1;
                }
                else if (first.isBefore(second)) {
                    return -1;
                }
                return 0;
            });
            for (let j = 0; j < this.reports.length; j++) {
                try {
                    let report = this.reports[j];
                    let suitePassed = true; // Assume the suite passed initially
                    for (let k = 0; k < report.suites.length; k++) {
                        let suiteInfo = report.suites[k];
                        for (let m = 0; m < suiteInfo.tests.length; m++) {
                            if (suiteInfo.tests[m].state !== 'passed') {
                                suitePassed = false; // If any test fails, mark the suite as failed
                                break;
                            }
                        }

                        if (suitePassed) {
                            metrics.passed += 1; // If the suite passed, increment passed count
                        } else {
                            metrics.failed += 1; // If the suite failed, increment failed count
                        }

                        let start = dayjs_1.default.utc(suiteInfo.start);
                        if (metrics.start) {
                            if (start.isBefore(metrics.start)) {
                                metrics.start = start.utc().format(timeFormat);
                            }
                        } else {
                            metrics.start = start.utc().format(timeFormat);
                        }
                        let end = dayjs_1.default.utc(suiteInfo.end);
                        if (metrics.end) {
                            if (end.isAfter(dayjs_1.default.utc(metrics.end))) {
                                metrics.end = end.utc().format(timeFormat);
                            }
                        } else {
                            metrics.end = end.utc().format(timeFormat);
                        }
                        suites.push(suiteInfo);
                    }
                }
                catch (ex) {
                    console.error(ex);
                }
            }
            if (!metrics.start || !metrics.end) {
                this.options.LOG.error(typescript_string_operations_1.String.Format("Invalid Metrics computed: {0} -- {1}", metrics.start, metrics.end));
            }
            metrics.duration = dayjs_1.default.duration((0, dayjs_1.default)(metrics.end).utc().diff((0, dayjs_1.default)(metrics.start).utc())).as('milliseconds');
            if (!this.reports || !this.reports.length) {
                // the test failed hard at the beginning.  Create a dummy structure to get through html generation
                let report = {
                    "info": {
                        "cid": "The execution of the test suite has failed before report generation was started.  Please look at the logs to determine the error, this is likely an issue with your configuration files.",
                        "config": {
                            "hostname": "localhost"
                        },
                        "specs": [],
                        "suites": [
                            {
                                "uid": "Test Start Failure",
                                "title": "Test Start Failure",
                                "type": "suite",
                                "tests": [],
                            }
                        ]
                    }
                };
                this.reports = [];
                this.reports.push(report);
            }
            this.options.LOG.info("Aggregated " + specs.length + " specs, " + suites.length + " suites, " + this.reports.length + " reports, ");
            this.reportFile = path.join(process.cwd(), this.options.outputDir, this.options.filename);
            if (this.options.removeOutput) {
                for (let i = 0; i < suites.length; i++) {
                    let suite = suites[i].suite;
                    if (suite && suite.tests) {
                        for (let j = 0; j < suite.tests.length; j++) {
                            let test = suite.tests[j];
                            test.output = [];
                        }
                    }
                }
            }
            let reportData = new types_1.ReportData(this.options.reportTitle, this.reports[0].info, suites, metrics, this.reportFile, this.options.browserName);
            htmlGenerator_1.default.htmlOutput(this.options, reportData);
            this.options.LOG.info("Report Aggregation completed");
            let jsFiles = path.join(__dirname, '../css/');
            let reportDir = path.join(process.cwd(), this.options.outputDir);
            yield (0, copyFiles_1.default)(jsFiles, reportDir);
            this.options.LOG.info('copyfiles complete : ' + jsFiles + " to " + reportDir);
            try {
                if (this.options.showInBrowser) {
                    let childProcess = yield open(reportData.reportFile
                        // ,{ app:
                        //         {
                        //         name: 'google chrome',
                        //         arguments: ['--incognito']
                        //         }
                        // }
                    );
                    this.options.LOG.info('browser launched');
                }
            }
            catch (ex) {
                this.options.LOG.error('Error opening browser:' + ex);
            }
        });
    }
    async finalize() {
        const cssDir = url.fileURLToPath(new URL('../css/', import.meta.url));
        let jsFiles = cssDir;
        let reportDir = path.join(process.cwd(), this.options.outputDir);
        await copyFiles(jsFiles, reportDir);
        this.LOG.info('copyied css : ' + jsFiles + " to " + reportDir);
        if (this.options.showInBrowser) {
            await open(this.reportFile);
            this.LOG.info("browser launched");
        }
        this.LOG.info('HTML Report Generation complete');
        console.info("HTML Report Generation complete");
    }
}
export default ReportAggregator;
