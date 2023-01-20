import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

const path = require("path");
let PizZipUtils = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
var data = new Date();
var dia = String(data.getDate()).padStart(2, "0");
var mes = String(data.getMonth() + 1).padStart(2, "0");
var ano = data.getFullYear();
var dataAtual = dia + "/" + mes + "/" + ano;

export const generateDocument = (pescadorData,docData) => {
  const pescador = { ...pescadorData, data: dataAtual };
  const content = docData.urlDocumento;
  console.log(pescador,content);
  loadFile(content, function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter() {
        return "";
      },
    });

    doc.render(pescador);
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }); //Output the document using Data-URI
    saveAs(out, "output.docx");
  });
};
