# 1. How many rows and columns this dataframe has?
import pandas as pd
dataframe = pd.read_csv('C:\\Users\\Hp\\OneDrive\\Desktop\\10TH SEMESTER\\CSE 303\\LAB 303\\LAB 4\\dataset_lab04.csv')
#print(dataframe.head())
print('Number of rows: ',dataframe.shape[0])
print('Numbber of COl:',dataframe.shape[1])

# 2. Describe (numerical summary) the time and amount column.
print(dataframe[['Time', 'Amount']].describe())

# 3. There are 31 columns in the dataset. Compute some statistical measures like mean, median, standard 
#deviation, variance using Pandas Function.
dataframe.columns = ['Time','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15','V16','V17','V18','V19','V20','V21','V22','V23','V24','V25','V26','V27','V28','Amount','Class']
Time = dataframe[['Time']]
print(type(Time))

print("Mean: " ,Time.mean())
print("Median: ",Time.quantile(0.5))
print("Standard Deviation: ",Time.std())
print("Variance: ",Time.var())
print("Lower Quartile: " ,Time.quantile(0.25))
print("Median: " ,Time.median())
print("Upper Quartile: " ,Time.quantile(0.75))
print("Skewness: " ,Time.skew())
print("Kurtosis: " ,Time.kurt())
print("Min: ",Time.min())
print("Max: ",Time.max())

#4. Compute the mean of any column using your own module and compare it with the mean value of 
#Pandas. 
import LabModule as m

print("Mean using Pandas: ", dataframe['Time'].mean())
series = dataframe['Time']
print("Mean using my module: ", m.mean(series))

#5. Show the histogram of Time and Amount column.

import matplotlib.pyplot as plt
df_hist = dataframe[['Time']]
df_hist.hist(column = ['Time'], bins = 10, color='g')
#plt.show()

# 6. Find the percentage of rows with class value = 0 (Non-Fraudulent) and class value = 1 (Fraudulent).

class0 = len(dataframe[dataframe['Class']==0])*100
class1 = len(dataframe[dataframe['Class']==1])*100

print("Percentage of class value 0 :",class0/len(dataframe['Class']))
print("Percentage of class value 1 :",class1/len(dataframe['Class']))

#7. Show the result you have got in 6 using a histogram.
df_histo = dataframe[['Class']]
df_histo.hist(column = ['Class'],color='g', bins = 5)
plt.show()

#8. Show the histrogram (data distribution) of a few other columns. Differentiate between left-skewed 
#and right-skewed distributions.
dataframe.hist(column = ["V23", "V22", "V19", "V28"], bins = 20, color='DarkBlue')

V23_length = dataframe[['V23']]
print("Skewness: " , V23_length.skew()) #negative or left-skewed

V22_length = dataframe[['V22']]
print("Skewness: " , V22_length.skew()) # almost symmetric/bell-shaped curve

V19_length = dataframe[['V19']]
print("Skewness: " , V19_length.skew())  # almost symmetric/bell-shaped curve

V28_length = dataframe[['V28']]      #positive or right-skewed
print("Skewness: " , V28_length.skew()) 


# 9. Find positive correlations among columns.

correlation= dataframe.corr()
positive_corr= correlation[correlation > 0]
print(positive_corr)

# 10. Support your findings in Question 9 using a BoxPlot.

positive_corr.boxplot()

dataframe.boxplot(column = ['Time'])
print("Kurtosis: " , dataframe[['Time']].kurt())
print("Skewness: " ,  dataframe[['Time']].skew())

dataframe.boxplot(column = ['V1'])
print("Kurtosis: " , dataframe[['V1']].kurt())
print("Skewness: " ,  dataframe[['V1']].skew())

dataframe.boxplot(column = ['V4'])
print("Kurtosis: " , dataframe[['V4']].kurt())
print("Skewness: " ,  dataframe[['V4']].skew())

dataframe.boxplot(column = ['Class'])
print("Kurtosis: " , dataframe[['Class']].kurt())
print("Skewness: " ,  dataframe[['Class']].skew())

dataframe.boxplot(column = ['V5'])
print("Kurtosis: " , dataframe[['V5']].kurt())
print("Skewness: " ,  dataframe[['V5']].skew())

dataframe.boxplot(column = ['V6'])
print("Kurtosis: " , dataframe[['V6']].kurt())
print("Skewness: " ,  dataframe[['V6']].skew())

