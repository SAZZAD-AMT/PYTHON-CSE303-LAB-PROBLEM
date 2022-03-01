string = "Practice Problems to Drill List Comprehension in Your Head."
print("String is : ", string)
n=len(string)
count=0

for i in range(1,n):
    if(string[i]==' '):
       count+=1 
print("Spaces of the string is : ",count)