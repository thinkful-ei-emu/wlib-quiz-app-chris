class TriviaApi {
  static BASE_URL = 'https://opentdb.com/api.php';

  // Warning! No error handling implemented -- assume will always receive JSON response
  fetchQuestions(amt = 10) {
    const url = new URL(TriviaApi.BASE_URL);
    url.searchParams.set('amount', amt);
    return fetch(url)
      .then(res => res.json());
  }
}

export default TriviaApi;
