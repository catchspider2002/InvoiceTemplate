// Based on  https://codepen.io/diguifi/pen/YdBbyz
// Also on https://codesandbox.io/s/oj81y
// var canvasElement = document.getElementById("canvas");

import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfFonts from "./vfs_fonts";
import moment from "moment";
// import loadjs from "loadjs";
import PDFJS from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import lang from "./locales/locale.es.js";
import { html, render } from "lit-html";

const initCap = str => str.charAt(0).toUpperCase() + str.slice(1);

const id = text => document.getElementById(text);

const showFields = field => {
  id(field + "LabelWrapper").style.display = "flex";
  id(field).style.display = "block";
  id(field + "Button").style.display = "none";
};

const removeFields = field => {
  id(field + "LabelWrapper").style.display = "none";
  id(field).style.display = "none";
  id(field + "Button").style.display = "block";
};

const assignValues = () => {
  removeFields("companyLogo");
  removeFields("phone");
  removeFields("email");
  removeFields("website");
  removeFields("facebook");
  removeFields("twitter");
  removeFields("instagram");

  removeFields("paymentTerms");
  removeFields("purchaseOrder");

  removeFields("shipToName");
  removeFields("shipToAddress");
  removeFields("billToMail");
  removeFields("billToPhone");
};

const addButton = text =>
  html`
    <button id="${text}Button" @click=${() => showFields(text)} class="px-3 py-2 mb-2 mr-2 font-semibold bg-gray-700 rounded hover:bg-gray-600">
      <span>+ ${lang[text]}</span>
    </button>
  `;

const labelRequired = text =>
  html`
    <label id="${text}Label" class="block text-base font-semibold mt-6 mb-2" htmlFor="${text}">${lang[text]}</label>
  `;

const labelOptional = text =>
  html`
    <div id="${text}LabelWrapper" class="mt-6 mb-2 flex items-end w-full">
      ${labelRequired(text)}
      <span class="block text-sm font-normal text-gray-600 px-2 leading-none pb-1">Optional</span>
      <span id="${text}RemoveButton" class="block flex-grow font-normal text-right text-red-500" @click=${() => removeFields(text)}>Remove</span>
    </div>
  `;

const inputText = text =>
  html`
    <input id="${text}" class="w-full form-input self-center text-gray-600" placeholder="100" type="text" />
  `;

const textArea = text =>
  html`
    <textarea id="${text}" class="w-full form-input self-center text-gray-600" placeholder="100" rows="5"></textarea>
  `;

const companyFieldsTemplate = html`
  ${labelRequired("companyName")} ${inputText("companyName")} ${labelRequired("companyAddress")} ${textArea("companyAddress")}
  ${labelOptional("companyLogo")} ${inputText("companyLogo")} ${labelOptional("phone")} ${inputText("phone")} ${labelOptional("email")}
  ${inputText("email")} ${labelOptional("website")} ${inputText("website")} ${labelOptional("facebook")} ${inputText("facebook")}
  ${labelOptional("twitter")} ${inputText("twitter")} ${labelOptional("instagram")} ${inputText("instagram")}
`;

render(companyFieldsTemplate, document.getElementById("companyFields"));

const invoiceFieldsTemplate = html`
  ${labelRequired("invoiceNum")} ${inputText("invoiceNum")} ${labelRequired("invoiceDate")} ${textArea("invoiceDate")} ${labelRequired("dueDate")}
  ${textArea("dueDate")} ${labelOptional("paymentTerms")} ${inputText("paymentTerms")} ${labelOptional("purchaseOrder")} ${inputText("purchaseOrder")}
`;

render(invoiceFieldsTemplate, document.getElementById("invoiceFields"));

const customerFieldsTemplate = html`
  ${labelRequired("billToName")} ${inputText("billToName")} ${labelRequired("billToAddress")} ${textArea("billToAddress")}
  ${labelOptional("shipToName")} ${inputText("shipToName")} ${labelOptional("shipToAddress")} ${textArea("shipToAddress")}
  ${labelOptional("billToMail")} ${inputText("billToMail")} ${labelOptional("billToPhone")} ${inputText("billToPhone")}
`;

render(customerFieldsTemplate, document.getElementById("customerFields"));

const companyDetailsTemplate = html`
  ${addButton("companyLogo")} ${addButton("phone")} ${addButton("email")} ${addButton("website")} ${addButton("facebook")} ${addButton("twitter")}
  ${addButton("instagram")}
`;

