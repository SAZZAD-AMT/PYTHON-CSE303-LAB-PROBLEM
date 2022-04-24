from turtle import color
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


data=pd.read_csv("RealEstate.csv")
print("DATASET : \n",data)

x=data[['X5_latitude']]
y=data[['X6_longitude']]
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=1/3,random_state=0)

##Fitting the DS
from sklearn.linear_model import LinearRegression
regression= LinearRegression()
regression.fit(x_train,y_train)
##PREDICTION the value
y_pred=regression.predict(x_test)

## visualization of lat long relation

plt.scatter(x_train,y_train,color='red')
plt.plot(x_train,regression.predict(x_train),color='blue')
plt.title('Latitude vs Longitude (Training set)')
plt.xlabel ('Latitude')
plt.ylabel('Longitude')
plt.show()

### visualizing test set result of lat long
plt.scatter(x_train,y_train,color='black')
plt.plot(x_train,y_train,color='blue')
plt.title('Latitude vs Longitude (Test set)')
plt.xlabel ('Latitude')
plt.ylabel('Longitude')
plt.show()

