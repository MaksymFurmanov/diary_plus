const handleDownload = (documentURL: string | undefined, name: string) => {
    if(!documentURL) throw new Error("Test document not found");

    const link = document.createElement('a');
    link.target = "_blank";
    link.href = documentURL;
    link.download = name;
    link.click();
};

export default handleDownload;