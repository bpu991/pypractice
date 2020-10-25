//create host element
const aceEditor = document.createElement("div");
//append to body
// document.body.append(aceEditor);
const parent = document.getElementById('editor');
parent.appendChild(aceEditor);
//initialize code editor in element
const acer = window.ace.edit(aceEditor, {
  mode: "ace/mode/python",
  selectionStyle: "text",
});
//configure ace code editor
acer.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  maxLines: Infinity,
  fontSize: "100%",
  showPrintMargin: true,
  minLines: 40,
  maxLines: Infinity,
  fontSize: "100%",
  mode: "ace/mode/python",
  selectionStyle: "text",
  autoScrollEditorIntoView: true,
  animatedScroll: true,
});
acer.setTheme("ace/theme/tomorrow_night_blue");
