// Based on  https://codepen.io/diguifi/pen/YdBbyz
// Also on https://codesandbox.io/s/oj81y

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import pdfFonts from "./vfs_fonts";
// import moment from "moment";
// import "moment/min/locales.min";
// import loadjs from "loadjs";
import PDFJS from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import lang from "./locales/locale.en.js";
import { html, render } from "lit-html";
import lib from "./functions";
import flatpickr from "flatpickr";
import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/monolith.min.css"; // 'monolith' theme

// import Turkish from "flatpickr/dist/l10n/tr.js";
import language from "flatpickr/dist/l10n/";

const locale = "en";

const items = [
  "F J Y",
  "M J Y",
  "F d, Y",
  "M d, Y",
  "m/d/Y",
  "m/d/y",
  "n/j/Y",
  "n/j/y",
  "d F Y",
  "d M Y",
  "d-M-y",
  "d-m-Y",
  "d-m-y",
  "j-n-Y",
  "j-n-y",
  "d/m/Y",
  "j/n/Y",
  "d.m.y",
  "j.n.y",
  "Y, F d",
  "Y, M d",
  "Y-m-d",
  "Y/m/d",
  "Y/n/j"
];

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

let dateFormat = "F J Y";

let currency1;
let currency2;
let currencyPrecision;

// let headerLeft = moment().format(dateFormat);
let headerCenter = "NEW HEADER CENTER";
let headerRight = "NEW HEADER RIGHT";

let footerLeft = "NEW FOOTER LEFT\nNEW FOOTER LEFT";
let footerCenter = "NEW FOOTER CENTER";
let footerRight = "NEW FOOTER RIGHT";

let invoiceNum = "000021";
let invoiceDate = "20200131";
// let dueDate = moment("20200205").format(dateFormat);
let dueDate = "20200131";

let sellerAddressLabel = "Address";
let clientAddressLabel = "Address";
let clientShipAddressLabel = "Address";

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
  invoiceLabel: lang["invoice"],
  invoiceNumLabel: lang["invoiceNum"],
  invoiceDateLabel: lang["invoiceDate"],
  dueDateLabel: lang["dueDate"],
  invoiceNum: invoiceNum,
  invoiceDate: invoiceDate,
  dueDate: dueDate,
  billingFromLabel: lang["billFrom"],
  // sellerName: sellerName,
  sellerCompany: lang["companyName"],
  sellerAddressLabel: sellerAddressLabel,
  sellerAddressLine1: lang["addressLine1"],
  sellerAddressLine2: lang["addressLine2"],
  sellerAddressLine3: lang["addressLine3"],
  sellerAddressLine4: lang["addressLine4"],
  sellerPhone: lang["phone"],
  sellerEmail: lang["email"],
  billingToLabel: lang["billTo"],
  // clientName: clientName,
  clientCompany: lang["companyName"],
  clientAddressLabel: clientAddressLabel,
  clientAddressLine1: lang["addressLine1"],
  clientAddressLine2: lang["addressLine2"],
  clientAddressLine3: lang["addressLine3"],
  clientAddressLine4: lang["addressLine4"],
  clientPhone: lang["phone"],
  clientEmail: lang["email"],
  shipToLabel: lang["shipTo"],
  // clientShipName: clientShipName,
  clientShipCompany: lang["companyName"],
  clientShipAddressLabel: clientShipAddressLabel,
  clientShipAddressLine1: lang["addressLine1"],
  clientShipAddressLine2: lang["addressLine2"],
  clientShipAddressLine3: lang["addressLine3"],
  clientShipAddressLine4: lang["addressLine4"],
  amountDueLabel: lang["amountDue"],
  amountDue: amountDue,
  termsLabel: lang["paymentTerms"],
  terms: terms,
  purchaseOrderLabel: lang["purchaseOrder"],
  purchaseOrder: purchaseOrder,
  paymentMethodLabel: lang["paymentMethod"],
  paymentMethod: paymentMethod,
  notes: notes,
  websiteLabel: lang["website"],
  website: website,
  facebookLabel: lang["facebook"],
  facebook: facebook,
  twitterLabel: lang["twitter"],
  twitter: twitter,
  instagramLabel: lang["instagram"],
  instagram: instagram
};

