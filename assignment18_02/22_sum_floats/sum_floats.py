def sum_floats(nums):
    """Return sum of floating point numbers in nums.

    >>> sum_floats([1.5, 2.4, 'awesome', [], 1])
    3.9

    >>> sum_floats([1, 2, 3])
    0
    """
    return sum([x for x in nums if isinstance(x, float)])
