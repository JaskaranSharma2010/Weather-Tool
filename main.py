import requests

# Input Lat:Lon format
latlon = input("Latitude & Longitude in Lat:Lon format: ")
lat, lon = latlon.split(':')

# Reverse Geocoding: Lat/Lon → City
geo_url = f'http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid=3356d213048d8a42a5f5fa1608140756'
geo_response = requests.get(geo_url)

if geo_response.status_code == 200:
    geo_data = geo_response.json()
    if geo_data:
        city = geo_data[0]['name']
        print(f"City: {city}")
    else:
        print("Location not found.")
        exit()
else:
    print(f"Error: {geo_response.status_code}")
    exit()

# Weather API: Get weather data using lat/lon
weather_url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3356d213048d8a42a5f5fa1608140756'
weather_response = requests.get(weather_url)

if weather_response.status_code == 200:
    weather_data = weather_response.json()
    main = weather_data['main']
    weather = weather_data['weather'][0]
    wind = weather_data['wind']

    # Convert temperature from Kelvin to Celsius
    temp_celsius = round(main['temp'] - 273.15, 2)
    feels_like_celsius = round(main['feels_like'] - 273.15, 2)

    # Display parsed weather data
    print(f"\nWeather in {city}:")
    print(f"Temperature: {temp_celsius}°C")
    print(f"Feels Like: {feels_like_celsius}°C")
    print(f"Condition: {weather['description'].capitalize()}")
    print(f"Humidity: {main['humidity']}%")
    print(f"Wind Speed: {wind['speed']} m/s")
else:
    print(f"Error: {weather_response.status_code}")