render(companyDetailsTemplate, document.getElementById("optionalCompanyDetails"));

const invoiceDetailsTemplate = html`
  ${addButton("paymentTerms")} ${addButton("purchaseOrder")}
`;

render(invoiceDetailsTemplate, document.getElementById("optionalInvoiceDetails"));

const customerDetailsTemplate = html`
  ${addButton("shipToName")} ${addButton("shipToAddress")} ${addButton("billToMail")} ${addButton("billToPhone")}
`;

render(customerDetailsTemplate, document.getElementById("optionalCustomerDetails"));

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.vfs;
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// var derivedLang = "es";
if (lang) assignValues();

// loadjs(["./locales/locale.es.js"], {
//   success: assignValues
// });

// loadjs("locales/locale.es.js", assignValues);

// loadjs("./locales/locale.es.js", assignValues);

pdfMake.fonts = {
  // PTSans: {
  //   normal: "PTSans-Regular.ttf",
  //   bold: "PTSans-Bold.ttf",
  //   italics: "PTSans-Regular.ttf",
  //   bolditalics: "PTSans-Regular.ttf"
  // },
  // SourceSans: {
  //   normal: "SourceSansPro-Regular.ttf",
  //   bold: "SourceSansPro-Bold.ttf",
  //   italics: "SourceSansPro-Regular.ttf",
  //   bolditalics: "SourceSansPro-Regular.ttf"
  // },
  // Roboto: {
  //   normal: "Roboto-Regular.ttf",
  //   bold: "Roboto-Medium.ttf",
  //   italics: "Roboto-Regular.ttf",
  //   bolditalics: "Roboto-Regular.ttf"
  // },
  VarelaRound: {
    normal: "VarelaRound-Regular.ttf",
    bold: "VarelaRound-Regular.ttf",
    italics: "VarelaRound-Regular.ttf",
    bolditalics: "VarelaRound-Regular.ttf"
  }
};

const lib = require("./functions");

// Icons to use
// Invoice
// website
// phone
// Email
// Facebook
// twitter
// instagram

// Controls
// Radio button - Paper Size
// Checkbox -
// Drop Down - Language
// Autocomplete - Country, Currency
// Color Picker - Colors
// File Upload - Upload Logo

let a4Paper = { width: 595.28, height: 841.89 };
let letterPaper = { width: 612, height: 792 };
let paperSize = a4Paper;

// Colors
let colorPrimary = "#2a7fff";
let colorSecondary = "#676778";
let colorLightGray = "#e2e8f0";
let colorDarkGray = "#4a5568";
let colorError = "#b71c1c";
let colorBackground = "#ffffff";

let colorLightPrimary = lib.lightenDarkenColor(colorPrimary, 60);
let colorDarkPrimary = lib.lightenDarkenColor(colorPrimary, -60);

// Invoice Header - Invoice
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
let dateFormat = "MMMM Do YYYY"; // February 19th 2020
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

let currency1;
let currency2;
let currencyPrecision;

// moment.locale("tr");
// console.log(moment(1316116057189).fromNow()); // il y a une heure
// moment.locale('en');
// console.log(moment(1316116057189).fromNow()); // an hour ago

let headerLeft = moment().format(dateFormat);
let headerCenter = "NEW HEADER CENTER";
let headerRight = "NEW HEADER RIGHT";

let footerLeft = "NEW FOOTER LEFT\nNEW FOOTER LEFT";
let footerCenter = "NEW FOOTER CENTER";
let footerRight = "NEW FOOTER RIGHT";

let labelInvoice = "INVOICE";
let labelInvoiceNum = "Invoice #";
let labelInvoiceDate = "Invoice Date";
let labelDueDate = "Due Date";
let invoiceNum = "000021";
let invoiceDate = moment("20200131").format(dateFormat);
let dueDate = moment("20200205").format(dateFormat);

let labelBillingFrom = "Billing From";
let sellerName = "Your Name";
let sellerCompany = "Your Company";
let labelSellerAddress = "Address";
let sellerAddressLine1 = "9999 Street Name";
let sellerAddressLine2 = "Some Area";
let sellerAddressLine3 = "Some Place";
let sellerAddressLine4 = "New York City";
let sellerAddressLine5 = "NY 00010 USA";

