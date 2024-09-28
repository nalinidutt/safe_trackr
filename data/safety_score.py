import pandas as pd
import numpy as np

crime_data = pd.read_csv('data/crime_data.csv')
crime_data['Offense Start Date'] = pd.to_datetime(crime_data['Offense Start Date'])
min_score = 0
max_score = 31872

def crime_check(lat, long):
    near_crimes = []
    for (index, row) in crime_data.iterrows():
        if row['Latitude'] < lat + 0.00871 and row['Latitude'] > lat - 0.00871 and row['Longitude'] < long + 0.00725 and row['Longitude'] > long - 0.00725:
            near_crimes.append(index)
    return near_crimes


def type_check(near_crimes):
    safety_points = 0
    for i in near_crimes:
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Murder and Nonnegligent Manslaughter':
            safety_points = safety_points + 44
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Robbery':
            safety_points = safety_points + 42
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Aggravated Assault':
            safety_points = safety_points + 40
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Kidnapping/Abduction':
            safety_points = safety_points + 38
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Human Trafficking, Commercial Sex Acts':
            safety_points = safety_points + 36   
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Human Trafficking, Involuntary Servitude':
            safety_points = safety_points + 34
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Simple Assault':
            safety_points = safety_points + 32
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Intimidation':
            safety_points = safety_points + 30
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Purse-snatching':
            safety_points = safety_points + 28
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Pocket-picking':
            safety_points = safety_points + 26
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Burglary/Breaking & Entering':
            safety_points = safety_points + 24   
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Theft From Building':
            safety_points = safety_points + 22   
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Motor Vehicle Theft':
            safety_points = safety_points + 20  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Theft From Motor Vehicle':
            safety_points = safety_points + 18   
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Drug/Narcotic Violations':
            safety_points = safety_points + 16   
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Arson':
            safety_points = safety_points + 14  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Destruction/Damage/Vandalism of Property':
            safety_points = safety_points + 12  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'All Other Larceny':
            safety_points = safety_points + 10  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Shoplifting':
            safety_points = safety_points + 8  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Theft of Motor Vehicle Parts or Accessories':
            safety_points = safety_points + 6
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Drug Equipment Violations':
            safety_points = safety_points + 4  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Prostitution':
            safety_points = safety_points + 2  
        if crime_data.iloc[i]['NIBRS Code Name'] == 'Assisting or Promoting Prostitution':
            safety_points = safety_points + 0  
    return safety_points

def time_check(time, near_crimes):
    time = pd.to_datetime(time)
    near_times = []
    for i in near_crimes:
        if time - crime_data.iloc[i]['Offense Start Date'] <= abs(pd.Timedelta(weeks=1)):
            near_times.append(i)
        near_times.append(i)
    return near_times


def safety_score(lat, long, time):
    time = pd.to_datetime(time)
    near_crimes = crime_check(lat, long)
    near_times = time_check(time, near_crimes)
    safety_points = type_check(near_times)
    safety_score = ((safety_points - min_score) / (max_score - min_score)) * (100 - 0) + 0
    return safety_score

lat_min, lat_max = 33.6280, 33.8870
long_min, long_max = -84.5540, -84.2900

lat_step = 0.002
long_step = 0.002

latitudes = np.arange(lat_min, lat_max, lat_step)
longitudes = np.arange(long_min, long_max, long_step)


input_time = pd.to_datetime('2024-09-28 23:00:00')

def check_max(max, min):
    for lat in latitudes:
        for long in longitudes:
            if (safety_score(lat, long, input_time) > max):
                max = safety_score(lat, long, input_time)
                max_lat = lat
                max_long = long
                print(max_lat, max_long, max)
            if(safety_score(lat, long, input_time) < min):
                min = safety_score(lat, long, input_time)
                min_lat = lat
                min_long = long
                print(min_lat, min_long, min)
            print("one done")
    print("one round done")

#check_max(0, 100000)

print(safety_score(33.640311, -84.444368, '09/28/2024 23:00:00'))
print(safety_score(33.775600, -84.396477, '09/28/2024 11:00:00'))
