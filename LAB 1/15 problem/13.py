string = 'CSE303 taken imran sir and he is the best on CSE303'
print(string)
sub_string = 'CSE303'
print(sub_string)
count = 0
sub_len=len(sub_string)
for i in range(len(string)):
    if string[i:i+sub_len] == sub_string:
        count += 1
print (count)