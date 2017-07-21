/// <reference path="TOHU.UnitTest.Utility.ts" />

namespace TOHU.UnitTest.Tools{

    /**
     * 測試情境引擎。
     * 
     * @export
     * @class SecnarioEngine
     */
    export class ScenarioEngine{

        /**
         * 情境測試結果收集器。
         * 
         * @type {TOHU.UnitTest.Utility.ResultCollector}
         * @memberof Test_DynamicDropdownList
         */
        private l_objResultInfoCollector: TOHU.UnitTest.Utility.ResultCollector;
        
        /**
         * 測試情境集合。
         * 
         * @private
         * @type {IUnitTestScenario[]}
         * @memberof DynamicDropdownList
         */
        private l_objScenarios: TOHU.UnitTest.Utility.IUnitTestScenario[];

        /**
         * 測試情境前置處理。
         * 
         * @private
         * @type {TOHU.UnitTest.Utility.IBeforProcess}
         * @memberof SecnarioEngine
         */
        private l_objBeforProcess: TOHU.UnitTest.Utility.IBeforProcess;
    
        /**
         * 建構元。
         * @memberof Test_DynamicDropdownList
         */
        constructor(pi_objBeforProcess: TOHU.UnitTest.Utility.IBeforProcess){
            this.l_objResultInfoCollector = new TOHU.UnitTest.Utility.ResultCollector();
            this.l_objScenarios = new Array();
            this.l_objBeforProcess = pi_objBeforProcess;
        }

        AddScenario(pi_objScenario: TOHU.UnitTest.Utility.IUnitTestScenario):ScenarioEngine{
            this.l_objScenarios.push(pi_objScenario);   
            return this;         
        }

        /**
         * 執行測試情境。
         * 
         * @memberof DynamicDropdownList
         */
        RunScenario(){
            for(var nIndex:number = 0 ; nIndex < this.l_objScenarios.length ; nIndex++){
                if(this.l_objBeforProcess != null){
                    this.l_objBeforProcess.RunProcess();
                }
                this.l_objResultInfoCollector.PushResult(this.l_objScenarios[nIndex].RunScenario());
            }
            this.AlertResult();
        }

        /**
         * 提示測試結果。
         * 
         * @memberof Test_DynamicDropdownList
         */
        private AlertResult(){
            this.l_objResultInfoCollector.ShowResult();
        }

    }
}