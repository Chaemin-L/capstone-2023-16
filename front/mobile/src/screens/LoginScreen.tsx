import React, {FC, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {Formik} from 'formik';

import {colors} from '../components/common/colors';
import {Container, ScreenHeight} from '../components/common/shared';
import * as ButtonTheme from '../components/common/theme';

import KeyboardAvoidingViewContainer from '../components/common/Containers/KeyboardAvoidingViewContainer';
import StyledTextInput from '../components/common/Inputs/StyledTextInput';
import RegularButton from '../components/common/Buttons/RegularButton';
import TextButton from '../components/common/Buttons/TextButton';
import CheckBox from '../components/common/CheckBox/CheckBox';
import SmallText from '../components/common/Texts/SmallText';

import {NavigationData} from '../navigation/AuthNavigator';

import { graphql } from 'babel-plugin-relay/macro';

import { useMutation } from 'react-relay';

const LoginContainer = styled(Container)`
  width: 100%;
  padding-top: ${ScreenHeight * 0.3}px;
  flex: 1;
`;

const InputSection = styled.View`
  width: 100%;
  flex: 1;
  min-height: ${ScreenHeight * 0.7}px;
  align-items: flex-start;
`;

const BottomSection = styled.View`
  width: 100%;
  flex: 1;
  margin-left: 6%;
  justify-content: center;
  position: absolute;
  top: ${ScreenHeight * 0.4}px;
  align-items: center;
`;

const FindSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const SignupSection = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

type Props = NavigationData<'Login'>;

const [commitMutation, isMutationInFlight] = useMutation(
  graphql`
    mutation LoginScreenMutation($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        ... on User {
          id
          signupMethod
          createdAt
          email
          username
        }
    }
}`);

// const commitMutation = {};

export const LoginScreen: FC<Props> = ({navigation}) => {
  const [autoLogin, setAutoLogin] = useState(false);
  return (
    <LoginContainer>
      <KeyboardAvoidingViewContainer>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={({email, password}) => {
            alert(`email:${email} password:${password}`);
          }}>
          {({values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
            <>
              <InputSection>
                <StyledTextInput
                  labelStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: '700',
                  }}
                  label="아이디"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                />
                <StyledTextInput
                  labelStyle={{
                    color: colors.black,
                    marginBottom: 7,
                    fontWeight: '700',
                  }}
                  label="비밀번호"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  isPassword={true}
                />
                <CheckBox
                  onPress={() => setAutoLogin(!autoLogin)}
                  isChecked={autoLogin}
                  label="로그인 유지"
                  labelStyle={{color: colors.black}}
                />
              </InputSection>
              <BottomSection>
                <FindSection>
                  <TextButton
                    textStyles={{color: colors.black}}
                    onPress={() => {}}>
                    아이디 찾기
                  </TextButton>
                  <SmallText textStyle={{color: colors.black}}> / </SmallText>
                  <TextButton
                    textStyles={{color: colors.black}}
                    onPress={() => {}}>
                    비밀번호 찾기
                  </TextButton>
                </FindSection>
                <SignupSection>
                  <SmallText textStyle={{color: colors.black}}>
                    PERSONA가 처음이신가요?
                  </SmallText>
                  <TextButton
                    textStyles={{color: colors.black, marginLeft: 12}}
                    onPress={() => {
                      navigation.navigate('Main');
                      const data = commitMutation({
                        variables: {
                          username: "test",
                          password: "1234"
                        },
                        onError: e => {
                          console.log(e);
                        }
                      });
                    }}>
                    회원가입
                  </TextButton>
                </SignupSection>
                <RegularButton
                  btnStyles={[
                    ButtonTheme.whiteBGpurpleSD.btnStyle,
                    {
                      height: 55,
                    },
                  ]}
                  textStyles={ButtonTheme.whiteBGpurpleSD.textStyle}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  SIGN IN
                </RegularButton>
              </BottomSection>
            </>
          )}
        </Formik>
      </KeyboardAvoidingViewContainer>
    </LoginContainer>
  );
};
