import numpy as np
import matplotlib.pyplot as plt
x=np.array([[1,2],[3,4]],dtype=np.int32)
y=np.array([[5,6],[7,8]],dtype=np.int32)
v=np.array([9,10])
w=np.array([11,12])

print('Inner product : ')

print(v.dot(w))
print(np.dot(v,w))
print(np.inner(v,w))

print('Outer Product : ')
print(np.outer(v,w))
print('Norm : ')

print(np.linalg.norm(v))
print(np.linalg.norm(v,1))
print(np.linalg.norm(v,np.inf))
print(np.linalg.norm(x))
print(np.linalg.norm(x,axis=1))

## vector matrix and matrix
print(x.dot(v))
print(np.dot(x,v))
print(x.dot(y))
print(np.matmul(x,y))
print(x@y)

## determinant trace and rank
m=np.array([[2,4,6,],[1,5,9],[3,7,8]])
print('Determinant : %.2f'%np.linalg.det(m))
print('trace : %.2f'%np.trace(m))
print('Rank : ',np.linalg.matrix_rank(m))

##transpose and inverse matrix
mt1=m.T
print(mt1)
mt2=np.transpose(m)
print(mt2)
inv_m=np.linalg.inv(m)
print(inv_m)

## solving linear system
A=np.array([[1,2],[3,4]])
z=np.array([[5,7],[6,8]])
print('Using Inverse : \n',np.linalg.inv(A).dot(z))
print('Using solve : \n',np.linalg.solve(A,z))

##least square solution
x=np.arange(0,9)
A=np.array([x,np.ones(9)])
print(A)
y=[19,20,20.5,21.5,22,23,23,25.5,24]
w=np.linalg.lstsq(A.T,y,rcond=1.e-10)[0]
print(w)

line=w[0]*x +w[1]
plt.plot(x,line,'r-')
plt.plot(x,y,'o')
plt.show()

##eigenvalue and eigenvector
A=np.array([[0,1],[-2,-3]])
val,vect=np.linalg.eig(A)
print(val)
print(vect)
