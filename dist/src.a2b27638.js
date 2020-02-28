// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/functions.js":[function(require,module,exports) {
// Area function
var area = function area(length, breadth) {
  var a = length * breadth;
  console.log("Area of the rectangle is " + a + " square unit");
};

var spacer = function spacer(height) {
  return {
    svg: '<svg width="10" height="' + height + '"><rect style="fill:transparent" /></svg>'
  };
};

var coloredRect = function coloredRect(height, color) {
  return {
    layout: "noBorders",
    table: {
      widths: ["*"],
      heights: [height],
      body: [[{
        text: "",
        fillColor: color
      }]]
    }
  };
};

var labelText = function labelText() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "TEXT";
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
  var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "font22";
  var alignment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "left";
  return {
    text: text,
    style: [color, fontSize, alignment]
  };
};

var textWithRule = function textWithRule() {
  return {
    table: {
      widths: ["auto"],
      // widths: [ '*', 'auto', 100, '*' ],
      body: [[labelText("labelInvoice", "red", "font48", "right")], [""]]
    },
    layout: {
      hLineWidth: function hLineWidth(i, node) {
        return i === 0 || i === node.table.body.length ? 0 : 1;
      },
      vLineWidth: function vLineWidth(i, node) {
        return 0;
      }
    }
  };
};

var lightenDarkenColor = function lightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;
  var b = (num >> 8 & 0x00ff) + amt;
  var g = (num & 0x0000ff) + amt;
  if (r > 255) r = 255;else if (r < 0) r = 0;
  if (b > 255) b = 255;else if (b < 0) b = 0;
  if (g > 255) g = 255;else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
};

var layout1 = function layout1(val) {
  return {
    pageSize: {
      width: val.paperSize.width,
      height: val.paperSize.height
    },
    pageMargins: [0, 0, 0, 40],
    content: [{
      svg: '<svg width="' + val.paperSize.width + '" height="10"><rect width="100%" height="10" style="fill:' + val.colorPrimary + '" /></svg>'
    }, "This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns", {
      style: "section",
      table: {
        widths: ["15%", "*", "35%"],
        body: [[{
          text: "first column",
          fillColor: "#555555",
          color: "#00FFFF"
        }, {
          text: "second column",
          color: "#555555",
          fillColor: "#dedede"
        }, {
          text: "third column",
          fillColor: "#555555"
        }]]
      },
      layout: "noBorders"
    }],
    styles: {
      section: {
        fontSize: 9,
        color: "#FFFFFF",
        fillColor: "#2361AE",
        margin: [0, 15, 0, 5]
      }
    },
    defaultStyle: {
      alignment: "center"
    }
  };
};

var layout2 = function layout2(val) {
  return {
    pageSize: {
      width: val.paperSize.width,
      height: val.paperSize.height
    },
    pageMargins: [0, 0, 0, 40],
    content: [{
      columns: [{
        text: "labelBillingFrom",
        style: ["font14", "bold", "left", "marginL0T20R0B5"]
      }, {
        svg: '<svg width="100" height="40"><rect width="100%" height="100%" style="fill:green" /></svg>'
      }, coloredRect(40, val.colorPrimary), {
        text: "labelBillingTo",
        style: ["font14", "bold", "left", "marginL0T20R0B5"]
      }]
    }]
  };
};

