def compound_interest_2019_1_60_063(P,R,T):
    return P*(1+(R/100))**T

P = float(input("Enter principle amount: "))
R = float(input("Enter interest amount: "))
T = float(input("Enter time(years): "))
com_intreast= compound_interest_2019_1_60_063(P,R,T)
print("compound interest based on the given formula is= ", com_intreast)