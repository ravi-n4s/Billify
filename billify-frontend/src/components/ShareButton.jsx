const ShareButton = ({ pdf, isWebShareSupported, editedEvent, config }) => {
  const sharePDF = async () => {
    try {
      await navigator.share({
        files: [new File([pdf], "bill.pdf", { type: "application/pdf" })],
        title: `${editedEvent.name}-${config.brand}_${editedEvent.type}.pdf`,
        text: `This document contains a detailed ${editedEvent.type} bill for event.`,
      });
    } catch (error) {
      console.error("Error sharing PDF:", error.message);
    }
  };

  return (
    <button
      onClick={sharePDF}
      className="btn btn-info rounded-pill px-3 px-sm-5"
      disabled={!isWebShareSupported}
    >
      <i className="bi bi-share-fill me-2"></i>
    </button>
  );
};

export default ShareButton;
