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
            user_first_subject: {},
            user_second_subject: {},
            user_foreign_language: {},
            user_available_test_dates: [],
            user_test_date: {},
            user_screenshot: {}
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
            return state.user_first_profile
        },
        USER_SECOND_PROFILE: state => {
            return state.user_second_profile
        },
        USER_FIRST_SUBJECT: state => {
            return state.user_first_subject
        },
        USER_SECOND_SUBJECT: state => {
            return state.user_second_subject
        },
        USER_FOREIGN_LANGUAGE: state => {
            return state.user_foreign_language
        },
        USER_AVAILABLE_TEST_DATES: state => {
            return state.user_available_test_dates
        },
        USER_TEST_DATE: state => {
            return state.user_test_date
        },
        USER_SCREENSHOT: state => {
            return state.user_screenshot
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
        },
        setStatus: (state, payload) => {
            state.user_status = payload
        },
        setUserFirstProfile: (state, payload) => {
            state.user_first_profile = payload
        },
        setUserSecondProfile: (state, payload) => {
            state.user_second_profile = payload
        },
        setUserFirstSubject: (state, payload) => {
            state.user_first_subject = payload
        },
        setUserSecondSubject: (state, payload) => {
            state.user_second_subject = payload
        },
        setUserForeignLanguage: (state, payload) => {
            state.user_foreign_language = payload
        },
        setUserAvailableTestDates: (state, payload) => {
            state.user_available_test_dates = payload
        },
        setUserTestDate: (state, payload) => {
            state.user_test_date = payload
        },
        setUserScreenshot: (state, payload) => {
            state.user_screenshot = payload
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
            context.commit('setUserFirstProfile', payload.first_profile)
            context.commit('setUserSecondProfile', payload.second_profile)
            context.commit('setUserFirstSubject', payload.first_profile_subject)
            context.commit('setUserSecondSubject', payload.second_profile_subject)
            context.commit('setUserForeignLanguage', payload.foreign_language)
            context.commit('setUserTestDate', payload.test_dates)
            context.commit('setUserScreenshot', payload.screenshot)
        },
        setAvailableTestDates: async (context, payload) => {
            context.commit('setUserAvailableTestDates', payload)
        }
    }
})