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