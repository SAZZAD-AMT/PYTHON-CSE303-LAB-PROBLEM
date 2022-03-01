def series_sum(number):
    if(number == 0):
        return 0
    else:
        return (number * number) + series_sum(number - 1)

N = int(input("Enter positive integer N : "))
sum = series_sum(N)
print("The Sum of Series 1 to N^2 is %d" %sum)