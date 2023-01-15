"""Word Finder: finds random words from a dictionary."""
import random


class WordFinder:
    """
    Loads a list of words from a file and allows selection of a random word

    >>> wf = WordFinder("words.txt")
    235886 words read

    >>> alphabet = 'abcdefghijklmnopqrstuvwxyz'
    >>> word = wf.random()
    >>> [True if c in alphabet else False for c in word.lower()].count(True) == len(word)
    True

    >>> len(word) > 0
    True
    """

    def __init__(self, filepath):
        self.filepath = filepath
        self.words = []
        self.load(filepath)

    def load(self, filepath):
        """load list of words from specified filepath"""
        try:
            with open(filepath) as f:
                self.words = [line.rstrip() for line in f.readlines()]
                print(f"{len(self.words)} words read")
        except:
            print("Unable to load file")

    def random(self):
        """select a random word from word list"""
        index = random.randint(0, len(self.words) - 1)
        return self.words[index]


class SpecialWordFinder(WordFinder):
    """
    Loads a list of words from a file and allows selection of a random word

    >>> swf = SpecialWordFinder("special-words.txt")
    235886 words read by SpecialWordFinder
    """

    def __init__(self, filepath):
        super().__init__(filepath)

    def load(self, filepath):
        """load list of words from sepcified filepath excluding blank lines and comments"""
        try:
            with open(filepath) as f:
                for line in f.readlines():
                    line = line.rstrip().lstrip()
                    if len(line) > 0 and line[0] != "#":
                        self.words.append(line)
                print(f"{len(self.words)} words read by SpecialWordFinder")
        except:
            print("Unable to load file")
