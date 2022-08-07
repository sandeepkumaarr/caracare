import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

type CharacterCardSkeletonProps = {
  isGrid: boolean;
};

export default function CharacterCardSkeleton({
  isGrid,
}: CharacterCardSkeletonProps) {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          width: isGrid ? windowWidth / 2.2 : windowWidth - 25,
          borderRadius: Math.round(moderateVerticalScale(30)),
          marginHorizontal: Math.round(moderateScale(5)),
          marginVertical: Math.round(moderateScale(5)),
        }}>
        <View
          style={{
            width: windowWidth / 2.5,
            height: Math.round(moderateVerticalScale(20)),
            borderRadius: 4,
            alignSelf: 'center',
            marginTop: Math.round(moderateScale(30)),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: Math.round(moderateScale(20)),
          }}>
          <View
            style={{
              width: Math.round(moderateScale(80)),
              height: Math.round(moderateVerticalScale(10)),
            }}
          />
          <View
            style={{
              width: Math.round(moderateScale(80)),
              height: Math.round(moderateVerticalScale(10)),
            }}
          />
        </View>

        <View
          style={{
            flexDirection: isGrid ? 'column' : 'row',
            marginTop: Math.round(moderateScale(40)),
            marginBottom: Math.round(moderateScale(20)),
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              paddingLeft: Math.round(moderateScale(5)),
            }}>
            <View
              style={{
                width: windowWidth / 2.5,
                height: Math.round(moderateVerticalScale(15)),
              }}
            />
            <View
              style={{
                width: windowWidth / 3.3,
                height: Math.round(moderateVerticalScale(10)),
                marginTop: Math.round(moderateScale(5)),
              }}
            />
          </View>

          <View
            style={{
              marginTop: isGrid ? Math.round(moderateScale(15)) : 0,
              paddingLeft: Math.round(moderateScale(5)),
            }}>
            <View
              style={{
                width: windowWidth / 2.5,
                height: Math.round(moderateVerticalScale(15)),
              }}
            />
            <View
              style={{
                width: windowWidth / 3.3,
                height: Math.round(moderateVerticalScale(10)),
                marginTop: Math.round(moderateScale(5)),
              }}
            />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({});
