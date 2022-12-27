def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

    >>> vowel_count('rithm school')
    {'i': 1, 'o': 2}

    >>> vowel_count('HOW ARE YOU? i am great!')
    {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowels = ["a", "e", "i", "o", "u"]
    frequency = {}
    for c in phrase:
        c = c.lower()
        if c in vowels:
            if c in frequency:
                frequency[c] = frequency[c] + 1
            else:
                frequency[c] = 1
    return frequency
