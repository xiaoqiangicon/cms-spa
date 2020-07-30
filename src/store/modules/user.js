/* eslint-disable */
// import { loginByUsername, logout, getUserInfo } from '@/api/login';
import cookie from 'js-cookie';
import seeFetch from 'see-fetch';
import { getToken, setToken, removeToken } from '../../sys/utils/auth';
import share from '../../share';
import img from '../../../images/logo.png';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: [],
    },
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    // 用户名登录
    // LoginByUsername({ commit }, userInfo) {
    //   const username = userInfo.username.trim();
    //   return new Promise((resolve, reject) => {
    //     loginByUsername(username, userInfo.password)
    //       .then(response => {
    //         const data = response.data;
    //         commit('SET_TOKEN', data.token);
    //         setToken(response.data.token);
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        seeFetch('global/access')
          .then(res => {
            share.permissionInfo = res.data;

            const data = {
              roles: ['admin'],
              token: 'admin',
              introduction: '我是超级管理员',
              avatar: img,
              name: cookie.get('username') || '这谁呀',
            };

            commit('SET_ROLES', data.roles);
            commit('SET_NAME', data.name);
            commit('SET_AVATAR', data.avatar);
            commit('SET_INTRODUCTION', data.introduction);

            resolve({ data });
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token)
    //       .then(() => {
    //         commit('SET_TOKEN', '');
    //         commit('SET_ROLES', []);
    //         removeToken();
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '');
    //     removeToken();
    //     resolve();
    //   });
    // },

    // 动态修改权限
    // ChangeRoles({ commit, dispatch }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role);
    //     setToken(role);
    //     getUserInfo(role).then(response => {
    //       const data = response.data;
    //       commit('SET_ROLES', data.roles);
    //       commit('SET_NAME', data.name);
    //       commit('SET_AVATAR', data.avatar);
    //       commit('SET_INTRODUCTION', data.introduction);
    //       dispatch('GenerateRoutes', data); // 动态修改权限后 重绘侧边菜单
    //       resolve();
    //     });
    //   });
    // },
  },
};

export default user;