let labelBillingTo = "Bill To";
let clientName = "Client Name";
let clientCompany = "Client Company";
let labelClientAddress = "Address";
let clientAddressLine1 = "1111 Street Name";
let clientAddressLine2 = "Some Area";
let clientAddressLine3 = "Some Place";
let clientAddressLine4 = "New York City";
let clientAddressLine5 = "NY 00011 USA";

let labelShipTo = "Bill To";
let clientShipName = "Client Name";
let clientShipCompany = "Client Company";
let labelClientShipAddress = "Address";
let clientShipAddressLine1 = "1111 Street Name";
let clientShipAddressLine2 = "Some Area";
let clientShipAddressLine3 = "Some Place";
let clientShipAddressLine4 = "New York City";
let clientShipAddressLine5 = "NY 00011 USA";

let labelAmountDue = "Amount Due";
let amountDue = "$2000";
let labelTerms = "Payment Terms";
let terms = "5 Days";
let labelPurchaseOrder = "Purchase Order";
let purchaseOrder = "454523";
let labelPaymentMethod = "Payment Method";
let paymentMethod = "Paypal, Visa, MasterCard";

let labelPhone = "Phone";
let phone = "+91 9292929292";
let labelEmail = "E-mail";
let email = "email@website.com";
let labelWebsite = "Website";
let website = "www.website.com";
let labelFacebook = "Facebook";
let facebook = "fb-page";
let labelTwitter = "Twitter";
let twitter = "twitter-page";
let labelInstagram = "Instagram";
let instagram = "insta-page";

let notes = "Thank you for your business";

let variables = {
  paperSize: paperSize,
  colorPrimary: colorPrimary,
  colorLightPrimary: colorLightPrimary,
  colorDarkPrimary: colorDarkPrimary,
  colorLightGray: colorLightGray,
  colorDarkGray: colorDarkGray,
  labelInvoice: labelInvoice,
  labelInvoiceNum: labelInvoiceNum,
  labelInvoiceDate: labelInvoiceDate,
  labelDueDate: labelDueDate,
  invoiceNum: invoiceNum,
  invoiceDate: invoiceDate,
  dueDate: dueDate,
  labelBillingFrom: labelBillingFrom,
  sellerName: sellerName,
  sellerCompany: sellerCompany,
  labelSellerAddress: labelSellerAddress,
  sellerAddressLine1: sellerAddressLine1,
  sellerAddressLine2: sellerAddressLine2,
  sellerAddressLine3: sellerAddressLine3,
  sellerAddressLine4: sellerAddressLine4,
  sellerAddressLine5: sellerAddressLine5,
  labelBillingTo: labelBillingTo,
  clientName: clientName,
  clientCompany: clientCompany,
  labelClientAddress: labelClientAddress,
  clientAddressLine1: clientAddressLine1,
  clientAddressLine2: clientAddressLine2,
  clientAddressLine3: clientAddressLine3,
  clientAddressLine4: clientAddressLine4,
  clientAddressLine5: clientAddressLine5,
  labelShipTo: labelShipTo,
  clientShipName: clientShipName,
  clientShipCompany: clientShipCompany,
  labelClientShipAddress: labelClientShipAddress,
  clientShipAddressLine1: clientShipAddressLine1,
  clientShipAddressLine2: clientShipAddressLine2,
  clientShipAddressLine3: clientShipAddressLine3,
  clientShipAddressLine4: clientShipAddressLine4,
  clientShipAddressLine5: clientShipAddressLine5,
  labelAmountDue: labelAmountDue,
  amountDue: amountDue,
  labelTerms: labelTerms,
  terms: terms,
  labelPurchaseOrder: labelPurchaseOrder,
  purchaseOrder: purchaseOrder,
  labelPaymentMethod: labelPaymentMethod,
  paymentMethod: paymentMethod,
  notes: notes,
  labelPhone: labelPhone,
  phone: phone,
  labelEmail: labelEmail,
  email: email,
  labelWebsite: labelWebsite,
  website: website,
  labelFacebook: labelFacebook,
  facebook: facebook,
  labelTwitter: labelTwitter,
  twitter: twitter,
  labelInstagram: labelInstagram,
  instagram: instagram
};

