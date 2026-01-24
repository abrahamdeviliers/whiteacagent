npx expo install @expo/vector-icons   --> icons

npm install @react-navigation/native  ---> navigation 


npm install @react-navigation/native-stack   --> for navigating login screen to dashboard 



navigation.navigate('dashboard')  --> user can go back 

navigation.replace('dashboard') ---> user cant go to back 


options={ {headerShown : false}}  ---> it hides the header 


npx expo install react-native-screens  

react-native-screens is a performance optimization library for navigation.

It lets React Navigation use native screen components (UIViewController on iOS, Fragment on Android) instead of rendering everything in JavaScript.

📌 In short:

It makes navigation faster and more memory-efficient

🧠 Why does React Navigation use it?

React Navigation (especially native-stack) is built on top of react-native-screens.

It helps with:

Faster screen transitions 🚀

Lower memory usage

Better gesture handling

Native-feeling navigation

Proper screen lifecycle management

npx expo install @react-navigation/bottom-tabs  -->  bottaom navigator 

const Tab = createBottomTabNavigator()

function BottomTabs(){
    return(

        <Tab.Navigator>

            <Tab.Screen name ='Home' component={ Dashboard }  />

            <Tab.Screen  name="calls" component={ Calls }  />

            <Tab.Screen name="Payment Attempts" component={ PaymentAttempts }  />

            <Tab.Screen name="More"  component={ More }  />

        </Tab.Navigator>

    )
}


<Tab.Navigator screenOptions={ { headerShown : false }}>  to  hide the header 


npx expo install @react-native-community/datetimepicker   for date time picker 

import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Platform, Pressable  , Text} from "react-native"


function DateRangePicker(){

    const [ startDate , setStartDate] = useState(null) 
    // null because we’re telling React: “Initially, startDate has no value

    const [ endDate , setEndDate] = useState(null)

    const [activeFiled , setActiveField] = useState(null)

    //  we have to choose start or end because we re use our component to both start date and end date 

    const [showPicker , setShowPicker] = useState(false)
    
    // this is for calendar opening if true calendars shown in ui , false not shows 

    function onDateChange( event , selectedDate){
        setShowPicker(false)
        activeFiled === 'start' 
        ? setStartDate(selectedDate)
        : setEndDate(selectedDate)
    }

    return(
        <>
        {/* start date */}
        <Pressable  
        onPress={ 
            () => {
                setActiveField('start')
                setShowPicker(true)
            }
        }
        >
            <Text> 
                { startDate ? formDate(startDate) : 'From date '}
            </Text>

        </Pressable>

        {/* end date  */}

        <Pressable
        onPress={ 
            () => {
                setActiveField('end')
                setShowPicker(true)
            }
        }
        >
            <Text>

                { endDate ? formDate(endDate) : 'end Date'}

            </Text>

        </Pressable>


        {  showPicker & (
            <DateTimePicker 

            value = {
                activeFiled === 'start' ? startDate || new Date() : endDate || new Date() 
            }

            mode = 'date'
            display = { Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            />
        )}
        </>

    )
}

export default DateRangePicker

What toLocaleDateString() does

toLocaleDateString() converts a JavaScript Date object into a human-readable string, based on a locale.

Example:

const date = new Date(2026, 0, 15); // 15 Jan 2026

Without formatting
date.toString()
// "Thu Jan 15 2026 00:00:00 GMT+0530 ..."




Why 'en-GB' specifically?

'en-GB' = British English date format

It gives:

DD / MM / YYYY

Example
date.toLocaleDateString('en-GB')
// "15/01/2026"



npx expo  install @react-native-picker/picker   for showing drop down 



Expandable card.Js 

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

Why this is needed

LayoutAnimation works out of the box on iOS

On Android, it is disabled by default because it was historically considered experimental

So if you try to use:

LayoutAnimation.configureNext(...)


on Android without this line, your animations will not run (or may crash on older versions).

Line-by-line explanation
Platform.OS === "android"

Checks if the app is currently running on Android
(Platform.OS is "ios", "android", "web", etc.)

UIManager.setLayoutAnimationEnabledExperimental(true)

Tells React Native:

“Yes, allow LayoutAnimation on Android”

This enables smooth animations when:

Views appear / disappear

Height changes

Layout updates

The ?. (optional chaining)
setLayoutAnimationEnabledExperimental?.(true);


This means:

Call the function only if it exists

Prevents crashes on:

Older React Native versions

Environments where this API is unavailable

Equivalent to:

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}



