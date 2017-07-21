# DynamicDropdownList

## 檔案結構

* _Code 程式碼
* _SamplePages: 使用範例
* _UnitTest: 單元測試

### _Code 程式碼

包含 .ts 及 .js 檔，編輯 .ts 檔後編譯出 .js 檔，編譯的環境設定是 tsconfig.json 檔案。

### _SamplePages 使用範例

包含 .html 及 .js 檔，利用瀏覽器直接開啟 .html 檔案即可。

### -UnitTest 單元測試

包含 .html 及 .js 檔，利用瀏覽器直接開啟 .html 檔案，透過觸發測試腳本，驗證程式反應是否正確。

## 使用方式

引入 TOHU.Tools.DynamicDropdownList.js / TOHU.Utility.js 兩個檔案及 jquery 函式。

新建 TOHU.Tools.DynamicDropdownList 類別，並傳入主要及從屬下拉選單的 id 值，然後呼叫 Initial 方法就完成了。

``` 多階主從選單時如何設定？
``` 如果有多階主從選單則可以透過 SetRelation 函式逐階設定即可。
