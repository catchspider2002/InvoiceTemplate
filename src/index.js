// Based on  https://codepen.io/diguifi/pen/YdBbyz
// Also on https://codesandbox.io/s/oj81y

import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfFonts from "./vfs_fonts";
import moment from "moment";
// import loadjs from "loadjs";
import PDFJS from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import lang from "./locales/locale.en.js";
import { html, render } from "lit-html";
import lib from "./functions";
import flatpickr from "flatpickr";
// import Turkish from "flatpickr/dist/l10n/tr.js";
import language from "flatpickr/dist/l10n/";

// Paper Size - A4 or Letter - radio
// Font - Dropdown - Show list of languages the font supports
// Label
    // Color
    // Capitalize
    // Font Size
//  Font
    // Color
    // Font Size


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
// Item Detail
// - Serial Number
// - Item Header
// - Item Details
// - Item Image
// - Item Description
// - Qty
// - Price
// - Tax (Percent or Anount)
// - Discount (Percent or Anount)
// - Total
// Item Summary
// - Subtotal
// - Discount (-)
// - Refund (-)
// - Paid (-)
// - Shipping (+)
// - Total excluding tax
// - Tax 1 (+)
// - Tax 2 (+)
// - Total

// Footer
// Notes
// Info to Customer
// Terms and Conditions
// Page Number
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
let terms = "5 Days";
let purchaseOrder = "454523";
let paymentMethod = "Paypal, Visa, MasterCard";

let phone = "+91 9292929292";
let email = "email@website.com";
let website = "www.website.com";
let facebook = "fb-page";
let twitter = "twitter-page";
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
  labelTerms: lang["paymentTerms"],
  terms: terms,
  labelPurchaseOrder: lang["purchaseOrder"],
  purchaseOrder: purchaseOrder,
  labelPaymentMethod: lang["paymentMethod"],
  paymentMethod: paymentMethod,
  notes: notes,
  labelPhone: lang["phone"],
  phone: phone,
  labelEmail: lang["email"],
  email: email,
  labelWebsite: lang["website"],
  website: website,
  labelFacebook: lang["facebook"],
  facebook: facebook,
  labelTwitter: lang["twitter"],
  twitter: twitter,
  labelInstagram: lang["instagram"],
  instagram: instagram
};

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

let mandatoryFields = ["companyName", "companyAddress", "billToName", "billToAddress"];

let mandatoryEditableFields = ["invoiceNum", "invoiceDate", "dueDate"];

let optionalFields = ["companyLogo"];

let optionalEditableFields = [
  "phone",
  "email",
  "website",
  "facebook",
  "twitter",
  "instagram",
  "paymentTerms",
  "purchaseOrder",
  "shipToName",
  "shipToAddress",
  "billToMail",
  "billToPhone"
];

let direction = "ltr";
let alignment = "text-left";
let marginLeft2 = "ml-2";
let marginLeft4 = "ml-4";
if (direction === "rtl") {
  alignment = "text-right";
  marginLeft2 = "mr-2";
  marginLeft4 = "mr-4";
}

const assignValues = () => {
  mandatoryEditableFields.forEach(item => {
    hideInput(item);
    // labelUpdate(item);
    id(item + "Label").textContent = id(item + "Input").value;
  });

  optionalEditableFields.forEach(item => {
    removeFields(item);
    hideInput(item);
  });

  optionalFields.forEach(item => {
    removeFields(item);
  });

  flatpickr.localize(flatpickr.l10ns.fr);

  flatpickr("#invoiceDate", {
    dateFormat: "Y, F d",
    disableMobile: "true"
  });

  flatpickr("#dueDate", {
    dateFormat: "Y, F d",
    disableMobile: "true"
  });
};

const hideInput = text => {
  id(text + "Input").style.display = "none";
  id(text + "Label").style.display = "block";
};

const showInput = text => {
  console.log(text);
  id(text + "Input").style.display = "block";
  id(text + "Label").style.display = "none";
};

const labelUpdate = text => {
  if (canUpdate) {
    id(text + "Label").textContent = id(text + "Input").value;
    variables["label" + initCap(text)] = id(text + "Label").textContent;
    renderlayout1();
  } else {
    canUpdate = true;
    id(text + "Input").value = id(text + "Label").textContent;
  }
  hideInput(text);
};

let canUpdate = true;

const addButton = text =>
  html`
    <button
      id="${text}Button"
      @click=${() => showFields(text)}
      class="px-3 py-2 mb-2 mr-2 font-semibold bg-gray-700 rounded hover:bg-gray-600"
      title="Add ${lang[text]}"
    >
      <span>+ ${lang[text]}</span>
    </button>
  `;

const removeButton = text =>
  html`
    <button
      id="${text}RemoveButton"
      class="w-8 h-8 font-semibold rounded hover:bg-gray-900 flex justify-center items-center ${marginLeft2}"
      title="Remove field"
      @click=${() => removeFields(text)}
    >
      <i class="gg-trash"></i>
    </button>
  `;

const editButton = text =>
  html`
    <button
      class="w-8 h-8 font-semibold rounded hover:bg-gray-900 flex justify-center items-center ${marginLeft4}"
      @click=${() => showInput(text)}
      title="Edit label"
    >
      <i class="gg-pen"></i>
    </button>
  `;

const label = text => {
  return html`
    <label id="${text}Label" class="block text-base font-semibold flex-grow truncate mt-1 ${alignment}" htmlFor="${text}">${lang[text]}</label>
  `;
};

