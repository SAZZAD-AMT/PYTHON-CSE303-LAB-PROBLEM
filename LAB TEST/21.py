from turtle import color
import numpy as np
import matplotlib.pyplot as plt
from sklearn import *


def estimate_coef(x,y):
	
	n = len(x)
	x = np.mean(x)
	y = np.mean(y)

	xy = np.sum(y*x) - n*y*x
	xx = np.sum(x*x) - n*x*x

	b1 = xy / xx
	a = y - b1*x

	return (b1,a)

def plot_regression_line(x,y,a,b1):
    y_pred = a + b1*x
    print(y_pred)
    plt.scatter(x, y,color = "m" )
    plt.plot(x, y_pred, color = "g")
    plt.xlabel('x')
    plt.ylabel('y')
    plt.show()

import pandas as pd
d = pd.read_csv('SLR.csv')
print(d)
d.columns=['YearsExperience','Salary']
x=d['YearsExperience']
y=d['Salary']


a,b = estimate_coef(x, y)
print("Coefficent A : ",a, "\nCoefficent B1 : ",b)

plot_regression_line(x,y,a,b)

