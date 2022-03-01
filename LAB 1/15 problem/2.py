import math

def circle_rad(radius):
    return math.pi*radius*radius

def circle_peri(radius):
    return 2* math.pi*radius

radius = float (input("Enter radius: "))
area= circle_rad(radius)
print("Area = ", area)

perimeter= circle_peri(radius)
print("Perimeter = ", perimeter)