def valid_parentheses(parens):
    """Are the parentheses validly balanced?

    >>> valid_parentheses("()")
    True

    >>> valid_parentheses("()()")
    True

    >>> valid_parentheses("(()())")
    True

    >>> valid_parentheses(")()")
    False

    >>> valid_parentheses("())")
    False

    >>> valid_parentheses("((())")
    False

    >>> valid_parentheses(")()(")
    False
    """
    if len(parens) % 2 == 1:
        return False

    parens = [1 if x == "(" else -1 for x in parens]

    if parens[0] == -1 or parens[-1] == 1:
        return False

    for i in range(len(parens)):
        if parens[i] == 1 and parens[i + 1] == -1:
            parens[i] = 0
            parens[i + 1] = 0
        if parens[i] == 1 and parens[-i - 1] == -1:
            parens[i] = 0
            parens[-i - 1] = 0

    for x in parens:
        if x != 0:
            return False

    return True
