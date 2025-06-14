import { InputFieldProps } from "@/types/type";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className=" my-2 w-full">
        <Text className={`text-lg mb-3 ${labelStyle}`}>{label}</Text>
        <View
          className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
        >
          {/* {icon && (
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/42/b5/76/42b57666dbe879a032955b85c5dcdcd5.jpg",
              }}
              className={`w-6 h-6 m-4 ${iconStyle}`}
            />
          )} */}
          <TextInput
            className={` rounded-full p-4 text-[15px] flex-1 ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
