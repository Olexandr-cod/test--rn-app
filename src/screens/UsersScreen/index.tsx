import React, {useEffect, useCallback} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {colors, positionHelpers} from '../../styles';
import {useReduxDispatch, useReduxSelector} from '../../store/store';
import {getUserAction} from '../../redux/UserRedux/UserAction';
import {incrementPageUsers} from '../../redux/UserRedux/UserSlice';
import {User} from '../../redux/UserRedux/types';
import {BodyText, SvgIcon} from '../../components/UI';
import UserCard from './components/UserCard';
import {formatPhoneNumber} from '../../utils/formatPhoneNumber';

const UsersScreen = () => {
  const dispatch = useReduxDispatch();
  const {users, loading, hasNextPage, totalPages, page, count} =
    useReduxSelector(state => state?.user);

  useEffect(() => {
    dispatch(getUserAction({page, count}));
  }, [dispatch, page, count]);

  const loadMoreUsers = useCallback(() => {
    if (hasNextPage && !loading && page < totalPages) {
      dispatch(incrementPageUsers());
    }
  }, [dispatch, hasNextPage, loading, page, totalPages]);

  const renderUserItem = useCallback(
    ({item}: {item: User}) => (
      <UserCard
        avatar={item?.photo}
        name={item?.name}
        position={item?.position}
        email={item?.email}
        phone={formatPhoneNumber(item?.phone)}
      />
    ),
    [],
  );

  const renderFooter = useCallback(() => {
    if (loading && page < totalPages) {
      return <ActivityIndicator size="small" />;
    }
    return null;
  }, [loading, page, totalPages]);

  return (
    <View
      style={[
        positionHelpers.fill,
        positionHelpers.ph25,
        {backgroundColor: colors.white},
      ]}>
      {users.length === 0 && !loading ? (
        <View style={positionHelpers.fillCenter}>
          <SvgIcon image={'noUsers'} />
          <BodyText
            fontWeight={'400'}
            fontSize={20}
            color={colors.black1}
            marginTop={20}>
            There are no users yet
          </BodyText>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={renderUserItem}
          onEndReached={loadMoreUsers}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={positionHelpers.mt20}
        />
      )}
    </View>
  );
};

export default UsersScreen;
