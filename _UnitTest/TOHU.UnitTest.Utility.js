"use strict";
/**
 * 提供單元測試腳本呼叫。
 */
var TOHU;
(function (TOHU) {
    var UnitTest;
    (function (UnitTest) {
        var Utility;
        (function (Utility) {
            /**
             * 提供單元測試功能。
             *
             * @export
             * @class Engine
             */
            var Engine = (function () {
                function Engine() {
                }
                Engine.prototype.Assert = function (pi_sExpected, pi_sActual) {
                    var objReturn = new ResultInfo();
                    var bResult;
                    if (pi_sExpected === pi_sActual) {
                        objReturn.Status = "Green";
                        objReturn.Message = "";
                    }
                    else {
                        objReturn.Status = "Red";
                        objReturn.Message = "預期值[" + pi_sExpected + "]；實際取得[" + pi_sActual + "]";
                    }
                    return objReturn;
                };
                return Engine;
            }());
            Utility.Engine = Engine;
            var ResultCollector = (function () {
                function ResultCollector() {
                    this.l_objResultInfoCollection = new Array();
                }
                ResultCollector.prototype.PushResult = function (pi_objResultInfo) {
                    this.l_objResultInfoCollection.push(pi_objResultInfo);
                };
                ResultCollector.prototype.ShowResult = function () {
                    this.l_objResultInfoCollection.forEach(function (pi_objResult, pi_nIndex) {
                        if (pi_objResult.Status.toUpperCase() === "GREEN") {
                            alert("(" + pi_objResult.Name + ") 執行結果：" + pi_objResult.Status);
                        }
                        else {
                            alert("(" + pi_objResult.Name + ") 執行結果：" + pi_objResult.Message);
                        }
                    });
                };
                return ResultCollector;
            }());
            Utility.ResultCollector = ResultCollector;
            /**
             * 定義測試結果。
             *
             * @export
             * @class ResultInfo
             */
            var ResultInfo = (function () {
                function ResultInfo() {
                }
                return ResultInfo;
            }());
            Utility.ResultInfo = ResultInfo;
        })(Utility = UnitTest.Utility || (UnitTest.Utility = {}));
    })(UnitTest = TOHU.UnitTest || (TOHU.UnitTest = {}));
})(TOHU || (TOHU = {}));
