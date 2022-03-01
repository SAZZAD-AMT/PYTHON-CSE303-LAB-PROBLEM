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
