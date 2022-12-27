def titleize(phrase):
    """Return phrase in title case (each word capitalized).

    >>> titleize('this is awesome')
    'This Is Awesome'

    >>> titleize('oNLy cAPITALIZe fIRSt')
    'Only Capitalize First'
    """
    parts = ["{}{}".format(x[0].upper(), x[1:]) for x in phrase.lower().split(" ")]
    return " ".join(parts)
