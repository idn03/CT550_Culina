// Hooks
import {useState} from 'react';

// Components
import { 
    View, 
    StyleSheet, 
    TextInput, 
    Pressable, 
    ScrollView, 
    Animated 
} from 'react-native';
import Slider from '@react-native-community/slider';
import Feather from '@expo/vector-icons/Feather';
import { Row, NormalText, TextBold, TopicTag } from './../../components';

// Other
import { dummyTopics } from '../../services/api/recipes';
import { spacings, shadow } from './../../utils/CulinaStyles';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [score, setScore] = useState(5);
    const [selectedTopic, setSelectedTopic] = useState<string[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);
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
                    setShowAdvanced(prev => !prev);
                }}>
                    <Feather name="more-vertical" size={24} color={'#333'} />
                </Pressable>
            </Row>

            {/* Search Advance */}
            {showAdvanced && (
                <View style={[spacings.mh8, spacings.mt4]}>
                    <TextBold style={{...spacings.mv2}}>Score</TextBold>
                    <Row style={{justifyContent: 'space-between'}}>
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

                    <TextBold style={{...spacings.mv2}}>Topics</TextBold>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                    >
                        {dummyTopics.map((topic, index) => (
                            <TopicTag 
                                key={index}
                                topic={topic.title}
                                selected={selectedTopic.includes(topic.title)}
                                onPress={() => {
                                    setSelectedTopic(prev => {
                                        if (prev.includes(topic.title)) {
                                            return prev.filter(t => t !== topic.title);
                                        }
                                        return [...prev, topic.title];
                                    });
                                    console.log(`Selected topic: ${topic.title}`);
                                }}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}            
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