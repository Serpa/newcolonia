import React, { Component } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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

export default function Docx(props) {
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, "0");
  var mes = String(data.getMonth() + 1).padStart(2, "0");
  var ano = data.getFullYear();
  var dataAtual = dia + "/" + mes + "/" + ano;
  const pescador = { ...props.pescador, data: dataAtual };
  // const content = path.resolve(__dirname, "docs", "formulario.docx");
  const content = props.doc.urlDocumento;
  const generateDocument = () => {
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

  return (
    <Button style={{ width: "100%" }} onClick={generateDocument}>
      {props.children}
    </Button>
  );
}