module.exports = {
  spacer: spacer,
  coloredRect: coloredRect,
  lightenDarkenColor: lightenDarkenColor,
  labelText: labelText,
  textWithRule: textWithRule,
  layout1: layout1,
  layout2: layout2
};
},{}],"src/index.js":[function(require,module,exports) {
// Based on  https://codepen.io/diguifi/pen/YdBbyz
// Also on https://codesandbox.io/s/oj81y
// var canvasElement = document.getElementById("canvas");
var lib = require("./functions"); // Controls
// Radio button - Paper Size
// Checkbox -
// Drop Down - Language
// Autocomplete - Country, Currency
// Color Picker - Colors
// File Upload - Upload Logo


var length = 10;
var breadth = 5;
var a4Paper = {
  width: 595.28,
  height: 841.89
};
var letterPaper = {
  width: 612,
  height: 792
};
var paperSize = a4Paper; // Colors

var colorPrimary = "#ff3e00";
var colorSecondary = "#676778";
var colorError = "#b71c1c";
var colorBackground = "#ffffff";
var colorLightPrimary = lib.lightenDarkenColor(colorPrimary, 60);
var colorDarkPrimary = lib.lightenDarkenColor(colorPrimary, -60);
var variables = {
  paperSize: paperSize,
  colorPrimary: colorPrimary,
  colorLightPrimary: colorLightPrimary,
  colorDarkPrimary: colorDarkPrimary
}; // Invoice Header - Invoice
// Company Logo
// Invoice Details
// - Invoice Number
// - Order Date
// - Terms
// - Due Date
// - P.O Num
// - Project Name
// - Payment (Visa 8118)
// - Shipping (Express Shipping)
// Bill To Details
// - Bill To Name
// - Bill To Address
// - Bill To Phone
// Ship To Details
// - Ship To Name
// - Ship To Address
// - Ship To Phone
// Item Table
// - Item Header
// - Item Details
// - Item Image
// - Item Description
// - Qty
// - Price
// - Total
// - Item Footer
// - Subtotal
// - Discount (-)
// - Refund (-)
// - Paid (-)
// - Shipping (+)
// - Total excluding tax
// - Tax 1 (+)
// - Tax 2 (+)
// - Total
// Notes
// Info to Customer
// Company Details
// - Company Name
// - Company Address
// - Company Phone
// - Company Email
// Dropdown

var dateFormat = "MMMM Do YYYY"; // February 19th 2020

dateFormat = "MMM Do YYYY"; // Feb 19th 2020

dateFormat = "DD-MM-YYYY"; // 19-02-2020

dateFormat = "DD-MM-YY"; // 19-02-20

dateFormat = "D-M-YY"; // 19-2-20

dateFormat = "D-M-YYYY"; // 19-2-2020

dateFormat = "DD.MM.YY"; // 19.02.20

dateFormat = "D.M.YY"; // 19.2.20

dateFormat = "YYYY-MM-DD"; // 2020-02-19

dateFormat = "DD MMMM YYYY"; // 19 February 2020

dateFormat = "DD MMM YYYY"; // 19 Feb 2020

dateFormat = "M/D/YYYY"; // 2/19/2020

dateFormat = "M/D/YY"; // 2/19/20

dateFormat = "MM/DD/YYYY"; // 02/19/2020
// dateFormat="MM/DD/YY" // 02/19/20
// dateFormat="MMMM DD, YYYY" // February 19, 2020
// dateFormat="MMM DD, YYYY" // Feb 19, 2020
// dateFormat="DD-MMM-YY" // 19-Feb-20
// dateFormat="YYYY/MM/DD" // 2020/02/19
// dateFormat="YYYY/M/D" // 2020/2/19
// dateFormat="DD/MM/YYYY" // 19/02/2020
// dateFormat="D/M/YYYY" // 19/2/2020
// dateFormat="YYYY, MMMM DD" // 2020, February 19
// dateFormat="YYYY, MMM DD" // 2020, Feb 19

var currency1;
var currency2;
var currencyPrecision;
moment.locale("tr"); // console.log(moment(1316116057189).fromNow()); // il y a une heure
// moment.locale('en');
// console.log(moment(1316116057189).fromNow()); // an hour ago

var headerLeft = moment().format(dateFormat);
var headerCenter = "NEW HEADER CENTER";
var headerRight = "NEW HEADER RIGHT";
var footerLeft = "NEW FOOTER LEFT\nNEW FOOTER LEFT";
var footerCenter = "NEW FOOTER CENTER";
var footerRight = "NEW FOOTER RIGHT";
var labelInvoice = "INVOICE";
var labelInvoiceNum = "Invoice #";
var labelInvoiceDate = "Invoice Date";
var labelDueDate = "Due Date";
var invoiceNum = "000021";
var invoiceDate = moment("20111031").format("MMM Do YY");
var dueDate = "Jan 06, 2020";
var labelBillingFrom = "Billing From";
var sellerName = "Your Name";
var sellerCompany = "Your Company";
var labelSellerAddress = "Address";
var sellerAddressLine1 = "9999 Street Name";
var sellerAddressLine2 = "Some Area";
var sellerAddressLine3 = "Some Place";
var sellerAddressCity = "New York City";
var sellerAddressState = "NY 00010";
var sellerAddressCountry = "USA";
var labelBillingTo = "Billing To";
var clientName = "Client Name";
var clientCompany = "Client Company";
var labelClientAddress = "Address";
var clientAddressLine1 = "1111 Street Name";
var clientAddressLine2 = "Some Area";
var clientAddressLine3 = "Some Place";
var clientAddressCity = "New York City";
var clientAddressState = "NY 00011";
var clientAddressCountry = "USA";
var dd = {
  pageSize: {
    width: paperSize.width,
    height: paperSize.height
  },
  pageMargins: [0, 0, 0, 40],
  background: function background() {
    return {
      canvas: [{
        type: "rect",
        x: 0,
        y: 0,
        w: paperSize.width,
        h: paperSize.height,
        color: "#00BFFF"
      }]
    };
  },
  // header: {
  // columns: [
  // { text: headerLeft, style: ["margin5", "left", "font10"] },
  // { text: headerCenter, style: ["margin5", "center", "font10"] },
  // { text: headerRight, style: ["margin5", "right", "font10"] }
  // ]
  // },
  footer: {
    columns: [{
      text: footerLeft,
      style: ["margin5", "left", "font10"]
    }, {
      text: footerCenter,
      style: ["margin5", "center", "font10"]
    }, {
      text: footerRight,
      style: ["margin5", "right", "font10"]
    }]
  },
  content: [{
    svg: '<svg width="' + paperSize.width + '" height="10"><rect width="100%" height="10" style="fill:green" /></svg>'
  }, {
    columns: [{
      width: "*",
      text: ""
    }, lib.textWithRule()]
  }, lib.textWithRule(), lib.labelText(labelInvoice, colorSecondary, "font48", "right"), lib.coloredRect(0, colorPrimary), {
    table: {
      widths: ["*", "*", "*", "*", "*", "*"],
      body: [[{
        text: "",
        fillColor: colorDarkPrimary
      }, {
        text: "",
        fillColor: colorLightPrimary
      }, {
        text: "",
        fillColor: colorDarkPrimary
      }, {
        text: "",
        fillColor: colorLightPrimary
      }, {
        text: "",
        fillColor: colorDarkPrimary
      }, {
        text: "",
        fillColor: colorLightPrimary
      }]]
    },
    layout: "noBorders"
  }, lib.spacer(40), {
    svg: '<svg width="' + paperSize.width + '" height="10"><rect width="' + paperSize.width + '" height="10" style="fill:rgb(0,0,255)" /></svg>'
  }, {
    table: {
      widths: ["15%", "*", "35%"],
      body: [[{
        text: "first column",
        fillColor: "#555555",
        color: "#00FFFF"
      }, {
        text: "second column",
        color: "#555555",
        fillColor: "#dedede"
      }, {
        text: "third column",
        fillColor: "#555555"
      }]]
    },
    layout: "noBorders"
  }, // Header
  {
    // If no width/height/fit is used, then dimensions from the svg element is used.
    svg: '<svg height="30" width="200"><text x="0" y="15" fill="red">I love SVG!</text></svg>'
  }, // {
  //   image: 'sampleOSI_Standard_Logo_600X780.png',
  // },
  {
    svg: '<svg width="' + paperSize.width + '" height="110"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:' + colorDarkPrimary + ';stop-opacity:1" /><stop offset="50%" style="stop-color:' + colorPrimary + ';stop-opacity:1" /><stop offset="100%" style="stop-color:' + colorLightPrimary + ';stop-opacity:1" /></linearGradient></defs><rect width="' + paperSize.width + '" height="100" fill="url(#grad1)" /></svg>'
  }, {
    svg: '<svg width="' + paperSize.width + '" height="10"><defs><pattern id="pattern_gWSAk" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)"><line x1="0" y="0" x2="0" y2="24" stroke="#16874E" stroke-width="24" /></pattern></defs><rect width="100%" height="100%" fill="url(#pattern_gWSAk)"/></svg>'
  }, {
    columns: [{
      image: "data:image/png;base64,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",
      width: 150
    }, [{
      text: labelInvoice,
      style: ["font22", "right", "bold", "marginL0T0R0B15"],
      width: "*"
    }, {
      stack: [{
        columns: [{
          text: labelInvoiceNum,
          style: ["font12", "right"],
          width: "*"
        }, {
          text: invoiceNum,
          style: ["font12", "right"],
          width: 100
        }]
      }, {
        columns: [{
          text: labelInvoiceDate,
          style: ["font12", "right"],
          width: "*"
        }, {
          text: invoiceDate,
          style: ["font12", "right"],
          width: 100
        }]
      }, {
        columns: [{
          text: labelDueDate,
          style: ["font12", "right"],
          width: "*"
        }, {
          text: dueDate,
          style: ["font12", "right"],
          width: 100
        }]
      }]
    }]]
  }, // Billing Headers
  {
    columns: [{
      text: labelBillingFrom,
      style: ["font14", "bold", "left", "marginL0T20R0B5"]
    }, {
      svg: '<svg width="100" height="40"><rect width="100%" height="100%" style="fill:green" /></svg>'
    }, lib.coloredRect(40, colorPrimary), {
      text: labelBillingTo,
      style: ["font14", "bold", "left", "marginL0T20R0B5"]
    }]
  }, // Billing Details
  {
    columns: [{
      text: sellerName + "\n" + sellerCompany,
      style: ["left"]
    }, {
      text: clientName + "\n" + clientCompany,
      style: ["left"]
    }]
  }, // Billing Address Title
  {
    columns: [{
      text: labelSellerAddress,
      style: ["bold", "marginL0T7R0B3"]
    }, {
      text: labelClientAddress,
      style: ["bold", "marginL0T7R0B3"]
    }]
  }, // Billing Address
  {
    columns: [{
      text: sellerAddressLine1 + "\n" + sellerAddressLine2 + "\n" + sellerAddressLine3 + "\n" + sellerAddressCity + " " + sellerAddressState + "\n" + sellerAddressCountry,
      style: "invoiceBillingAddress"
    }, {
      text: clientAddressLine1 + "\n" + clientAddressLine2 + "\n" + clientAddressLine3 + "\n" + clientAddressCity + " " + clientAddressState + "\n" + clientAddressCountry,
      style: "invoiceBillingAddress"
    }]
  }, // Line breaks
  "\n\n", // Items
  {
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: ["*", 40, "auto", 40, "auto", 80],
      body: [// Table Header
      [{
        text: "Product",
        style: ["marginH0V5", "bold"]
      }, {
        text: "Qty",
        style: ["marginH0V5", "bold", "center"]
      }, {
        text: "Price",
        style: ["marginH0V5", "bold", "center"]
      }, {
        text: "Tax",
        style: ["marginH0V5", "bold", "center"]
      }, {
        text: "Discount",
        style: ["marginH0V5", "bold", "center"]
      }, {
        text: "Total",
        style: ["marginH0V5", "bold", "center"]
      }], // Items
      // Item 1
      [[{
        text: "Item 1",
        style: ["bold"]
      }, {
        text: "Item Description",
        style: ["italics", "font11"]
      }], {
        text: "1",
        style: ["marginH0V5", "center"]
      }, {
        text: "$999.99",
        style: ["marginH0V5", "center"]
      }, {
        text: "0%",
        style: ["marginH0V5", "center"]
      }, {
        text: "0%",
        style: ["marginH0V5", "center"]
      }, {
        text: "$999.99",
        style: ["marginH0V5", "bold", "center"]
      }], // Item 2
      [[{
        text: "Item 2",
        style: ["bold"]
      }, {
        text: "Item Description",
        style: ["italics", "font11"]
      }], {
        text: "1",
        style: ["marginH0V5", "center"]
      }, {
        text: "$999.99",
        style: ["marginH0V5", "center"]
      }, {
        text: "0%",
        style: ["marginH0V5", "center"]
      }, {
        text: "0%",
        style: ["marginH0V5", "center"]
      }, {
        text: "$999.99",
        style: ["marginH0V5", "bold", "center"]
      }] // END Items
      ]
    } // table
    //  layout: 'lightHorizontalLines'

  }, // TOTAL
  {
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 0,
      widths: ["*", 80],
      body: [// Total
      [{
        text: "Subtotal",
        style: ["marginH0V5", "bold", "right"]
      }, {
        text: "$2000.00",
        style: ["marginH0V5", "bold", "center"]
      }], [{
        text: "Tax 21%",
        style: ["marginH0V5", "bold", "right"]
      }, {
        text: "$523.13",
        style: ["marginH0V5", "bold", "center"]
      }], [{
        text: "TOTAL",
        style: ["marginH0V5", "bold", "right"]
      }, {
        text: "$2523.93",
        style: ["marginH0V5", "bold", "center"]
      }]]
    },
    // table
    layout: "lightHorizontalLines"
  }, // Signature
  {
    columns: [{
      text: ""
    }, {
      stack: [lib.spacer(70), {
        text: "_________________________________"
      }, {
        text: "Your Name",
        style: ["bold", "center"]
      }, {
        text: "Your job title",
        style: ["italics", "font10", "center"]
      }],
      width: 180
    }]
  }, lib.spacer(50), {
    text: "NOTES",
    style: ["font10", "bold"]
  }, {
    text: "Some notes goes here \n Notes second line",
    style: ["font10"]
  }],
  styles: {
    margin5: {
      margin: [5, 5, 5, 5]
    },
    marginL0T0R0B15: {
      margin: [0, 0, 0, 15]
    },
    marginL0T20R0B5: {
      margin: [0, 20, 0, 5]
    },
    marginL0T7R0B3: {
      margin: [0, 7, 0, 3]
    },
    marginH0V5: {
      margin: [0, 5, 0, 5]
    },
    font10: {
      fontSize: 10
    },
    font11: {
      fontSize: 11
    },
    font12: {
      fontSize: 12
    },
    font14: {
      fontSize: 14
    },
    font22: {
      fontSize: 22
    },
    font48: {
      fontSize: 48
    },
    right: {
      alignment: "right"
    },
    left: {
      alignment: "left"
    },
    center: {
      alignment: "center"
    },
    bold: {
      bold: true
    },
    italics: {
      italics: true
    }
  },
  defaultStyle: {
    columnGap: 20
  }
}; // var docDefinition = {
// content: [
// {
// alignment: "center",
// text: "PPRA",
// style: "header",
// fontSize: 23,
// bold: true,
// margin: [0, 10]
// },
// {
// margin: [0, 0, 0, 10],
// layout: {
// fillColor: function(rowIndex, node, columnIndex) {
// return rowIndex % 2 === 0 ? "#ebebeb" : "#f5f5f5";
// }
// },
// table: {
// widths: ["100%"],
// heights: [20, 10],
// body: [
// [
// {
// text: "SETOR: ADMINISTRATIVO",
// fontSize: 9,
// bold: true
// }
// ],
// [
// {
// text: "FUNÇÃO: DIRETOR DE ENSINO",
// fontSize: 9,
// bold: true
// }
// ]
// ]
// }
// },
// {
// style: "tableExample",
// layout: {
// fillColor: function(rowIndex, node, columnIndex) {
// return rowIndex === 0 ? "#c2dec2" : null;
// }
// },
// table: {
// widths: ["30%", "10%", "25%", "35%"],
// heights: [10, 10, 10, 10, 30, 10, 25],
// headerRows: 1,
// body: [
// [
// {
// text: "AGENTE: Não Identificados",
// colSpan: 3,
// bold: true,
// fontSize: 9
// },
// {},
// {},
// {
// text: "GRUPO: Grupo 1 - Riscos Físicos",
// fontSize: 9,
// bold: true
// }
// ],
// [
// {
// text: "Limite de Tolerância:",
// fontSize: 9,
// bold: true
// },
// {
// text: "Meio de Propagação:",
// colSpan: 3,
// fontSize: 9,
// bold: true
// },
// {},
// {}
// ],
// [
// {
// text: [
// "Frequência: ",
// {
// text: "Habitual",
// bold: false
// }
// ],
// fontSize: 9,
// bold: true
// },
// {
// text: [
// "Classificação do Efeito: ",
// {
// text: "Leve",
// bold: false
// }
// ],
// colSpan: 3,
// fontSize: 9,
// bold: true
// },
// {},
// {}
// ],
// [
// {
// text: "Tempo de Exposição:",
// colSpan: 2,
// fontSize: 9,
// bold: true
// },
// {},
// {
// text: "Medição:",
// colSpan: 2,
// fontSize: 9,
// bold: true
// },
// {}
// ],
// [
// {
// text: "Fonte Geradora:",
// border: [true, true, false, false],
// colSpan: 2,
// fontSize: 9,
// bold: true
// },
// {},
// {
// text: "Téc. Utilizada:",
// border: [false, true, true, false],
// colSpan: 2,
// fontSize: 9,
// bold: true
// },
// {}
// ],
// [
// {
// text: "Conclusão:",
// border: [true, false, true, true],
// colSpan: 4,
// fontSize: 9,
// bold: true
// },
// {},
// {},
// {}
// ],
// [
// {
// text: "EPIs/EPCs:",
// border: [true, true, false, true],
// colSpan: 3,
// fontSize: 9,
// bold: true
// },
// {},
// {},
// {
// text: "CAs:",
// border: [false, true, true, true],
// fontSize: 9,
// bold: true
// }
// ]
// ]
// }
// }
// ]
// };