search .js 

const TAB_WIDTH = (width - 40) / 3;

No problem — this is a **very common confusion**. Let’s explain it **slowly, visually, and with numbers**.

---

## The line

```js
const TAB_WIDTH = (width - 40) / 3;
```

This calculates **how wide each tab button (and the blue pill) should be**.

---

## Step 1: What is `width`?

```js
const { width } = Dimensions.get('window');
```

* `width` = **entire screen width**
* Example phone:

  ```
  width = 360 px
  ```

---

## Step 2: Why subtract `40`?

Look at this style:

```js
tabWrapper: {
  margin: 16,
}
```

`margin: 16` means:

* 16 px on the **left**
* 16 px on the **right**

So total horizontal margin:

```
16 + 16 = 32 px
```

Now add a little extra spacing / rounding buffer (~8 px) used by:

* border radius
* pill spacing
* visual safety

So we round it to:

```
≈ 40 px
```

👉 This ensures the pill **does not overflow** the rounded container.

---

## Step 3: Remaining usable width

If screen width is **360 px**:

```
360 - 40 = 320 px
```

This is the **actual space inside the tab bar**.

---

## Step 4: Why divide by `3`?

You have **3 tabs**:

1. By Date
2. By Agent
3. Search Lead

To give **equal width** to each tab:

```
320 ÷ 3 ≈ 106.6 px per tab
```

So:

```js
TAB_WIDTH ≈ 106.6
```

---

## Step 5: Why this matters for animation

This line is used here:

```js
Animated.spring(translateX, {
  toValue: index * TAB_WIDTH,
});
```

That means:

| Tab | index | translateX    |
| --- | ----- | ------------- |
| 1st | 0     | 0             |
| 2nd | 1     | TAB_WIDTH     |
| 3rd | 2     | TAB_WIDTH × 2 |

📌 The blue pill moves **exactly one tab width at a time**.

---

## Visual representation

```
|----------------------------------|  ← screen width
  |------------------------------|   ← width - 40
  |--------|--------|--------|
    TAB 1     TAB 2     TAB 3
```

Each `|--------|` = `TAB_WIDTH`

---

## Why the pill aligns perfectly

Because:

* Each tab button has:

```js
width: TAB_WIDTH
```

* The pill also has:

```js
width: TAB_WIDTH
```

So when the pill moves:

```
0 px → tab 1
+TAB_WIDTH → tab 2
+TAB_WIDTH * 2 → tab 3
```

Perfect alignment ✅

---

## One-sentence intuition

> “Take the usable width of the screen, divide it evenly among the tabs, and move the pill by exactly one tab width.”


const translateX = useRef(new Animated.Value(0)).current;

Let’s explain this **very slowly and intuitively**, because this line is **core to how the animation works**.

---

## The line

```js
const translateX = useRef(new Animated.Value(0)).current;
```

We’ll break it into **4 small pieces**.

---

## 1️⃣ `new Animated.Value(0)`

```js
new Animated.Value(0)
```

This creates an **animated number**, starting at `0`.

Think of it as:

* A number that can **change over time**
* React Native watches it and updates the UI smoothly

Here, it represents:

> **How far the blue pill moves horizontally (in pixels)**

So at start:

```
translateX = 0
```

→ Pill is under the **first tab**

---

## 2️⃣ Why not `useState`?

You might ask:

> “Why not use `useState(0)`?”

Because:

* `useState` causes **re-renders**
* Animations update **many times per second**
* Re-rendering every frame would be **slow and janky**

`Animated.Value`:

* Updates on the **native UI thread**
* Does **not** re-render the component
* Much smoother 🚀

---

## 3️⃣ `useRef(...)`

```js
useRef(new Animated.Value(0))
```

`useRef` is used to **store something that must survive re-renders**.

Important rule:

> When React re-renders, normal variables are recreated
> `useRef` values are NOT

So:

* The animation value stays the **same object**
* It does not reset when `activeTab` changes

❌ Without `useRef`:

```js
const translateX = new Animated.Value(0); // BAD
```

Every render would reset it to `0` → animation breaks.

---

## 4️⃣ `.current`

```js
useRef(...).current
```

`useRef` returns an object like:

```js
{ current: Animated.Value }
```

So:

* `.current` extracts the **actual animated value**

After this line:

```js
translateX === Animated.Value
```

---

