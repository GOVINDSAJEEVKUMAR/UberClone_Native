import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputFiled";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,

        state: "failed",
      });
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white mb-10">
        <View className=" flex-1 bg-white">
          <View className="relative w-full h-[250px]">
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/25/66/10/256610e42543237f2c9b3f4ad8f58179.jpg",
              }}
              className="z-0 w-full h-[250px]"
            />
            <Text className="text-2xl text-white absolute bottom-5 left-5">
              Create Your Account
            </Text>
          </View>
          <View className="p-5 ">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={<AntDesign name="user" size={20} color="#666" />}
              value={form.name}
              onChangeText={(value) =>
                setForm({
                  ...form,
                  name: value,
                })
              }
            />

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
              title="Sign Up"
              onPress={onSignUpPress}
              className=" mt-6"
            />

            <OAuth />

            <Link
              href="/sign-in"
              className="text-lg text-center text-general-200 mt-10"
            >
              <Text>Already have an Account?</Text>
              <Text className=" text-primary-500">Log In</Text>
            </Link>
          </View>

          <ReactNativeModal
            isVisible={verification.state == "pending"}
            onModalHide={() => {
              if (verification.state == "success") setShowSuccessModal(true);
            }}
          >
            <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className=" text-2xl mb-2">Verification</Text>
              <Text className=" mb-5 ">
                We've sent a verification code to {form.email}
              </Text>
              <InputField
                label="code"
                placeholder="12345"
                keyboardType="numeric"
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className=" text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify"
                onPress={onVerifyPress}
                className=" mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="flex-1 justify-center items-center bg-black/30">
              {" "}
              {/* background overlay */}
              <View className="bg-white px-7 py-9 rounded-2xl w-11/12 max-w-[350px]">
                <Image
                  source={{
                    uri: "https://i.pinimg.com/736x/86/90/c8/8690c88b272d2d13e6575e2930d327b0.jpg",
                  }}
                  className="w-[110px] h-[110px] mx-auto my-5"
                />
                <Text className="text-3xl text-center">Verified</Text>
                <Text className="text-base text-gray-400 mt-2 text-center">
                  You have Successfully Verified your account
                </Text>
                <CustomButton
                  title="Browse Home"
                  onPress={() => {
                    setShowSuccessModal(false);
                    router.push("/(root)/(tabs)/home");
                  }}
                  className="mt-5"
                />
              </View>
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
