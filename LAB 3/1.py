import pandas as pd
obj = pd.Series([4, 7, -5, 3])
print(obj)
print(type(obj))

print(obj[obj%2==0])
print(obj+5 )
print(obj*2)