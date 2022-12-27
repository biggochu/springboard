def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

    >>> multiple_letter_count('yay')
    {'y': 2, 'a': 1}

    >>> multiple_letter_count('Yay')
    {'Y': 1, 'a': 1, 'y': 1}
    """
    frequency = {}
    for c in phrase:
        if c in frequency:
            frequency[c] = frequency[c] + 1
        else:
            frequency[c] = 1
    return frequency
