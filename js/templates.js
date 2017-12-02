let Templates = {
  openQuestionBody () {
    return `
    <ul class="list-group text-left py-sm-2 question-item">`
  },
  closeQuestionBody () {
    return `
    </ul>
    `
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
      return commonArgs.diagram
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
    return `<li class="list-group-item question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="option" value="1" name="${commonArgs.questionId}">
                  ${argsEn.optionA}
              </label>
          </div>
      </li>
      <li class="list-group-item question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="option" value="2" name="${commonArgs.questionId}">
                  ${argsEn.optionB}
              </label>
          </div>
      </li>
      <li class="list-group-item question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="option" value="3" name="${commonArgs.questionId}">
                  ${argsEn.optionC}
              </label>
          </div>
      </li>
      <li class="list-group-item question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="option" value="4" name="${commonArgs.questionId}">
                  ${argsEn.optionD}
              </label>
          </div>
      </li>`
  },
  tfQuestion (commonArgs) {
    return `<li class="list-group-item question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="option" value="0" name="${commonArgs.questionId}">
                  True
              </label>
          </div>
      </li>
      <li class="list-group-item question-option">
          <div class="form-check">
              <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="option" value="1" name="${commonArgs.questionId}">
                  False
              </label>
          </div>
      </li>`
  }
}