## 5️⃣ How this controls the pill animation

This value is used here:

```js
<Animated.View
  style={{
    transform: [{ translateX }]
  }}
/>
```

Meaning:

* When `translateX` changes
* The pill **moves horizontally**

---

## 6️⃣ When does `translateX` change?

Inside this animation:

```js
Animated.spring(translateX, {
  toValue: index * TAB_WIDTH,
  useNativeDriver: true,
}).start();
```

Example:

* Tab 0 → `translateX = 0`
* Tab 1 → `translateX = TAB_WIDTH`
* Tab 2 → `translateX = TAB_WIDTH * 2`

The pill **slides smoothly** to the new position.

---

## Mental model (important)

Think of `translateX` as:

🟦 **A motor attached to the pill**

* `Animated.Value` → motor position
* `Animated.spring` → how fast & smooth it moves
* `transform: translateX` → pill follows the motor

---

## TL;DR

* `Animated.Value(0)` → animated number starting at 0
* `useRef` → keeps it alive across renders
* `.current` → gets the value
* Used by `Animated.View` to move the pill smoothly


Great question — and **this is the exact misunderstanding most people have at first**, so you’re thinking in the right direction 👍
Short answer: **No, it’s NOT using 360 directly.**

Let’s clear it up **with real numbers**.

---

## ❌ What you thought (not correct)

You thought:

```txt
width = 360

Tab 0 → 360 × 0 = 0
Tab 1 → 360 × 1 = 360
Tab 2 → 360 × 2 = 720
```

That would move the pill **off the screen** ❌
We **never** move by the full screen width.

---

## ✅ What actually happens

We use **TAB_WIDTH**, not `width`.

```js
const TAB_WIDTH = (width - 40) / 3;
```

---

## Let’s use real numbers

Assume:

```txt
Screen width = 360 px
```

### Step 1: Subtract margins

```txt
360 - 40 = 320 px   ← usable width
```

### Step 2: Divide by 3 tabs

```txt
320 ÷ 3 ≈ 106.67 px
```

So:

```js
TAB_WIDTH ≈ 106.67
```

---

## Now apply the animation logic

```js
toValue: index * TAB_WIDTH
```

### Tab positions

| Tab   | Calculation  | translateX  |
| ----- | ------------ | ----------- |
| Tab 0 | `0 × 106.67` | `0 px`      |
| Tab 1 | `1 × 106.67` | `106.67 px` |
| Tab 2 | `2 × 106.67` | `213.34 px` |

✅ The pill moves **exactly one tab at a time**

---

## Visual layout

```
|------------------------------| 320 px usable width
|--------|--------|--------|
   106px    106px    106px
```

When you tap:

* Tab 1 → pill moves right by **106 px**
* Tab 2 → pill moves right by **213 px**

---

## Why this works perfectly

Because:

```js
tabButton: {
  width: TAB_WIDTH,
}

activePill: {
  width: TAB_WIDTH,
}
```

The pill width = tab width
The movement = tab width

So alignment is **pixel-perfect** 🎯

---

## One-line intuition (remember this)

> “The pill moves by **one tab width**, not by screen width.”

---

If you want, I can:

* Rewrite the formula so it auto-calculates from layout (no magic `40`)
* Animate the **content swipe** as well
* Explain this using a diagram based on **your actual device width**


----------------------------
 today 
 npx expo install react-native-reanimated

 npx expo install react-native-gesture-handler


 npx expo install react-native-worklets


 npm install --save-dev babel-preset-expo

npx expo install expo-blur


----------------------------------------




