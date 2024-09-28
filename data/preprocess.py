import pandas as pd

df = pd.read_csv('data/atl_crime_data.csv', usecols=lambda column: column not in ['Social Media', 'Press Release', 'Watch'])
df = df.drop(['OBJECTID', 'Report Number', 'Report Date', 'Offense End Date', 'Day Number', 'Zone', 'Beat', 'Location', 'Location Type', 'NIBRS Code', 'Crime Against', 'Was a firearm involved?', 'Neighborhood', 'NPU', 'Council District', 'UCR Grouping', 'Victim Count', 'GlobalID', 'x', 'y'], axis=1)
df=df.dropna()
df = df[df['NIBRS Code Name'] != 'Theft From Coin-Operated Machine or Device']

new_order = ['Longitude', 'Latitude', 'Offense Start Date', 'Day of the week', 'NIBRS Code Name']
df = df[new_order]


df.to_csv('data/crime_data.csv', index=False)
