// Based on  https://codepen.io/diguifi/pen/YdBbyz
// Also on https://codesandbox.io/s/oj81y

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
  hideInput("companyName");
  hideInput("companyAddress");

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
  labelUpdate("companyName");
  labelUpdate("companyAddress");
};

const hideInput = text => {
  id(text + "Input").style.display = "none";
  id(text + "Label").style.display = "block";
};

const showInput = text => {
  id(text + "Input").style.display = "block";
  id(text + "Label").style.display = "none";
};

const labelUpdate = text => {
  if (canUpdate === 1) id(text + "Label").textContent = id(text + "Input").value;
  else {
    canUpdate = 1;
    id(text + "Input").value = id(text + "Label").textContent;
  }
  hideInput(text);
};

let canUpdate = 1;

const addButton = text =>
  html`
    <button id="${text}Button" @click=${() => showFields(text)} class="px-3 py-2 mb-2 mr-2 font-semibold bg-gray-700 rounded hover:bg-gray-600">
      <span>+ ${lang[text]}</span>
    </button>
  `;

const labelRequired = text =>
  html`
    <div class="mt-6 mb-2 flex w-full justify-end">
      <label id="${text}Label" class="block text-base font-semibold flex-grow text-left truncate mt-1" htmlFor="${text}">${lang[text]}</label>
      <input
        id="${text}Input"
        class="w-full form-input text-base rounded-none font-semibold self-center text-gray-400 bg-transparent border-0 border-b
      border-blue-300 p-0 focus:outline-none focus:shadow-none focus:border-blue-300"
        placeholder="100"
        type="text"
        value="${lang[text]}"
        @change=${() => labelUpdate(text)}
        @keydown=${e => {
          if (e.key === "Escape") {
            console.log("Esc");
            canUpdate = 2;
            hideInput(text);
          }
        }}
      />
      <button class="ml-2 w-8 h-8 font-semibold rounded hover:bg-gray-900 flex justify-center items-center" @click=${() => showInput(text)}>
        <i class="gg-pen"></i>
      </button>
    </div>
  `;

const labelOptional = text =>
  html`
    <div id="${text}LabelWrapper" class="mt-6 mb-2 flex w-full justify-end">
      <label id="${text}Label" class="block text-base font-semibold flex-grow text-left truncate mt-1" htmlFor="${text}">${lang[text]}</label>
      <button class="ml-2 w-8 h-8 font-semibold rounded hover:bg-gray-900 flex justify-center items-center">
        <i class="gg-pen"></i>
      </button>
      <button
        id="${text}RemoveButton"
        class="ml-2 w-8 h-8 font-semibold rounded hover:bg-gray-900 flex justify-center items-center"
        @click=${() => removeFields(text)}
      >
        <i class="gg-trash"></i>
      </button>
    </div>
  `;

const inputText = text =>
  html`
    <input id="${text}" class="w-full form-input self-center text-gray-800" placeholder="100" type="text" />
  `;

const textArea = text =>
  html`
    <textarea id="${text}" class="w-full form-input self-center text-gray-600" placeholder="100" rows="5"></textarea>
  `;

const card = text =>
  html`
    <div class="font-semibold text-xl text-left">${lang[text + "Details"]}</div>
    <div id="${text}Fields" class="flex flex-wrap items-center"></div>
    <label class="block text-base font-semibold mt-6 mb-2 w-full text-left">${lang["optionalFields"]} - ${lang["clickToAdd"]}</label>
    <div id="optional${initCap(text)}Details" class="flex flex-wrap text-sm text-white -mr-2"></div>
  `;

render(card("company"), document.getElementById("companyCard"));
render(card("invoice"), document.getElementById("invoiceCard"));
render(card("customer"), document.getElementById("customerCard"));

const companyFieldsTemplate = html`
  ${labelRequired("companyName")} ${inputText("companyName")} ${labelRequired("companyAddress")} ${textArea("companyAddress")}
  ${labelOptional("companyLogo")} ${inputText("companyLogo")} ${labelOptional("phone")} ${inputText("phone")} ${labelOptional("email")}
  ${inputText("email")} ${labelOptional("website")} ${inputText("website")} ${labelOptional("facebook")} ${inputText("facebook")}
  ${labelOptional("twitter")} ${inputText("twitter")} ${labelOptional("instagram")} ${inputText("instagram")}
`;

