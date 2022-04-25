
import numpy as np 
import pandas as pd 
import seaborn as sns
import matplotlib.pyplot as plt
import os

data=pd.read_csv("RealEstate.csv")
print("DATASET : \n",data)

X1_transaction_date = data['X1_transaction_date']
X2_house_age = data['X2_house_age']
X3_distance_to_the_nearest_MRT_station = data['X3_distance_to_the_nearest_MRT_station']

print(X1_transaction_date.value_counts(),"\n")
print(X2_house_age.value_counts(),"\n")
print(X3_distance_to_the_nearest_MRT_station.value_counts(), "\n")


X1_transaction_date.replace(regex={"a":"0","b":"1","c":"2"},inplace=True)
X2_house_age.replace(regex={"Dealer":"0","Individual":"1"},inplace=True)
X3_distance_to_the_nearest_MRT_station.replace(regex={"Manual":"0","Automatic":"1"},inplace=True)

data[["X1_transaction_date","X2_house_age","X3_distance_to_the_nearest_MRT_station"]]=data[["X1_transaction_date","X2_house_age","X3_distance_to_the_nearest_MRT_station"]].astype(int)

from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(16,9))
ax = fig.gca(projection = "3d")
plot = ax.scatter(data["X1_transaction_date"],
                    data["X2_house_age"],
                    data["X3_distance_to_the_nearest_MRT_station"],
                    linewidth=1,edgecolor ="k",
                    c=data["Y_house_price_of_unit_area"],s=100,cmap="hot")

ax.set_xlabel("X1_transaction_date")
ax.set_ylabel("X2_house_age")
ax.set_zlabel("X3_distance_to_the_nearest_MRT_station")
lab = fig.colorbar(plot,shrink=.5,aspect=5)
lab.set_label("Y_house_price_of_unit_area",fontsize = 15,)
plt.title("3D plot for X1_transaction_date, Present Value of house_age and Distance",color="red")
plt.show()

Y_house_price_of_unit_area = data['Y_house_price_of_unit_area']

y=Y_house_price_of_unit_area
x=data.drop(["Y_house_price_of_unit_area","X3_distance_to_the_nearest_MRT_station"],axis=1)


from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=1)
print("x train: ",x_train.shape)
print("x test: ",x_test.shape)
print("y train: ",y_train.shape)
print("y test: ",y_test.shape)

from sklearn.metrics import r2_score
from sklearn.model_selection import cross_val_score

cv=5 
r_2 = [] 
CV = [] 
# Main function for models
def model(algorithm,x_train_,y_train_,x_test_,y_test_):
    algorithm.fit(x_train_,y_train_)
    predicts=algorithm.predict(x_test_)
    prediction=pd.DataFrame(predicts)
    R_2=r2_score(y_test_,prediction)
    cross_val=cross_val_score(algorithm,x_train_,y_train_,cv=cv)

    r_2.append(R_2)
    CV.append(cross_val.mean())
    print("algorithm","\n")
    print("r_2 score :",R_2,"\n")
    print("CV scores:",cross_val,"\n")
    print("CV scores mean:",cross_val.mean())
    test_index=y_test_.reset_index()["Y_house_price_of_unit_area"]
    ax=test_index.plot(label="Train Accuracy ",figsize=(12,6),linewidth=2,color="r")
    ax=prediction[0].plot(label = "Loss Values",figsize=(12,6),linewidth=2,color="g")
    plt.legend(loc='upper right')
    plt.title("Train Accuracy VS Loss Values")
    plt.xlabel("index")
    plt.ylabel("values")
    plt.show()

#%%

def LinearRegression1():
    
    x1 = data['X1_transaction_date']
    x2 = data['X2_house_age']
    y = data['X3_distance_to_the_nearest_MRT_station']
    
    x1_square = 0
    x2_square = 0
    x1y = 0
    x2y = 0
    x1x2 = 0
    x1_sum = 0
    x2_sum = 0
    y_sum = 0
    
    n = len(x1)
    
    for i in range(n):
        x1_square = x1_square + x1[i] * x1[i]
        x2_square = x2_square + x2[i] * x2[i]
        x1y = x1y + x1[i] * y[i]
        x2y = x2y + x2[i] * y[i]
        x1x2 = x1x2 + x1[i] * x2[i]
        x1_sum = x1_sum + x1[i]
        x2_sum = x2_sum + x2[i]
        y_sum = y_sum + y[i]
        
        
    x1_square = x1_square - ((x1_sum * x1_sum) / n)
    x2_square = x2_square - ((x2_sum * x2_sum) / n)
    x1y = x1y - ((x1_sum * y_sum) / n)
    x2y = x2y - ((x2_sum * y_sum) / n)
    x1x2 = x1x2 - ((x1_sum * x2_sum) / n)
    b1 = ( (x2_square * x1y) - (x1x2 * x2y) ) / (x1_square * x2_square - x1x2 * x1x2)
    b2 = ( (x1_square * x2y) - (x1x2 * x1y) ) / (x1_square * x2_square - x1x2 * x1x2)
    b0 = (y_sum / n) - (b1 * (x1_sum / n)) - (b2 * (x2_sum / n))
    
    print("b0 :  ", b0 , "b1 : " ,b1, " b2 : ", b2)



def mean(a):
    n=len(a)
    sum=0.0
    for i in a:
        sum+=i

    return (sum/n)

def solve():
    
    a13=data['X1_transaction_date']

    a14=data['X3_distance_to_the_nearest_MRT_station']

    xbar=mean(a13)

    ybar=mean(a14)

    x=0
    y=0
    x2=0
    y2=0
    xxbar=0
    yybar=0
    xybar=0

    n=len(a13)

    for i in range(0,n,1):
      x+=a13[i]
      y+=a14[i]
      x2+=a13[i]*a13[i]
      y2+=a14[i]*a14[i]
    
    for i in range(0,n,1):
      xxbar += (a13[i] - xbar) * (a13[i] - xbar)
      yybar += (a14[i] - ybar) * (a14[i] - ybar)
      xybar += (a13[i] - xbar) * (a14[i] - ybar) 
    
    slope  = xybar / xxbar
    intercept = ybar - slope * xbar;    

    print("slope: ",slope)

    print("intercept: ",intercept)

    rss=0
    ssr=0

    for i in range(0,n,1):
     fit = slope*a13[i] + intercept
     rss += (fit - a14[i]) * (fit - a14[i])
     ssr += (fit - ybar) * (fit - ybar)

    degreesOfFreedom = n-2
    r2    = ssr / yybar

    svar  = rss / degreesOfFreedom
    svar1 = svar / xxbar
    svar0 = svar/n + xbar*xbar*svar1

    print("regression: ",r2)


#applying linear regression
from sklearn.linear_model import LinearRegression
lr = LinearRegression()
model(lr,x_train,y_train,x_test,y_test)

LinearRegression1()

solve()

import lat_long as ll
print(ll)


## ERROR VALUE
y_pred=lr.predict(x_test)
from sklearn import metrics
mae=metrics.mean_absolute_error(y_test,y_pred)
msc=metrics.mean_squared_error(y_test,y_pred)
r2=metrics.r2_score(y_test,y_pred)

print("The model Performance for testing set")

print("---------------------------------------------------")

print('MAE is %.2f'% mae)
print('MSE is %.2f'% msc)
print('R2 score is %.2f'% r2)


