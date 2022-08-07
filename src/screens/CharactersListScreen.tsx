import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {URL, URLSearchParams} from 'react-native-url-polyfill';

import {AppDispatch} from '../redux/store';
import {
  getCharacters,
  lazyLoadCharacters,
  searchAndFilterCharacters,
} from '../redux/actions/CharacterActions';
import {
  BottomTab,
  Box,
  CharacterCard,
  Dropdown,
  SearchBar,
  Text,
  ToggleItem,
} from '../components/Index';
import {SVGIcon} from '../components/SVGIcon';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {FilterProps, State} from '../types/characters';
import CharacterCardSkeleton from '../SkeletonPlaceholders/CharacterCardSkeleton';
import {getLocalKeys} from '../utils/commonfunctions';
import {useNavigation} from '@react-navigation/native';
import routes from '../navigation/routes';

const CharactersListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [selectedFilterItem, setSelectedFilterItem] =
    useState<FilterProps>(null);
  const [showDropdown, setshowDropdown] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [numCols, setColumnNo] = useState(2);

  const [favouriteKeys, setFavouriteKeys] = useState<Array<number>>([]);
  const navigation = useNavigation();

  const charactersList = useSelector(
    (state: State) => state.Characters.charactersList,
  );

  const charactersListLoading = useSelector(
    (state: State) => state.Characters?.characterListLoading,
  );

  const charactersResponseInfo = useSelector(
    (state: State) => state.Characters.characterListResponseInfo,
  );

  const charactersListLazyLoading = useSelector(
    (state: State) => state.Characters?.characterListLazyLoading,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocalKeys().then(response => {
        let favKeys = response?.map(Number);

        if (favKeys && favKeys?.length > 0) {
          setFavouriteKeys(favKeys);
        }
        dispatch(getCharacters({}));
      });
    });

    return unsubscribe;
  }, [navigation]);

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
            All Characters
          </Text>
        </Box>

        <Box flexDirection={'row'} alignItems="center" zIndex={100}>
          <Box alignItems={'center'} paddingRight={4} zIndex={100}>
            <Dropdown
              showDropdown={showDropdown}
              setshowDropdown={setshowDropdown}
              width={Math.round(moderateScale(80))}
              zIndex={100}
              children={
                <>
                  <TouchableOpacity
                    style={styles.filterDropdownStyle}
                    onPress={() => {
                      setSelectedFilterItem('Alive');
                      setshowDropdown(false);
                      dispatch(
                        searchAndFilterCharacters({
                          name: null,
                          status: 'Alive',
                        }),
                      );
                    }}>
                    <Text variant={'dropDownText'}>Alive</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterDropdownStyle}
                    onPress={() => {
                      setSelectedFilterItem('Dead');
                      setshowDropdown(false);
                      dispatch(
                        searchAndFilterCharacters({
                          name: null,
                          status: 'Dead',
                        }),
                      );
                    }}>
                    <Text variant={'dropDownText'}>Dead</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterDropdownLastItem}
                    onPress={() => {
                      setSelectedFilterItem('unknown');
                      setshowDropdown(false);
                      dispatch(
                        searchAndFilterCharacters({
                          name: null,
                          status: 'unknown',
                        }),
                      );
                    }}>
                    <Text variant={'dropDownText'}>unknown</Text>
                  </TouchableOpacity>
                </>
              }
            />
          </Box>

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

  const onEndReachedLazyLoad = () => {
    if (
      charactersResponseInfo?.next &&
      !charactersListLazyLoading &&
      !charactersListLoading
    ) {
      const url = new URL(charactersResponseInfo?.next);
      const urlParams = new URLSearchParams(url.search);
      const param = urlParams.get('page');
      if (param) dispatch(lazyLoadCharacters({page: Number(param)}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        marginTop={2}
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />

      <FlatList
        key={numCols}
        numColumns={numCols}
        data={charactersList}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          marginHorizontal: Math.round(moderateVerticalScale(10)),
        }}
        renderItem={({item}) => {
          return charactersListLoading ? (
            <CharacterCardSkeleton isGrid={!toggle} />
          ) : (
            <CharacterCard
              character={item}
              isGrid={!toggle}
              favouriteKeys={favouriteKeys}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={styles.headerComponentStyle}
        ListHeaderComponent={() => {
          return <ListHeaderItem />;
        }}
        onEndReached={onEndReachedLazyLoad}
        ListFooterComponent={() =>
          charactersListLazyLoading ? <ActivityIndicator size="large" /> : null
        }
        ListFooterComponentStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Math.round(moderateScale(20)),
          marginBottom: Math.round(moderateScale(100)),
        }}
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

export default CharactersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFF',
  },
  headerComponentStyle: {
    paddingVertical: Math.round(moderateVerticalScale(10)),
    backgroundColor: 'rgba(253, 253, 255, 0.6)',
  },
  filterDropdownStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    paddingVertical: Math.round(moderateScale(5)),
    paddingHorizontal: Math.round(moderateScale(5)),
  },
  filterDropdownLastItem: {
    paddingVertical: Math.round(moderateScale(5)),
    paddingHorizontal: Math.round(moderateScale(5)),
  },
});
