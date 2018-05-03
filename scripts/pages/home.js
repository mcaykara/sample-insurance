/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const HomeDesign = require('ui/ui_home');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const Font = require('sf-core/ui/font');
const TextAlignment = require('sf-core/ui/textalignment');
const AMCharts = require("sf-extension-amcharts");
const WebView = require('sf-core/ui/webview');
const ScrollView = require('sf-core/ui/scrollview');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const Common = require("../lib/common")

const Home = extend(HomeDesign)(
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
  this.statusBar.visible = false;
  Common.checkAppUpdate();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  var page = this;
  page.children = page.children || {};
  var containerFlex = new ScrollView({
      flexGrow:1,
      backgroundColor: Color.WHITE,
  });

  renderHeader(page, containerFlex);
  renderBody(page, containerFlex);
  
  page.layout.addChild(containerFlex);
}

var renderHeader = (page, containerFlex)=>{
  const chartFlex = page.children.chartFlex = new FlexLayout({
      width: NaN,
      height: NaN,
      positionType: FlexLayout.PositionType.RELATIVE,
      visible: true,
      backgroundColor: Color.TRANSPARENT,
      flexGrow: 1,
      alignItems: FlexLayout.AlignItems.CENTER,
      justifyContent: FlexLayout.JustifyContent.CENTER
  });
    
  chartFlex.children = chartFlex.children || {};
  
  const wvChart = chartFlex.children.wvChart = new WebView({
      left: 0,
      top: 0,
      right: 0,
      backgroundColor: Color.TRANSPARENT,
      bottom: 0,
      positionType: FlexLayout.PositionType.ABSOLUTE,
      visible: false
  });
    
  chartFlex.addChild(wvChart);
   
  var amCharts = new AMCharts({webView: wvChart});
      
  var headerFlex = new FlexLayout({
      height:287.5,
      backgroundColor: Color.createGradient({
        direction: Color.GradientDirection.DIAGONAL_RIGHT, 
        startColor: Color.create("#9F26EC"), 
        endColor: Color.create("#547BFF")
      })
  });

  headerFlex.addChild(new Label({
      height: 50,
      marginTop: 25,
      text: lang['homePage']['title'],
      font: Font.create("Avenir", 26, Font.BOLD),
      textAlignment: TextAlignment.MIDCENTER,
      textColor: Color.WHITE
  }));
  
  headerFlex.addChild(chartFlex);
  
  containerFlex.layout.addChild(headerFlex);
  
  amCharts.ready().then(() => {
      amCharts.loadScritsByName("pie").then((status) => {
          amCharts.evaluateJS(chartScript, function() {
             wvChart.visible = true;
          });
      }).catch(e => {
          console.error(e);
      });
  });
}

var renderBody = (page, containerFlex)=>{
    containerFlex.layout.addChild(listItemType1(lang['homePage']['coverageUsage'], "73% Medical - Dental"));
    containerFlex.layout.addChild(listDivider());
    containerFlex.layout.addChild(listItemType2(lang['homePage']['policyID'], "124293752047467034"));
    containerFlex.layout.addChild(listDivider());
    containerFlex.layout.addChild(listItemType2(lang['homePage']['planID'], "1242"));
    containerFlex.layout.addChild(listDivider());
    containerFlex.layout.addChild(listItemType2(lang['homePage']['currentPremium'], "$150"));
    
    containerFlex.layout.addChild(new FlexLayout({
        height:35,
        backgroundColor: Color.create('#F8F8F8')
    }));
    
   containerFlex.layout.addChild(listView1());
};

