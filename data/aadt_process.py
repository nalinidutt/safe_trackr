import pandas as pd

df = pd.read_csv('data/annualized_statistics.csv')

df = df.drop(['Station ID', 'Functional Class', 'Year', 'Statistics type', 'Single-Unit Truck AADT', 'Combo-Unit Truck AADT', '% Peak SU Trucks', '% Peak CU Trucks',
         'K-Factor', 'D-Factor', 'Future AADT', 'Station Type'], axis=1)

df = df.dropna()

df = df.drop(df[df['Latitude'] < 33.6080].index)
df = df.drop(df[df['Latitude'] > 33.8870].index)

df = df.drop(df[df['Longitude'] < -84.5740].index)
df = df.drop(df[df['Longitude'] > -84.1900].index)

df.to_csv('data/traffic.csv', index=False)