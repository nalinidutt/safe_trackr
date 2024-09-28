import pandas as pd
import numpy as np

df = pd.read_csv('data/traffic.csv')

min = 15845
max = 31259

def traffic_check(lat, long):
    near_traffic = []
    for (index, row) in df.iterrows():
        if row['Latitude'] < lat + 0.0871 and row['Latitude'] > lat - 0.0871 and row['Longitude'] < long + 0.0725 and row['Longitude'] > long - 0.0725:
            near_traffic.append(index)
    return near_traffic

def traffic_score(lat, long):
    near_traffic = traffic_check(lat, long)
    avg_traffic = 0
    for i in near_traffic:
        avg_traffic = avg_traffic + df.iloc[i]['AADT']
    if (len(near_traffic) == 0):
        avg_traffic += 0
    else:
        avg_traffic = avg_traffic / len(near_traffic)
    return ((avg_traffic - min) / (max - min)) * (100 - 0) + 0






lat_min, lat_max = 33.6280, 33.8870
long_min, long_max = -84.5540, -84.2900

lat_step = 0.002
long_step = 0.002

latitudes = np.arange(lat_min, lat_max, lat_step)
longitudes = np.arange(long_min, long_max, long_step)


def check_max(max, min):
    for lat in latitudes:
        for long in longitudes:
            if (traffic_score(lat, long) > max):
                max = traffic_score(lat, long)
                max_lat = lat
                max_long = long
                print(max_lat, max_long, max)
            if(traffic_score(lat, long) < min):
                min = traffic_score(lat, long)
                min_lat = lat
                min_long = long
                print(min_lat, min_long, min)
            print("one done")
        print("one round done")
    print(min_lat, min_long, min)
    print(max_lat, max_long, max)


#check_max(0, 100000)