var dd2 = {
  content: ["This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns", {
    style: "section",
    table: {
      widths: ["15%", "*", "35%"],
      body: [[{
        text: "first column",
        fillColor: "#555555",
        color: "#00FFFF"
      }, {
        text: "second column",
        color: "#555555",
        fillColor: "#dedede"
      }, {
        text: "third column",
        fillColor: "#555555"
      }]]
    },
    layout: "noBorders"
  }],
  styles: {
    section: {
      fontSize: 9,
      color: "#FFFFFF",
      fillColor: "#2361AE",
      margin: [0, 15, 0, 5]
    }
  },
  defaultStyle: {
    alignment: "center"
  }
};
var docDefinition2 = {
  content: ["This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns", {
    columns: [{
      // auto-sized columns have their widths based on their content
      width: "auto",
      text: "First column",
      background: "#ff00ff"
    }, {
      // star-sized columns fill the remaining space
      // if there's more than one star-column, available width is divided equally
      width: "*",
      text: "Second column",
      background: "#ff0000",
      fill: "#f000ff"
    }, {
      // fixed width
      width: 100,
      text: "Third column",
      background: "#0000ff"
    }, {
      // % width
      width: "20%",
      text: "Fourth column",
      background: "#ffff00"
    }],
    // optional space between columns
    columnGap: 10
  }, "This paragraph goes below all columns and has full width"]
};
var dd3 = {
  pageSize: {
    width: 595.28,
    height: 841.89
  },
  background: function background() {
    return {
      canvas: [{
        type: "rect",
        x: 0,
        y: 0,
        w: 595.28,
        h: 841.89,
        color: "#00BFFF"
      }]
    };
  },
  content: [{
    text: "Simple text 1",
    pageBreak: "after"
  }, {
    text: "Simple text 2",
    pageBreak: "after"
  }, {
    text: "Simple text 3",
    pageBreak: "after"
  }]
};
var docDef = lib.layout2(variables); // let docDef = docDefinition;

