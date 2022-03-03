# PYTHON-CSE303-LAB-PROBLEM

# Python is commonly used for developing websites and software, task automation, data analysis, and data visualization. Since it's relatively easy to learn, Python has been adopted by many non-programmers such as accountants and scientists, for a variety of everyday tasks, like organizing finances.
# LAB 1
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
```
def add_two(x):
    x+=2
    return x
print(add_two(2))
```
---
# LAB 2
## For all the numbers 1–1000, use a nested list/dictionary comprehension to find the highest single digit any of the numbers is divisible by
---
```
highest={num: max([divisor for divisor in range(1,10) if num % divisor == 0]) 
         for num in range(1,1001)}
print(highest)
```
---
# LAB 3
- CSV RUN
```
import pandas as pd

df = pd.read_csv('weather.csv')
print(type(df))
print(df)
print(df.head())
print(df.tail())
print(df.describe())
df.columns = ['outlook','temperature','humidity','windy','play']
t = df['temperature']
print(type(t))
print(t)
sum = 0
for value in t:
    sum+=value
print(sum)
df1 = df[['temperature','humidity']]
print(df1)
df2 = df.loc[0:9,['temperature','humidity']]
print(df2)
#%%
df3 = df.iloc[0:10,[1,2]]
print(df3)
df4 = df.iloc[1::2,[0,1,3]]
print(df4)
temperature = df[['temperature']]

print("Mean: " , temperature.mean())
print("Standard Deviation: ", temperature.std())
print("Variance: ", temperature.var())
print("Lower Quartile: " , temperature.quantile(0.25))
print("Median: ", temperature.quantile(0.5))
print("Median: " , temperature.median())
print("Upper Quartile: " , temperature.quantile(0.75))
print("Skewness: " , temperature.skew())
print("Kurtosis: " , temperature.kurt())
print("Min: ", temperature.min())
print("Max: ", temperature.max())
df.hist(column=['temperature'], bins = 5)
df.hist(column='humidity', bins = 5)
humidity = df[['humidity']]
print("Mean: " , humidity.mean())
print("Standard Deviation: ", humidity.std())
print("Variance: ", humidity.var())
print("Lower Quartile: " , humidity.quantile(0.25))
print("Median: ", humidity.quantile(0.5))
print("Median: " , humidity.median())
print("Upper Quartile: " , humidity.quantile(0.75))
print("Skewness: " , humidity.skew())
print("Kurtosis: " , humidity.kurt())
print("Min: ", humidity.min())
print("Max: ", humidity.max())
list1 = [[1,0], [1,1], [2,2], [2,3], [2,3], 
         [2,4], [3,4], [3,5], [4,6], [5,7]]
print(list1)

df_list1 = pd.DataFrame(list1, columns = ['x','y'])
print(df_list1)

df_list1.hist(column = ['x'], bins = 5)

print('Skew: ', df_list1[['x']].skew())

df_list1.hist(column = ['y'], bins = 8)


print('Skew: ', df_list1[['y']].skew())

print('Kurt - X: ', df_list1[['x']].kurt())
print('Kurt - Y: ', df_list1[['y']].kurt())

df_list1.plot.scatter(x = "x", y = "y")

df_list1.boxplot(column = ['x', 'y'])

```
# ALL CODE WILL HAVE AS A FOLDER CHECK THE REPOSITORY.


