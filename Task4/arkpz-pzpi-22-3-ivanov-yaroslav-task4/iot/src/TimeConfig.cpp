#include <time.h>

#include "TimeConfig.h"

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000);

// Function to setup time synchronization using NTP
void setupTime() {
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println();
  Serial.print("Current time: ");
  Serial.println(&timeinfo, "%Y-%m-%d %H:%M:%S");
  Serial.println();
}

// Function to get formatted time as a string
String getFormattedTime() {
  timeClient.update();
  unsigned long epochTime = timeClient.getEpochTime();
  time_t rawTime = epochTime;
  struct tm *timeInfo = gmtime(&rawTime);

  char buffer[25];
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%SZ", timeInfo);
  return String(buffer);
}

// Function to get epoch time
unsigned long getEpochTime() { return timeClient.getEpochTime(); }