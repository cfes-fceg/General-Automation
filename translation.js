const mammoth = require("mammoth");
const translate = require('@k3rn31p4nic/google-translate-api');
const docGenerator = require("docx");
const fs = require('fs');

const toFrench = getArg(2).toUpperCase() === 'F';
const filePath = "./" + (getArg(3) !== undefined ? getArg(3) : "./translate_me.docx");
const outputPath = "./" + (getArg(4) !== undefined ? getArg(4) : "./translated.docx");

mammoth.extractRawText({path: filePath})
    .then(function (result) {
        execTranslation(result.value).then(text => {
            outputToWord(text);
        }).catch(err => {
            console.error("Error translating: " + err);
        });
    }).catch(function (err) {
    console.error("Error extracting text: " + err);
});

function execTranslation(text) {
    let target = toFrench ? "fr" : "en";
    let from = toFrench ? "en" : "fr";
    return new Promise(function (resolve, reject) {
        translate(text, {to: target, from: from}).then(res => {
            resolve(res.text);
        }).catch(err => {
            reject(err);
        });
    });
}

function outputToWord(text) {
    let paragraph = new docGenerator.Paragraph();
    let textLines = text.split("\n");
    for (let line of textLines){
        let textRun = new docGenerator.TextRun(line).font("Calibri").break();
        paragraph.addRun(textRun);
    }
    let translatedDoc = new docGenerator.Document();
    translatedDoc.addParagraph(paragraph);
    let packer = new docGenerator.Packer();
    packer.toBuffer(translatedDoc).then((buffer) => {
        fs.writeFileSync(outputPath, buffer);
    });
}

function getArg(pos) {
    return process.argv.slice(pos)[0];
}