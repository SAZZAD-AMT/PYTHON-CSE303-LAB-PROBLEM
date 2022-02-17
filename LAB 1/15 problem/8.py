sum=0
number = [1,2,3,4,5,6,7,8,9,10]  #list
print("List of number : ", number)
l=len(number)
for i in range(l):
   if(i%2==0):
       sum+=number[i];
print("Sum is : ", sum)