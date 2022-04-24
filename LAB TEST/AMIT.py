

import pandas as pd

df = pd.read_csv('SLR.csv')
print(df)

df.columns = [['X', 'Y'] ]
X = df['X']
Y = df['Y']

#ploting
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as pyp
import numpy as np

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=32)

pyp.plot(X_train, y_train)
pyp.show()

x_test_array = np.array(X_test)
y_test_array = np.array(y_test)

sumX = 0.0
sumY = 0.0

n = len(X_train)

print(type(X_train))

X = np.array(X_train)
print(X)

print(type(y_train))

Y = np.array(y_train)

print(type(Y))


for i in range(0, n):
    sumX = sumX + X[i]
    
for i in range(0, n):
   sumY = sumY + Y[i]
    
avgX = sumX / n

avgY = sumY / n

sumXY = 0.0
sumX2 = 0.0

for i in range (0, n):
    sumXY = sumXY + X[i] * Y[i]
    sumX2 = sumX2 + X[i] * X[i]
    
b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)    
a = avgY - b * avgX    

print("a : ", a)
print("B : ", b)


predictor = a + b * x_test_array
predictor = np.array(predictor)

print(type(predictor))

print(predictor)

print("-----------------------------------")

print("predictor        y_test        loss")
print()

for i in range(0, len(y_test_array) ):
    print(predictor[i] , "  " , y_test_array[i], "  ", y_test_array[i] - predictor[i])

print("----------------------------------")

pyp.plot(predictor)
pyp.show()

pyp.plot(y_test_array)
pyp.show()

