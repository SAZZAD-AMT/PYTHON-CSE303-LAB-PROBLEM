import pandas as pd
import csv

df2 = pd.read_csv('sample_data_1.csv', header = None)
df2.columns=['id','state','population','murder_rate']
print(df2)
df2.head() 
df2.tail() 
df2.count() 