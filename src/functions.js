// Area function
const area = (length, breadth) => {
    let a = length * breadth;
    console.log("Area of the rectangle is " + a + " square unit");
};

const spacer = height => {
    return {
        svg: '<svg width="10" height="' + height + '"><rect style="fill:transparent" /></svg>'
    };
};

const coloredRect = (height, color) => {
    return {
        layout: "noBorders",
        table: {
            widths: ["*"],
            heights: [height],
            body: [[{ text: "", fillColor: color }]]
        }
    };
};

const labelText = (text = "TEXT", color = "black", fontSize = "font22", alignment = "left") => {
    return {
        text: text,
        style: [color, fontSize, alignment]
    };
};

const textWithRule = () => {
    return {
        table: {
            widths: ["auto"],
            // widths: [ '*', 'auto', 100, '*' ],
            body: [[labelText("labelInvoice", "red", "font48", "right")], [""]]
        },
        layout: {
            hLineWidth: function(i, node) {
                return i === 0 || i === node.table.body.length ? 0 : 1;
            },
            vLineWidth: function(i, node) {
                return 0;
            }
        }
    };
};

const lightenDarkenColor = (col, amt) => {
    let usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let b = ((num >> 8) & 0x00ff) + amt;
    let g = (num & 0x0000ff) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

module.exports = {
    spacer,
    coloredRect,
    lightenDarkenColor,
    labelText,
    textWithRule
};
