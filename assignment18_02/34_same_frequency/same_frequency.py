def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

    >>> same_frequency(551122, 221515)
    True

    >>> same_frequency(321142, 3212215)
    False

    >>> same_frequency(1212, 2211)
    True
    """
    str1 = str(num1)
    str2 = str(num2)

    if len(str1) != len(str2):
        return False

    frequency1 = {}
    frequency2 = {}

    for digit in str1:
        if digit in frequency1:
            frequency1[digit] = frequency1[digit] + 1
        else:
            frequency1[digit] = 1

    for digit in str2:
        if digit in frequency2:
            frequency2[digit] = frequency2[digit] + 1
        else:
            frequency2[digit] = 1

    for digit in frequency1:
        if frequency1[digit] != frequency2[digit]:
            return False

    return True
