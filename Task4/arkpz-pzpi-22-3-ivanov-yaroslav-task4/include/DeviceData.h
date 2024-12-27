#ifndef DEVICE_DATA_H
#define DEVICE_DATA_H

#include <vector>

extern float heartRate;
extern int steps;

struct TrainingData {
  float heartRate;
  int steps;
  unsigned long timestamp;
};

extern int sendDataFrequency;
extern const char* userID;
extern const char* trainingID;

extern std::vector<TrainingData> trainingDataBuffer;

void fetchDeviceData();
void fetchUserData();
void generateTrainingData();
void sendTrainingData();
void analyzeHeartRate();
void sendNotification(const char* type, const char* content);

#endif