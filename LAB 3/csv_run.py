import pandas as pd

df2=pd.read_csv("sam.csv")
df2.columns=['id','state','population','murder_rate']
print(df2)
print("Head : \n",df2.head())
print("TAIL : \n",df2.tail()) 
print(df2.count())


