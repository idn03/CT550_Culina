// Hooks
import { useState } from 'react';

// Components
import {
    View,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView
} from 'react-native';
import Slider from 'rn-range-slider';
import Feather from '@expo/vector-icons/Feather';
import { Row, NormalText, TextBold, TopicTag } from '@components/index';

// Other
import { dummyTopics } from '@services/api/recipes';
import { spacings } from '@utils/CulinaStyles';

interface SearchBarProps {
    onSearch: (
        query: string, 
        lowScore: number, 
        highSocre: number, 
        topics: string[],
        advance: boolean 
    ) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [lowScore, setLowScore] = useState(0);
    const [highScore, setHighScore] = useState(8);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleValueChange = (low: number, high: number) => {
        setLowScore(low);
        setHighScore(high);
    };

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
                        onSearch(query, lowScore, highScore, selectedTopics, showAdvanced);
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
                    <TextBold style={{ ...spacings.mv2 }}>Score</TextBold>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Slider
                            style={{ width: 280, height: 40 }}
                            min={0}
                            max={10}
                            step={0.1}
                            floatingLabel
                            renderThumb={() => <View style={styles.thumb} />}
                            renderRail={() => <View style={styles.rail} />}
                            renderRailSelected={() => <View style={styles.railSelected} />}
                            onValueChanged={handleValueChange}
                            low={lowScore}
                            high={highScore}
                        />
                        <NormalText>{`${lowScore.toFixed(1)}   -   ${highScore.toFixed(1)}`}</NormalText>
                    </Row>

                    <TextBold style={{ ...spacings.mv2 }}>Topics</TextBold>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {dummyTopics.map((topic, index) => (
                            <TopicTag
                                key={index}
                                topic={topic.title}
                                selected={selectedTopics.includes(topic.title)}
                                onPress={() => {
                                    setSelectedTopics(prev => {
                                        if (prev.includes(topic.title)) {
                                            return prev.filter(t => t !== topic.title);
                                        }
                                        return [...prev, topic.title];
                                    });
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
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFCFB3',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    rail: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#33333360',
    },
    railSelected: {
        height: 4,
        backgroundColor: '#FFCFB3',
        borderRadius: 2,
    },
});

export default SearchBar;