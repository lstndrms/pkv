/* eslint-disable */
import {createStore} from 'vuex';

export default createStore({
    state() {
        return {
            auth_token: ''
        }
    },
    getters: {
        TOKEN: state => {
            return state.auth_token
        }
    },
    mutations: {
        setToken: (state, payload) => {
            state.auth_token = payload;
        },

    },
    actions: {
        setToken: async (context, payload) => {
            context.commit('setToken', payload);
        }
    }
})