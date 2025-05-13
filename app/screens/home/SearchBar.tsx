import {useState} from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { Row, NormalText } from './../../components';
import { spacings, shadow } from './../../utils/CulinaStyles';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [score, setScore] = useState(5);

    return (
        <View style={[styles.container, spacings.pb5]}>
            <Row style={{
                ...spacings.mt5, 
                ...spacings.mh8,
                justifyContent: 'space-between',
            }}>
                <TextInput 
                    placeholder='What would you like to cook today?' 
                    placeholderTextColor={'#33333380'}
                    maxLength={30}
                    style={[styles.searchBar, spacings.ph4, spacings.pv6]}
                    onChangeText={(q) => setQuery(q)}
                />

                <Pressable 
                    style={[styles.searchBtn, spacings.p3]} 
                    onPress={() => {
                        console.log(query);
                        onSearch(query);
                    }}
                >
                    <Feather name='search' size={24} color={'#333'} />
                </Pressable>

                <Pressable style={[spacings.pl2]} onPress={() => {

                }}>
                    <Fontisto name='more-v-a' size={24} color={'#333'} />
                </Pressable>
            </Row>

            <Row style={{
                ...spacings.mt4,
                ...spacings.mh8,
                justifyContent: 'space-between',
            }}>
                <Slider
                    style={{ width: 280, height: 40 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={0.1}
                    minimumTrackTintColor="#FFCFB3"
                    maximumTrackTintColor="#33333360"
                    thumbTintColor="#FFCFB3"
                    value={score}
                    onValueChange={setScore}
                />
                <NormalText>{`${score.toFixed(1)}   /   10`}</NormalText>
            </Row>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative', 
        zIndex: 1, 
        backgroundColor: '#FFF'
    },
    searchBar: {
        borderColor: '#33333325',
        width: 320,
        borderWidth: 1,
        borderRadius: 36,
    },
    searchBtn: {
        position: 'absolute',
        left: 264,
        borderRadius: 30,
    },
});

export default SearchBar;