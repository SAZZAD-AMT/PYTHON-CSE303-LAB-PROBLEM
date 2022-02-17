s= [x for x in 'word']
print(s)

s= [x for x in range(11) if x%2==0]
print(s)

celsius ={1,2}
f=[((float(9)/5)*temp +32) for temp in celsius]
print(f)

text ="my name is sazzad"
print(set(text))
print(set(text.split(" ")))

b = [x**2 for x in [x**2 for x in range(11)]]
print(b)