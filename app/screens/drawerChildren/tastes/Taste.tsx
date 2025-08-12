// Hooks
import React, { useState, useEffect, useMemo } from 'react';

// Components
import { View, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Header, Avatar, Loading, TopicTag, Row, NormalText, TextBold, InriaTitle, KuraleTitle } from '@/components';
import SearchBar from './SearchBar';
import UserCard from './UserCard';

// Other
import { CreateTasteForm, Taste } from '@/interfaces/taste';
import { SimpleUser, Profile } from '@/interfaces/user';
import { dummyTopics } from '@/services/api/recipes';
import { dummyOptionTaste } from '@/services/api/taste';
import { getCurrentUser } from '@/services/api/auth';
import { createTaste, editTaste, fetchCurrentUserTaste } from '@/services/api/taste';
import { fetchAllUsers } from '@/services/api/users';
import { spacings, shadow } from '@/utils/CulinaStyles';

const TasteScreen = () => {
    const [currentUser, setCurrentUser] = useState<SimpleUser>({ $id: '', avatar: '', fullname: '' });
    const [allUsers, setAllUsers] = useState<Profile[]>([]);
    const [tasteId, setTasteId] = useState('');
    const [form, setForm] = useState<CreateTasteForm>({
        accountId: '',
        topics: [],
        favoriteChefs: [],
        optional: 0,
    });
    const [items, setItems] = useState<{ id: number; label: string; }[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadScreen = async () => {
            try {
                setLoading(true);
                const res = await getCurrentUser();
                if (res) {
                    setCurrentUser({
                        $id: res.$id,
                        avatar: res.avatar,
                        fullname: res.fullname,
                    });

                    const taste = await fetchCurrentUserTaste(currentUser.$id);

                    if (taste) {
                        setTasteId(taste.$id);
                        setForm({
                            accountId: res.$id,
                            topics: taste?.topics ?? [],
                            favoriteChefs: taste?.favChefs ?? [],
                            optional: taste?.optional ?? 0,
                        });
                    }

                    const users = await fetchAllUsers();

                    if (users && Array.isArray(users)) {
                        const favSet = new Set(form.favoriteChefs || []);
                        const favUsers: Profile[] = [];
                        const otherUsers: Profile[] = [];
                        for (const u of users) {
                            if (favSet.has(u.$id)) favUsers.push(u);
                            else otherUsers.push(u);
                        }
                        setAllUsers([...favUsers, ...otherUsers]);
                    }
                }

                setItems((dummyOptionTaste || []).map((opt: any) => ({
                    id: opt.id,
                    label: opt.label,
                })));
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };

        loadScreen();
    }, []);

    const toggleChef = async ($id: string) => {
        setForm((prev) => {
            const set = new Set(prev.favoriteChefs);
            if (set.has($id)) set.delete($id);
            else set.add($id);
            const favoriteChefs = Array.from(set);

            const favSet = new Set(favoriteChefs);
            const favUsers: Profile[] = [];
            const otherUsers: Profile[] = [];
            for (const u of allUsers) {
                if (favSet.has(u.$id)) favUsers.push(u);
                else otherUsers.push(u);
            }
            setAllUsers([...favUsers, ...otherUsers]);
            console.log(form.favoriteChefs);

            return { ...prev, favoriteChefs };
        });
    };

    const handleSubmit = async (tasteId: string) => {
        try {
            if (tasteId != '') {
                const data: Taste = {
                    $id: tasteId,
                    topics: form.topics,
                    favoriteChefs: form.favoriteChefs,
                    optional: form.optional

                };
                await editTaste(data);
                return;
            }
            else {
                await createTaste(form);
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Header>Taste</Header>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView style={[spacings.mh8, spacings.mt5, { flex: 1 }]} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                        <Row>
                            <NormalText>Hi,</NormalText>
                            <View style={spacings.ml3}>
                                <Avatar size={43} uri={currentUser.avatar} />
                            </View>
                            <NormalText>{currentUser.fullname}</NormalText>
                        </Row>
                        <InriaTitle>Let's customize your taste!</InriaTitle>
                    </View>

                    <View style={spacings.mt8}>
                        <TextBold style={{ ...spacings.mv3, textAlign: 'center' }}>Select your favorite Chefs</TextBold>
                        <FlatList
                            data={allUsers}
                            keyExtractor={(item) => item.$id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[spacings.mv3]}
                            renderItem={({ item }) => (
                                <View style={spacings.mr3}>
                                    <UserCard
                                        id={item.$id}
                                        avatar={item.avatar}
                                        email={item.email}
                                        fullname={item.fullname}
                                        gender={item.gender}
                                        age={item.age}
                                        isSelected={!!form?.favoriteChefs?.includes(item.$id)}
                                        onSelected={() => { toggleChef(item.$id) }}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    <View style={spacings.mt8}>
                        <TextBold style={{ ...spacings.mv3, textAlign: 'center' }}>Select your favorite Topics</TextBold>
                        <Row style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                            {dummyTopics.map((topic, idx) => (
                                <TopicTag
                                    key={topic.id}
                                    topic={topic.title}
                                    selected={form.topics.includes(topic.title)}
                                    onPress={() =>
                                        setForm(prev => {
                                            const set = new Set(prev.topics);
                                            set.has(topic.title) ? set.delete(topic.title) : set.add(topic.title);
                                            return { ...prev, topics: Array.from(set) };
                                        })
                                    }
                                />
                            ))}
                        </Row>
                    </View>

                    <View style={spacings.mt8}>
                        <TextBold style={{ ...spacings.mt3, textAlign: 'center' }}>Select your Optional</TextBold>
                        <DropDownPicker
                            open={open}
                            value={form.optional}
                            items={items}
                            setOpen={setOpen}
                            schema={{ label: 'label', value: 'id' }}
                            setValue={(setFn) => {
                                setForm(prev => {
                                    const nextValue = typeof setFn === 'function' ? setFn(prev.optional) : setFn;
                                    return { ...prev, optional: nextValue as number };
                                });
                            }}
                            setItems={setItems}
                            listMode='SCROLLVIEW'
                            style={StyleSheet.flatten([styles.optionalDropdown, shadow.boxShadow])}
                            dropDownContainerStyle={[styles.dropDownContainer, spacings.p4]}
                        />
                    </View>

                    <Pressable
                        onPress={() => { !loading && handleSubmit(tasteId); }}
                        style={spacings.mt8}
                        disabled={loading}
                    >
                        <KuraleTitle style={{ ...spacings.mb20, ...shadow.textShadow, alignSelf: 'center' }}>
                            {loading ? "Saving..." : "Save Change"}
                        </KuraleTitle>
                    </Pressable>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    loadingContainer: {
        backgroundColor: '#EEEEEE60',
        borderRadius: 12,
    },
    optionalDropdown: {
        marginTop: 20,
        alignSelf: 'center',
        width: 200,
        borderWidth: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    dropDownContainer: {
        borderWidth: 0,
        backgroundColor: '#FFF',
        marginTop: 20,
        marginLeft: 80
    },
});

export default TasteScreen;