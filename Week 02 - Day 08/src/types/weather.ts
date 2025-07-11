// types/weather.ts
export interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        humidity: number;
        wind_kph: number;
    };
}

export interface ForecastData {
    forecast: {
        forecastday: Array<{
            hour: Array<{
                time: string;
                temp_c: number;
                condition: {
                    text: string;
                    icon: string;
                };
            }>;
        }>;
    };
}