def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = ["a", "e", "i", "o", "u"]
    vowel_matches = [(i, s[i]) for i in range(len(s)) if s.lower()[i] in vowels]

    for i in range(len(vowel_matches) // 2):
        match1 = vowel_matches[i]
        match2 = vowel_matches[-i - 1]
        s = s[: match1[0]] + match2[1] + s[match1[0] + 1 :]
        s = s[: match2[0]] + match1[1] + s[match2[0] + 1 :]

    return s
