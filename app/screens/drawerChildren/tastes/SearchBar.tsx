// Hooks
import { useState } from 'react';

// Components
import {
    View,
    StyleSheet,
    TextInput,
    Pressable
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Row } from '@/components';

// Other
import { spacings } from '@utils/CulinaStyles';

interface SearchBarProps {
    onSearch: ( query: string ) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');

    return (
        <View style={[styles.container, spacings.pb5]}>
            <Row style={{
                ...spacings.mt5,
                ...spacings.mh8,
                justifyContent: 'center',
            }}>
                <TextInput
                    placeholder='Search here...'
                    placeholderTextColor={'#33333380'}
                    maxLength={30}
                    style={[styles.searchBar, spacings.ph4, spacings.pv6]}
                    onChangeText={(q) => setQuery(q)}
                />

                <Pressable
                    style={[
                        styles.searchBtn, 
                        spacings.p3,
                        spacings.ml4
                    ]} 
                    onPress={() => {
                        onSearch(query);
                    }}
                >
                    <Feather name='search' size={24} color={'#333'} />
                </Pressable>
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
        left: '72%',
        borderRadius: 30,
    }
});

export default SearchBar;
