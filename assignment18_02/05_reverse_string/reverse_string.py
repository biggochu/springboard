def reverse_string(phrase):
    """Reverse string,

    >>> reverse_string('awesome')
    'emosewa'

    >>> reverse_string('sauce')
    'ecuas'
    """

    phrase = [c for c in phrase]
    phrase.reverse()
    return "".join(phrase)
