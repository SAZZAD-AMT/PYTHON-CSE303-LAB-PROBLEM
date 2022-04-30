import numpy as np
  
# Taking a 3 * 3 matrix
A = np.array([[6, 1, 1],
              [4, -2, 5],
              [2, 8, 7]])

A = [[0, 1, 1],
    [2, 3, -1],
    [-1, 2, 1]]

print("Inverse : ",np.linalg.inv(A))

I = np.matmul(A,np.linalg.inv(A))
print(I)