function show_hide_column(col_no, do_show) {
  var rows = document.getElementById("id_of_table").rows;

  for (var row = 0; row < rows.length; row++) {
    var cols = rows[row].cells;
    if (col_no >= 0 && col_no < cols.length) {
      cols[col_no].style.display = do_show ? "" : "none";
    }
  }
}

// show_hide_column(1, false);

const initCap = str => str.charAt(0).toUpperCase() + str.slice(1);

const id = text => document.getElementById(text);

const buttonToggle = field => {
  let classList = id(field + "Button", field).classList;
  console.log("Button enable");
  if (classList.contains("bg-gray-700")) {
    classList.remove("bg-gray-700");
    classList.remove("hover:bg-gray-600");
    classList.add("bg-red-700");
    classList.add("hover:bg-red-600");
    if (id(field + "LabelWrapper")) id(field + "LabelWrapper").style.display = "flex";
    id(field).style.display = "block";
  } else {
    classList.remove("bg-red-700");
    classList.remove("hover:bg-red-600");
    classList.add("bg-gray-700");
    classList.add("hover:bg-gray-600");
    if (id(field + "LabelWrapper")) id(field + "LabelWrapper").style.display = "none";
    id(field).style.display = "none";
  }
};

let mandatoryFields = ["companyName", "companyAddress", "billToName", "billToAddress"];

let mandatoryEditableFields = ["invoiceNum", "invoiceDate", "dueDate"];

let optionalFields = ["companyLogo"];

// let optionalEditableFields = [
//   "phone",
//   "email",
//   "website",
//   "facebook",
//   "twitter",
//   "instagram",
//   "paymentTerms",
//   "purchaseOrder",
//   "shipToName",
//   "shipToAddress",
//   "billToMail",
//   "billToPhone"
// ];

let optional2ColumnFields = ["paymentTerms", "purchaseOrder"];
let optional1ColumnField = ["sellerPhone", "sellerEmail", "website", "facebook", "twitter", "instagram"];

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
  // mandatoryEditableFields.forEach(item => {
  //   hideInput(item);
  //   // labelUpdate(item);
  //   id(item + "Label").textContent = id(item + "Input").value;
  // });

  optional2ColumnFields.forEach(item => {
    // remove2Fields(item);
    buttonToggle(item);
    // hideInput(item);
  });

  optional1ColumnField.forEach(item => {
    // removeField(item);
    buttonToggle(item);
    // hideInput(item);
  });

  // optionalFields.forEach(item => {
  //   removewFields(item);
  // });

  flatpickr.localize(flatpickr.l10ns[locale]);

  variables["invoiceDate"] = id("invoiceDate").value;
  variables["dueDate"] = id("dueDate").value;

  const getFormattedDate = format => {
    flatpickr("#dueDate", {
      dateFormat: format,
      defaultDate: "today"
    });
    return [format, id("dueDate").value];
  };

  const itemTemplates = [];
  for (const i of items) {
    itemTemplates.push(html`<option value=${getFormattedDate(i)[0]}>${getFormattedDate(i)[1]}</option>`);
  }

  const setDateFormat = () => {
    // console.log(id("date").value);
    dateFormat = id("date").value;

    flatpickr("#invoiceDate", {
      dateFormat: dateFormat,
      disableMobile: "true",
      defaultDate: "today"
    });

    flatpickr("#dueDate", {
      dateFormat: dateFormat,
      disableMobile: "true",
      defaultDate: "today"
    });
    renderlayout1();
  };

  const dateFormatSelect = text =>
    html`
      <span class="text-gray-200">Date Format</span>
      <select id="date" class="form-select block w-full mt-1 text-black" @change=${() => setDateFormat()}>
        ${itemTemplates}
      </select>
    `;

  render(dateFormatSelect("invoice"), id("dateFormat"));

  flatpickr("#invoiceDate", {
    dateFormat: dateFormat,
    disableMobile: "true",
    defaultDate: "today"
  });

  flatpickr("#dueDate", {
    dateFormat: dateFormat,
    disableMobile: "true",
    defaultDate: "today"
  });

  const pickr = Pickr.create({
    el: ".pickr",
    theme: "monolith", // or 'monolith', or 'nano'

    swatches: null,

    components: {
      // Main components
      preview: true,
      opacity: false,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: false,
        input: true,
        clear: false,
        save: false
      }
    }
  });

  renderlayout1();
};