import { Text, View , StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Ionicons }from '@expo/vector-icons'
import { useContext, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
function LoginScreen( { navigation }){

    const [email , setEmail] = useState('')
 
    const [password , setPassword] = useState('')

    const [ Visible , setVisible ] = useState(false)

    const { setUser } = useContext(AuthContext)


    async function postData() {
    if (!email || !password) {
      alert("Enter User ID and Password");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('userID', email);
      formData.append('password', password);

        const response = await axios.post(
        'http://13.204.13.216/agentDev/curl_login.php',
        formData.toString(),
        {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true, 
        }
        );

      console.log("RAW RESPONSE:", response);
      console.log('status',response.status)

    //   if( response.status === 200){
    //     navigation.replace("Bottomtabs");
    //   }

    if (response.data?.status === "Y") {
        const profileRes = await axios.get('http://13.204.13.216/agentDev/profile.php',
            {withCredentials : true}
        )

        setUser(profileRes.data.session)
    navigation.replace("Bottomtabs");
    } else {
    alert(response.data?.message || "Invalid credentials");
    }
        
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Network Error", "Unable to login");
    }
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor : '#EEF7FB'  }}>
        <View style = { styles.container }>

            <View style = { styles.mainContainer}>
                {/* main container */}

                <View style = { styles.logocont}>
                    {/* logo  container */}

                    <Text style = { styles.brandText}>
                        White<Text style = { styles.coatsfont}>Coats</Text>
                    </Text>

                    <Text style = { styles.textLight }>
                        Lead Tracker for Healthcare Agents
                    </Text>
                </View>

                <View style = { styles.logincont }>
                    {/* login container */}

                    <View>
                        {/* employee id */}

                        <Text style = { styles.label }>Employee Id</Text>

                        <View style = { styles.empcont }>
                            {/* id input field  */}

                            <Ionicons name='person-outline' size={20} color= '#9AA5B1' />
                            <TextInput 
                            placeholder='Enter Email Id'
                            placeholderTextColor='#9AA5B1'
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            style = { styles.inpt}
                            />
                        </View>

                        {console.log("email : --->",email)}

                    </View>


                    <View>
                        {/* password */}

                        <Text style = { styles.label }> Passsword </Text>

                        <View style = { styles.passcont}>
                            {/* password input  */}
                            <Ionicons name='lock-closed-outline' size={20} color='#9AA5B1' />

                            <TextInput
                            placeholder='.....'
                            placeholderTextColor='#9AA5B1'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!Visible}   
                            style = { styles.inpt}
                            />

                            {/* eye icon  */}

                            <TouchableOpacity onPress={ () => setVisible(!Visible) }> 
                               <Ionicons  
                                name={ Visible ? 'eye-off-outline' : 'eye-outline'}
                                size={20} 
                                color='#9AA5B1'
                                />
                            </TouchableOpacity>

                        </View>

                        {console.log("email : --->",email)}

                        {console.log(typeof Visible, Visible)}

                    </View>
                  

                  <TouchableOpacity style = { styles.sign } onPress={ postData }>
                      {/* signup button */}
                    
                    <Text style = { styles.signText}> Sign in </Text>

                  </TouchableOpacity>


                  <View style = { styles.forgetPass }>
                    
                    {/* forget password  */}

                    <Text style = { styles.textLight }> Forget Password?</Text>

                  </View>


                </View>

            </View>

            <View style ={ [ styles.forgetPass , styles.supportcont ] } >
                    {/* help text  */}

                    <Text style = { styles.textLight }>
                        Need help logging in?<Text style = { styles.support }>Contact Support </Text>
                    </Text>

                </View>

        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    coatsfont : {
        color : '#22C55E'
    },
    brandText : {

        fontSize : 28,
        fontWeight : '700',
        color : '#1F2933',
    },
    container : {
        flex : 1,
        backgroundColor : '#EEF7FB',
        padding : 16,
        alignItems : 'center'
    },
    mainContainer : {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    empcont : {
        flexDirection : 'row',
        alignItems : 'center',
        borderColor : '#E5E7EB',
        borderWidth : 1.5,
        borderRadius : 10,
        paddingHorizontal: 10,
        height: 48,
        gap: 8,
    },
    passcont : {
        flexDirection : 'row',
        alignItems : 'center',
        borderColor : '#E5E7EB',
        borderWidth : 1.5,
        borderRadius : 10,
        paddingHorizontal: 10,
        height: 48,
        gap: 8,
    },
    logincont : {
       backgroundColor: '#FFFFFF',
        borderRadius: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        padding: 20,
        gap: 16,
        width: '100%',
        maxWidth: 380,
    },
    inpt : {
        flex : 1,
    },
    support : {
        color : '#10A6A0',
        fontWeight : '600'

    },
    sign : {
        borderColor : '#10A6A0',
        backgroundColor : '#10A6A0',
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 10,
        padding : 10
    },
    signText : {
        color : 'white',
    },
    forgetPass : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    textLight : {
        color : '#6B7280'
    },
    logocont : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    label : {
        color : '#1F2933',
        fontSize : 18,
        fontWeight : '600',
        marginBottom : 8
    },
    supportcont : {
        marginTop : 10
    }

})
export default LoginScreen



npm install @react-native-async-storage/async-storage
