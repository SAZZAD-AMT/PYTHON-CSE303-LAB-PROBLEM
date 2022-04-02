from turtle import color
from matplotlib.lines import *
import matplotlib.pyplot as plt
import numpy as np

x=np.array([1,2,3])
y=np.array([2,4,1])

print(plt.plot(x,y))

plt.xlabel('x-axis')
plt.ylabel('y-axis')

plt.title('My First Graph')

plt.show()
#%%
left=[1,2,3,4,5]
height= [10,24,36,40,5]
tick_label= ["one","two","three","four","five"]
plt.bar(left, height,tick_label=tick_label,width=0.8,color=['red','green'])
plt.xlabel("X-axis")
plt.ylabel("Y-axis")

plt.title("My Bar Chart")
plt.show()



#%%
plt.figure(figsize=(8,6) ,dpi=80)
plt.subplot(2,1,1)

X=np.linspace(-np.pi,np.pi,256,endpoint=True)
C,S=np.cos(X),np.sin(X)
plt.plot(X,C, color='blue',linewidth=1.0,linestyle="-",label="Cosline")


plt.xlim(-4.0,4.0)
plt.xticks(np.linspace(-4,4,9, endpoint=True))
plt.ylim(-1.0,1.0)
plt.yticks(np.linspace(-1,1,5,endpoint=True))
plt.xlabel("X-axix")
plt.ylabel("Y-axis")
plt.legend(loc="upper left")
plt.title("Cosine Graph")



plt.subplot(2,1,2)
plt.plot(X,S, color='green',linewidth=1.0,linestyle="-",label="Sinline")

plt.xlim(-4.0,4.0)
plt.xticks(np.linspace(-4,4,9, endpoint=True))
plt.ylim(-1.0,1.0)
plt.yticks(np.linspace(-1,1,5,endpoint=True))
plt.xlabel("X-axix")
plt.ylabel("Y-axis")
plt.legend(loc="upper left")
plt.title("Sin Graph")
plt.show()


#%%

t = 2*np.pi/3
plt.plot([t,t],[0,np.cos(t)],color ='blue', linewidth=2.5, linestyle="--")
plt.scatter([t,],[np.cos(t),], 50, color ='blue')
plt.annotate(r'$\sin(\frac{2\pi}{3})=\frac{\sqrt{3}}{2}$',
xy=(t, np.sin(t)), xycoords='data',
xytext=(+10, +30), textcoords='offset points', fontsize=16,
arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=.2"))
plt.plot([t,t],[0,np.sin(t)], color ='red', linewidth=2.5, linestyle="--")
plt.scatter([t,],[np.sin(t),], 50, color ='red')
plt.annotate(r'$\cos(\frac{2\pi}{3})=-\frac{1}{2}$',
xy=(t, np.cos(t)), xycoords='data',
xytext=(-90, -50), textcoords='offset points', fontsize=16,
arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=.2"))
plt.show()

