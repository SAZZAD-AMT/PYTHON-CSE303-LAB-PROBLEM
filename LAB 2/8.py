highest={num: max([divisor for divisor in range(1,10) if num % divisor == 0]) 
         for num in range(1,1001)}
print(highest)