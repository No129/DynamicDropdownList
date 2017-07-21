/// <reference path="TOHU.UnitTest.Utility.ts" />
/// <reference path="../_Code/TOHU.Utility.ts" />
/// <reference path="../_Code/TOHU.Tools.DynamicDropdownList.ts" />

namespace TOHU.UnitTest.DynamicDropdownList{
    
    /**
     * 提供測試情境前置程序。
     * 
     * @export
     * @class BeforProcess
     * @implements {TOHU.UnitTest.Utility.IBeforProcess}
     */
    export class BeforProcess implements TOHU.UnitTest.Utility.IBeforProcess{

        /**
         * 執行前置程序。
         * 
         * @memberof BeforProcess
         */
        RunProcess(){
            var objItemInfoFactory = new TOHU.Utility.DropdownListItemInfoFactory();
            var objDropdownList = new TOHU.Utility.DropDownList();            

            /**
             * 停用 change 事件處理。
             */
            $("#BU").off('change');
            $("#OU").off('change');
            $("#Staff").off('change');
   
            /**
             * Give 下拉選單 BU 項目。
             */
            var objBUItemInfos : TOHU.Utility.DropdownListItemInfo[];

            objBUItemInfos = new Array();
            objBUItemInfos.push(objItemInfoFactory.Product("GTS","GTS"));
            objBUItemInfos.push(objItemInfoFactory.Product("GA","GA"));
            objDropdownList.ResetDropdownListItems("BU", objBUItemInfos);
           
            /**
             * Give 下拉選單 OU 項目。
             */
            var objOUItemInfos : TOHU.Utility.DropdownListItemInfo[];

            objOUItemInfos = new Array();
            objOUItemInfos.push(objItemInfoFactory.Product("GTS-1","GTS|GTS1|GTS-1"));
            objOUItemInfos.push(objItemInfoFactory.Product("GTS-2","GTS|GTS2|GTS-2"));
            objOUItemInfos.push(objItemInfoFactory.Product("GTS-3","GTS|GTS3|GTS-3"));
            objOUItemInfos.push(objItemInfoFactory.Product("GA-S","GA|GAS|GA-S"));
            objDropdownList.ResetDropdownListItems("OU", objOUItemInfos);

            /**
             * Give 下拉選單 Staff 項目。
             */
            var objStaffItemInfos : TOHU.Utility.DropdownListItemInfo[];

            objStaffItemInfos = new Array();
            objStaffItemInfos.push(objItemInfoFactory.Product("李浩寧","GAS|CTLL|李浩寧"));
            objStaffItemInfos.push(objItemInfoFactory.Product("謝仁康","GTS1|HJK|謝仁康"));
            objStaffItemInfos.push(objItemInfoFactory.Product("黃素華","GTS2|JEM|黃素華"));
            objStaffItemInfos.push(objItemInfoFactory.Product("謝東旂","GTS3|CEHS|謝東旂"));
            objStaffItemInfos.push(objItemInfoFactory.Product("黃竣祥","GTS3|TOHU|黃竣祥"));
            objDropdownList.ResetDropdownListItems("Staff", objStaffItemInfos);
        };
    }
    
    /**
     * 測試情境：初始化動態下拉選單。
     * 
     * @export
     * @class Scenario_Initial
     * @implements {TOHU.UnitTest.Utility.IUnitTestScenario}
     */
    export class Scenario_Initial implements TOHU.UnitTest.Utility.IUnitTestScenario{
        private l_sTargetId:string;
        private l_sExpected:string;

        /**
         * 建構元。
         * 
         * @param {string} pi_sTargetId 目的下拉選單 id 值。
         * @param {string} pi_sExpected 預期 value 值。
         * @memberof Scenario_Initial
         */
        constructor(pi_sTargetId:string, pi_sExpected:string){
            this.l_sTargetId = pi_sTargetId;
            this.l_sExpected = pi_sExpected;
        }

        /**
         * 執行測試情境。
         * 
         * @returns {TOHU.UnitTest.Utility.ResultInfo} 
         * @memberof Scenario_Initial
         */
        RunScenario():TOHU.UnitTest.Utility.ResultInfo{
            var objResult:TOHU.UnitTest.Utility.ResultInfo;
            var objSteps:string[] = new Array();                               

            /**
             * When 初始主從選單
             */           
            objSteps.push("When 初始主從選單")
            new TOHU.Tools.DynamicDropdownList('BU', 'OU').SetRelation('OU','Staff').Initial();

            /**
             * Then 取得下拉選單 [pi_sTargetID] 選取項的 Value 應是 [pi_sExpected] 字串
             */
            objSteps.push("Then 取得下拉選單 " + this.l_sTargetId +" 選取項的 Value 應是 " + this.l_sExpected + " 字串")
            var sActual:string;

            sActual = new TOHU.Utility.DropDownList().GetSelected(this.l_sTargetId).ItemValue;

            /**
             * 保留測試結果。
             */
            objResult = new TOHU.UnitTest.Utility.Engine().Assert(this.l_sExpected, sActual);
            objResult.Name= "初始「動態下拉選單」項目。( " + this.l_sTargetId + "_" + this.l_sExpected + " )" ;
            objResult.Steps = objSteps;          
            
            return objResult;
        }
    }

    export class Scenario_Selected_GA implements TOHU.UnitTest.Utility.IUnitTestScenario{

        private l_sTargetId:string;
        private l_sExpected:string;

        constructor(pi_sTargetId:string, pi_sExpected:string){
            this.l_sTargetId = pi_sTargetId;
            this.l_sExpected = pi_sExpected;
        }

        RunScenario():TOHU.UnitTest.Utility.ResultInfo{
            var objResult:TOHU.UnitTest.Utility.ResultInfo;
            var sActual:string = "";
            var objSteps:string[] = new Array();        
            
            /**
             * When 初始主從選單
             */           
            objSteps.push("When 初始主從選單")
            new TOHU.Tools.DynamicDropdownList('BU', 'OU').SetRelation('OU','Staff').Initial();

            /**
             * When 點選 BU 為 'GA' 時
             */           
            objSteps.push("When 點選 BU 為 'GA' 時")
            $('#BU').val('GA');           
            $('#BU').trigger('change');
            
            /**
             * Then 取得下拉選單 [pi_sTargetID] 選取項的 Value 應是 [pi_sExpected] 字串
             */
            objSteps.push("Then 取得下拉選單 " + this.l_sTargetId +" 選取項的 Value 應是 " + this.l_sExpected + " 字串")

            sActual = new TOHU.Utility.DropDownList().GetSelected(this.l_sTargetId).ItemValue;

            /**
             * 保留測試結果。
             */
            objResult = new TOHU.UnitTest.Utility.Engine().Assert(this.l_sExpected, sActual);
            objResult.Name= "選取 BU 下拉選單，項目為 GA 時，OU 應為 GAS 。( " + this.l_sTargetId + "_" + this.l_sExpected + " )" ;
            objResult.Steps = objSteps; 

            return objResult;
        }
    }
}


