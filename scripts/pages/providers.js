/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const ProvidersDesign = require('ui/ui_providers');
const ListView = require('sf-core/ui/listview');
const Label = require('sf-core/ui/listview');
const Font = require('sf-core/ui/font');
const ListViewItem = require('sf-core/ui/listviewitem');
const FlexLayout = require('sf-core/ui/flexlayout');
const TextAlignment = require('sf-core/ui/textalignment');
const Color = require('sf-core/ui/color');
const TextView = require('sf-core/ui/textview');
const Router = require("sf-core/ui/router");
const addChild = require("@smartface/contx/lib/smartface/action/addChild");

const Providers = extend(ProvidersDesign)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();

    this.backButton.onTouchEnded = ()=> Router.goBack();
    this.locationButton.onTouchEnded = ()=> Router.go("tabs/provider_search/providers_map");
    
    var myDataSet = [
         {
            label1: 'Smart Pharmacy',
            label2: 'Pharmacy',
            label3: '0.7 miles',
        },
        {
            label1: 'John Smart M.D.',
            label2: 'Doctor',
            label3: '1.2 miles',
        },
         {
            label1: 'Smart Hospital',
            label2: 'Hospital',
            label3: '5.2 miles',
        },
    ];

    const listView1 = this.listView1;
    const itemCount = myDataSet.length;
    listView1.rowHeight = 70;
    listView1.itemCount = itemCount;

    var itemIndex = 0;

    listView1.onRowCreate = function() {
        const myListViewItem = new ListViewItem({
            id: 100,
        });

        const listItemContainer = new FlexLayout({
            id: 102,
            flexGrow:1,
            marginLeft: 20,
            marginRight: 20,
            paddingBottom: 10,
            paddingTop: 15,
            flexDirection: FlexLayout.FlexDirection.ROW,
        });
        
        const listItemLeft = new FlexLayout({
            id: 103,
            flexGrow: 1,
            flexDirection: FlexLayout.FlexDirection.COLUMN,
        });

        const listItemLeftLabel1 = new TextView({
            id: 104,
            flexGrow: 1,
            text: "TextView",
            textAlignment: TextAlignment.MIDLEFT
        });
        
        const listItemLeftLabel2 = new TextView({
            id: 105,
            flexGrow: 1,
            font: Font.create("Avenir", 15),
            textAlignment: TextAlignment.MIDLEFT
        });

         const listItemRight = new FlexLayout({
            id: 106,
            width: 100,
            flexDirection: FlexLayout.FlexDirection.COLUMN,
        });
        
         const listItemRightLabel = new TextView({
            id: 107,
            flexGrow: 1,
            borderRadius: 20,
            font: Font.create("Avenir", 15),
            textAlignment: TextAlignment.MIDCENTER,
            backgroundColor: Color.create("#D4B9F9")
        });
        
        const listDivider = new FlexLayout({
          left: 0,
          bottom: 0,
          right: 0,
          positionType: FlexLayout.PositionType.ABSOLUTE,
          height: 1,
          alpha: 0.29,
          backgroundColor: Color.create("#1D1D26")
      })
        
        listItemLeft.addChild(listItemLeftLabel1);
        listItemLeft.addChild(listItemLeftLabel2);
        listItemRight.addChild(listItemRightLabel);
        listItemContainer.addChild(listItemLeft);
        listItemContainer.addChild(listItemRight);
       

        if(itemIndex < itemCount-1)
        {
            listItemContainer.addChild(listDivider);
        }
        
        myListViewItem.addChild(listItemContainer);
        this.dispatch(addChild(`item${++itemIndex}`, myListViewItem));
        return myListViewItem;
    }.bind(this);

    listView1.onRowBind = function(listViewItem, index) {
        const listItemContainer = listViewItem.findChildById(102);
        
        const listItemLeft = listItemContainer.findChildById(103);
        const listItemLeftLabel1 = listItemLeft.findChildById(104);
        const listItemLeftLabel2 = listItemLeft.findChildById(105);
        
        const listItemRight = listItemContainer.findChildById(106);
        const listItemRightLabel = listItemRight.findChildById(107);

        listItemLeftLabel1.text = myDataSet[index].label1;
        listItemLeftLabel2.text = myDataSet[index].label2;
        listItemRightLabel.text = myDataSet[index].label3;
    };
    
    listView1.onRowSelected = function(listViewItem,index){
        Router.go('tabs/provider_search/provider');
    };

}

module && (module.exports = Providers);
