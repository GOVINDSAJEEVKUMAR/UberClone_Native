import { router } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

const Onboarding = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-medium">Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
