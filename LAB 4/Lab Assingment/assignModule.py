def IQR(a):
    IQR= a.quantile(0.75)-a.quantile(0.25)
    return IQR

def Whiskers(a,IQR):
     upper_whisker= ((a.quantile(0.75))+(IQR*1.5))
     print("So, upper whisker : ",upper_whisker)
     lower_whisker= ((a.quantile(0.25))-(IQR*1.5))
     print("So, lower whisker : ",lower_whisker)
     print(" Min: ",a.min())
     print(" Max: ",a.max())
     if(lower_whisker>a.min() and (upper_whisker<a.max())):
         print("There is outliers in column as minimum and maximum value is outside of whiskers")
     else:
         print("There is no outliers in column as minimum and maximum value is inside of whiskers")

def skewness(a):
    if(a.skew()==0):
        return ("Symmetric or bell-shaped curve")
    elif(a.skew()<0):
        return("As skewness of time is less than 0,\nwe can see data distribution curve is negatively or left skewed.")
        return("Which means longer tail on the left side")
        return("There extreme values are too much and mean < median\n")
    else:
        return("As skewness of amount is greater than 0,\n we can see data distribution curve is positively or right skewed.\n")
        return("Which means longer tail on the right side")
        return("There extreme values are too much and median < mean\n")

def kurtosis(a):        
    if(a.kurt()>3):
       return("As kurtosis of time is greater than 3, it is called Leptokurtosis.\n")
       return("Here the data dispersion is also very less.. almost none.\nNo extreme values")
    elif(a.kurt()<3):
        return("As kurtosis of time is less than 3, it is called platykurtosis.\n")
        return("Here the data dispersion is also very much")
    else:
        return("As the kurtosis is 3 we can call it Mesikurtic kurtosis")
        