/// <reference path="TOHU.Utility.ts" />

/**
 * 提供 TOHU 開發的工具。
 */
namespace TOHU.Tools{

    /**
     * 提供動態下拉選單 ( Dynamic Dropdown List ) 物件操作功能。
     * 
     * @export 
     * @class DynamicDropdownList
     */
    export class DynamicDropdownList{           
        
        /**
         * 主要下拉選單 id 值。
         * 
         * @type {string}
         * @memberof DynamicDropdownList
         */
        MainListId: string ;

        /**
         * 從屬下拉選單 id 值。
         * 
         * @type {string}
         * @memberof DynamicDropdownList
         */
        DetailListId: string;

        /**
         * 母項物件。
         * 
         * @type {DynamicDropdownList}
         * @memberof DynamicDropdownList
         */
        Parent: DynamicDropdownList; 
        
        /**
         * 建構元。
         * @param {string} pi_sMainListId 主要下拉選單 id 值。
         * @param {string} pi_sDetailListId 從屬下拉選單 id 值。
         * @memberof DynamicDropdownList
         */
        constructor(pi_sMainListId: string, pi_sDetailListId: string){
            this.MainListId = pi_sMainListId;
            this.DetailListId = pi_sDetailListId;
        }

        /**
         * 設定動態下拉選單主從關係。
         * 
         * @param {string} pi_sMainListId 主要下拉選單 id 值。
         * @param {string} pi_sDetailListId 從屬下拉選單 id 值。
         * @returns {DynamicDropdownList} 擲回 DynamicDropdownList 實體，提供連續操作。
         * @memberof DynamicDropdownList
         */
        public SetRelation(pi_sMainListId: string, pi_sDetailListId: string):DynamicDropdownList{             
            var objReturn: DynamicDropdownList;
            
            objReturn = new DynamicDropdownList(pi_sMainListId, pi_sDetailListId);           
            objReturn.Parent = this;                        

            return objReturn;
        }

        /**
         * 初始動態下拉選單項目。
         * 
         * @memberof DynamicDropdownList
         */
        public Initial(){            
            var objItemMappings: ItemMapping[] = this.Parse(this.DetailListId);                        
              
            $("*[id='" + this.MainListId + "']").change(
                this.ChangHandler(this.MainListId, this.DetailListId, objItemMappings)).trigger('change');        
            if(this.Parent != null){
                this.Parent.Initial();
            }
        } 
        
        /**
         * 解析下拉選單，取回項目清單。
         * 
         * @param pi_sTargetId 取回項目清單的目標下拉選單。
         */
        Parse(pi_sTargetId: string):ItemMapping[]{            
            var objReturn: ItemMapping[];   
            var objItemInfos: TOHU.Utility.DropdownListItemInfo[];
            
            objReturn = new Array();  
            objItemInfos = new TOHU.Utility.DropDownList().GetAllItem(pi_sTargetId);            
            objItemInfos.forEach(function(pi_objItemInfo: TOHU.Utility.DropdownListItemInfo, pi_nIndex:number){
                var objItemInfo = new TOHU.Utility.DropdownListItemInfo();
                var objItemMapping = new ItemMapping();
                var sValues = pi_objItemInfo.ItemValue.split("|");
                
                objItemMapping.ItemKey = sValues[0];
                objItemInfo.ItemValue = sValues[1];
                objItemInfo.ItemView = sValues[2];
                objItemMapping.ItemInfo = objItemInfo;
                objReturn.push(objItemMapping);
            })

            return objReturn;                           
        }  

        /**
         * 處理下拉選單項目改變。
         * 
         * @param {string} pi_sMainId 主要下拉選單 id 值。
         * @param {string} pi_sDetailId 從屬下拉選單 id 值。
         * @param {ItemMapping[]} pi_objItemMpping 主從對應的資料集合。
         * @returns 改變選項時的對應處理函式。
         * @memberof DynamicDropdownList
         */
        ChangHandler(pi_sMainId:string, pi_sDetailId:string, pi_objItemMpping:ItemMapping[]){
            var sMainId: string;
            var sDetailId: string;
            var objItemMappings: ItemMapping[];
            
            sMainId = pi_sMainId;
            sDetailId = pi_sDetailId;
            objItemMappings = pi_objItemMpping;        

            /**
             * 處理下拉選單項目改變事件。 
             */
            function onChange(){            
                var objDropdownList = new TOHU.Utility.DropDownList();
                var objConverter = new TOHU.Utility.Converter();

                objDropdownList.RemoveAllItem(sDetailId);
                objItemMappings.forEach(function( pi_objMapper:ItemMapping, pi_nIndex:number){
                    var sSelectedValue = objConverter.ValToString($("*[id='" + sMainId + "']").find(':selected').val());

                    if(pi_objMapper.ItemKey === sSelectedValue){
                        objDropdownList.PushItem(sDetailId, pi_objMapper.ItemInfo);
                    }
                })              
                //觸發從屬下拉選單改變事件。
                $("*[id='" + sDetailId + "']").trigger("change");                
            }
            return onChange;
        }
    }    

    /**
     * 定義動態下拉選單的對應記錄。
     * 
     * @class ItemMapping
     */
    class ItemMapping{  

        /**
         * 對應主要主要選單項目鍵值。
         * 
         * @type {string}
         * @memberof ItemMapping
         */
        ItemKey:string;

        /**
         * 從屬選單項目集合。
         * 
         * @type {Utility.DropdownListItemInfo}
         * @memberof ItemMapping
         */
        ItemInfo:Utility.DropdownListItemInfo;       
    }       
}
