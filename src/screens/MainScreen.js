import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AppHeaderIcon from '../components/AppHeaderIcon'
import PostList from '../components/PostList';
import { loadPosts } from '../store/actions/postAction';
import theme from '../theme';

const MainScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      booked: post.booked,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state => state.post.loading)

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.MAIN_COLOR} />
      </View>
    )
  }

  return <PostList data={allPosts} onOpen={openPostHandler} />
};

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Мой блог',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Take photo"
        iconName="ios-camera"
        onPress={() => navigation.navigate('Create')}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        iconName="ios-menu"
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default MainScreen;