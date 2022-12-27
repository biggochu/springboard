def friend_date(a, b):
    """Given two friends, do they have any hobbies in common?

    - a: friend #1, a tuple of (name, age, list-of-hobbies)
    - b: same, for friend #2

    Returns True if they have any hobbies in common, False is not.

        >>> elmo = ('Elmo', 5, ['hugging', 'being nice'])
        >>> sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
        >>> gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])

        >>> friend_date(elmo, sauron)
        False

        >>> friend_date(sauron, gandalf)
        True
    """
    in_common = False
    hobbies_a = a[2]
    hobbies_b = b[2]

    if len(hobbies_a) <= len(hobbies_b):
        for hobby in hobbies_b:
            if hobby in hobbies_a:
                in_common = True
    else:
        for hobby in hobbies_a:
            if hobby in hobbies_b:
                in_common = True

    return in_common
