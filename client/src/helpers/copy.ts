export const copyToClipboard = (text: string) => {
  const doc = document.getSelection() as any;
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected = doc.rangeCount > 0 ? doc.getRangeAt(0) : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    doc.removeAllRanges();
    doc.addRange(selected);
  }
};
