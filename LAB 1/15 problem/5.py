def prime_find_2019_1_60_063(number):
    if number>1:
        for i in range(2,number):
            if (number % i) == 0:
                return True
            else:
                False
    else: 
        False

N = int(input("Enter positive integer N : "))
if (prime_find_2019_1_60_063(N)==True):
    print(N, "is not a prime number")
else:
    print("%d is a prime number" %N)