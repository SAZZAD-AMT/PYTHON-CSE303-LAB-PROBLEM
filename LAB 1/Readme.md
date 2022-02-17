
# PYTHON CSE303 LAB 1

---
# 1.Given two integer numbers, write a Python program to return their product. If the product is greater than 1000, then return their sum. Read inputs from the user.
---

```
a = int(input("Enter a: "))
b = int(input("Enter b: "))

product=a*b

if(product>1000):
    sum=a+b
    print("Sum is = %d" %sum)
else: 
    print("Product is = %d" %product)
```

    
---
# 2.Write a Python program to find the area and perimeter of a circle. Read inputs from the user. 
---
```
import math

def circle_rad(radius):
    return math.pi*radius*radius

def circle_peri(radius):
    return 2* math.pi*radius

radius = float (input("Enter radius: "))
area= circle_rad(radius)
print("Area = ", area)

perimeter= circle_peri(radius)
print("Perimeter = ", perimeter)
```
---
# 3.Write a Python program to calculate the compound interest based on the given formula. Read inputs from the user. A = P * (1 + R/100)T where P is the principle amount, R is the interest rate and T is time (in years).Define a function named as compound_interest_<your-student-id> in your program.
```
def compound_interest_2019_1_60_063(P,R,T):
    return P*(1+(R/100))**T

P = float(input("Enter principle amount: "))
R = float(input("Enter interest amount: "))
T = float(input("Enter time(years): "))
com_intreast= compound_interest_2019_1_60_063(P,R,T)
print("compound interest based on the given formula is= ", com_intreast)
```
---
# 4.Given a positive integer N (read from the user), write a Python program to calculate the value of the following series. 1^2 + 2^2 + 3^2 + 4^2 ….. + N^2

```
def series_sum(number):
    if(number == 0):
        return 0
    else:
        return (number * number) + series_sum(number - 1)

N = int(input("Enter positive integer N : "))
sum = series_sum(N)
print("The Sum of Series 1 to N^2 is %d" %sum)
```
---
# 5.Given a positive integer N (read from the user), write a Python program to check if the number is prime or not. Define a function named as prime_find_<your-student-id> in your program
```
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
```
---    
# 6.Given a positive integer n (read from the user), write a Python program to find the n-th Fibonacci number based on the following assumptions.
# Fn = Fn-1 + Fn-2 where F0 = 0 and F1 = 1
```
def fibo(n):
	if n==0:
		return 0
	elif n==1:
		return 1
	else:
		return fibo(n-1)+fibo(n-2)

n = int(input("Enter positive integer n : "))
if(n<0):
    print("Wrong input")
else: 
    print("nth fibonacci number is = %d" %fibo(n))
```
---   
# 7. Given a list of numbers (hardcoded in the program), write a Python program to calculate the sum of the list. Do not use any built-in function
```
sum = 0
number = [1,2,3,4,5]  #list
for i in number:
    print(i)
    sum += i
print("Sum is : ", sum)
```
---
# 8. Given a list of numbers (hardcoded in the program), write a Python program to calculate the sum of the even-indexed elements in the list.
```
sum=0
number = [1,2,3,4,5,6,7,8,9,10]  #list
print("List of number : ", number)
l=len(number)
for i in range(l):
   if(i%2==0):
       sum+=number[i];
print("Sum is : ", sum)
```

---
# 9. Given a list of numbers (hardcoded in the program), write a Python program to find the largest and smallest element of the list. Define two functions largest_number_<your-student-id> and smallest_number_<your-student-id> in your program. Do not use any built-in function.
```
def largest_number_2019_1_60_063(num):
    maxi=num[0]
    for i in range(len(num)):
        if num[i] > maxi:
            maxi= num[i]
    print("Largest element is:", maxi)
     
def smallest_number_2019_1_60_063(num):
    mini= num[0]
    for i in range(len(num)):
        if num[i] < mini:
             mini = num[i] 
    print("Smallest element is:", mini)
             
number=[2,3,1,9,5,6,10,8,4,7] 
print("List of numbers : ", number)
largest_number_2019_1_60_063(number)
smallest_number_2019_1_60_063(number)
```
---
# 10. Given a list of numbers (hardcoded in the program), write a Python program to find the second largest element of the list.
```
number=[2,3,1,9,5,6,10,8,4,7] 
print("List of numbers : ", number)
l=len(number)
number.sort()
print("Second largest element is:", number[l-2])
```
---
# 11. Given a string, display only those characters which are present at an even index number. Read inputs from the user.
```
string=input("Enter a string: ")
print("Displaying: ")
for i in range (len(string)):
    if(i%2==0):
        print(string[i])
```    
# 12.  Given a string and an integer number n, remove characters from a string starting from zero up to n and return a new string. N must be less than the length of the string. Read inputs from the user. Do not use any built-in function. 
```
string=input("Enter a string: ")
l=len(string)
n=int(input("Enter a number: "))

new_str=""

for i in range(0,l):
    if i>=n:
        new_str=new_str+string[i]

print("New string is : ",new_str)
```
---
# 13. Given a string, find the count of the substring “CSE303” appeared in the given string. Do not use any built-in function. 
 ```
string = 'CSE303 taken imran sir and he is the best on CSE303'
print(string)
sub_string = 'CSE303'
print(sub_string)
count = 0
sub_len=len(sub_string)
for i in range(len(string)):
    if string[i:i+sub_len] == sub_string:
        count += 1
print (count)
```
---
# 14. Given a string, write a python program to check if it is palindrome or not. Define a function named palindrome_checker_<your-student-id> in your program.
```
def palindrome_checker_2019_1_60_063(string):
    string1 = ''.join(reversed(string))
    if(string==string1):
        return True
    else:
        return False

string = "level"
print("Given string is : ", string)
check = palindrome_checker_2019_1_60_063(string)
if (check):
    print("Palindrome")
else:
    print("Not palindrome")
```
---    
# 15. Given a two list of numbers (hardcoded in the program), create a new list such that new list should contain only odd numbers from the first list and even numbers from the second list.
```
lis1=[3,10,9,13,12,15]
lis2=[7,2,1,8]  
odd=[]
even=[]
l1=len(lis1)
l2=len(lis2)
print("Main list 1 is : ", lis1)
print("Odd numbers from list 1 : ")
for i in range (0,l1):
    if(lis1[i]%2!=0):
        odd.append(lis1[i])
print(odd)
print("Main list 2 is : ", lis2)
print("Even numbers from list 2 : ")
for i in range (0,l2):
    if(lis2[i]%2==0):
        even.append(lis2[i])
print(even)

```


