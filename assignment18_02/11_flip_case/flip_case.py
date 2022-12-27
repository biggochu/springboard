def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

    >>> flip_case('Aaaahhh', 'a')
    'aAAAhhh'

    >>> flip_case('Aaaahhh', 'A')
    'aAAAhhh'

    >>> flip_case('Aaaahhh', 'h')
    'AaaaHHH'

    """
    s = ""
    for c in phrase:
        if c.lower() == to_swap.lower():
            if c.islower():
                s = s + c.upper()
            elif c.isupper():
                s = s + c.lower()
        else:
            s = s + c
    return s