const add2ColumnButton = text =>
  html`
    <button
      id="${text}Button"
      @click=${() => buttonToggle(text)}
      class="px-3 py-2 mb-2 mr-2 font-semibold bg-gray-700 rounded hover:bg-gray-600"
      title="Add ${lang[text]}"
    >
      <span>${lang[text]}</span>
    </button>
  `;

const addButton = (name, text) =>
  html`
    <button
      id="${name}Button"
      @click=${() => buttonToggle(name)}
      class="px-3 py-2 mb-2 mr-2 font-semibold bg-gray-700 rounded hover:bg-gray-600"
      title="Add ${lang[text]}"
    >
      <span>${lang[text]}</span>
    </button>
  `;

const inputLabel = (text, textSize = "text-base") => html`
  <input
    id="${text}Label"
    class="form-input ${textSize} mb-4 rounded-none font-semibold self-center text-gray-400 bg-transparent border-0 border-b
  border-transparent p-0 focus:outline-none focus:shadow-none focus:border-blue-300 w-full"
    type="text"
    value=${lang[text]}
    @change=${() => changeLabel(text)}
  />
`;

const inputOutput = (name, text, textSize = "text-base") => html`
  <input
    id="${name}"
    class="form-input ${textSize} mb-4 rounded-none self-center text-blue-300 bg-transparent border-0 border-b border-transparent p-0 focus:outline-none focus:shadow-none focus:border-blue-300 w-full"
    type="text"
    value=${text}
    @change=${() => changeValues(name)}
  />
`;

const inputOutputDate = (name, textSize = "text-base") => html`
  <input
    id="${name}"
    class="form-input ${textSize} mb-4 rounded-none self-center text-blue-300 bg-transparent border-0 border-b border-transparent p-0 focus:outline-none focus:shadow-none focus:border-blue-300 w-full"
    type="date"
    @change=${() => changeValues(name)}
  />
`;

const header = text => html`
  <div class="flex flex-wrap overflow-hidden bg-blue-700 -mx-6 -my-4 px-6 py-4 mb-4">
    ${text}
  </div>
`;

const invoice2Column = (text, value) =>
  html`
    <div id="${text}LabelWrapper" class="flex flex-row">
      ${inputLabel(text)} ${inputOutput(text, value)}
    </div>
  `;

// ${invoice2Column("invoiceDate", "20200101")} ${invoice2Column("dueDate", "20200101")}

const invoiceLayout = text =>
  html`
    ${header("Invoice Details")} ${inputLabel("invoice", "text-5xl")} ${invoice2Column("invoiceNum", 100)}
    <div id="invoiceDateLabelWrapper" class="flex flex-row">
      ${inputLabel("invoiceDate")} ${inputOutputDate("invoiceDate")}
    </div>
    <div id="dueDateLabelWrapper" class="flex flex-row">
      ${inputLabel("dueDate")} ${inputOutputDate("dueDate")}
    </div>
    ${invoice2Column("paymentTerms", 100)} ${invoice2Column("purchaseOrder", 100)}
    <label class="block text-base font-semibold mt-6 mb-2 w-full ${alignment}">${lang["optionalFields"]} - ${lang["clickToAdd"]}</label>
    <div id="optional${initCap(text)}Details" class="flex flex-wrap text-sm text-white -mr-2"></div>
  `;

