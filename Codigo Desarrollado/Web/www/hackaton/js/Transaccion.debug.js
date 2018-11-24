(function($) {

////////////////////////////////////////////////////////////////////////////////
// Ajax

window.Ajax = function Ajax() {
    /// <field name="onSuccess" type="System.Action`1">
    /// </field>
    /// <field name="onUpdateProgress" type="System.Action`1">
    /// </field>
    /// <field name="onError" type="System.Action`3">
    /// </field>
    /// <field name="contentType" type="String">
    /// </field>
    /// <field name="authorization" type="String">
    /// </field>
    /// <field name="tradicional" type="Boolean">
    /// </field>
    /// <field name="dataType" type="String">
    /// </field>
    /// <field name="data" type="Object">
    /// </field>
    /// <field name="unzipResponse" type="Boolean">
    /// </field>
}
Ajax.prototype = {
    onSuccess: null,
    onUpdateProgress: null,
    onError: null,
    contentType: null,
    authorization: null,
    tradicional: true,
    dataType: 'text',
    data: null,
    unzipResponse: false,
    
    request: function Ajax$request(verb, url, Data, OnSuccess) {
        /// <param name="verb" type="String">
        /// </param>
        /// <param name="url" type="String">
        /// </param>
        /// <param name="Data" type="Object">
        /// </param>
        /// <param name="OnSuccess" type="System.Action`1">
        /// </param>
        if (OnSuccess != null) {
            this.onSuccess = OnSuccess;
        }
        else {
            OnSuccess = this.onSuccess;
        }
        var options = {};
        options.type = verb;
        options.url = url;
        options.dataType = this.dataType;
        options.traditional = this.tradicional;
        if (this.contentType != null) {
            options.contentType = this.contentType;
        }
        if (this.data != null) {
            options.data = this.data;
        }
        options.crossDomain = true;
        if (Data != null) {
            options.data = Data;
        }
        options.beforeSend = ss.Delegate.create(this, function(request) {
            request.setRequestHeader('Accept', '*/*');
            if (this.authorization != null) {
                request.setRequestHeader('Authorization', this.authorization);
            }
        });
        options.success = ss.Delegate.create(this, function(data, textStatus, request) {
            if (OnSuccess != null) {
                if (this.unzipResponse) {
                    var comp = (data).substr(1, (data).length - 2);
                    comp = comp.replaceAll('\\', '');
                    OnSuccess(RawDeflate.inflate(atob(comp)));
                }
                else {
                    OnSuccess(data);
                }
            }
        });
        options.error = ss.Delegate.create(this, function(request, textStatus, error) {
            if (this.onError != null) {
                this.onError(request.status, request.statusText, request.responseText);
            }
        });
        $.ajax(options);
    }
}


////////////////////////////////////////////////////////////////////////////////
// AjaxEvent

window.AjaxEvent = function AjaxEvent() {
    /// <field name="lengthComputable" type="Boolean">
    /// </field>
    /// <field name="total" type="Number" integer="true">
    /// </field>
    /// <field name="loaded" type="Number" integer="true">
    /// </field>
}
AjaxEvent.prototype = {
    lengthComputable: false,
    total: 0,
    loaded: 0
}


////////////////////////////////////////////////////////////////////////////////
// Run



////////////////////////////////////////////////////////////////////////////////
// App

window.App = function App() {
    /// <field name="serverAPI" type="String" static="true">
    /// </field>
    /// <field name="requestCommodities" type="String" static="true">
    /// </field>
    /// <field name="requestTransacciones" type="String" static="true">
    /// </field>
    /// <field name="traderID" type="String" static="true">
    /// </field>
    /// <field name="destinationTraderID" type="String" static="true">
    /// </field>
}
App.main = function App$main() {
    App.initializeComponents();
}
App.initializeComponents = function App$initializeComponents() {
}
App.resize = function App$resize() {
}
App.listCommodities = function App$listCommodities() {
    var call = new Ajax();
    call.contentType = 'application/json';
    call.onSuccess = function(response) {
        var commodities = JSON.parse(response);
        var $enum1 = ss.IEnumerator.getEnumerator(commodities);
        while ($enum1.moveNext()) {
            var item = $enum1.current;
        }
    };
    call.onError = function(Status, StatusText, ResponseText) {
    };
    call.request('GET', App.requestCommodities);
}
App.performTransaction = function App$performTransaction(sellerId, buyerId, coAsset) {
    /// <param name="sellerId" type="String">
    /// </param>
    /// <param name="buyerId" type="String">
    /// </param>
    /// <param name="coAsset" type="String">
    /// </param>
    var payload = new Model.Trade();
    payload.$class = 'cl.hackaton.blockchain.Trade';
    payload.commodity = 'resource:cl.hackaton.blockchain.Commodity#' + coAsset;
    payload.newOwner = 'resource:cl.hackaton.blockchain.Trader#' + buyerId;
    var call = new Ajax();
    call.contentType = 'application/json';
    call.data = JSON.stringify(payload);
    call.onSuccess = function(response) {
        alert('listo');
    };
    call.onError = function(Status, StatusText, ResponseText) {
        alert('error');
    };
    call.request('POST', App.requestTransacciones);
}


Type.registerNamespace('Model');

////////////////////////////////////////////////////////////////////////////////
// Model.Commodity

Model.Commodity = function Model_Commodity() {
    /// <field name="$class" type="String">
    /// </field>
    /// <field name="codigo" type="String">
    /// </field>
    /// <field name="description" type="String">
    /// </field>
    /// <field name="owner" type="String">
    /// </field>
}
Model.Commodity.prototype = {
    $class: null,
    codigo: null,
    description: null,
    owner: null
}


////////////////////////////////////////////////////////////////////////////////
// Model.Trade

Model.Trade = function Model_Trade() {
    /// <field name="$class" type="String">
    /// </field>
    /// <field name="commodity" type="String">
    /// </field>
    /// <field name="newOwner" type="String">
    /// </field>
    /// <field name="timestamp" type="String">
    /// </field>
}
Model.Trade.prototype = {
    $class: null,
    commodity: null,
    newOwner: null,
    timestamp: null
}


////////////////////////////////////////////////////////////////////////////////
// Model.Trader

Model.Trader = function Model_Trader() {
    /// <field name="$class" type="String">
    /// </field>
    /// <field name="tradeId" type="String">
    /// </field>
    /// <field name="name" type="String">
    /// </field>
    /// <field name="assetsId" type="Array" elementType="String">
    /// </field>
}
Model.Trader.prototype = {
    $class: null,
    tradeId: null,
    name: null,
    assetsId: null
}


Ajax.registerClass('Ajax');
AjaxEvent.registerClass('AjaxEvent');
App.registerClass('App');
Model.Commodity.registerClass('Model.Commodity');
Model.Trade.registerClass('Model.Trade');
Model.Trader.registerClass('Model.Trader');
(function () {
    $(function() {
        App.main();
    });
})();
App.serverAPI = 'http://200.188.204.108:3002/api';
App.requestCommodities = App.serverAPI + '/cl.hackaton.blockchain.Commodity';
App.requestTransacciones = App.serverAPI + '/cl.hackaton.blockchain.Trade';
App.traderID = '5190';
App.destinationTraderID = '1324';
})(jQuery);
