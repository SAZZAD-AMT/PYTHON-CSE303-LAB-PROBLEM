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
