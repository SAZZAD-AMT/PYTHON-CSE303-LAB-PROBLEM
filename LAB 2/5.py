string="Practice Problems to Drill List Comprehension in Your Head."
new=" "
st=string.split(new)

for i in range (1,len(st)):
    if(len(st[i])<5 ):
        print(st[i])