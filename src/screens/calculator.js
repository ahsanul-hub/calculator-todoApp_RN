import React, { useState } from "react";
import { Box, Text , View } from "native-base";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function Calculator() {
  const [result, setResult] = useState(0);
  const [display, setDisplay] = useState(0);
  const [operation, setOperation] = useState("")
  const [firstNumber, setFirstNumber] = useState("")
  const [secondNumber, setSecondNumber] = useState("")

  

  

  const handleAddNumber = (value) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + value);
    }
    if(display == 0){
      setDisplay(value)
      }else{
        setDisplay(display + "" + value)
      }
  };

  const handlePercentage = () => {
    setFirstNumber(firstNumber / 100);
    setDisplay(display + "" + '%')

};

  const handleOperationPress = (value) => {
    setOperation(value);
    setSecondNumber(firstNumber);
    setDisplay(display + "" + value)
    setFirstNumber("");
  };

  // const addDisplay= (number)=>{
  //     if(display == 0){
  //     setDisplay(number)
  //     }else{
  //       setDisplay(display + "" + number)
  //     }
  // }

 

  

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
    setDisplay(0)
  };

  const onResult = () => {
    // setDisplay(eval(display));
    switch (operation) {
      case "+":
          clear();
          setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
          setDisplay(parseFloat(secondNumber) + parseFloat(firstNumber));
          break;
      case "-":
          clear();
          setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
          setDisplay(parseFloat(secondNumber) - parseFloat(firstNumber));
          break;
      case "*":
          clear();
          setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
          setDisplay(parseFloat(secondNumber) * parseFloat(firstNumber));
          break;
      case "/":
          clear();
          setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
          setDisplay(parseFloat(secondNumber) / parseFloat(firstNumber));
          break;
      default:
          clear();
          setResult(0);
          break;
      }
  };
  

  return (
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#FFA0A0",
    }}
    >
  
      <Box mt={5} mx={5} flex={1}>
        <Text color="white" fontWeight="bold" fontSize={30}>
          Display
        </Text>
        <Box bg="primary.50" borderRadius={5} height={170} mb={5}>
          <Text
            fontSize={45}
            mx={3}
            my={2}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            {display}
          </Text>
          
      </Box>
      <Box style={{flex:1 }}>
        <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={()=> clear()} style={{flex:1, justifyContent: "center"}}>
                <Text bg="primary.800" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3, textAlign:"right"}}>
                  Clear</Text>
              </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", textAlign:"center"}}>
              <TouchableOpacity style={{flex:1, justifyContent: "center"}} onPress={()=> handleAddNumber('1')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleAddNumber('2')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA",padding:10, margin:3}}>
                  2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleOperationPress("-")}>
                <Text bg="primary.700" fontWeight="bold" fontSize={24}  style={{color:"white", padding:10, margin:3}}>
                  -</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleOperationPress("+")}>
                <Text bg="primary.700" fontWeight="bold" fontSize={24}  style={{color:"white", padding:10, margin:3}}>
                  +</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row", textAlign:"center"}}>
              <TouchableOpacity style={{flex:1, justifyContent: "center"}} onPress={()=> handleAddNumber('3')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleAddNumber('4')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleOperationPress("/")}>
                <Text bg="primary.700" fontWeight="bold" fontSize={24}  style={{color:"white", padding:10, margin:3}}>
                  /</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleOperationPress("*")}>
                <Text bg="primary.700" fontWeight="bold" fontSize={24}  style={{color:"white", padding:10, margin:3}}>
                  *</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row", textAlign:"center"}}>
              <TouchableOpacity style={{flex:1, justifyContent: "center"}} onPress={()=> handleAddNumber('5')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleAddNumber('6')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  6</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handlePercentage("％")}>
                <Text bg="primary.700" fontWeight="bold" fontSize={24}  style={{color:"white", padding:10, margin:3}}>
                  %</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> onResult()}>
                <Text bg="primary.700" fontWeight="bold" fontSize={24}  style={{color:"white", padding:10, margin:3}}>
                  =</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row", textAlign:"center"}}>
              <TouchableOpacity style={{flex:1, justifyContent: "center"}} onPress={()=> handleAddNumber('7')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleAddNumber('8')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24} style={{color:"#FAFAFA", padding:10, margin:3}}>
                  8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleAddNumber('9')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24}  style={{color:"#FAFAFA",padding:10, margin:3}}>
                  9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1, justifyCtent: "center"}} onPress={()=> handleAddNumber('0')}>
                <Text bg="primary.400" fontWeight="bold" fontSize={24}  style={{color:"#FAFAFA", padding:10, margin:3}}>
                  0</Text>
              </TouchableOpacity>
            </View>

      </Box>
        
      </Box>
      </SafeAreaView>
  );
}