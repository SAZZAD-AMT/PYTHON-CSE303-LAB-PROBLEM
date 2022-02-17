string=input("Enter a string: ")
l=len(string)
n=int(input("Enter a number: "))

new_str=""

for i in range(0,l):
    if i>=n:
        new_str=new_str+string[i]

print("New string is : ",new_str)