function id(text) {
  return document.getElementById(text);
}

if (id("downloadButton")) id("downloadButton").addEventListener("click", download, false);
if (id("layout1")) id("layout1").addEventListener("click", renderlayout1, false);
if (id("layout2")) id("layout2").addEventListener("click", renderlayout2, false);

function renderlayout1() {
  console.log("renderlayout1");
  render(lib.layout1(variables));
}

function renderlayout2() {
  console.log("renderlayout2");
  render(lib.layout2(variables));
}

function render(def) {
  console.log("render");
  pdfMake.createPdf(def).getDataUrl(function (dataURL) {
    renderPDF(dataURL);
  });
}

function download() {
  console.log("download");
  var pdf = createPdf(docDef);
  pdf.download("PPRA.pdf");
}

render(docDef);

function renderPDF(url, options) {
  options = options || {
    scale: 0.95
  };

  function renderPage(page) {
    var viewport = page.getViewport(options.scale);
    var wrapper = document.createElement("div");
    wrapper.className = "canvas-wrapper";
    console.log("canvas");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    wrapper.appendChild(canvas);
    if (id("canvas")) id("canvas").appendChild(wrapper);
    page.render(renderContext);
  }

  function renderPages(pdfDoc) {
    for (var num = 1; num <= pdfDoc.numPages; num++) {
      pdfDoc.getPage(num).then(renderPage);
    }
  }

  PDFJS.disableWorker = true;
  PDFJS.getDocument(url).then(renderPages);
}
},{"./functions":"src/functions.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64659" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map