import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled";
import OAuth from "@/components/OAuth";
import { Entypo, Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <>
      <ScrollView className="flex-1 bg-white ">
        <View className=" flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/25/66/10/256610e42543237f2c9b3f4ad8f58179.jpg",
              }}
              className="z-0 w-full h-[250px]"
            />
            <Text className="text-2xl text-white absolute bottom-5 left-5">
              WelCome👋
            </Text>
          </View>
          <View className="p-5 ">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={<Entypo name="mail" size={24} color="black" />}
              value={form.email} // ✅ Corrected
              onChangeText={(value) =>
                setForm({
                  ...form,
                  email: value,
                })
              }
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={<Feather name="lock" size={20} color="#666" />}
              value={form.password}
              secureTextEntry={true}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  password: value,
                })
              }
            />
            <CustomButton
              title="Sign In"
              onPress={onSignInPress}
              className=" mt-6"
            />

            <OAuth />

            <Link
              href="/sign-up"
              className="text-lg text-center text-general-200 mt-10"
            >
              <Text>Don't have an Account?</Text>
              <Text className=" text-primary-500">Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
