"use strict";
/// <reference path="TOHU.UnitTest.Utility.ts" />
var TOHU;
(function (TOHU) {
    var UnitTest;
    (function (UnitTest) {
        var Tools;
        (function (Tools) {
            /**
             * 測試情境引擎。
             *
             * @export
             * @class SecnarioEngine
             */
            var ScenarioEngine = (function () {
                /**
                 * 建構元。
                 * @memberof Test_DynamicDropdownList
                 */
                function ScenarioEngine(pi_objBeforProcess) {
                    this.l_objResultInfoCollector = new TOHU.UnitTest.Utility.ResultCollector();
                    this.l_objScenarios = new Array();
                    this.l_objBeforProcess = pi_objBeforProcess;
                }
                ScenarioEngine.prototype.AddScenario = function (pi_objScenario) {
                    this.l_objScenarios.push(pi_objScenario);
                    return this;
                };
                /**
                 * 執行測試情境。
                 *
                 * @memberof DynamicDropdownList
                 */
                ScenarioEngine.prototype.RunScenario = function () {
                    for (var nIndex = 0; nIndex < this.l_objScenarios.length; nIndex++) {
                        if (this.l_objBeforProcess != null) {
                            this.l_objBeforProcess.RunProcess();
                        }
                        this.l_objResultInfoCollector.PushResult(this.l_objScenarios[nIndex].RunScenario());
                    }
                    this.AlertResult();
                };
                /**
                 * 提示測試結果。
                 *
                 * @memberof Test_DynamicDropdownList
                 */
                ScenarioEngine.prototype.AlertResult = function () {
                    this.l_objResultInfoCollector.ShowResult();
                };
                return ScenarioEngine;
            }());
            Tools.ScenarioEngine = ScenarioEngine;
        })(Tools = UnitTest.Tools || (UnitTest.Tools = {}));
    })(UnitTest = TOHU.UnitTest || (TOHU.UnitTest = {}));
})(TOHU || (TOHU = {}));
