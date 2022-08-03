#!/bin/zsh

rm -rf $TMPDIR/react-* &&
rm -rf $TMPDIR/metro-* &&
watchman watch-del-all &&
rm -rf node_modules &&
rm -rf ios/build &&
rm -rf ios/Pods &&
sudo gem install cocoapods-deintegrate cocoapods-clean &&
cd ios &&
pod deintegrate &&
pod cache clean --all &&
rm -rf ~/.cocoapods &&
cd .. &&
cd android &&
rm -rf android/build &&
rm -rf ~/.gradle &&
cd .. &&
yarn cache clean && yarn && cd ios && pod install && cd .. &&
cd android &&
./gradlew clean 