let Templates = {
  openQuestionBody (index) {
    return `
    <ul class="list-group text-left py-sm-2 mt-2 mb-2 question-item-${index}" data-number="${index}">`
  },
  closeQuestionBody () {
    return `${Templates.progressBarItem()}
    </ul>
    `
  },
  progressBarItem () {
    return `<li class="list-group-item list-group-item-secondary">
    <div class="progress">
      <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      25% Complete
      </div>
    </div>
    </li>`
  },
  questionItemBody (index, totalQuestions, commonArgs, argsEn) {
    return `
      ${Templates.questionIndexer(index, totalQuestions)}
      ${Templates.questionItself(argsEn)}
      ${Templates.questionImage(commonArgs)}
      `
  },
  questionIndexer (qIndex, totalQuestions) {
    return `<li class="list-group-item list-group-item-dark text-center question-indexer">Question ${(qIndex + 1)} of ${totalQuestions}</li>`
  },
  questionItself (argsEn) {
    if (argsEn.question !== 'null') {
      return `<li class="list-group-item question-text">${argsEn.question}</li>`
    }
  },
  questionImage (commonArgs) {
    if (commonArgs.diagram !== 'null') {
      return `
        <li class="list-group-item">
        <img src="data:image/png;base64,${commonArgs.diagram}" onclick="EnlargeImage.clickToEnlarge(this)" alt="question image">
        </li>
      `
    }
    return ``
  },
  questionReferral (argsEn) {
    if (argsEn.referralEn !== null) {
      let discoverEn = 'file=discover.pdf'
      let hostname = 'http://' + window.location.host + '/'
      let link = `<a href="${hostname}pdfviewer/web/viewer.html?${discoverEn}#${argsEn.referralEn}" target="_blank">page #${argsEn.referralEn}</a>`
      return `<p>Please consult Discover Canada Study Guide ${link} for answer</p>`
    }
  },
  mcQuestion (commonArgs, argsEn) {
    return `<li class="list-group-item list-group-item-action question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input q-option" type="radio" value="1" name="${commonArgs.questionId}">
                  ${argsEn.optionA}
              </label>
          </div>
      </li>
      <li class="list-group-item list-group-item-action question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input q-option" type="radio" value="2" name="${commonArgs.questionId}">
                  ${argsEn.optionB}
              </label>
          </div>
      </li>
      <li class="list-group-item list-group-item-action question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input q-option" type="radio" value="3" name="${commonArgs.questionId}">
                  ${argsEn.optionC}
              </label>
          </div>
      </li>
      <li class="list-group-item list-group-item-action question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input q-option" type="radio" value="4" name="${commonArgs.questionId}">
                  ${argsEn.optionD}
              </label>
          </div>
      </li>`
  },
  tfQuestion (commonArgs) {
    return `<li class="list-group-item list-group-item-action question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input q-option" type="radio" value="0" name="${commonArgs.questionId}">
                  True
              </label>
          </div>
      </li>
      <li class="list-group-item list-group-item-action question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input q-option" type="radio" value="1" name="${commonArgs.questionId}">
                  False
              </label>
          </div>
      </li>`
  },
  finishNextPrevButtons () {
    return `<div class="float-right" id="next-prev-div">
                <button type="button" class="btn btn-primary" id="prev-button">Prev</button>
                <button type="button" class="btn btn-primary ml-2" id="next-button">Next</button>
            </div>
            <button type="submit" class="btn btn-success mb-sm-2">Finish</button>`
  },
  navigateItemsWithButton (length) {
    let h = `<div class="row">`
    for (let i = 0; i < length; i++) {
      let num = (i + 1)
      h += `<div class="col mt-2">
        <button type="button" class="btn btn-outline-primary btn-item btn-navigator-${num}"
        onclick="NavigateItemByIndex.onclickButtonWithIndex(${num})">`
      if (num < 10) {
        num = '0' + (i + 1)
      }
      h += `${num}</button></div>`
    }
    h += `</div>`
    return h
  }
}
