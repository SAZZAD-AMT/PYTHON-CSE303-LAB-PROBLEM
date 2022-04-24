import inv_module as iv
import numpy as np
import pprint

R=3
C=3
A = [[int(input()) for x in range (C)] for y in range(R)]

# A = [[0, 1, 1],
#     [2, 3, -1],
#     [-1, 2, 1]]
inv=iv.inverse_3X3_matrix(A)
pprint.pprint(inv)

# JUST For TESTING THAT THIS IS WRITE OR WRONG BY USING IDENTITY MATRIX
I = np.matmul(A,inv)
print("IDENTITY MATRIX : \n",I)
