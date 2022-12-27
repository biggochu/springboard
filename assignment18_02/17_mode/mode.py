def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    frequency = {}
    for n in nums:
        if n in frequency:
            frequency[n] = frequency[n] + 1
        else:
            frequency[n] = 1

    highest = 0
    highest_n = None
    for n, count in frequency:
        if highest < count:
            highest = count
            highest_n = n
    return highest_n
