def get(url):
    return fetch(url)

def print(b):
    console.log(b)
    return 1

print(1)
print("hi" == "n")

if "hi" == "hi":
    print("hi == hi")

if "d" == "n":
    print("d == n")
elif "d" == "d":
    print("sure")

a = 1
a = a + 1
a = a - 1
print(a)

print(2 > 1)
print(3 < 6)
print(2 >= 2)
print(3 <= 3)

a = 5
b = 2
if a > b: print("a is greater than b") 

yes = "world"
print(f"hello {yes}")