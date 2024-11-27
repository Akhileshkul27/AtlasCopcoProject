from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Weather API configuration
API_KEY = '79284c43cc1c4385bb817becf62ea3ce'
url = 'https://api.weatherbit.io/v2.0/current'


@app.route('/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    # Define the parameters
    params = {
        'lat': lat,
        'lon': lon,
        'key': API_KEY,
    }

    # Make the API request
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        if data['count'] > 0:
            weather_data = {
                "City": data["data"][0]["city_name"],
                "Temperature": data["data"][0]["temp"],
                "Humidity": data["data"][0]["rh"],
                "Wind Speed": data["data"][0]["wind_spd"],
                "Wind Direction": data["data"][0]["wind_cdir_full"],
                "Weather Description": data["data"][0]["weather"]["description"],
                "Visibility": data["data"][0]["vis"],
                "Sunrise": data["data"][0]["sunrise"],
                "Sunset": data["data"][0]["sunset"]
            }
            return jsonify(weather_data)
        else:
            return jsonify({"error": "City not found."}), 404
    else:
        return jsonify({"error": f"Error: {response.status_code}"}), response.status_code


if __name__ == '__main__':
    app.run(debug=True)
