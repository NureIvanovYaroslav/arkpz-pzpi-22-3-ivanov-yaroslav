#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFiUdp.h>
#include <math.h>

#include <vector>

#include "DeviceData.h"
#include "ServerConfig.h"
#include "TimeConfig.h"
#include "WiFiConfig.h"

void setup() {
  Serial.begin(115200);
  setupWiFi();
  setupTime();
  fetchDeviceData();
  fetchUserData();
  generateTrainingData();
  sendTrainingData();
  analyzeHeartRate();
}

void loop() {
  static unsigned long lastSendTime = 0;
  unsigned long currentTime = millis();

  if (currentTime - lastSendTime >= sendDataFrequency * 1000) {
    generateTrainingData();
    sendTrainingData();
    analyzeHeartRate();
    lastSendTime = currentTime;
  }

  delay(1000);
}