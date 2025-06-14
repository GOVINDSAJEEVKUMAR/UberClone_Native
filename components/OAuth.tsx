import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const handleGoogleHandler = async () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center m-4 gap-x-3">
        <View className=" flex-1 h-[1px] bg-general-100" />
        <Text className=" text-lg">Or</Text>
        <View className=" flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Log in with Google"
        className=" mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/720/720255.png?ga=GA1.1.816205244.1735194051&semt=ais_hybrid",
            }}
            resizeMode="contain"
            className=" w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleHandler}
      />
    </View>
  );
};

export default OAuth;
