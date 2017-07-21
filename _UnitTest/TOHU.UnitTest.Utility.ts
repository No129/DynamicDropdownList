/**
 * 提供單元測試腳本呼叫。
 */
namespace TOHU.UnitTest.Utility{    

    /**
     * 定義測試情形操作。
     * 
     * @interface IUnitTestScenario
     */
    export interface IUnitTestScenario{
        RunScenario():TOHU.UnitTest.Utility.ResultInfo;
    }

    /**
     * 定義情形前置程序。
     * 
     * @export
     * @interface IBeforProcess
     */
    export interface IBeforProcess{
        RunProcess():void;
    }

    /**
     * 提供單元測試功能。
     * 
     * @export
     * @class Engine
     */
    export class Engine{    

        Assert(pi_sExpected:string, pi_sActual:string):ResultInfo{
            var objReturn = new ResultInfo();
            var bResult:boolean; 

            if(pi_sExpected === pi_sActual){
                objReturn.Status = "Green";
                objReturn.Message = "";
            }else{
                objReturn.Status = "Red";
                objReturn.Message = "預期值[" + pi_sExpected + "]；實際取得[" + pi_sActual + "]";
            }

            return objReturn;
        }        
    }

    export class ResultCollector{
        l_objResultInfoCollection : ResultInfo[];

        constructor(){
            this.l_objResultInfoCollection = new Array();
        }
        
        PushResult(pi_objResultInfo: ResultInfo){
            this.l_objResultInfoCollection.push(pi_objResultInfo);
        }

        ShowResult(){            
            this.l_objResultInfoCollection.forEach(function(pi_objResult: TOHU.UnitTest.Utility.ResultInfo, pi_nIndex: number){
                if(pi_objResult.Status.toUpperCase() === "GREEN"){
                    alert("(" + pi_objResult.Name + ") 執行結果：" + pi_objResult.Status);
                }else{
                    alert("(" + pi_objResult.Name + ") 執行結果：" + pi_objResult.Message);
                }
            });
        }
    }

    /**
     * 定義測試結果。
     * 
     * @export
     * @class ResultInfo
     */
    export class ResultInfo{      
        
        /**
         * 情境名稱。
         * 
         * @type {string}
         * @memberof ResultInfo
         */
        Name:string;

        /**
         * 執行狀態 ( Green:通過／Red:失敗／Yellow:停用 )。
         * 
         * @type {string}
         * @memberof ResultInfo
         */
        Status:string;

        /**
         * 執行步驟。
         * 
         * @type {string[]}
         * @memberof ResultInfo
         */
        Steps:string[];

        /**
         * 執行訊息。
         * 
         * @type {string}
         * @memberof ResultInfo
         */
        Message:string;
    }
}