const companyLayout = text =>
  html`
    ${header("Company Details")} ${inputLabel("billFrom")} ${inputOutput("sellerCompany", lang["companyName"])}
    ${inputOutput("sellerAddressLine1", lang["addressLine1"])} ${inputOutput("sellerAddressLine2", lang["addressLine2"])}
    ${inputOutput("sellerAddressLine3", lang["addressLine3"])} ${inputOutput("sellerAddressLine4", lang["addressLine4"])}
    ${inputOutput("sellerPhone", lang["phone"])} ${inputOutput("sellerEmail", lang["email"])} ${inputOutput("website", lang["website"])}
    ${inputOutput("facebook", lang["facebook"])} ${inputOutput("twitter", lang["twitter"])} ${inputOutput("instagram", lang["instagram"])}
    <label class="block text-base font-semibold mt-6 mb-2 w-full ${alignment}">${lang["optionalFields"]} - ${lang["clickToAdd"]}</label>
    <div id="optional${initCap(text)}Details" class="flex flex-wrap text-sm text-white -mr-2"></div>
  `;

const customerLayout = text =>
  html`
    ${header("Customer Details")} ${inputLabel("billTo")} ${inputOutput("clientCompany", lang["companyName"])}
    ${inputOutput("clientAddressLine1", lang["addressLine1"])} ${inputOutput("clientAddressLine2", lang["addressLine2"])}
    ${inputOutput("clientAddressLine3", lang["addressLine3"])} ${inputOutput("clientAddressLine4", lang["addressLine4"])}
    ${inputOutput("clientPhone", lang["phone"])} ${inputOutput("clientEmail", lang["email"])}
    <label class="block text-base font-semibold mt-6 mb-2 w-full ${alignment}">${lang["optionalFields"]} - ${lang["clickToAdd"]}</label>
    <div id="optional${initCap(text)}Details" class="flex flex-wrap text-sm text-white -mr-2"></div>
  `;

render(invoiceLayout("invoice"), document.getElementById("newInvoiceCard"));
render(companyLayout("company"), document.getElementById("newCompanyCard"));
render(customerLayout("customer"), document.getElementById("newCustomerCard"));
// const itemFieldsTemplate = html`
//   ${labelRequiredEditable("itemName")} ${inputText("itemName")} ${labelRequiredEditable("itemDescription")} ${inputText("itemDescription")}
//   ${labelRequiredEditable("quantity")} ${inputText("quantity")} ${labelRequiredEditable("unitPrice")} ${inputText("unitPrice")}
//   ${labelRequiredEditable("tax")} ${inputText("tax")} ${labelRequiredEditable("extendedPrice")} ${inputText("extendedPrice")}
// `;

// render(itemFieldsTemplate, document.getElementById("itemFields"));

const invoiceDetailsTemplate = html` ${add2ColumnButton("paymentTerms")} ${add2ColumnButton("purchaseOrder")} `;

render(invoiceDetailsTemplate, document.getElementById("optionalInvoiceDetails"));

const companyDetailsTemplate = html`
  ${addButton("companyLogo")} ${addButton("sellerPhone", "phone")} ${addButton("sellerEmail", "email")} ${addButton("website", "website")}
  ${addButton("facebook", "facebook")} ${addButton("twitter", "twitter")} ${addButton("instagram", "instagram")} ${addButton("customField")}
  ${addButton("customField")}
`;

render(companyDetailsTemplate, document.getElementById("optionalCompanyDetails"));

const customerDetailsTemplate = html` ${addButton("phone")} ${addButton("email")} ${addButton("customField")} ${addButton("customField")}`;

render(customerDetailsTemplate, document.getElementById("optionalCustomerDetails"));

const itemTable = text =>
  html`
    <div class="overflow-x-auto">
      <table id="id_of_table" border="1">
        <tr>
          <th class="px-2">${inputLabel("serialNumber")}</th>
          <th class="px-2">${inputLabel("item")}</th>
          <th class="px-2">${inputLabel("quantity")}</th>
          <th class="px-2">${inputLabel("unitPrice")}</th>
          <th class="px-2">${inputLabel("tax")}</th>
          <th class="px-2">${inputLabel("discount")}</th>
          <th class="px-2">${inputLabel("total")}</th>
        </tr>
        <tr>
          <td>2</td>
          <td>Newport Jeans<br />Size 34</td>
          <td>1</td>
          <td>34.99</td>
          <td>1.99</td>
          <td>3.99</td>
          <td>32.99</td>
        </tr>
        <tr>
          <td>3</td>
          <td class="whitespace-no-wrap">three three three three</td>
          <td class="whitespace-no-wrap">trois troistrois trois trois trois</td>
          <td class="whitespace-no-wrap">drei drei drei drei drei</td>
          <td>1.99</td>
          <td>3.99</td>
          <td>32.99</td>
        </tr>
      </table>
    </div>
  `;