let dd = {
  pageSize: {
    width: paperSize.width,
    height: paperSize.height
  },
  pageMargins: [0, 0, 0, 40],
  background: function() {
    return {
      canvas: [
        {
          type: "rect",
          x: 0,
          y: 0,
          w: paperSize.width,
          h: paperSize.height,
          color: "#00BFFF"
        }
      ]
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
    columns: [
      { text: footerLeft, style: ["margin5", "left", "font10"] },
      { text: footerCenter, style: ["margin5", "center", "font10"] },
      { text: footerRight, style: ["margin5", "right", "font10"] }
    ]
  },
  content: [
    {
      svg: '<svg width="' + paperSize.width + '" height="10"><rect width="100%" height="10" style="fill:green" /></svg>'
    },
    {
      columns: [
        {
          width: "*",
          text: ""
        }
        // lib.textWithRule()
      ]
    },
    // lib.textWithRule(),
    // lib.labelText(labelInvoice, colorSecondary, "font48", "right"),
    // lib.coloredRect(0, colorPrimary),
    {
      table: {
        widths: ["*", "*", "*", "*", "*", "*"],
        body: [
          [
            {
              text: "",
              fillColor: colorDarkPrimary
            },
            {
              text: "",
              fillColor: colorLightPrimary
            },
            {
              text: "",
              fillColor: colorDarkPrimary
            },
            {
              text: "",
              fillColor: colorLightPrimary
            },
            {
              text: "",
              fillColor: colorDarkPrimary
            },
            {
              text: "",
              fillColor: colorLightPrimary
            }
          ]
        ]
      },
      layout: "noBorders"
    },
    // lib.spacer(40),
    {
      svg: '<svg width="' + paperSize.width + '" height="10"><rect width="' + paperSize.width + '" height="10" style="fill:rgb(0,0,255)" /></svg>'
    },
    {
      table: {
        widths: ["15%", "*", "35%"],
        body: [
          [
            {
              text: "first column",
              fillColor: "#555555",
              color: "#00FFFF"
            },
            {
              text: "second column",
              color: "#555555",
              fillColor: "#dedede"
            },
            {
              text: "third column",
              fillColor: "#555555"
            }
          ]
        ]
      },
      layout: "noBorders"
    },
    // Header
    {
      // If no width/height/fit is used, then dimensions from the svg element is used.
      svg: '<svg height="30" width="200"><text x="0" y="15" fill="red">I love SVG!</text></svg>'
    },
    // {
    //   image: 'sampleOSI_Standard_Logo_600X780.png',
    // },
    {
      svg:
        '<svg width="' +
        paperSize.width +
        '" height="110"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:' +
        colorDarkPrimary +
        ';stop-opacity:1" /><stop offset="50%" style="stop-color:' +
        colorPrimary +
        ';stop-opacity:1" /><stop offset="100%" style="stop-color:' +
        colorLightPrimary +
        ';stop-opacity:1" /></linearGradient></defs><rect width="' +
        paperSize.width +
        '" height="100" fill="url(#grad1)" /></svg>'
    },
    {
      svg:
        '<svg width="' +
        paperSize.width +
        '" height="10"><defs><pattern id="pattern_gWSAk" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)"><line x1="0" y="0" x2="0" y2="24" stroke="#16874E" stroke-width="24" /></pattern></defs><rect width="100%" height="100%" fill="url(#pattern_gWSAk)"/></svg>'
    },
    {
      columns: [
        {
          image:
            "data:image/png;base64,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",
          width: 150
        },
        [
          {
            text: labelInvoice,
            style: ["font22", "right", "bold", "marginL0T0R0B15"],
            width: "*"
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: labelInvoiceNum,
                    style: ["font12", "right"],
                    width: "*"
                  },
                  {
                    text: invoiceNum,
                    style: ["font12", "right"],
                    width: 100
                  }
                ]
              },
              {
                columns: [
                  {
                    text: labelInvoiceDate,
                    style: ["font12", "right"],
                    width: "*"
                  },
                  {
                    text: invoiceDate,
                    style: ["font12", "right"],
                    width: 100
                  }
                ]
              },
              {
                columns: [
                  {
                    text: labelDueDate,
                    style: ["font12", "right"],
                    width: "*"
                  },
                  {
                    text: dueDate,
                    style: ["font12", "right"],
                    width: 100
                  }
                ]
              }
            ]
          }
        ]
      ]
    },
    // Billing Headers
    {
      columns: [
        {
          text: labelBillingFrom,
          style: ["font14", "bold", "left", "marginL0T20R0B5"]
        },
        {
          svg: '<svg width="100" height="40"><rect width="100%" height="100%" style="fill:green" /></svg>'
        },
        // lib.coloredRect(40, colorPrimary),
        {
          text: labelBillingTo,
          style: ["font14", "bold", "left", "marginL0T20R0B5"]
        }
      ]
    },
    // Billing Details
    {
      columns: [
        {
          text: sellerName + "\n" + sellerCompany,
          style: ["left"]
        },
        {
          text: clientName + "\n" + clientCompany,
          style: ["left"]
        }
      ]
    },
    // Billing Address Title
    {
      columns: [
        {
          text: labelSellerAddress,
          style: ["bold", "marginL0T7R0B3"]
        },
        {
          text: labelClientAddress,
          style: ["bold", "marginL0T7R0B3"]
        }
      ]
    },
    // Billing Address
    {
      columns: [
        {
          text: sellerAddressLine1 + "\n" + sellerAddressLine2 + "\n" + sellerAddressLine3 + "\n" + sellerAddressLine4 + " " + sellerAddressLine5
        },
        {
          text: clientAddressLine1 + "\n" + clientAddressLine2 + "\n" + clientAddressLine3 + "\n" + clientAddressLine4 + " " + clientAddressLine5
        }
      ]
    },
    // Line breaks
    "\n\n",
    // Items
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: ["*", 40, "auto", 40, "auto", 80],

        body: [
          // Table Header
          [
            {
              text: "Product",
              style: ["marginH0V5", "bold"]
            },
            {
              text: "Qty",
              style: ["marginH0V5", "bold", "center"]
            },
            {
              text: "Price",
              style: ["marginH0V5", "bold", "center"]
            },
            {
              text: "Tax",
              style: ["marginH0V5", "bold", "center"]
            },
            {
              text: "Discount",
              style: ["marginH0V5", "bold", "center"]
            },
            {
              text: "Total",
              style: ["marginH0V5", "bold", "center"]
            }
          ],
          // Items
          // Item 1
          [
            [
              {
                text: "Item 1",
                style: ["bold"]
              },
              {
                text: "Item Description",
                style: ["italics", "font11"]
              }
            ],
            {
              text: "1",
              style: ["marginH0V5", "center"]
            },
            {
              text: "$999.99",
              style: ["marginH0V5", "center"]
            },
            {
              text: "0%",
              style: ["marginH0V5", "center"]
            },
            {
              text: "0%",
              style: ["marginH0V5", "center"]
            },
            {
              text: "$999.99",
              style: ["marginH0V5", "bold", "center"]
            }
          ],
          // Item 2
          [
            [
              {
                text: "Item 2",
                style: ["bold"]
              },
              {
                text: "Item Description",
                style: ["italics", "font11"]
              }
            ],
            {
              text: "1",
              style: ["marginH0V5", "center"]
            },
            {
              text: "$999.99",
              style: ["marginH0V5", "center"]
            },
            {
              text: "0%",
              style: ["marginH0V5", "center"]
            },
            {
              text: "0%",
              style: ["marginH0V5", "center"]
            },
            {
              text: "$999.99",
              style: ["marginH0V5", "bold", "center"]
            }
          ]
          // END Items
        ]
      } // table
      //  layout: 'lightHorizontalLines'
    },
    // TOTAL
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 0,
        widths: ["*", 80],

        body: [
          // Total
          [
            {
              text: "Subtotal",
              style: ["marginH0V5", "bold", "right"]
            },
            {
              text: "$2000.00",
              style: ["marginH0V5", "bold", "center"]
            }
          ],
          [
            {
              text: "Tax 21%",
              style: ["marginH0V5", "bold", "right"]
            },
            {
              text: "$523.13",
              style: ["marginH0V5", "bold", "center"]
            }
          ],
          [
            {
              text: "TOTAL",
              style: ["marginH0V5", "bold", "right"]
            },
            {
              text: "$2523.93",
              style: ["marginH0V5", "bold", "center"]
            }
          ]
        ]
      }, // table
      layout: "lightHorizontalLines"
    },
    // Signature
    {
      columns: [
        {
          text: ""
        },
        {
          stack: [
            // lib.spacer(70),
            {
              text: "_________________________________"
            },
            {
              text: "Your Name",
              style: ["bold", "center"]
            },
            {
              text: "Your job title",
              style: ["italics", "font10", "center"]
            }
          ],
          width: 180
        }
      ]
    },
    // lib.spacer(50),
    {
      text: "NOTES",
      style: ["font10", "bold"]
    },
    {
      text: "Some notes goes here \n Notes second line",
      style: ["font10"]
    }
  ],
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
};

