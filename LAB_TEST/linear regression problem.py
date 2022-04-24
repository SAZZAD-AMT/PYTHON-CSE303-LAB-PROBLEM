
import numpy as np 
import pandas as pd 
import seaborn as sns
import matplotlib.pyplot as plt
import os

data=pd.read_csv("RealEstate.csv")
print("DATASET : \n",data)


print(data.X1_transaction_date.value_counts(),"\n")
print(data.X2_house_age.value_counts(),"\n")
print(data.X3_distance_to_the_nearest_MRT_station.value_counts())


data.X1_transaction_date.replace(regex={"a":"0","b":"1","c":"2"},inplace=True)
data.X2_house_age.replace(regex={"Dealer":"0","Individual":"1"},inplace=True)
data.X3_distance_to_the_nearest_MRT_station.replace(regex={"Manual":"0","Automatic":"1"},inplace=True)

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

y=data.Y_house_price_of_unit_area
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

#applying linear regression
from sklearn.linear_model import LinearRegression
lr = LinearRegression()
model(lr,x_train,y_train,x_test,y_test)

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




