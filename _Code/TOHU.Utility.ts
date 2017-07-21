
/**
 * 提供 TOHU 開發工具呼叫的類別，應避免在客戶端直接呼叫。
 */
namespace TOHU.Utility{
    
    /**
     * 提供格式轉換功能。
     * 
     * @export
     * @class Converter
     */
    export class Converter{

        /**
            解決 .val 具備多種資料型態 ( string/string[]/number/undefined )，
            因此直接傳入 string 變數在 TS 會有型別錯誤提示，雖然編譯為 JS 後可執行。
            @param {undefinded|string|string[]|number} pi_objInput pi_objInput 待處理的 .val 值
            @returns {string} 轉換後字串。( undefinded 會回傳空白; string[] 回傳首個字串)
        */
        ValToString(pi_objInput: undefined|string|string[]|number):string{
            var sReturn: string = "";

            if(typeof pi_objInput === 'string'){
                sReturn = pi_objInput;
            }else if(typeof pi_objInput === 'undefined'){
                sReturn = "";
            }else if(Array.isArray(pi_objInput)){
                if(pi_objInput.length > 0){
                    sReturn = pi_objInput[0];
                }else{
                    sReturn = "";
                }
            }else{
                sReturn = pi_objInput.toString();
            }

            return sReturn;
        }       
    }

    /**
     * 提供下拉選單常用操作。
     * 
     * @export
     * @class DropDownList
     */
    export class DropDownList{

        /**
         * 取得指定下拉選單的選取值。
         * 
         * @param pi_sTargetId 目標下拉選單的 id 值。
         */
        GetSelected(pi_sTargetId: string):DropdownListItemInfo{
            var objReturn = new DropdownListItemInfo();
        
            objReturn.ItemValue = new Converter().ValToString($("#" + pi_sTargetId).find(":selected").val());
            objReturn.ItemView = $("#" + pi_sTargetId).find(":selected").text();

            return objReturn;
        }
        
        /**
         * 取得指定下拉選單的所有項目。
         * 
         * @param pi_sTargetId 目標下拉選單的 id 值。
         */
        GetAllItem(pi_sTargetId: string):DropdownListItemInfo[]{
            var objReturn: DropdownListItemInfo[];
            var objTarget = document.getElementById(pi_sTargetId);

            objReturn = new Array();           
            if(objTarget != null){
                var nCount = objTarget.children.length;
                
                for(var nIndex = 0 ; nIndex < nCount ; nIndex++){
                    var objOption = objTarget.children[nIndex];
                    var objItemInfo = new DropdownListItemInfo();
                    var sValue: string = new Converter().ValToString($(objOption).attr('Value'));
                    var sView : string = $(objOption).text();

                    objItemInfo.ItemValue = sValue;
                    objItemInfo.ItemView = sView;
                    objReturn.push(objItemInfo);                    
                }
            }                   
            return objReturn;
        } 

        /**
         * 移除指定下拉選單所有項目。
         * 
         * @param {string} pi_sTargetId 
         * @memberof DropDownList
         */
        RemoveAllItem(pi_sTargetId: string){
            $("*[id='" + pi_sTargetId + "']" ).find('option').remove().end();            
        }

        /**
         * 提供建立特定下拉選單項目。
         * 
         * @private
         * @param {string} pi_sTargetId 
         * @param {TOHU.Utility.DropdownListItemInfo[]} pi_objItemInfos 
         * @memberof Test_DynamicDropdownList
         */
        ResetDropdownListItems(pi_sTargetId: string, pi_objItemInfos: TOHU.Utility.DropdownListItemInfo[]){
            this.RemoveAllItem(pi_sTargetId); 
           
            pi_objItemInfos.forEach(function(pi_objItemInfo: TOHU.Utility.DropdownListItemInfo, pi_nIndex: number, pi_objItemInfos: TOHU.Utility.DropdownListItemInfo[]){
                new TOHU.Utility.DropDownList().PushItem(pi_sTargetId, pi_objItemInfo);
            });
        }
        
        /**
         * 推入項目到指定下拉選單。
         * 
         * @param {string} pi_sTargetId 目標下拉選單 id 值。
         * @param {DropdownListItemInfo} pi_objItemInfo 待推入項目。
         * @memberof DropDownList
         */
        PushItem(pi_sTargetId: string, pi_objItemInfo:DropdownListItemInfo){
            $("*[id='" + pi_sTargetId + "']").append($("<option/>", {
                value: pi_objItemInfo.ItemValue,
                text: pi_objItemInfo.ItemView}));                         
        }
    }

    /**
     * 提供項目資料物件建立功能。
     * 
     * @export
     * @class DropdownListItemInfoFactory
     */
    export class DropdownListItemInfoFactory{

        /**
         * 建立下拉選單項目資料物件。
         * 
         * @param {string} pi_sView 
         * @param {string} pi_sValue 
         * @returns {DropdownListItemInfo} 
         * @memberof DropdownListItemInfoFactory
         */
        Product( pi_sView: string, pi_sValue: string): DropdownListItemInfo{
            var objReturn = new DropdownListItemInfo();

            objReturn.ItemValue = pi_sValue;
            objReturn.ItemView = pi_sView;

            return objReturn;
        }
    }

    /**
     * 定義下拉項目屬性。
     * 
     * @export
     * @class ItemInfo
     */
    export class DropdownListItemInfo{        

        //設定或取得 Value 值。
        public ItemValue: string;

        //設定或取得顯示文字。
        public ItemView: string;
    }   
}   