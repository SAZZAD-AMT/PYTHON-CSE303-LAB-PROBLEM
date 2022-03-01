list1=[]
for i in range (1 ,1001):
    list1.append(str(i))
    if list1[i-1].find('6')!=-1:
     print(list1[i-1])