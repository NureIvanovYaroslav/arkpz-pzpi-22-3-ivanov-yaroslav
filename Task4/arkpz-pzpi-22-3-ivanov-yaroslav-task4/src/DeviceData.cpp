#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <math.h>
#include <string.h>
#include <time.h>

#include "DeviceData.h"
#include "ServerConfig.h"
#include "TimeConfig.h"

float heartRate = 0.0;
int steps = 0;
std::vector<TrainingData> trainingDataBuffer;
int sendDataFrequency = 60;
static bool userDataFetched = false;
static float maxHeartRate = 0.0;
static float lowerBound = 0.0;
static float upperBound = 0.0;

int calculateAge(const char *birthDateStr) {
  struct tm tm;
  memset(&tm, 0, sizeof(tm));
  strptime(birthDateStr, "%Y-%m-%dT%H:%M:%S.%fZ", &tm);
  tm.tm_isdst = -1;
  time_t birthDate = mktime(&tm);
  time_t now = time(nullptr);
  struct tm *nowTm = gmtime(&now);
  now = mktime(nowTm);
  return (int)floor(difftime(now, birthDate) / (60 * 60 * 24 * 365.25));
}

void fetchDeviceData() {
  HTTPClient http;
  String url = String(serverAddress) + "/api/devices/" + deviceID;

  Serial.println("Sending GET request to: " + url);
  http.begin(url);
  int httpCode = http.GET();

  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("Device Data Response: " + response);

    DynamicJsonDocument doc(1024);
    deserializeJson(doc, response);

    const char *status = doc["status"];
    sendDataFrequency = doc["sendDataFrequency"];
    JsonArray trainings = doc["trainings"];

    Serial.println();
  } else {
    Serial.printf("GET request failed, error: %s\n",
                  http.errorToString(httpCode).c_str());
  }

  http.end();
}

void fetchUserData() {
  HTTPClient http;
  String url = String(serverAddress) + "/api/users/" + userID;

  Serial.println("Sending GET request to: " + url);
  http.begin(url);
  int httpCode = http.GET();

  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("User Data Response: " + response);

    DynamicJsonDocument doc(1024);
    deserializeJson(doc, response);

    const char *birthDateStr = doc["birthDate"];
    const char *sex = doc["sex"];

    Serial.println();

    int age = calculateAge(birthDateStr);
    Serial.printf("Age: %d", age);
    Serial.println();
    Serial.printf("Sex: %s", sex);
    Serial.println();

    if (sex && strcmp(sex, "female") == 0) {
      maxHeartRate = 209 - 0.9f * age;
    } else if (sex && strcmp(sex, "male") == 0) {
      maxHeartRate = 214 - 0.8f * age;
    } else {
      Serial.println("Invalid sex value");
      return;
    }

    lowerBound = 0.5f * maxHeartRate;
    upperBound = 0.85f * maxHeartRate;
    userDataFetched = true;

    Serial.printf("Max Heart Rate: %.2f", maxHeartRate);
    Serial.println();
    Serial.printf("Lower Bound: %.2f", lowerBound);
    Serial.println();
    Serial.printf("Upper Bound: %.2f", upperBound);
    Serial.println();
    Serial.println();
  } else {
    Serial.printf("GET request failed, error: %s\n",
                  http.errorToString(httpCode).c_str());
  }

  http.end();
}

void generateTrainingData() {
  heartRate = random(40, 200);
  steps = random(0, 100);
  unsigned long timestamp = getEpochTime();

  TrainingData data = {heartRate, steps, timestamp};
  trainingDataBuffer.push_back(data);
}

void sendTrainingData() {
  HTTPClient http;
  String url = String(serverAddress) + "/api/training-datas";

  for (const auto &td : trainingDataBuffer) {
    DynamicJsonDocument doc(1024);
    doc["sendingTime"] = getFormattedTime();
    doc["heartRate"] = td.heartRate;
    doc["steps"] = td.steps;
    doc["training"] = trainingID;

    String payload;
    serializeJson(doc, payload);

    Serial.println("Sending POST request to: " + url);
    Serial.println("Payload: " + payload);

    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(payload);
    String response = http.getString();

    Serial.println("Response: " + response);
    http.end();
  }

  analyzeHeartRate();
  trainingDataBuffer.clear();
}

void analyzeHeartRate() {
  if (!userDataFetched) {
    fetchUserData();
  }

  for (const auto &data : trainingDataBuffer) {
    String content;
    int roundedHeartRate = round(data.heartRate);
    if (roundedHeartRate > maxHeartRate) {
      content = "Heart rate exceeds maximum limit! Your heart rate is: " +
                String(roundedHeartRate);
      sendNotification("Warning", content.c_str());
    } else if (roundedHeartRate > upperBound) {
      content = "Heart rate is above the upper bound! Your heart rate is: " +
                String(roundedHeartRate);
      sendNotification("Warning", content.c_str());
    } else if (roundedHeartRate < lowerBound) {
      content = "Heart rate is below the lower bound! Your heart rate is: " +
                String(roundedHeartRate);
      sendNotification("Warning", content.c_str());
    }
  }
}

void sendNotification(const char *type, const char *content) {
  HTTPClient http;
  String url = String(serverAddress) + "/api/notifications";

  DynamicJsonDocument doc(512);
  doc["type"] = type;
  doc["content"] = content;
  doc["notificationDate"] = getFormattedTime();
  doc["user"] = userID;

  String payload;
  serializeJson(doc, payload);

  Serial.println("Sending POST request to: " + url);
  Serial.println("Payload: " + payload);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(payload);
  String response = http.getString();

  Serial.println("Notification Response: " + response);
  http.end();
}