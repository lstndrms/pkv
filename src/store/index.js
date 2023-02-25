/* eslint-disable */
import {createStore} from 'vuex';

export default createStore({
    state() {
        return {
            auth_token: '',
            user_data: {},
            user_status: {},
            user_first_profile: {},
            user_second_profile: {},
            user_foreign_language: {},
            user_first_subject: {},
            user_second_subject: {}
        }
    },
    getters: {
        TOKEN: state => {
            return state.auth_token
        },
        USER: state => {
            return state.user_data
        },
        USER_STATUS: state => {
            return state.user_status
        },
        USER_FIRST_PROFILE: state => {
            return state.user_first_profile.name
        },
        USER_SECOND_PROFILE: state => {
            return state.user_second_profile.name
        },
        USER_FOREIGN_LANGUAGE: state => {
            return state.user_foreign_language.name
        },
        USER_FIRST_SUBJECT: state => {
            return state.user_first_subject.name
        },
        USER_SECOND_SUBJECT: state => {
            return state.user_second_subject.name
        },
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
        },
        setStatus: (state, payload) => {
            state.user_status = payload
        },
        setFP: (state, payload) => {
            state.user_first_profile = payload
        },
        setSP: (state, payload) => {
            state.user_second_profile = payload
        },
        setFL: (state, payload) => {
            state.user_foreign_language = payload
        },
        setFS: (state, payload) => {
            state.user_first_subject = payload
        },
        setSS: (state, payload) => {
            state.user_second_subject = payload
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
            context.commit('setStatus', payload.status)
        }
    }
})