render(itemTable(), document.getElementById("itemDetailCard"));

pdfMake.vfs = pdfFonts.pdfMake.vfs;
// pdfMake.vfs = pdfFonts.vfs;
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// var derivedLang = "es";
if (lang) assignValues();

// loadjs(["./locales/locale.es.js"], {
//   success: assignValues
// });

// loadjs("locales/locale.es.js", assignValues);

// loadjs("./locales/locale.es.js", assignValues);

// pdfMake.fonts = {
//   // PTSans: {
//   //   normal: "PTSans-Regular.ttf",
//   //   bold: "PTSans-Bold.ttf",
//   //   italics: "PTSans-Regular.ttf",
//   //   bolditalics: "PTSans-Regular.ttf"
//   // },
//   // SourceSans: {
//   //   normal: "SourceSansPro-Regular.ttf",
//   //   bold: "SourceSansPro-Bold.ttf",
//   //   italics: "SourceSansPro-Regular.ttf",
//   //   bolditalics: "SourceSansPro-Regular.ttf"
//   // },
//   // Roboto: {
//   //   normal: "Roboto-Regular.ttf",
//   //   bold: "Roboto-Medium.ttf",
//   //   italics: "Roboto-Regular.ttf",
//   //   bolditalics: "Roboto-Regular.ttf"
//   // },
//   VarelaRound: {
//     normal: "VarelaRound-Regular.ttf",
//     bold: "VarelaRound-Regular.ttf",
//     italics: "VarelaRound-Regular.ttf",
//     bolditalics: "VarelaRound-Regular.ttf"
//   }
// };

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

function changeValues(text) {
  variables[text] = id(text).value;
  renderlayout1();
}

function changeLabel(text) {
  variables[text + "Label"] = id(text + "Label").value;
  renderlayout1();
}

function renderNew(def) {
  pdfMake.createPdf(def).getDataUrl(function (dataURL) {
    renderPDF(dataURL);
  });
}

function renderPDF(url, options) {
  options = options || { scale: 0.95 };

  function renderPage(page) {
    var viewport = page.getViewport(options);
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
  var loadingTask = PDFJS.getDocument(url);
  loadingTask.promise.then(function (pdf) {
    renderPages(pdf);
  });
}

(function () {
  // Get relevant elements and collections
  const tabbed = document.querySelector(".tabbed");
  const tablist = tabbed.querySelector("ul");
  const tabs = tablist.querySelectorAll("a");
  const panels = tabbed.querySelectorAll('[id^="section"]');

  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute("tabindex");
    // Set the selected state
    newTab.setAttribute("aria-selected", "true");
    oldTab.removeAttribute("aria-selected");
    oldTab.setAttribute("tabindex", "-1");
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  };

  // Add the tablist role to the first <ul> in the .tabbed container
  tablist.setAttribute("role", "tablist");

  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("id", "tab" + (i + 1));
    tab.setAttribute("tabindex", "-1");
    tab.parentNode.setAttribute("role", "presentation");

    // Handle clicking of tabs for mouse users
    tab.addEventListener("click", e => {
      e.preventDefault();
      let currentTab = tablist.querySelector("[aria-selected]");
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });

    // Handle keydown events for keyboard users
    tab.addEventListener("keydown", e => {
      // Get the index of the current tab in the tabs node list
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? "down" : null;
      if (dir !== null) {
        e.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === "down" ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
      }
    });
  });

  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "-1");
    let id = panel.getAttribute("id");
    panel.setAttribute("aria-labelledby", tabs[i].id);
    panel.hidden = true;
  });

  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute("tabindex");
  tabs[0].setAttribute("aria-selected", "true");
  panels[0].hidden = false;
})();
