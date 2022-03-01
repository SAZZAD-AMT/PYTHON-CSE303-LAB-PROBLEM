string = "Practice Problems to Drill List Comprehension in Your Head."
print("Before removing vowel : " ,string)
for word in string:
    if word in ('a','e','i','o','u','A','I','E','O','U'):
        string = string.replace(word, '')
print("After removing vowel :", string)