const EnlargeImage = {
  imageOverlay: null,
  imageOverlayClose: null,
  setConstruct (args) {
    EnlargeImage.imageOverlay = args.imageOverlay;
    EnlargeImage.imageOverlayClose = args.imageOverlayClose;
  },
  clickToEnlarge (ele) {
    let imageSource = $(ele).attr('src');
    $(EnlargeImage.imageOverlay).find('img').attr('src', imageSource);
    $(EnlargeImage.imageOverlay).fadeIn(100);
    EnlargeImage.closeImageOverlay();
  },
  closeImageOverlay () {
    $(EnlargeImage.imageOverlayClose).click(function () {
      $(EnlargeImage.imageOverlay).fadeOut(100);
    });
  }
};
