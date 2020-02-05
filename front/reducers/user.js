export const initialState = {
  isLoggingOut: false,
  isLoggingIn: false,
  logInErrorReason: "", // 로그인 실패사유
  isSignedUp: false,
  isSigningUp: false,
  signUpErrorReason: "",
  me: null, // 내 정보
  followingList: [],
  followerList: [],
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 이름변경중
  editNicknameErrorReason: "" // 이름 변경 실패사유
};
// 비동기 요청들은 이렇게 3개를 세트로해서 작성하자. 비동기는 보통 액션이 최대 3개씩 나온다
// 그래서 이런거는 리덕스 사가를 쓴다.
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"; //액션의 이름
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"; //액션의 이름
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"; //액션의 이름

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST"; //액션의 이름
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"; //액션의 이름
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE"; //액션의 이름

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_FOLLOW_REQUEST = "LOG_OUT_REQUEST";
export const LOAD_FOLLOW_SUCCESS = "LOG_OUT_SUCCESS";
export const LOAD_FOLLOW_FAILURE = "LOG_OUT_FAILURE";

export const FOLLOW_USER_REQUEST = "LOG_OUT_REQUEST";
export const FOLLOW_USER_SUCCESS = "LOG_OUT_SUCCESS";
export const FOLLOW_USER_FAILURE = "LOG_OUT_FAILURE";

export const UNFOLLOW_USER_REQUEST = "LOG_OUT_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "LOG_OUT_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "LOG_OUT_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "LOG_OUT_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "LOG_OUT_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "LOG_OUT_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME"; // 동기 요청은 리덕스만으로도 충분하다 //액션 만들기 귀찮으면 그냥 타입으로 적는다

//////////////////////////////////////////////////
/* export const INCREMENT_NUMBER = "INCREMENT_NUMBER"; */

/* export const loginRequestAction = {
  type: LOG_IN_REQUEST,
  data
};
export const logoutRequestAction = {
  type: LOG_OUT_REQUEST
};
export const signUpRequestAction = data => {
  // 동적 데이터는 전부다 함수로 만들어야 한다.
  // action에 넣을 데이터가 동적인 경우에는 action을 함수로 만들면 된다
  return {
    type: SIGN_UP_REQUEST,
    data: data
  };
};
 */

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts]
        }
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: ""
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,

        me: action.data,
        isLoading: false
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,

        logInErrorReason: action.error,
        me: null
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        me: null
      };
    }

    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: ""
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        return {
          ...state,
          me: action.data
        };
      }
      return {
        ...state,
        userInfo: action.data
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state
      };
    }
    default: {
      // 이거 안넣어주면 reducer undefined 에러가 난다
      return {
        ...state
      };
    }
  }
};

export default UserReducer;
