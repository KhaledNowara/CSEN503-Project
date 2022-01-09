db = ['sentence', 'word', 'letter', 'perfect', 'perfect_sentence', 'perfect_word', 'perfect_letter', 'man', 'woman']


def predict_wrong_input(wrong_input: str, predictions):
    """Predicts a close enough string match to the input from a list, dictionary, etc..

    Parameters
    ----------
    wrong_input : str
        The input we want to correct
    predictions : iter
        An iterable that we will check the wrong input against the

    Returns
    -------
    best_prediction: str
        A string from the predictions iterable that is close by 40% or more to the wrong input
    """
    best_predictions = set()
    for word in predictions:
        res = len(set(wrong_input).intersection(word)) / \
            len(max(wrong_input, word)) * 100
        if res >= 60:
            best_predictions.add(word)

    return best_predictions



trial = 'sntence'
print(predict_wrong_input(trial, db))