import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {getCharacters} from '../redux/actions/CharacterActions';
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

const CharactersListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [selectedFilterItem, setSelectedFilterItem] =
    useState<FilterProps>('unknown');
  const [showDropdown, setshowDropdown] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [numCols, setColumnNo] = useState(2);

  const charactersList = useSelector(
    (state: State) => state.Characters.charactersList,
  );

  useEffect(() => {
    dispatch(
      getCharacters({
        isLazyLoading: false,
      }),
    );
    return () => {
      null;
    };
  }, []);

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
        contentContainerStyle={{
          marginHorizontal: Math.round(moderateVerticalScale(10)),
        }}
        renderItem={({item}) => (
          <CharacterCard character={item} isGrid={!toggle} />
        )}
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
                          }}>
                          <Text variant={'dropDownText'}>Alive</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.filterDropdownStyle}
                          onPress={() => {
                            setSelectedFilterItem('Dead');
                            setshowDropdown(false);
                          }}>
                          <Text variant={'dropDownText'}>Dead</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.filterDropdownLastItem}
                          onPress={() => {
                            setSelectedFilterItem('unknown');
                            setshowDropdown(false);
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
        }}
      />

      <BottomTab
        position={'absolute'}
        bottom={0}
        width="100%"
        paddingBottom={10}
        children={
          <>
            <TouchableOpacity>
              <SVGIcon
                type={'home'}
                height={`${moderateVerticalScale(40)}`}
                width={`${moderateScale(40)}`}
              />
            </TouchableOpacity>
            <TouchableOpacity>
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
