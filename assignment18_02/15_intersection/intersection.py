def intersection(l1, l2):
    """Return intersection of two lists as a new list::

    >>> intersection([1, 2, 3], [2, 3, 4])
    [2, 3]

    >>> intersection([1, 2, 3], [1, 2, 3, 4])
    [1, 2, 3]

    >>> intersection([1, 2, 3], [3, 4])
    [3]

    >>> intersection([1, 2, 3], [4, 5, 6])
    []
    """
    if len(l1) <= len(l2):
        return [x for x in l2 if x in l1]
    else:
        return [x for x in l1 if x in l2]
