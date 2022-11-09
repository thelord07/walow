import {ImageBackground, SafeAreaView, Text, View} from 'react-native';

const bg = '../assets/img/bg.jpeg';

const Layout = ({children}) => {
  return (
    <ImageBackground
      source={require(bg)}
      className="flex-1 w-screen justify-center items-center">

      {children}
    </ImageBackground>
  );
};

export default Layout;
