export const saveFile = (data: string, fileName: string) => {
  const linkSource = `${data}`;
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  downloadLink.href = linkSource;
  downloadLink.target = "_self";
  downloadLink.download = fileName;
  downloadLink.click();
};
