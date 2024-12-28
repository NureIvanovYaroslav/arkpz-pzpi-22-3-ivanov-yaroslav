#ifndef TIME_CONFIG_H
#define TIME_CONFIG_H

#include <NTPClient.h>
#include <WiFiUdp.h>

extern NTPClient timeClient;

void setupTime();
String getFormattedTime();
unsigned long getEpochTime();

#endif