const labelInput = text => {
  return html`
    <input
      id="${text}Input"
      class="w-full form-input text-base rounded-none font-semibold self-center text-gray-400 bg-transparent border-0 border-b
      border-yellow-600 p-0 focus:outline-none focus:shadow-none focus:border-blue-300"
      type="text"
      value="${lang[text]}"
      @change=${() => labelUpdate(text)}
      @keydown=${e => {
        if (e.key === "Escape") {
          console.log("Esc");
          canUpdate = false;
          hideInput(text);
        }
      }}
    />
  `;
};

const labelRequired = text => {
  return html`
    <div class="mt-6 mb-2 flex w-full justify-end">
      ${label(text)}
    </div>
  `;
};

const labelRequiredEditable = text => {
  return html`
    <div class="mt-6 mb-2 flex w-full justify-end">
      ${label(text)} ${labelInput(text)} ${editButton(text)}
    </div>
  `;
};

const labelOptional = text =>
  html`
    <div id="${text}LabelWrapper" class="mt-6 mb-2 flex w-full justify-end">
      ${label(text)} ${removeButton(text)}
    </div>
  `;

const labelOptionalEditable = text =>
  html`
    <div id="${text}LabelWrapper" class="mt-6 mb-2 flex w-full justify-end">
      ${label(text)} ${labelInput(text)} ${editButton(text)} ${removeButton(text)}
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
    <div class="font-semibold text-xl ${alignment}">
      ${lang[text + "Details"]}
    </div>
    <div id="${text}Fields" class="flex flex-wrap items-center"></div>
    <label class="block text-base font-semibold mt-6 mb-2 w-full ${alignment}">${lang["optionalFields"]} - ${lang["clickToAdd"]}</label>
    <div id="optional${initCap(text)}Details" class="flex flex-wrap text-sm text-white -mr-2"></div>
  `;

render(card("company"), document.getElementById("companyCard"));
render(card("invoice"), document.getElementById("invoiceCard"));
render(card("customer"), document.getElementById("customerCard"));

const companyFieldsTemplate = html`
  ${labelRequired("companyName")} ${inputText("companyName")} ${labelRequired("companyAddress")} ${textArea("companyAddress")}
  ${labelOptional("companyLogo")} ${inputText("companyLogo")} ${labelOptionalEditable("phone")} ${inputText("phone")}
  ${labelOptionalEditable("email")} ${inputText("email")} ${labelOptionalEditable("website")} ${inputText("website")}
  ${labelOptionalEditable("facebook")} ${inputText("facebook")} ${labelOptionalEditable("twitter")} ${inputText("twitter")}
  ${labelOptionalEditable("instagram")} ${inputText("instagram")}
`;

render(companyFieldsTemplate, document.getElementById("companyFields"));

const invoiceFieldsTemplate = html`
  ${labelRequiredEditable("invoiceNum")} ${inputText("invoiceNum")} ${labelRequiredEditable("invoiceDate")} ${inputText("invoiceDate")}
  ${labelRequiredEditable("dueDate")} ${inputText("dueDate")} ${labelOptionalEditable("paymentTerms")} ${inputText("paymentTerms")}
  ${labelOptionalEditable("purchaseOrder")} ${inputText("purchaseOrder")}
`;

render(invoiceFieldsTemplate, document.getElementById("invoiceFields"));

const customerFieldsTemplate = html`
  ${labelRequired("billToName")} ${inputText("billToName")} ${labelRequired("billToAddress")} ${textArea("billToAddress")}
  ${labelOptionalEditable("shipToName")} ${inputText("shipToName")} ${labelOptionalEditable("shipToAddress")} ${textArea("shipToAddress")}
  ${labelOptionalEditable("billToMail")} ${inputText("billToMail")} ${labelOptionalEditable("billToPhone")} ${inputText("billToPhone")}
`;

render(customerFieldsTemplate, document.getElementById("customerFields"));

const itemFieldsTemplate = html`
  ${labelRequiredEditable("itemName")} ${inputText("itemName")} ${labelRequiredEditable("itemDescription")} ${inputText("itemDescription")}
  ${labelRequiredEditable("quantity")} ${inputText("quantity")} ${labelRequiredEditable("unitPrice")} ${inputText("unitPrice")}
  ${labelRequiredEditable("tax")} ${inputText("tax")} ${labelRequiredEditable("extendedPrice")} ${inputText("extendedPrice")}
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

const download = () => {
  console.log("download");
  setLayout();
  var pdf = pdfMake.createPdf(docDef);
  pdf.download("PPRA.pdf");
};

function renderlayout1() {
  console.log("renderLayout1");
  setLayout();
  renderNew(docDef);
}

function renderlayout2() {
  renderNew(lib.layout2(variables));
}

let docDef = lib.layout1(variables);

function setLayout() {
  docDef = lib.layout1(variables);
}

if (id("downloadButton")) id("downloadButton").addEventListener("click", download, false);
if (id("layout1")) id("layout1").addEventListener("click", renderlayout1, false);
if (id("layout2")) id("layout2").addEventListener("click", renderlayout2, false);

if (id("invoiceNum")) id("invoiceNum").addEventListener("change", changeInvNum, false);

function changeInvNum() {
  invoiceNum = id("invoiceNum").value;
  variables["invoiceNum"] = invoiceNum;
  renderlayout1();
}

function renderNew(def) {
  console.log("renderNew");
  pdfMake.createPdf(def).getDataUrl(function(dataURL) {
    renderPDF(dataURL);
  });
}

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
