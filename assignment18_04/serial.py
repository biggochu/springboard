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
        """Create SerialGenerator with initial start and num"""
        self.start = start
        self.num = start

    def __repr__(self):
        return f"<SerialGenerator start={self.start} next={self.num}>"

    def generate(self):
        """Increment num and return value before increment"""
        num = self.num
        self.num = self.num + 1
        return num

    def reset(self):
        """Reset num to start value"""
        self.num = self.start


class SerialYieldGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialYieldGenerator(start=100)

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
        """Create SerialYieldGenerator with initial start and next"""
        self.start = start
        self.next = start
        self.generator = self.yield_generator()

    def __repr__(self):
        return f"<SerialYieldGenerator start={self.start} next={self.next}>"

    def yield_generator(self):
        """Utilize yield to generate next number"""
        num = self.start

        while True:
            yield num
            num = num + 1
            self.next = num

    def generate(self):
        """Return next number"""
        return next(self.generator)

    def reset(self):
        """Reset generator and update next to start"""
        self.generator = self.yield_generator()
        self.next = self.start
