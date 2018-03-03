
const NextPrevDiv = {
  nextBtn: null,
  prevBtn: null,
  listGroup: {
    main: '.list-group',
    first: ' .list-group:first',
    last: ' .list-group:last',
    visible: ' .list-group:visible',
  },
  setConstruct(args) { // call after items are created
    NextPrevDiv.nextBtn = args.nextBtn;
    NextPrevDiv.prevBtn = args.prevBtn;
    NextPrevDiv.clickNextButton();
    NextPrevDiv.clickPrevButton();
  },
  clickNextButton() {
    const itemClass = NextPrevDiv.listGroup.main;
    const visibleItem = NextPrevDiv.listGroup.visible;
    const firstItem = NextPrevDiv.listGroup.first;
    $(NextPrevDiv.nextBtn).click(() => {
      if ($(QCatalog.questionForm + visibleItem).next(itemClass).length !== 0) {
        $(QCatalog.questionForm + visibleItem).next(itemClass).show().prev(itemClass)
          .hide();
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + visibleItem).attr('data-number'));
      } else {
        $(QCatalog.questionForm + visibleItem).hide();
        $(QCatalog.questionForm + firstItem).show();
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + firstItem).attr('data-number'));
      }
      return false;
    });
  },
  clickPrevButton() {
    const itemClass = NextPrevDiv.listGroup.main;
    const visibleItem = NextPrevDiv.listGroup.visible;
    const lastItem = NextPrevDiv.listGroup.last;
    $(NextPrevDiv.prevBtn).click(() => {
      if ($(QCatalog.questionForm + visibleItem).prev(itemClass).length !== 0) {
        $(QCatalog.questionForm + visibleItem).prev(itemClass).show().next(itemClass)
          .hide();
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + visibleItem).attr('data-number'));
      } else {
        $(QCatalog.questionForm + visibleItem).hide();
        $(QCatalog.questionForm + lastItem).show();
        NavigateItemByIndex.setItemButtonToActive($(QCatalog.questionForm + lastItem).attr('data-number'));
      }
      return false;
    });
  },
};