let docDefinition2 = {
  content: [
    "This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns",
    {
      columns: [
        {
          // auto-sized columns have their widths based on their content
          width: "auto",
          text: "First column",
          background: "#ff00ff"
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: "*",
          text: "Second column",
          background: "#ff0000",
          fill: "#f000ff"
        },
        {
          // fixed width
          width: 100,
          text: "Third column",
          background: "#0000ff"
        },
        {
          // % width
          width: "20%",
          text: "Fourth column",
          background: "#ffff00"
        }
      ],
      // optional space between columns
      columnGap: 10
    },
    "This paragraph goes below all columns and has full width"
  ]
};

const download = () => {
  console.log("download");
  var pdf = pdfMake.createPdf(docDef);
  pdf.download("PPRA.pdf");
};

const renderlayout1 = () => {
  renderNew(lib.layout1(variables));
};

const renderlayout2 = () => {
  renderNew(lib.layout2(variables));
};

let docDef = lib.layout1(variables);

// id("labelInvoiceNumEdit").style.display = "none";
//  docDef = docDefinition2;

if (id("downloadButton")) id("downloadButton").addEventListener("click", download, false);
if (id("layout1")) id("layout1").addEventListener("click", renderlayout1, false);
if (id("layout2")) id("layout2").addEventListener("click", renderlayout2, false);

