import pandas as pd

df = pd.read_csv('data/atl_crime_data.csv', usecols=lambda column: column not in ['Social Media', 'Press Release', 'Watch'])
df = df.drop(['OBJECTID', 'Report Number', 'Report Date', 'Offense End Date', 'Day Number', 'Zone', 'Beat', 'Location', 'Location Type', 'NIBRS Code', 'Crime Against', 'Was a firearm involved?', 'Neighborhood', 'NPU', 'Council District', 'UCR Grouping', 'Victim Count', 'GlobalID', 'x', 'y'], axis=1)
df=df.dropna()
