/* eslint-disable no-undef */
const LoadQuestionItems = {
  userOptions: null,
  setUserOptions (options) {
    LoadQuestionItems.userOptions = options;
  },
  load: function (handleData) {
    $.ajax({
      type: 'GET',
      url: 'model/cct-questions.php',
      data: LoadQuestionItems.userOptions,
      dataType: 'xml'
    }).done(function (response) {
      handleData(response);
    });
  }
};
const LoadResults = {
  queryString: null,
  setQueryString (userAnswers) {
    LoadResults.queryString = userAnswers;
  },
  load: function (handleData) {
    $.ajax({
      type: 'GET',
      url: 'model/cct-results.php',
      data: LoadResults.queryString
    }).done(function (response) {
      handleData(response);
    });
  }
};
