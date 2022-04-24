
def inverse_3X3_matrix(A):
       n = 3
       inv = [[0.0] * 3] * 3
       n=3
       det=0.0
       for i in range(0, n):
              det = det + ( A[0][i] * (A[1][(i + 1) % 3] * A[2][(i + 2) % 3] - A[1][(i + 2) % 3] * A[2][(i + 1) % 3]) )
       print("Det : ",det)

       if det == 0.0:
              print("can't possible")
       else:    
              for i in range(n):
                     a = [] 
                     for j in range(n):
                           a.append( (A[(j + 1) % n][(i + 1) % n] * A[(j + 2) % n][(i + 2) % n] -A[(j + 1) % 3][(i + 2) % 3] * A[(j + 2) % 3][(i + 1) % 3]) / det )
                     inv[i] = a    
       return inv