import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



const BmiCalculator = () => {
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmi, setBmi] = useState(null)
    const [description, setDescription] = useState('')

   

  
    const clear = () => {
        setAge('');
        setWeight('');
        setHeight('');
        setBmi(null);
        setDescription('');
    };

    useEffect(() => {
        loadData();
    }, []);


    const calculateBmi = () => {

        if (!weight) {
            alert('Please enter a valid number!!');
            return
        }
        const bmi = weight / ((height /100) * (height /100))
        setBmi(bmi.toFixed(1));

        if (bmi < 18.5) {
            setDescription('Underweight, eat variety of foods!!')
        }
        else if (bmi >= 18.5 && bmi <= 24.9) {
            setDescription('Normal, Keep it up!!')
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            setDescription('Overweight, start working out!!')
        }
        else if (bmi >= 30 && bmi <= 34.9) {
            setDescription('Obese, Hit the gym!!')
        }

        saveData(age, weight, height, bmi, description);
    };

    const saveData = async (age, weight, height, bmi, description) => {
        try {
            await AsyncStorage.setItem('age', age);
            await AsyncStorage.setItem('weight', weight);
            await AsyncStorage.setItem('height', height);
            await AsyncStorage.setItem('bmi', bmi.toString());
            await AsyncStorage.setItem('description', description);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const loadData = async () => {
        try {
            const saveAge = await AsyncStorage.getItem('age');
            const saveWeight = await AsyncStorage.getItem('weight');
            const saveHeight = await AsyncStorage.getItem('height');
            const saveBmi = await AsyncStorage.getItem('bmi');
            const saveDescription = await AsyncStorage.getItem('description');

            setAge(saveAge || '');
            setWeight(saveWeight || '');
            setHeight(saveHeight || '');
            setBmi(saveBmi || '');
            setDescription(saveDescription || '');
        } catch (error) {
            console.error('Error loading data:', error);

        }
        
    };



    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>BMI CALCULATOR</Text>

            </View>

            <TextInput 
             style={styles.input}
             value={age} 
             onChangeText={(text) => setAge(text)} 
             placeholder='Age' 
             keyboardType='numeric'

             />

            
            <TextInput 
             style={styles.input}
             value={weight} 
             onChangeText={(text) => setWeight(text)} 
             placeholder='Weight in Kg' 
             keyboardType='numeric'

             />

             <TextInput
             style={styles.input}
             value={height} 
             onChangeText={(text) => setHeight(text)} 
             placeholder='Height in Cm' 
             keyboardType='numeric'
             />

             <TouchableOpacity
              style={styles.button}
              onPress={calculateBmi}
             
             >
                <Text style={styles.buttonText}>Calculate</Text>
               

             </TouchableOpacity>



             <TouchableOpacity
              style={styles.button1}
              onPress={clear}
             
             >
                <Text style={styles.buttonText1}>Clear</Text>
               

             </TouchableOpacity>

             <View style={styles.resultView}>
                <Text style={styles.result}>Age: {age}</Text>
                <Text style={styles.result}>Your BMI is: {bmi}</Text>
                <Text style={styles.result}>Classification: {description}</Text>
             </View>


        </View>
    )
}

export default BmiCalculator

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#C0C0C0'
    },
    title: {
        backgroundColor: '#000000',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',

    },
    input: {
        height: 55,
        margin: 15, 
        borderWidth: 1/2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 18,

    },
    button: {
        height: 40,
        width: 150,
        margin: 15,
        borderWidth: 1/2,
        borderRadius: 5,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',

    },

    button1: {
        height: 40,
        width: 150,
        marginLeft: 195,
        marginTop: -55,
        borderWidth: 1/2,
        borderRadius: 5,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText1: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },

    resultView: {
        margin: 15,
    },
    result: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',

    },

  });
  