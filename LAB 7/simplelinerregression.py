from turtle import color
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


ds=pd.read_csv('SLR.csv')
print(ds)
ds.columns=['YearsExperience','Salary']
x=ds[['YearsExperience']]
y=ds[['Salary']]
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=1/3,random_state=0)

##Fitting the DS
from sklearn.linear_model import LinearRegression
regression= LinearRegression()
regression.fit(x_train,y_train)
##PREDICTION the value
y_pred=regression.predict(x_test)

## visualization of corrilation

plt.scatter(x_train,y_train,color='red')
plt.plot(x_train,regression.predict(x_train),color='blue')
plt.title('Salary vs Experience (Training set)')
plt.xlabel ('Years of Experience')
plt.ylabel('Salary')
plt.show()

## visualizing test set result
plt.scatter(x_train,y_train,color='black')
plt.plot(x_train,y_train,color='blue')
plt.title('Salary vs Experience (Test set)')
plt.xlabel ('Years of Experience')
plt.ylabel('Salary')
plt.show()

## model evaluation

from sklearn import metrics
mae=metrics.mean_absolute_error(y_test,y_pred)
msc=metrics.mean_squared_error(y_test,y_pred)
r2=metrics.r2_score(y_test,y_pred)

print("The model Performance for testing set")

print("---------------------------------------------------")

print('MAE is %.2f'% mae)
print('MSE is %.2f'% msc)
print('R2 score is %.2f'% r2)


