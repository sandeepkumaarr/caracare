import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {characterList} from '../types/characters';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {
  Box,
  CharacterCard,
  ToggleItem,
  Text,
  BottomTab,
} from '../components/Index';
import {SVGIcon} from '../components/SVGIcon';
import {getLocalKeys} from '../utils/commonfunctions';
import {useNavigation} from '@react-navigation/native';
import routes from '../navigation/routes';

const FavouritesScreen = () => {
  const [favouriteCharacters, setfavouriteCharacters] = useState<
    Array<characterList>
  >([]);
  const [toggle, settoggle] = useState(false);
  const [numCols, setColumnNo] = useState(2);
  const [favouriteKeys, setFavouriteKeys] = useState<Array<number>>([]);
  const navigation = useNavigation();

  const getMultipleData = async () => {
    try {
      let result: Array<characterList> = [];
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const val = await AsyncStorage.getItem(key);
        if (val) result.push(JSON.parse(val));
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMultipleData().then(res => {
      if (res) setfavouriteCharacters(res);
    });
    return () => {
      null;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocalKeys().then(response => {
        let favKeys = response?.map(Number);

        if (favKeys && favKeys?.length > 0) {
          setFavouriteKeys(favKeys);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const RemoveItems = (id: number) => {
    let filteredItems = favouriteCharacters.filter(item => item.id !== id);
    setfavouriteCharacters(filteredItems);
  };

  const ListHeaderItem = () => {
    return (
      <Box
        flexDirection={'row'}
        justifyContent="space-between"
        alignItems={'center'}
        marginTop={10}
        paddingHorizontal={4}>
        <Box>
          <Text
            variant={'buttonText'}
            fontSize={Math.round(moderateScale(20))}
            textAlign="left">
            Favourite Characters
          </Text>
        </Box>

        <Box flexDirection={'row'} alignItems="center" zIndex={100}>
          <TouchableOpacity
            onPress={() => {
              if (toggle) {
                setColumnNo(2);
              } else {
                setColumnNo(1);
              }
              settoggle(prev => !prev);
            }}>
            <ToggleItem
              alignItems={'center'}
              justifyContent={'center'}
              toggleComponent={
                <SVGIcon
                  type={'grid'}
                  height={`${moderateVerticalScale(40)}`}
                  width={`${moderateScale(40)}`}
                />
              }
              toggledComponent={
                <SVGIcon
                  type={'list'}
                  height={`${moderateVerticalScale(40)}`}
                  width={`${moderateScale(40)}`}
                />
              }
              toggle={toggle}
            />
          </TouchableOpacity>
        </Box>
      </Box>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={numCols}
        numColumns={numCols}
        data={favouriteCharacters}
        contentContainerStyle={{
          marginHorizontal: Math.round(moderateVerticalScale(10)),
        }}
        renderItem={({item}) => {
          return (
            <CharacterCard
              character={item}
              isGrid={!toggle}
              favouriteKeys={favouriteKeys}
              RemoveItems={RemoveItems}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={() => (
          <View
            style={{
              marginBottom: Math.round(moderateVerticalScale(100)),
            }}
          />
        )}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={styles.headerComponentStyle}
        ListHeaderComponent={() => {
          return <ListHeaderItem />;
        }}
        onEndReached={() => console.log('End Reached')}
        ListEmptyComponent={() => (
          <Box
            paddingVertical={10}
            alignItems="center"
            justifyContent={'center'}>
            <Text variant={'defaultBody'} fontWeight={'800'} fontSize={20}>
              No favorurites added!
            </Text>
          </Box>
        )}
      />

      <BottomTab
        position={'absolute'}
        bottom={0}
        width="100%"
        paddingBottom={10}
        children={
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  routes.CHARACTERS_LIST_SCREEN as never,
                  {} as never,
                )
              }>
              <SVGIcon
                type={'home'}
                height={`${moderateVerticalScale(40)}`}
                width={`${moderateScale(40)}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  routes.FAVOURITES_SCREEN as never,
                  {} as never,
                )
              }>
              <SVGIcon
                type={'favourite'}
                height={`${moderateVerticalScale(40)}`}
                width={`${moderateScale(40)}`}
              />
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFF',
  },
  headerComponentStyle: {
    paddingVertical: Math.round(moderateVerticalScale(10)),
    backgroundColor: 'rgba(253, 253, 255, 0.6)',
  },
});