render(companyFieldsTemplate, document.getElementById("companyFields"));

const invoiceFieldsTemplate = html`
  ${labelRequired("invoiceNum")} ${inputText("invoiceNum")} ${labelRequired("invoiceDate")} ${inputText("invoiceDate")} ${labelRequired("dueDate")}
  ${inputText("dueDate")} ${labelOptional("paymentTerms")} ${inputText("paymentTerms")} ${labelOptional("purchaseOrder")}
  ${inputText("purchaseOrder")}
`;

render(invoiceFieldsTemplate, document.getElementById("invoiceFields"));

const customerFieldsTemplate = html`
  ${labelRequired("billToName")} ${inputText("billToName")} ${labelRequired("billToAddress")} ${textArea("billToAddress")}
  ${labelOptional("shipToName")} ${inputText("shipToName")} ${labelOptional("shipToAddress")} ${textArea("shipToAddress")}
  ${labelOptional("billToMail")} ${inputText("billToMail")} ${labelOptional("billToPhone")} ${inputText("billToPhone")}
`;

render(customerFieldsTemplate, document.getElementById("customerFields"));

const itemFieldsTemplate = html`
  ${labelRequired("itemName")} ${inputText("itemName")} ${labelRequired("itemDescription")} ${inputText("itemDescription")}
  ${labelRequired("quantity")} ${inputText("quantity")} ${labelRequired("unitPrice")} ${inputText("unitPrice")} ${labelRequired("tax")}
  ${inputText("tax")} ${labelRequired("extendedPrice")} ${inputText("extendedPrice")}
`;

render(itemFieldsTemplate, document.getElementById("itemFields"));

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

// if (id("companyNameInput"))
//   id("companyNameInput").addEventListener(
//     "change",
//     function() {
//       labelUpdate("companyName");
//       console.log("Company Name updated");
//     },
//     false
//   );

// if (id("companyNameInput"))
//   id("companyNameInput").addEventListener("keydown", e => {
//     if (e.key === "Escape") {
//       console.log("Esc");
//       canUpdate = 2;
//       hideInput("companyName");
//     }
//   });

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
// Date / Calendar
//
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
// let labelInvoiceNum = "Invoice #";
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
let labelTerms = lang["paymentTerms"];
let terms = "5 Days";
let labelPurchaseOrder = lang["purchaseOrder"];
let purchaseOrder = "454523";
let labelPaymentMethod = lang["paymentMethod"];
let paymentMethod = "Paypal, Visa, MasterCard";

let labelPhone = lang["phone"];
let phone = "+91 9292929292";
let labelEmail = lang["email"];
let email = "email@website.com";
let labelWebsite = lang["website"];
let website = "www.website.com";
let labelFacebook = lang["facebook"];
let facebook = "fb-page";
let labelTwitter = lang["twitter"];
let twitter = "twitter-page";
let labelInstagram = lang["instagram"];
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
  labelInvoiceNum: lang["invoiceNum"],
  labelInvoiceDate: lang["invoiceDate"],
  labelDueDate: lang["dueDate"],
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

//  docDef = docDefinition2;

if (id("downloadButton")) id("downloadButton").addEventListener("click", download, false);
if (id("layout1")) id("layout1").addEventListener("click", renderlayout1, false);
if (id("layout2")) id("layout2").addEventListener("click", renderlayout2, false);

if (id("invoiceNum")) id("invoiceNum").addEventListener("change", changeInvNum, false);
// if (id("labelInvoiceNum")) id("labelInvoiceNum").addEventListener("change", changeLabelInvNum, false);
// if (id("labelInvoiceNum")) id("labelInvoiceNum").addEventListener("click", changeLabelInvNum, false);
// if (id("labelInvoiceNumEdit")) id("labelInvoiceNumEdit").addEventListener("change", removeInvNumEdit, false);

function changeInvNum() {
  invoiceNum = id("invoiceNum").value;
  variables.invoiceNum = invoiceNum;
  renderlayout1();
}

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
