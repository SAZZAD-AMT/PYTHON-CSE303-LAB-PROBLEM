list3=[]
for i in range (1,1001):
    for j in range(2,10):
        if (i%j)==0:
         list3.append(i)
print(list(set(list3)))