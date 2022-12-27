from math import sqrt


def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    factors = [1]
    limit = int(sqrt(num))

    for n in range(2, limit):
        if num % n == 0:
            factors.append(n)
            factors.append(int(num / n))

    factors.sort()
    factors.append(num)
    return factors