if (id("invoiceNum")) id("invoiceNum").addEventListener("change", changeInvNum, false);
// if (id("buttonWebsite")) id("buttonWebsite").addEventListener("click", showWebsite, false);
// if (id("buttonRemoveWebsite"))
// id("buttonRemoveWebsite").addEventListener("click", removeWebsite, false);
// if (id("labelInvoiceNum")) id("labelInvoiceNum").addEventListener("change", changeLabelInvNum, false);
// if (id("labelInvoiceNum")) id("labelInvoiceNum").addEventListener("click", changeLabelInvNum, false);
// if (id("labelInvoiceNumEdit")) id("labelInvoiceNumEdit").addEventListener("change", removeInvNumEdit, false);

// var divMO = new window.MutationObserver(function(mutationRecords) {
//   labelInvoiceNum = mutationRecords[0].target.data;
//   console.log("changeLabelInvNum: " + labelInvoiceNum);
//   variables.labelInvoiceNum = labelInvoiceNum;
//   renderlayout1();
// });
// divMO.observe(id("labelInvoiceNum"), { childList: true, subtree: true, characterData: true });

function changeInvNum() {
  invoiceNum = id("invoiceNum").value;
  variables.invoiceNum = invoiceNum;
  renderlayout1();
}

// function changeLabelInvNum() {
//   // labelInvoiceNum = id("labelInvoiceNum").value.replace((/  |\r\n|\n|\r/gm),"");
//   console.log("changeLabelInvNum: " + labelInvoiceNum);
//   id("labelInvoiceNum").style.display = "none";
//   id("labelInvoiceNumEdit").value = labelInvoiceNum;
//   id("labelInvoiceNumEdit").style.display = "block";
//   // variables.labelInvoiceNum = labelInvoiceNum;
//   // renderlayout1();
// }

// function removeInvNumEdit() {
//   console.log("removeInvNumEdit: " + id("labelInvoiceNumEdit").value);
//   id("labelInvoiceNum").style.display = "block";
//   // id("labelInvoiceNumEdit").value = labelInvoiceNum;
//   id("labelInvoiceNumEdit").style.display = "none";
//   variables.labelInvoiceNum = id("labelInvoiceNumEdit").value;
//   id("labelInvoiceNumEdit").textContent = id("labelInvoiceNumEdit").value;
// }

const renderNew = def => {
  console.log("renderNew");
  pdfMake.createPdf(def).getDataUrl(function(dataURL) {
    renderPDF(dataURL);
  });
};

renderNew(docDef);

function renderPDF(url, options) {
  options = options || { scale: 0.95 };

  function renderPage(page) {
    var viewport = page.getViewport(options.scale);
    var canvas = id("myCanvas");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var ctx = canvas.getContext("2d");
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    page.render(renderContext);
  }

  const renderPages = pdfDoc => {
    for (var num = 1; num <= pdfDoc.numPages; num++) pdfDoc.getPage(num).then(renderPage);
  };

  PDFJS.disableWorker = true;
  PDFJS.getDocument(url).then(renderPages);
}
