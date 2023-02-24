/* eslint-disable */
import {createStore} from 'vuex';

export default createStore({
    state() {
        return {
            auth_token: '',
            user_data: {},
        }
    },
    getters: {
        TOKEN: state => {
            return state.auth_token
        },
        USER: state => {
            return state.user_data
        }
    },
    mutations: {
        setToken: (state, payload) => {
            state.auth_token = payload;
        },
        removeToken: (state) => {
            state.auth_token = ''
        },
        setUser: (state, payload) => {
            state.user_data = payload
        }
    },
    actions: {
        setToken: async (context, payload) => {
            context.commit('setToken', payload);
        },
        removeToken: async (context) => {
            context.commit('removeToken');
        },

        setUser: async (context, payload) => {
            context.commit('setUser', payload)
        }
    }
})