dataframe.boxplot(column = ['Amount'])
print("Kurtosis: " , dataframe[['Amount']].kurt())
print("Skewness: " ,  dataframe[['Amount']].skew())

dataframe.boxplot(column = ['V7'])
print("Kurtosis: " , dataframe[['V7']].kurt())
print("Skewness: " ,  dataframe[['V7']].skew())


dataframe.boxplot(column = ['V20'])
print("Kurtosis: " , dataframe[['V20']].kurt())
print("Skewness: " ,  dataframe[['V20']].skew())

dataframe.boxplot(column = ['V21'])
print("Kurtosis: " , dataframe[['V21']].kurt())
print("Skewness: " ,  dataframe[['V21']].skew())

dataframe.boxplot(column = ['V22'])
print("Kurtosis: " , dataframe[['V22']].kurt())
print("Skewness: " ,  dataframe[['V22']].skew())


# 11. Support your findings in Question 9 using a Scatter Plot.
print("11 Number : ")

positive_corr.plot.scatter(x= 'Time', y='V1',c='darkblue')


positive_corr.plot.scatter(x= 'V4', y='Class', c='k')


positive_corr.plot.scatter(x= 'V5', y='Time',c='DarkOrange')

positive_corr.plot.scatter(x= 'V6', y='Amount',c='Gray')


dataframe.plot.scatter(x = 'Time', y='V1')
dataframe.plot.scatter(x = 'V4', y= 'Class')
dataframe.plot.scatter(x = 'V5', y= 'Time')
dataframe.plot.scatter(x = 'V6', y= 'Amount')
dataframe.plot.scatter(x = 'V7', y= 'Amount')
dataframe.plot.scatter(x = 'V12', y= 'Time')
dataframe.plot.scatter(x = 'V5', y= 'Time')
dataframe.plot.scatter(x = 'V20', y= 'Amount')
dataframe.plot.scatter(x = 'V21', y= 'Amount')
dataframe.plot.scatter(x = 'V22', y= 'Time')

# 12. Find negative correlations among columns.
#correlation= dataframe.corr()
negative_corr= correlation[correlation < 0]
print(negative_corr)


# 13. Support your findings in Question 10 using a BoxPlot.
negative_corr.boxplot()


#14. Support your findings in Question 9 using a Scatter Plot
print("14 NUMBER : ")
negative_corr.plot.scatter(x= 'Time', y='Amount',colormap='viridis')


negative_corr.plot.scatter(x = 'V1', y='Amount', c='DarkOrange')

negative_corr.plot.scatter(x = 'V8', y='Time', c= 'Gray')

negative_corr.plot.scatter(x = 'V3', y='Time', c= 'DarkGreen')

negative_corr.plot.scatter(x = 'V5', y='Amount', c= 'DarkBlue')



dataframe.plot.scatter(x = 'V1', y='Amount')
dataframe.plot.scatter(x = 'V1', y= 'Class')
dataframe.plot.scatter(x = 'V3', y= 'Time')
dataframe.plot.scatter(x = 'V3', y='Amount')
dataframe.plot.scatter(x = 'V3', y= 'Class')
dataframe.plot.scatter(x = 'V4', y= 'Time')
dataframe.plot.scatter(x = 'V5', y='Amount')
dataframe.plot.scatter(x = 'V5', y= 'Class')

dataframe.plot.scatter(x = 'V6', y= 'Time')
dataframe.plot.scatter(x = 'V7', y= 'Class')
dataframe.plot.scatter(x = 'V8', y= 'Time')
dataframe.plot.scatter(x = 'V9', y= 'Time')
dataframe.plot.scatter(x = 'V9', y= 'Amount')
dataframe.plot.scatter(x = 'V9', y= 'Class')
dataframe.plot.scatter(x = 'V10', y= 'Amount')
dataframe.plot.scatter(x = 'V10', y= 'Class')

dataframe.plot.scatter(x = 'V11', y= 'Time')
dataframe.plot.scatter(x = 'V12', y= 'Amount')
dataframe.plot.scatter(x = 'V12', y= 'Class')
dataframe.plot.scatter(x = 'V13', y= 'Class')

dataframe.plot.scatter(x = 'V14', y= 'Time', c='DarkGreen')

dataframe.plot.scatter(x = 'V1', y= 'Class', colormap='viridis')