var listView1 = ()=>{
   var myDataSet = [
        {
            title: 'SMART PHARMACY',
            val: 'May 09, 2018',
            status: lang['homePage']['inProcess'],
            color: '#F5A623'
        },
        {
            title: 'JOHN SMART, MD',
            val: 'April 14, 2018',
            status: lang['homePage']['completed'],
            color: '#1E7C28'
        },
    ];
    
    var myListView = new ListView({
        rowHeight: 80,
        itemCount: myDataSet.length,
    });
    
    myListView.onRowCreate = function(){
      var myListViewItem = new ListViewItem({
        padding:10,
        positionType: FlexLayout.PositionType.RELATIVE,
        flexDirection: FlexLayout.FlexDirection.ROW,
        justifyContent: FlexLayout.JustifyContent.SPACE_BETWEEN
      });
      
      myListViewItem.addChild(new Label({
          id: 1,
          height:40,
          flexGrow:1.5,
          textAlignment: TextAlignment.MIDLEFT,
          font: Font.create("Avenir", 16),
      }));
      
      myListViewItem.addChild(new Label({
          id: 2,
          height:40,
          flexGrow:1,
          textAlignment: TextAlignment.MIDRIGHT,
          font: Font.create("Avenir", 16),
      }));
      
      myListViewItem.addChild(new Label({
          id: 3,
          height:38,
          textAlignment: TextAlignment.MIDRIGHT,
          font: Font.create("Avenir", 14),
          bottom: 0,
          right: 10,
          left: 0,
          positionType: FlexLayout.PositionType.ABSOLUTE,
      }));
      
      myListViewItem.addChild(new FlexLayout({
          left: 0,
          bottom: 0,
          right: 0,
          positionType: FlexLayout.PositionType.ABSOLUTE,
          height: 1,
          marginLeft:10,
          marginRight:10,
          alpha: 0.29,
          backgroundColor: Color.create("#1D1D26")
      }));
      
       return myListViewItem;
    };
    
    myListView.onRowBind = function(listViewItem, index){
        var myLabelTitle = listViewItem.findChildById(1);
        myLabelTitle.text = myDataSet[index].title;
        var myLabelValue = listViewItem.findChildById(2);
        myLabelValue.text = myDataSet[index].val;
        var myLabelStatus = listViewItem.findChildById(3);
        myLabelStatus.text = myDataSet[index].status;
        myLabelStatus.textColor = Color.create(myDataSet[index].color);
    };
    
    return myListView;
      
}

var listItemType1 = (title, val) => {
    const containerFlex = new FlexLayout({
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: FlexLayout.FlexDirection.ROW
    });
  
   const titleLabel = new Label({
        height: 50,
        flexGrow:1,
        text: title,
        font: Font.create("Avenir", 16, Font.MEDIUM),
        textAlignment: TextAlignment.MIDLEFT
    });
    
    const valLabel = new Label({
        height: 50,
        text: val,
        flexGrow:1.2,
        font: Font.create("Avenir", 14),
        textAlignment: TextAlignment.MIDRIGHT
    });
    containerFlex.addChild(titleLabel);
    containerFlex.addChild(valLabel); 
    return containerFlex;
}

var listItemType2 = (title, subtitle) => {
    const containerFlex = new FlexLayout({
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: FlexLayout.FlexDirection.COLUMN
    });
  
   const titleLabel = new Label({
        height: 30,
        flexGrow:1,
        text: title,
        font: Font.create("Avenir", 16, Font.MEDIUM),
        textAlignment: TextAlignment.MIDLEFT
    });
    
    const subtitleLabel = new Label({
        height: 30,
        text: subtitle,
        flexGrow:1.2,
        font: Font.create("Avenir", 13),
        textAlignment: TextAlignment.MIDLEFT
    });
    containerFlex.addChild(titleLabel);
    containerFlex.addChild(subtitleLabel); 
    return containerFlex;
}

var listDivider = ()=>{
  return new FlexLayout({
        height: 1,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        alpha: 0.29,
        marginBottom:10,
        backgroundColor: Color.create("#1D1D26")
    });
}

var chartScript = `
  AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "dataProvider": [ 
     {
      "title": "${lang['homePage']['outOfPocket']}",
      "value":800,
      "color": "#05B3FC"
    },
    
    {
      "title": "${lang['homePage']['deductible']}",
      "value": 300,
      "color": "#F39796"
    },
    {
      "title": "${lang['homePage']['remaining']}",
      "value": 180,
      "color": "#DB3BD3"
    }
   
    ],
    "color": "white",
    "titleField": "title",
    "valueField": "value",
    "labelRadius": 5,
    "radius": "30%",
    "innerRadius": "70%",
    "labelText": "[[title]]",
    "allLabels": [{
      "y": "42%",
      "align": "center",
      "size": 25,
      "text": "27%",
      "color": "#fff"
    }],
    "export": {
      "enabled": true
    }
  } );
`;

module && (module.exports = Home);