import re

with open('meeseeks.txt', 'r') as fh:
    with open('messages.txt', 'w') as output:
        b = fh.readline()
        while b:
            if b.lower().startswith('meeseeks'):
                # print(b)
                print(re.sub(r'meeseeks[^:]*:(.+)\s*',r'\1', b, flags=re.I))
            b = fh.readline()