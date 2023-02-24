/* eslint-disable */
import {createStore} from 'vuex';
// import {stat} from "@babel/core/lib/gensync-utils/fs";

export default createStore({
    state() {
        return {
            auth_token: '',
            user_data: {},
            user_first_profile: {},
            user_second_profile: {},
            user_foreign_language: {},
            user_first_subject: {},
            user_second_subject: {},
        }
    },
    getters: {
        TOKEN: state => {
            return state.auth_token
        },
        USER: state => {
            return state.user_data
        },
        USER_FIRST_PROFILE: state => {
            return state.user_first_profile
        },
        USER_SECOND_PROFILE: state => {
            return state.user_second_profile
        },
        USER_FOREIGN_LANGUAGE: state => {
            return state.user_foreign_language
        },
        USER_FIRST_SUBJECT: state => {
            return state.user_first_subject
        },
        USER_SECOND_SUBJECT: state => {
            return state.user_second_subject
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
        setUserFirstProfile: (state, payload) => {
            state.user_first_profile = payload
        },
        setUserSecondProfile: (state, payload) => {
            state.user_second_profile = payload
        },
        setUserForeignLanguage: (state, payload) => {
            state.user_foreign_language = payload
        },
        setUserFirstSubject: (state, payload) => {
            state.user_first_subject = payload
        },
        setUserSecondSubject: (state, payload) => {
            state.user_second_subject = payload
        },
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
            context.commit('setUserFirstProfile', payload.first_profile)
            context.commit('setUserSecondProfile', payload.second_profile)
            context.commit('setUserForeignLanguage', payload.foreign_language)
            context.commit('setUserForeignLanguage', payload.foreign_language)
            context.commit('setUserFirstSubject', payload.first_profile_subject)
            context.commit('setUserSecondSubject', payload.second_profile_subject)
        }
    }
})