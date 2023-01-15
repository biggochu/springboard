"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        self.start = start
        self.num = start

    def generate(self):
        """Increment num and return value before increment"""
        num = self.num
        self.num = self.num + 1
        return num

    def reset(self):
        """Reset num to start value"""
        self.num = self.start
